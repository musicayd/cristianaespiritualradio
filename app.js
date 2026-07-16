self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(clients.claim());
});


const firebaseConfig = {
    apiKey: "AIzaSyAhQzly1lZemafx1SU1iQKlav6oyDTOqKw",
    authDomain: "radiocristianaespiritual.firebaseapp.com",
    databaseURL: "https://radiocristianaespiritual-default-rtdb.firebaseio.com",
    projectId: "radiocristianaespiritual",
    storageBucket: "radiocristianaespiritual.appspot.com",
    messagingSenderId: "93851149213",
    appId: "1:93851149213:web:5816335e8b9e8d6314c574"
};

/* FIREBASE */

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

/* CONTADOR DE VISITAS */

const today = new Date().toISOString().split("T")[0];

const visitKey = "visitado_" + today;

if(!localStorage.getItem(visitKey)){

    db.ref("visitas/" + today).transaction(current => {

        return (current || 0) + 1;

    });

    localStorage.setItem(visitKey, "si");
}

/* ELEMENTOS */

const audio = document.getElementById("audio");

/* AUDIO BACKGROUND */

audio.preload = "auto";

audio.loop = false;

audio.setAttribute("playsinline", "true");

audio.setAttribute("webkit-playsinline", "true");

audio.crossOrigin = "anonymous";

/* =========================
   AUDIO BACKGROUND
========================= */

audio.setAttribute("playsinline", "true");

audio.setAttribute("webkit-playsinline", "true");

audio.loop = false;

audio.preload = "auto";

const playBtn = document.getElementById("playBtn");

const songTitle = document.getElementById("songTitle");

const likeBtn = document.getElementById("likeBtn");

const loginBtn = document.getElementById("loginBtn");

const userInfo = document.getElementById("userInfo");

/* =========================
   INTRO IMAGE
========================= */

const intro = document.getElementById("intro");

const player = document.getElementById("player");

setTimeout(() => {

    intro.style.opacity = "0";

    setTimeout(() => {

        intro.style.display = "none";

        player.classList.remove("hidden");

    }, 500);

}, 4000);

/* =========================
   INSTALL PWA
========================= */

const installBtn = document.getElementById("installBtn");

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {

    e.preventDefault();

    deferredPrompt = e;

    installBtn.style.display = "block";
});

installBtn.addEventListener("click", async () => {

    if(!deferredPrompt) return;

    deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;

    if(choiceResult.outcome === "accepted"){

        console.log("PWA instalada");
    }

    deferredPrompt = null;
});

/* PLAYLIST */

