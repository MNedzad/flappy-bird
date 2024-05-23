
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
        this.score = 0;
        this.over = false;
    }
    moving = (x) => {
        this.velocity = 0;

        this.velocity -= x 
    }
    gravity = () => {
        if (this.y > 0 && this.velocity < 25)  {
            this.velocity += this.gravityIntesitiy   
        }
        if(this.y < 1){
            this.over = true
        }
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
}
class Pipe 
{
    constructor (game)
    {
        this.x = 500
        this.gep = 100;
        this.speed = 10;
        this.upperPipe;
        this.pipe;
    
        this.generate();
        this.interval =  setInterval(this.update, 50);
           
      
    }
    generate = () => {
        if(game.over)
        {
            return;
        }
        var y = (Math.floor(Math.random() * 5) + 2) * 100
        this.x = 500;

        console.log(y);
        this.upperPipe = document.createElement("div");
        this.pipe = document.createElement("div");
        //y 150 
        //gap 100
        this.pipe.style.top = 700 - y + 150 + "px"
        this.upperPipe.style.bottom = y + "px"

        this.pipe.style.left = this.x + "px"
        this.upperPipe.style.left = this.x + "px"

        display.appendChild(this.upperPipe);

        display.appendChild(this.pipe)


        this.upperPipe.id = "pipe"
        this.upperPipe.className = "upperPipe"
        this.pipe.className = "lowerPipe"
        this.pipe.id = "pipe"
       

    }
    update = () =>{
        if(game.over)
        {
            clearInterval(this.interval)
            return;
        }
        this.x -= this.speed
        this.upperPipe.style.left = `${this.x}px`
        this.pipe.style.left = `${this.x}px`
        console.log(this.x );

        if (overlaps(this.upperPipe, bird) || overlaps(this.pipe, bird) ) {
            clearInterval(this.interval)
            game.over = true;
        }
        if (game.x < -50) {
            this.upperPipe.remove();
            this.pipe.remove();
            clearInterval(this.interval)
        }
        if(this.x === 30){
            game.score += 1;
        }
    }
}
var game = new Game();

document.addEventListener("keydown", (ev) => {
    if (ev.keyCode === 32  && !game.over) {
        game.moving(35)
        space = true
  
    }else if(game.over && ev.keyCode === 32){
        Restart();
    }
})




var isGenerated = false

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
const generateObstacle =  () =>{

    
    new Pipe();
    
}

const task = async (i) => {
    await timer(40);
    var lastUpdate = Date.now();
    
    score.childNodes[0].innerText = `Score: ${game.score}`
    game.gravity()
    game.update()

    if(game.over){
       
        return;
    }
  
    game.dt = Date.now() - lastUpdate;
}
setInterval(generateObstacle, 1900)
const Start = async () => {
    while (!game.over) {
        await task();
          
    }
}
Start();

function timer(ms) { return new Promise(res => setTimeout(res, ms)); }
