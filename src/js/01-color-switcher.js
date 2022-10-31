 class CollorChanger {

  constructor(){
    this.timerId = undefined;
    this.getEl = (selector) => document.querySelector(selector);
    this.btnStart = this.getEl("button[data-start=''");
    this.btnStop = this.getEl("button[data-stop=''");
  }

  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  stopChangeCollor() {
    this.btnStart.addEventListener("click", () => {
      this.timerId = setInterval(() => {
        console.log(document.body.style.background = this.getRandomHexColor()); 
      }, 1000);
      
    });
  }

  startChangeCollor() {
    this.btnStop.addEventListener("click", () => {
      clearInterval(this.timerId);
      
    });
  }

  init () {
     
    console.log(this.btnStart);
    console.log(this.btnStop);
    this.startChangeCollor() ;
    this.stopChangeCollor();
  }
}

let collorChanger = new CollorChanger();
collorChanger.init();