const songs = [

    { title: "📻 Radio", file: "AnuncioRadio.mp3" },

    { title: "Micromensajes", file: "radioanuncio2.mp3" },

    { title: "Oración", file: "Saludo.mp3" },

    { title: "Anuncios", file: "Oracion.mp3" },

    { title: "Calles de oro", file: "CallesDeOro.mp3" },

    { title: "Camina Por Las Aguas", file: "CaminaPorLasAguas.mp3" },

    { title: "Canta a Dios", file: "CantaADios.mp3" },

    { title: "Cantale", file: "Cantale.mp3" },

    { title: "Cantaran los santos", file: "CantaranLosSantos.mp3" },

    { title: "Comed y bebed", file: "ComedYBebed.mp3" },

    { title: "Contigo esta", file: "ContigoEsta.mp3" },

    { title: "Coros celestiales", file: "CorosCelestiales.mp3" },

    { title: "Convencion", file: "convencion.mp3" },

    { title: "Cristo vino", file: "CristoVino.mp3" },

    { title: "A tus labios", file: "ATusLabios.mp3" },

    { title: "Adan", file: "Adan.mp3" },

    { title: "Ahora Ven", file: "AhoraVen.mp3" },

    { title: "Alabad a Jehova", file: "AlabadAJehova.mp3" },

    { title: "Alabe al Señor", file: "AlabeAlSeñor.mp3" },

    { title: "Alma asustada", file: "AlmaAsustada.mp3" },

    { title: "Alma cuerpo y corazon", file: "AlmaCuerpoYCorazon.mp3" },

    { title: "Alma de poeta", file: "AlmaDePoeta.mp3" },

    { title: "Almas expuestas", file: "AlmasExpuestas.mp3" },

    { title: "Almas perdidas", file: "AlmasPerdidas.mp3" },

    { title: "Ante tu altar", file: "AnteTuAltar.mp3" },

    { title: "Aquella noche", file: "AquellaNoche.mp3" },

    { title: "Aquella tarde gris", file: "AquellaTardeGris.mp3" },

    { title: "Ayuda Idonea", file: "AyudaIdo.mp3" },

    { title: "Bastate de mi gracia", file: "BastateMiGracia.mp3" },

    { title: "Cada que me hablan de ti", file: "CadaQueMeHablan.mp3" },

    { title: "Cancion de amor", file: "CancionDeAmor.mp3" },

    { title: "Cancion de amor 2", file: "Canciondeamor2.mp3" },

    { title: "El cantar de las aves", file: "CantarDeLasAves.mp3" },

    { title: "Conversion", file: "Conversion.mp3" },

    { title: "Cual siervo", file: "CualSiervo.mp3" },

    { title: "Cuando vengas a la casa de Dios", file: "CuandoVengasALaCasaDeDios.mp3" },

    { title: "Despedida", file: "Despedida.mp3" },

    { title: "Diez Virgenes", file: "DiezVrgenes.mp3" },

    { title: "Dios", file: "Dios.mp3" },

    { title: "Dios de tu padre", file: "DiosDeTuPadre.mp3" },

    { title: "Dios esta aqui", file: "DiosEstaAqui.mp3" },

    { title: "Diosito nos ayuda", file: "DiositoNosAyuda.mp3" },

    { title: "Divinidad y ciencia", file: "DivinidadYCiencia.mp3" },

    { title: "El amor", file: "ElAmor.mp3" },

    { title: "El amor 2", file: "ElAmor2.mp3" },

    { title: "El criticon", file: "ElCriticon.mp3" },

    { title: "El hermano del rodeo", file: "ElHermanoDelRodeo.mp3" },

    { title: "El pregon", file: "ElPregon.mp3" },

    { title: "Eli Eli", file: "EliEli.mp3" },

    { title: "Elias", file: "Elias.mp3" },

    { title: "En paz me acostare", file: "EnPazMeAcostare.mp3" },

    { title: "Espiritu santo", file: "EspirituSanto.mp3" },

    { title: "Ezequias", file: "Ezequias.mp3" },

    { title: "Fe", file: "Fe.mp3" },

    { title: "Final Trompeta", file: "FinalTrompeta.mp3" },

    { title: "Final Trompeta 2", file: "FinalTrompeta2.mp3" },

    { title: "Hermosa flor", file: "HermosaFlor.mp3" },

    { title: "Infinito amor", file: "InfinitoAmor.mp3" },

    { title: "Jacob", file: "Jacob.mp3" },

    { title: "Jilguero", file: "Jilguero.mp3" },

    { title: "Job", file: "Job.mp3" },

    { title: "Juicio", file: "Juicio.mp3" },

    { title: "Juicio 2", file: "Juicio2.mp3" },

    { title: "La juventud", file: "LaJuventud.mp3" },

    { title: "Las redes", file: "LaRedes.mp3" },

    { title: "Lazaro", file: "Lazaro.mp3" },

    { title: "Lazaro 2", file: "Lazaro2.mp3" },

    { title: "Lista esta", file: "ListaEst.mp3" },

    { title: "Lista esta 2", file: "ListaEsta.mp3" },

    { title: "Mi guitarra", file: "MiGuItarra.mp3" },

    { title: "Ministrando", file: "Ministrando.mp3" },

    { title: "Mis ojos", file: "MisOjos.mp3" },

    { title: "Monedas de plata", file: "MonedasDePlata.mp3" },

    { title: "Mujer virtuosa", file: "MujerVirtuosa.mp3" },

    { title: "Niños a mi", file: "NiñosAMi.mp3" },

    { title: "Nunca me dejaras", file: "NuncaMeDejaras.mp3" },

    { title: "Pastor", file: "Pastor.mp3" },

    { title: "Pedro en la carcel", file: "PedroEnLaCarcel.mp3" },

    { title: "Poder de Dios", file: "PoderDeDios.mp3" },

    { title: "Por la manana", file: "PorLaMañana.mp3" },

    { title: "Samaritano", file: "SAMARITANO.mp3" },

    { title: "Salmo 67", file: "Salmo67.mp3" },

    { title: "Se visten de gala", file: "SeVistenDeGala.mp3" },

    { title: "Solo uno es", file: "SoloUnoEs.mp3" },

    { title: "Tu rostro", file: "TuRostro.mp3" },

    { title: "Boda", file: "VistenDeGala.mp3" },

    { title: "XV años", file: "XVAnos.mp3" },

    { title: "Ante tu altar 2", file: "antetualtar2.mp3" },

    { title: "Bastate de mi gracia 2", file: "bastatemigracia2.mp3" },

    { title: "El canto de mi alma", file: "elcantodemialma.mp3" },

    { title: "El ocaso", file: "elocaso.mp3" },

    { title: "Gala", file: "gala.mp3" },

    { title: "Grandes ciudades", file: "grandesciudades.mp3" },

    { title: "Hermano grunon", file: "hermanogruñon.mp3" },

    { title: "La puerta", file: "lapuerta.mp3" },

    { title: "Llename de ti", file: "llenamedeti.mp3" },

    { title: "Mi dulce niña", file: "midulceniña.mp3" },

    { title: "Mi madre es", file: "mimadrees.mp3" },

    { title: "Ministerio de Dios", file: "ministeriodedios.mp3" },

    { title: "Mono de papel", file: "monodepapel.mp3" },

    { title: "Morir cantando", file: "morircantando.mp3" },

    { title: "No morire", file: "nomorire.mp3" },

    { title: "Nunca me dejaras 2", file: "nuncamedejaras2.mp3" },

    { title: "Profecia", file: "profecia.mp3" },

    { title: "Recorrido de Pablo", file: "recorridodepablo.mp3" },

    { title: "Tu sabes", file: "tusabes.mp3" },

    { title: "Volar", file: "volar.mp3" },

    { title: "Lagrimas de felicidad", file: "LagrimasdeFelicidad.mp3" },

   { title: "Los caminantes", file: "Loscaminantes.mp3" },

     { title: "Olor suave", file: "Olorsuave.mp3" },

    { title: "Oracion sanadora", file: "Oracionsanadora.mp3" },

    { title: "Reflexion", file: "reflexion.mp3" },

     { title: "Cara a cara (Joiarib)", file: "Caraacara.mp3" },

        { title: "Vino el Señor (Joiarib)", file: "vinoelsenor.mp3" },

    { title: "Bello Amanecer (Joiarib)", file: "belloam.mp3" },

    { title: "La obra maravillosa", file: "laobramaravillosa.mp3" },

    { title: "A Cristo conoci", file: "ACristoConoci.mp3" },

    { title: "Bethel", file: "bethel.mp3" },

        { title: "Manos asperas", file: "manosasperas.mp3" },

     { title: "Es Jesus", file: "esjesus.mp3" },

    { title: "Es Jesus", file: "esjesus2.mp3" },

    { title: "Han pasado los años", file: "hanpasadolosaños.mp3" },

    { title: "Meditacion", file: "meditacion.mp3" },

    { title: "Mi primer amor", file: "miprimeramor.mp3" },

    { title: "Mi primer amor, Ver. Trio", file: "miprimeramortrio.mp3" },

     { title: "Mis plegarias", file: "misplegarias.mp3" },

    { title: "Nos critican", file: "noscritican.mp3" },

    { title: "Nos critican 2", file: "noscritican2.mp3" },

    { title: "No te equivoques", file: "noteequivoques.mp3" },

     { title: "Padre", file: "Padre.mp3" },

    { title: "Quince años", file: "quinceanos.mp3" },

    { title: "Servirle quiero", file: "servirlequiero.mp3" },

     { title: "Vivi sin Dios", file: "vivisindios.mp3" },

    { title: "Vivi sin Dios", file: "vivisindiosnorteno.mp3" },

    { title: "Cumpleaños Ver. N", file: "cumpleanosnorte.mp3" },

    { title: "A Cristo cantar", file: "acristocantar.mp3" },

    { title: "Vino el Señor (Portugues)", file: "vinoelsenor.mp3" },

    { title: "Ante Dios", file: "antedios.mp3" },

    { title: "Puerta del cielo (Dedicacion)", file: "puertadelcielo.mp3" },

    { title: "Yo te seguire D.A.R", file: "yoteseguire.mp3" }

];

