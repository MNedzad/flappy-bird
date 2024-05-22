
const bird = document.querySelector("#bird");
const display = document.querySelector(".game");
const score = document.querySelector(".score");

const overlaps = (a, b) => {
    const rect1 = a.getBoundingClientRect();
    const rect2 = b.getBoundingClientRect();
    const isInHoriztonalBounds =
        rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
    const isInVerticalBounds =
        rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
    const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
    return isOverlapping;
}

class Game {

    constructor() {
        this.Size;
        this.y = 330;
        this.dt= 0.0;
        this.gravityIntesitiy = 6.2 
        this.velocity = 0;
        this.maxVelocity = -200;
        this.gep = 100;
        this.tubeSpeed = 10;
        this.x = 500;
        this.score = 0;
        this.over = false;
    }
    moving = (x) => {
        this.velocity = 0;

        this.velocity -= x 
    }
    gravity = () => {
        if (this.y > 0 && this.velocity < 20)  {
            this.velocity += this.gravityIntesitiy   
        }
        if(this.y < 1){
            this.over = true
        }
    }
    generateTrap = () => {
        var y = (Math.floor(Math.random() * 5) + 2) * 100
        this.x = 500;
        console.log(y);
        var upperPipe = document.createElement("div");
        var pipe = document.createElement("div");
        //y 150 
        //gap 100
        pipe.style.top = 700 - y + 150 + "px"
        upperPipe.style.bottom = y + "px"

        pipe.style.left = this.x + "px"
        upperPipe.style.left = this.x + "px"

        display.appendChild(upperPipe);

        display.appendChild(pipe)


        upperPipe.id = "pipe"
        upperPipe.className = "upperPipe"
        pipe.className = "lowerPipe"
        pipe.id = "pipe"

    }
    update = () => {
        this.y -= this.velocity
        bird.style.bottom = this.y + "px"
        if (this.y < 0) {
            this.velocity = 0;
            this.y = 0;
        }
        else if (this.y > 660) {
            this.velocity = 0;
            this.y = 630;
        }
    }
    getPosition = () => {
        return [this.y, this.x];
    }
}

var game = new Game();


document.addEventListener("keydown", (ev) => {
    if (ev.keyCode === 32  && !game.over) {
        game.moving(30)
        space = true
        var pos = game.getPosition()
    }else if(game.over && ev.keyCode === 32){
        Restart();
    }
})
var isTubeGenerated = false;


const updatePipe = (element) =>
{
    console.log(game.score);

    if (game.x < -50) {
        element.remove()
        isTubeGenerated = false;
    }
  
    if (overlaps(element, bird)) {
        game.over = true;
    }

}
const Restart = () =>
{
    const pipes = display.querySelectorAll("#pipe")
    pipes.forEach(e =>{
       
        e.remove()
        isTubeGenerated = false;
    });
    bird.style.bottom = 330 + "px";
    game = new Game();
    Start();
}

const task = async (i) => {
    await timer(70);
    
    var lastUpdate = Date.now();
    if (!isTubeGenerated) {
        isTubeGenerated = true;
        game.generateTrap();
    }
    var uPipe = display.querySelector(".upperPipe");
    var lPipe = display.querySelector(".lowerPipe");
    
    game.x -= game.tubeSpeed
    uPipe.style.left = game.x + "px";
    lPipe.style.left = game.x + "px";
    if(game.x === 30){
        game.score += 1;
    }
    console.log(score.childNodes);
    score.childNodes[0].innerText = `Score: ${game.score}`
    game.gravity()
    game.update()
    updatePipe(uPipe)
    updatePipe(lPipe)
    if(game.over){
       
        return;
    }
  
    game.dt = Date.now() - lastUpdate;
}

const Start = async () => {
    while (!game.over) {
        await task();
    }
}
Start();

function timer(ms) { return new Promise(res => setTimeout(res, ms)); }
