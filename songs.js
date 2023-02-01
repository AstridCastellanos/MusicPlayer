let i=0, playState=false, repeatState=false, farwardState=false, loopState=false, pista, minutes = 0, secunds = 0, minutesdos = 0, secundsdos = 0, duracion, duraciondos, songImg, audio;
const maximo =  300;

const wrapper = document.querySelector('.wrapper');
const playButton = document.querySelector('.play-button');
const icon = playButton.querySelector('.fa-solid');
const repeatButton = document.querySelector('.repeat-button');
const barra = document.querySelector('.barra');
const progress = document.querySelector('.progress');
const endD = document.querySelector('.end');
const start = document.querySelector('.start');
const loopButton = document.querySelector('.loop-button');
const songMp3 = document.querySelector('.mp3');
const songOgv = document.querySelector('.ogv');
const containerAudio = document.querySelector('.container-audio')
const farwardButton = document.querySelector('.farward-button');
const backwardButton = document.querySelector('.backward-button');

const container = document.querySelector('.slider-container');
const containerCards = document.querySelector('.cards');
const songTitle = document.querySelector('.song');
const songArtist = document.querySelector('.artist');


playButton.addEventListener('click', play);
loopButton.addEventListener('click', bucle);
repeatButton.addEventListener('click', repeatBucle);
farwardButton.addEventListener('click', nextSong);
backwardButton.addEventListener('click', previousSong);
barra.addEventListener('click', posicion);
barra.addEventListener('click', tim);

calculateMarginScroll();

function calculateMarginScroll(){
    const newWidth = (wrapper.clientWidth-270)/2;
    container.style.margin = '0 ' + newWidth + 'px';
}

const songsList = [];

songsList.push({
    image: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Blackpink_-_How_You_Like_That.png',
    songName: 'How You Like That',
    artist: 'BLACKPINK',
    filemp3: './music/BLACKPINK  How You Like That MV.mp3',
    fileogv: './music/BLACKPINK How You Like That MV.ogv',
    songDuration: '3:03',
    songCode:'001'
});

songsList.push({
    image: 'https://i.ebayimg.com/images/g/qHQAAOSwQqRfzgdv/s-l1600.jpg',
    songName: 'Black Mamba',
    artist: 'aespa',
    filemp3: './music/aespa Black Mamba MV.mp3',
    fileogv: './music/aespa Black Mamba MV.ogv',
    songDuration: '3:49',
    songCode:'002'
});

songsList.push({
    image: 'https://imageio.forbes.com/specials-images/imageserve/6345a95c07bca24e9e6bc1fc/ive/960x0.jpg',
    songName: 'DEAR. CUPID',
    artist: 'IVE',
    filemp3: './music/DEAR CUPID IVE.mp3',
    fileogv: './music/DEAR CUPID IVE.ogv',
    songDuration: '1:26',
    songCode:'003'
});

songsList.push({
    image: 'https://www.star2.com/wp-content/uploads/2022/04/Yeri-MUA-768x529.jpg',
    songName: 'Corrido De Yeri Mua',
    artist: 'ADAN JFW',
    filemp3: './music/ADAN JFW  CORRIDO DE YERI MUA AUDIO OFICIAL.mp3',
    fileogv: './music//ADAN JFW CORRIDO DE YERI MUA AUDIO OFICIAL.ogv',
    songDuration: '2:57',
    songCode:'006'
});

songsList.push({
    image: 'https://www.asiaworldmusic.fr/img/cms/2022%20JUIN/CHUNGHA%20-%20BARE%20&%20RARE%20-details-%20AsiaWorldMusic%20MUSICA.jpg',
    songName: 'Snapping',
    artist: 'Chung Ha',
    filemp3: './music/CHUNG HA  Snapping MV.mp3',
    fileogv: './music/CHUNG HA Snapping MV.ogv',
    songDuration: '3:34',
    songCode:'004'
});

songsList.push({
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Break_Up_with_Your_Girlfriend%2C_I%27m_Bored.png',
    songName: 'Break Up With Your Girlfriend',
    artist: 'Ariana Grande',
    filemp3: './music/Ariana Grande  break up with your girlfriend im bored Official Video.mp3',
    fileogv: './music/Ariana Grande break up with your girlfriend im bored Official Video.ogv',
    songDuration: '3:24',
    songCode:'005'
});

//Método para renderizar la imagen de las canciones
function renderImg(array){
    let u = 0;
    
    for (song of array){
        
        const songCard = document.createElement('div');
        songCard.classList.add('item');

        songImg = document.createElement('img'); 
        songImg.setAttribute('code', song.songCode);
        songImg.setAttribute('src', song.image); 
        songImg.addEventListener('click', playSong);
        
        songCard.appendChild(songImg);
        container.appendChild(songCard);
    }
}

//Método para remover el id que tiene estilos para que se haga más grande la imagen de la canción que se está reproduciendo
function removeId() {
    for(i = 0; i < container.children.length; i++) {
        container.children[i].removeAttribute('id');
    }
}

//Método para renderizar con la información de la canción seleccionada al presionar en alguna imagen
function playSong(event){

    const result = songsList.find(cancion => cancion.songCode === event.target.getAttribute('code'));
    const indexSong = songsList.findIndex(cancion => cancion.songCode === event.target.getAttribute('code'));

    render(result, indexSong);
}

