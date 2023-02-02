let i=0, playState=false, repeatState=false, farwardState=false, loopState=false, pista, minutes = 0, secunds = 0, minutesdos = 0, secundsdos = 0, duracion, duraciondos, songImg, audio;
const maximo =  300;
let previous, estado = false, stop = false, prevStatus = false, nextStatus = false, firstTime = false;

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

const tittleP = document.querySelector('.tittle');
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
    songCode:'004'
});

songsList.push({
    image: 'https://www.asiaworldmusic.fr/img/cms/2022%20JUIN/CHUNGHA%20-%20BARE%20&%20RARE%20-details-%20AsiaWorldMusic%20MUSICA.jpg',
    songName: 'Snapping',
    artist: 'Chung Ha',
    filemp3: './music/CHUNG HA  Snapping MV.mp3',
    fileogv: './music/CHUNG HA Snapping MV.ogv',
    songDuration: '3:34',
    songCode:'005'
});

songsList.push({
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Break_Up_with_Your_Girlfriend%2C_I%27m_Bored.png',
    songName: 'Break Up With Your Girlfriend',
    artist: 'Ariana Grande',
    filemp3: './music/Ariana Grande  break up with your girlfriend im bored Official Video.mp3',
    fileogv: './music/Ariana Grande break up with your girlfriend im bored Official Video.ogv',
    songDuration: '3:24',
    songCode:'006'
});

//Método para renderizar la imagen de las canciones
function renderImg(array){
    let u = 1;
    
    for (song of array){
        
        const songCard = document.createElement('div');
        songCard.classList.add('item');
        songCard.setAttribute('position', u);
        u++;
        songImg = document.createElement('img'); 
        songImg.setAttribute('src', song.image); 
        //songImg.addEventListener('click', playSong);
        
        songCard.appendChild(songImg);
        container.appendChild(songCard);
    }

    const centerImage = (entradas, observador) => {
        entradas.forEach((entrada) => {
            if(entrada.isIntersecting){
                if(estado){
                    removeId();
                    const actual = containerCards.scrollLeft;
                    
                    if(actual>=previous){
                        //Hacia el final
                        console.log('Hacia el final');
                        const newWidth = (wrapper.clientWidth-250)/2;
                        containerCards.scrollLeft += newWidth+25;
                    }else {
                        //Hacia el inicio
                        console.log('Hacia el inicio');
                        const newWidth = (wrapper.clientWidth-250)/2;
                        containerCards.scrollLeft -= newWidth;
                    }
                    const position = (entrada.target.getAttribute('position'))-1;
                    render(songsList[position], position);
                    stop = true;
                }
            }else {
                entrada.target.removeAttribute('id');
                estado = true;
            }
            previous = containerCards.scrollLeft;
        });
    }


    const observador = new IntersectionObserver(centerImage, {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: 1.0
    });
    
    for(i = 0; i < container.children.length; i++) {
        observador.observe(container.children[i]);
    }
}

if(stop){
    setInterval(stopScroll, 2000);
}

function stopScroll(){
    const positioX = containerCards.scrollLeft;
    containerCards.onscroll = function () { containerCards.scrollTo(positioX, 0); };
}


//Método para remover el id que tiene estilos para que se haga más grande la imagen de la canción que se está reproduciendo
function removeId() {
    for(i = 0; i < container.children.length; i++) {
        container.children[i].removeAttribute('id');
    }
}

//Método para renderizar con la información de la canción seleccionada al presionar en alguna imagen
function playSong(event){

    console.log(containerCards.scrollLeft);
    const result = songsList.find(cancion => cancion.songCode === event.target.getAttribute('code'));
    const indexSong = songsList.findIndex(cancion => cancion.songCode === event.target.getAttribute('code'));

    render(result, indexSong);
    
    console.log(containerCards.scrollLeft);
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
        observerFunction(indexSong, 'next');
        //(width:210) + (margin-left: 15) + (margin-righ:15) + (margin-left: 15 (next card))
        
    }else {
        console.log('Esta es la última canción');
    }
    
}

//Método que reproduce la canción anterior
function previousSong(){

    const indexSong = songsList.findIndex(cancion => cancion.songCode === audio.getAttribute('code'));

    if(indexSong+1 > 1){
        const result = songsList[indexSong-1];
        observerFunction(indexSong, 'prev');
    }else {
        console.log('Esta es la primer canción');
    }

    prevStatus = true;
}

function observerFunction(index, direction){
    
    firstTime = true;
    const obtenerDistancia = (entradas, observer) => {
        entradas.forEach((entrada) => {
            if(entrada.isIntersecting){
                if(firstTime){
                    const portionViewed = entrada.intersectionRatio*220;
                    if(direction=='next'){
                        const newWidth = 205-portionViewed;
                        containerCards.scrollLeft += newWidth;
                    }else if (direction=='prev'){
                        const newWidth = 225-portionViewed;
                        containerCards.scrollLeft -= newWidth;
                    }
                    firstTime = false;
                }
                
                if(entrada.intersectionRatio == 1.00){
                    observer.unobserve(entrada.target);
                }
                    
            }
        });
    }

    const observer = new IntersectionObserver(obtenerDistancia, {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: [0.00, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09,0.10, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.20,
                    0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28, 0.29, 0.30, 0.31, 0.32, 0.33, 0.34, 0.35, 0.36, 0.37, 0.38, 0.39, 0.40,
                    0.41, 0.42, 0.43, 0.44, 0.45, 0.46, 0.47, 0.48, 0.49, 0.50, 0.51, 0.52, 0.53, 0.54, 0.55, 0.56, 0.57, 0.58, 0.59, 0.60,
                    0.61, 0.62, 0.63, 0.64, 0.65, 0.66, 0.67, 0.68, 0.69, 0.70, 0.71, 0.72, 0.73, 0.74, 0.75, 0.76, 0.77, 0.78, 0.79, 0.80,
                    0.81, 0.82, 0.83, 0.84, 0.85, 0.86, 0.87, 0.88, 0.89, 0.90, 0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98,0.99, 1.00]
    });
    if(direction=='next'){
        observer.observe(container.children[index+1]);
    }else if (direction=='prev'){
        observer.observe(container.children[index-1]);
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


