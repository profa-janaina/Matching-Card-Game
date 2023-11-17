const EMOJIS = [
    "🍎","🍎","🍉","🍉","🍇","🍇","🍐","🍐",
    "🍍","🍍","🥝","🥝","🍒","🍒","🍓","🍓"
];
let openCards = [];
let numberOfClicks = 0;

let shuffleEmojis = EMOJIS.sort(()=>(Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < EMOJIS.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector('.game').appendChild(box);    
}

function handleClick(){
    if(openCards.length < 2){
        this.classList.add('boxOpen');
        openCards.push(this);
    }

    if (openCards.length == 2) {
        setTimeout(checkMatch, 500);
    }

    numberOfClicks +=1;
}

function checkMatch(){
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add('boxMatch');
        openCards[1].classList.add('boxMatch');
    }else{
        openCards[0].classList.remove('boxOpen');
        openCards[1].classList.remove('boxOpen');
    }
    openCards = [];

    if((document.querySelectorAll('.boxMatch')).length === EMOJIS.length){
        victory();
    }
}


function victory(){
    let audio = new Audio('./src/audios/Magic_Chime.mp3');
    audio.volume = 0.7;
    audio.play();

    const imageUrl='./src/images/Party_Popper_Emojipedia.png'
    swal({
      title: 'Parabéns, você venceu!',
      text: 'O número de tentativas foi: ' + Math.floor(numberOfClicks/2),
      icon: imageUrl
    })
  }