/* VARIABLES */

let currentSong = 0;

let currentUser = null;


/* =========================
   INICIO ALEATORIO + GUARDADO
========================= */

let savedSong = localStorage.getItem("currentSong");

if(savedSong !== null){

    currentSong = parseInt(savedSong);

}else{

    currentSong = Math.floor(Math.random() * songs.length);
}

audio.src = songs[currentSong].file;

const coverImage = document.getElementById("coverImage");

songTitle.innerText = songs[currentSong].title;

function cambiarPortada(){

    if(songs[currentSong].file === "AnuncioRadio.mp3"){

        coverImage.src = "AnuncioRadiogif.gif";

    }else if(songs[currentSong].file === "radioanuncio2.mp3"){

        coverImage.src = "radio.gif";

    }else if(songs[currentSong].file === "yoteseguire.mp3"){

        coverImage.src = "yoteseguire.jpg";

    }else if(songs[currentSong].file === "laobramaravillosa.mp3"){

        coverImage.src = "laobramaravillosa.jpeg";

    }else if(songs[currentSong].file === "Saludo.mp3"){

        coverImage.src = "comerciales.jpeg";

    }else if(songs[currentSong].file === "Oracion.mp3"){

        coverImage.src = "Oracion (2).gif";

    }else{

        coverImage.src = "portada.jpg";

    }
}