//Método para que se reproduzca el audio
function play() {

    if(audio.paused || audio.ended) {
        audio.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        
        load = setInterval(avanzar, 1);
        tmer = setInterval(time, 1000);
        playState=true;
    }else {
        audio.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

//Método para que la barra avance con tiempo de reproducción
function avanzar() {
    if(audio.ended==false){
        var total = parseInt(audio.currentTime*maximo/audio.duration);
        progress.style.width = total + "px";
    }
}

//Método para actualizar el progreso de la barra al tocar alguna parte de la misma
function posicion(position) {
    
    var raton = position.pageX-barra.offsetLeft;

    var newTime = raton*audio.duration/300;
    audio.currentTime = newTime;
    progress.style.width = (raton) + "px";
}


//Método que, al presionar el botón de reproducción automática de la canción, cambia el color del ícono
function bucle() {
    if(repeatState==true){
        repeatBucle();
    }

    if(loopState==false){
        loopState = true;
        loopButton.style.color = "white";
    }else {
        loopState = false;
        loopButton.style.color = "#885768";
    }
}

//Método que, al presionar el botón de reproducción automática de la lista, cambia el color del ícono
function repeatBucle(){
    if(loopState==true){
        bucle();
    }

    if(repeatState==false){
        repeatState = true;
        repeatButton.style.color = "white";
    }else {
        repeatState = false;
        repeatButton.style.color = "#885768";
    }
}

//Método ,que al presionar en alguna parte de la barra de reproducción, actualiza los números que muestran cuanto tiempo de reproducción lleva la canción.
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

/*function durationFunction() {

    duracion = audio.duration;

    horas = parseInt(duracion/3600);
    minutes = parseInt(duracion/60)-horas * 60;
    secunds = parseInt((duracion/60 - (horas * 60))* 60) - (minutes*60);

    if(secunds<10){
        endD.innerHTML = minutes.toString() + ":0" + secunds.toString(); 
    }else {
        endD.innerHTML = minutes.toString() + ":" + secunds.toString(); 
    }
}*/
//Método que se mantiene actualizando los números del tiempo de reproducción de la canción, además repite la canción o toda la lista dependiendo de los botones presionados.
function time() {
    seg = audio.currentTime;

    if(audio.paused==false || seg == audio.duration){
        horasdos = parseInt(seg/3600);
        minutesdos = parseInt(seg/60)-horasdos * 60;
        secundsdos = parseInt((seg/60 - (horasdos * 60))* 60) - (minutesdos*60);

        if(secundsdos<10){
            start.innerHTML = minutesdos.toString() + ":0" + secundsdos.toString(); 
        }else {
            start.innerHTML = minutesdos.toString() + ":" + secundsdos.toString(); 
        }
        

        if(seg == audio.duration){
            secundsdos = 0;
            minutesdos = 0;
            duraciondos = 0;

            start.innerHTML = "0:00";
            progress.style.width = 0 + "px";
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');

            if(loopState==true){
                audio.play();
                
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            }

            if(repeatState==true){
                nextSong();
                
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            }
        }
    }
}

//Método que reproduce la canción siguiente
function nextSong(){

    const indexSong = songsList.findIndex(cancion => cancion.songCode === audio.getAttribute('code'));
    
    if(indexSong+1 < songsList.length){
        const result = songsList[indexSong+1];
        render(result, indexSong+1);
        let rect = container.getBoundingClientRect();

        containerCards.scrollLeft += 250;//(width:210) + (margin-left: 15) + (margin-righ:15) + (margin-left: 15 (next card))
        
    }else {
        console.log('Esta es la última canción');
    }

}

//Método que reproduce la canción anterior
function previousSong(){

    const indexSong = songsList.findIndex(cancion => cancion.songCode === audio.getAttribute('code'));

    if(indexSong+1 > 1){
        const result = songsList[indexSong-1];
        render(result, indexSong-1);
        containerCards.scrollLeft -= 250;
    }else {
        console.log('Esta es la primer canción');
    }

}

//Método que crea el elemento de audio y agrega la información de la canción que se seleccionó
function render(result, index){

    removeId();
    container.children[index].setAttribute('id','main');

    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
    start.innerText = "0:00"; 

    songTitle.innerText = result.songName;
    songArtist.innerText = result.artist;
    endD.innerText = result.songDuration; 
    
    const vAudio = document.querySelector('.audio');

    audio = document.createElement('audio');
    audio.classList.add('audio');
    audio.setAttribute('controls', '');
    audio.setAttribute('code', result.songCode);
    
    const songMp3 = document.createElement('source');
    songMp3.classList.add('mp3');
    songMp3.setAttribute('src', result.filemp3);
    songMp3.setAttribute('type', 'audio/mpeg');

    const songOgv = document.createElement('source');
    songOgv.classList.add('ogv');
    songOgv.setAttribute('src', result.fileogv);
    songOgv.setAttribute('type', 'audio/ogg');

    audio.appendChild(songMp3);
    audio.appendChild(songOgv);
    containerAudio.append(audio);
    containerAudio.replaceChild(audio, vAudio);
    
    if(playState){
        play();
    }
}

renderImg(songsList);
render(songsList[0], 0);


