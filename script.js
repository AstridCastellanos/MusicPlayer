

let repeatState=false, shuffleState=false, pista, minutes = 0, secunds = 0, minutes2 = 0, secunds2 = 0, duracion, duracion2;
const maximo =  305;

const audio = document.querySelector('.audio');
const playButton = document.querySelector('.play-button');
const icon = playButton.querySelector('.fa-solid');
const repeatButton = document.querySelector('.repeat-button');
const barra = document.querySelector('.barra');
const progress = document.querySelector('.progress');
const end = document.querySelector('.end');
const start = document.querySelector('.start');
const shuffleButton = document.querySelector('.shuffle-button');

durationFunction();

if(audio.played){
    tmer = setInterval(time, 1000);
}

playButton.addEventListener('click', play);
repeatButton.addEventListener('click', bucle);
shuffleButton.addEventListener('click', shuffleBucle);
barra.addEventListener('click', posicion);
barra.addEventListener('click', tim);

function play() {

    if(audio.paused || audio.ended) {
        audio.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');

        load = setInterval(avanzar, 1);
    }else {
        audio.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

function posicion(position) {
    
    var raton = position.pageX-barra.offsetLeft;

    var newTime = raton*audio.duration/300;
    audio.currentTime = newTime;
    progress.style.width = (raton) + "px";
}

function bucle() {
    if(repeatState==false){
        repeatState = true;
        repeatButton.style.color = "white";
    }else {
        repeatState = false;
        repeatButton.style.color = "#885768";
    }
}

function shuffleBucle(){
    if(shuffleState==false){
        shuffleState = true;
        shuffleButton.style.color = "white";
    }else {
        shuffleState = false;
        shuffleButton.style.color = "#885768";
    }
}

function tim(position) {
    if(audio.ended==false){
        var raton = position.pageX-barra.offsetLeft;
        var newTime = raton*audio.duration/maximo;
        duracion = newTime;

        horas = parseInt(duracion/3600);
        minutes = parseInt(duracion/60)-horas * 60;
        secunds = parseInt((duracion/60 - (horas * 60))* 60) - (minutes*60);
    
        if(secunds<10){
            start.innerHTML = minutes.toString() + ":0" + secunds.toString(); 
        }else {
            start.innerHTML = minutes.toString() + ":" + secunds.toString(); 
        }

    }
}

function durationFunction() {

        duracion = audio.duration;

        horas = parseInt(duracion/3600);
        minutes = parseInt(duracion/60)-horas * 60;
        secunds = parseInt((duracion/60 - (horas * 60))* 60) - (minutes*60);
    
        if(secunds<10){
            end.innerHTML = minutes.toString() + ":0" + secunds.toString(); 
        }else {
            end.innerHTML = minutes.toString() + ":" + secunds.toString(); 
        }
}

function avanzar() {
    if(audio.ended==false){
        var total = parseInt(audio.currentTime*maximo/audio.duration);
        progress.style.width = total + "px";
    }
}

function time() {
    seg = audio.currentTime;
    console.log(seg);
    console.log(audio.duration);

    if(audio.paused==false || seg == audio.duration){
        
        console.log(repeatState);
        if(secunds<60) secunds++;
    
        if(secunds==60 && minutes<60){
            minutes++;
            secunds = 0;
        }

        if(secunds<10){
            start.innerHTML = minutes.toString() + ":0" + secunds.toString(); 
        }else {
            start.innerHTML = minutes.toString() + ":" + secunds.toString(); 
        }

        if(seg == audio.duration){
            secunds = 0;
            minutes = 0;
            duracion = 0;
            console.log ("Dentro del if");

            start.innerHTML = "0:00";
            progress.style.width = 0 + "px";
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');

            if(repeatState==true){
                audio.play();
                
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');

                load = setInterval(avanzar, 1);
            }
        }
    }
}