cambiarPortada();



/* CONTINUAR SOLO MISMA CANCION */

audio.addEventListener("loadedmetadata", () => {

    let lastSong = localStorage.getItem("currentSong");

    let savedTime = localStorage.getItem("currentTime");

    if(parseInt(lastSong) === currentSong){

        if(savedTime){

            audio.currentTime = parseFloat(savedTime);
        }
    }
});

/* PLAY */

playBtn.addEventListener("click", async () => {

    try{

        if(audio.paused){

            await audio.play();

            playBtn.innerText = "⏸ PAUSE";

        }else{

            audio.pause();

           playBtn.innerText = "▶ PLAY";
        }

    }catch(error){

        console.log(error);
        }

});

 /* =========================
   GUARDAR PROGRESO
========================= */

setInterval(() => {

    if(!audio.paused){

        localStorage.setItem("currentSong", currentSong);

        localStorage.setItem("currentTime", audio.currentTime);
    }

}, 5000);

    
/* =========================
   SHUFFLE + ANUNCIOS
========================= */

let songsPlayed = 0;

let songsPlayedForAd2 = 0;

let songsPlayedForSaludo = 0;

let songsPlayedForOracion = 0;

let playedSongs = [];

audio.addEventListener("ended", () => {

    console.log("TERMINO LA CANCION");

    const currentFile = songs[currentSong].file;

    /* SI TERMINÓ UN ANUNCIO O SALUDO O ORACIÓN */
    if(
        currentFile === "AnuncioRadio.mp3" ||
        currentFile === "radioanuncio2.mp3" ||
        currentFile === "Saludo.mp3" ||
        currentFile === "Oracion.mp3"
    ){

        currentSong = getRandomSong();

    }else{

        /* CONTADORES SOLO CUANDO ES MUSICA NORMAL */
        songsPlayed++;
        songsPlayedForAd2++;
        songsPlayedForSaludo++;
        songsPlayedForOracion++;

        /* ORACIÓN CADA 15 */
        if(songsPlayedForOracion >= 15){

            const oracionIndex = songs.findIndex(
                s => s.file === "Oracion.mp3"
            );

            if(oracionIndex !== -1){
                currentSong = oracionIndex;
            }else{
                currentSong = getRandomSong();
            }

            songsPlayedForOracion = 0;
        }

        /* SALUDO CADA 5 */
        else if(songsPlayedForSaludo >= 5){

            currentSong = 2;

            songsPlayedForSaludo = 0;
        }

        /* ANUNCIO CADA 10 */
        else if(songsPlayedForAd2 >= 10){

            currentSong = 1;

            songsPlayedForAd2 = 0;
        }

        /* ANUNCIO CADA 3 */
        else if(songsPlayed >= 3){

            currentSong = 0;

            songsPlayed = 0;
        }

        /* MUSICA NORMAL */
        else{

            currentSong = getRandomSong();
        }
    }

    localStorage.setItem("currentSong", currentSong);
    localStorage.setItem("currentTime", 0);

    audio.src = songs[currentSong].file;
audio.currentTime = 0;
songTitle.innerText = songs[currentSong].title;

cambiarPortada();

    activarWakeLock();

audio.play();
});




/* RANDOM SIN REPETIR */

function getRandomSong(){

    console.log("BUSCANDO OTRA CANCION");


    /* EVITAR REPETICIONES */

    if(playedSongs.length >= songs.length - 22){

        playedSongs = playedSongs.slice(-20);
    }

    let randomSong;

    do{

        randomSong = Math.floor(
            Math.random() * (songs.length - 2)
        ) + 2;

    }while(playedSongs.includes(randomSong));

    playedSongs.push(randomSong);

    return randomSong;
}

/* LOGIN GOOGLE */

const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.addEventListener("click", () => {

    firebase.auth()
        .signInWithPopup(provider)
        .catch(error => {

            console.log(error);

            alert("Error login");
        });
});

/* USER */

firebase.auth().onAuthStateChanged(user => {

    if(user){

        currentUser = user;

        loginBtn.style.display = "none";

        userInfo.innerHTML = `👋 ${user.displayName}`;
    }
});

/* LIKES */

db.ref("likes").on("value", snapshot => {

    likeBtn.innerHTML = `
    
        ✨ Gloria a Dios ✨
        
        <span>
            Aleluya • Amén • ${snapshot.val() || 0}
        </span>
    `;
});

likeBtn.addEventListener("click", () => {

    if(!currentUser){

        alert("Inicia sesión primero");

        return;
    }

    db.ref("likes").transaction(current => (current || 0) + 1);
});

/* SERVICE WORKER */

if("serviceWorker" in navigator){

    navigator.serviceWorker.register("sw.js");
}
/* =========================
   WAKE LOCK
========================= */

let wakeLock = null;

async function activarWakeLock(){

    try{

        wakeLock = await navigator.wakeLock.request("screen");

        console.log("Wake Lock activado");

    }catch(err){

        console.log("Wake Lock error:", err);
    }
}

/* ACTIVAR AL TOCAR PLAY */

playBtn.addEventListener("click", () => {

    activarWakeLock();
});

/* REACTIVAR SI REGRESA A LA APP */

document.addEventListener("visibilitychange", async () => {

    if(wakeLock !== null && document.visibilityState === "visible"){

        activarWakeLock();
    }
});

/* REANUDAR AUDIO SI REGRESA A LA APP */

document.addEventListener("visibilitychange", async () => {

    if(document.visibilityState === "visible"){

        if(audio.paused){

            try{

                await audio.play();

            }catch(err){

                console.log(err);
            }
        }
    }
});
/* =========================
   VOZ AUTOMATICA RELOJ
========================= */

let lastHourAnnounced = "";

setInterval(() => {

    const now = new Date();

    const hour = now.getHours();

    const minutes = now.getMinutes();

    /* CADA HORA Y MEDIA HORA */

    if(
        (minutes === 0 || minutes === 30) &&
        lastHourAnnounced !== `${hour}:${minutes}`
    ){

        lastHourAnnounced = `${hour}:${minutes}`;

        let displayHour = hour % 12 || 12;

        let period = hour >= 12
            ? "de la tarde"
            : "de la mañana";

        if(hour >= 19){

            period = "de la noche";
        }

        if(hour < 6){

            period = "de la madrugada";
        }

        let minutoTexto = "";

        if(minutes === 30){

            minutoTexto = " y media";
        }

        const mensaje =
            `Paz de Dios. Radio Cristiana Espiritual te da la hora. Son las ${displayHour}${minutoTexto} ${period}`;

        const voz = new SpeechSynthesisUtterance(mensaje);

        voz.lang = "es-MX";

        voz.rate = 1;

        /* BAJAR VOLUMEN AL HABLAR */

        voz.onstart = () => {

            audio.volume = 0.08;
        };

        /* HABLAR */

        speechSynthesis.speak(voz);

        /* REGRESAR VOLUMEN */

        voz.onend = () => {

            audio.volume = 1;
        };
    }

}, 30000);
