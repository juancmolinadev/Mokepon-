const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const ocultarReiniciar = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById('boton-mascota');

const botonReinciar = document.getElementById("boton-reiniciar");

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");

const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidasJugador");
const spanVidasEnemigo = document.getElementById("vidasEnemigo");

const sectionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");
const contenedorAtaques = document.getElementById("contenedorAtaques");

const sectionVerMapa = document.getElementById("ver-mapa");//canva
const mapa = document.getElementById("mapa");//canva

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let ataquesMokeponEnemigo
let opcionDeMokepones
let input1 
let input2 
let input3 
let fuego 
let agua 
let tierra 
let botones = []
let ataquesMokepon
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let mascotaEnemigo
let mascotaJugador
let lienzo = mapa.getContext("2d")
let intervalo

class Mokepon{
    constructor(nombre, imagen, vidas){
    this.nombre = nombre,
    this.imagen = imagen,
    this.vidas = vidas
    this.ataques = []
    this.x = 20 //se agregan atributos de tamannio del mokepon
    this.y = 30
    this.ancho = 80
    this.alto = 80
    this.mapaFoto = new Image()
    this.mapaFoto.src = imagen
    this.velocidadX = 0
    this.velocidadY = 0
    }
}

let perrito = new Mokepon("Perrito","./assets/mokepons_mokepon_hipodoge_attack.png", 3)
let gatito = new Mokepon("Gatito", "./assets/mokepons_mokepon_capipepo_attack.png", 3)
let ratilla = new Mokepon("Ratilla", "./assets/mokepons_mokepon_ratigueya_attack.png" ,3)

let listaDeAtaques = ["Agua", "Fuego", "Tierra"]

mokepones.push(perrito, gatito, ratilla)

perrito.ataques.push(
    {nombre : "💧",  id : "boton-agua"},
    {nombre : "💧",  id : "boton-agua"},
    {nombre : "💧",  id : "boton-agua"},
    {nombre : "🌱", id : "boton-tierra"},
    {nombre : "🔥",  id : "boton-fuego"},  
)
gatito.ataques.push(
    {nombre : "🌱",  id : "boton-tierra"},
    {nombre : "🌱",  id : "boton-tierra"},
    {nombre : "🌱",  id : "boton-tierra"},
    {nombre : "💧",  id : "boton-agua"},
    {nombre : "🔥",  id : "boton-fuego"},  
)
ratilla.ataques.push(
    {nombre : "🔥",  id : "boton-fuego"},
    {nombre : "🔥",  id : "boton-fuego"},
    {nombre : "🔥",  id : "boton-fuego"},
    {nombre : "💧",  id : "boton-agua"},
    {nombre : "🌱",  id : "boton-tierra"},  
)

function aleatorio (min, max){return Math.floor(Math.random()*(max - min +1) + min)
}

function iniciarJuego() {
    sectionVerMapa.style.display = "none"//canva
    sectionSeleccionarAtaque.style.display = "none"
    ocultarReiniciar.style.display = "none"

    mokepones.forEach((mokepon) => {opcionDeMokepones =`
    <input  type="radio" name="mascota" id= ${mokepon.nombre} />
        <label class = "tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.imagen} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

       input1 = document.getElementById(mokepones[0].nombre)//esto se pegaba del id "Perrito" hay que verificar si funciona asi 
       input2 = document.getElementById(mokepones[1].nombre)
       input3 = document.getElementById(mokepones[2].nombre)
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReinciar.addEventListener("click", reiniciarJuego);   
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = "none"

   // sectionSeleccionarAtaque.style.display = "flex"
   
   sectionVerMapa.style.display = "flex"//canva
   
  iniciarMapa()
    
    // posible forma de eliminar el switch
    // function uwu(coso){
    //     if(coso.checked){
    //         spanMascotaJugador.innerHTML = coso.id
    //         mascotaJugador = coso.id
    //     }
    //     eval(document.querySelector('input[name="mascota"]:checked')).id
    // }
    
    switch (true){
        case input1.checked:
            spanMascotaJugador.innerHTML = input1.id
            mascotaJugador = input1.id       
            break;
        case input2.checked:
            spanMascotaJugador.innerHTML = input2.id
            mascotaJugador = input2.id       
            break;
        case input3.checked:
            spanMascotaJugador.innerHTML = input3.id
            mascotaJugador = input3.id
            break;
        default:
            alert("Selecciona una mascota")
            reiniciarJuego()
    }
    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function iniciarMapa(){
    mapa.width =800
    mapa.height = 600
    intervalo = setInterval(pintarPersonaje, 50)
     window.addEventListener("keydown", presionTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function pintarPersonaje(){ //seagrega funcion que muestre personaje seleccionado en pantalla
    gatito.x = gatito.x + gatito.velocidadX
    gatito.y = gatito.y + gatito.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        gatito.mapaFoto,
        gatito.x,
        gatito.y,
        gatito.ancho,
        gatito.alto
        )
}

function moverArriba(){
    gatito.velocidadY = -5
    
}
function moverDerecha(){
    gatito.velocidadX = + 5
   
}
function moverAbajo(){
    gatito.velocidadY = + 5
    
}
function moverIzquierda(){
    gatito.velocidadX = - 5
}

function detenerMovimiento(){//se usa para parar el movimiento cuando se suelte el click
    gatito.velocidadX = 0
    gatito.velocidadY = 0
}

function presionTecla(e){
    switch (e.key) {
        case "w":
            moverArriba()
            break;
        case "s":
            moverAbajo()
            break;
        case "a":
            moverIzquierda()
            break;
         case "d":
            moverDerecha()
            break;
        default:
            break;
    }
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre)[
            ataques = mokepones[i].ataques
        ]  
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon

    })
        fuego = document.getElementById("boton-fuego");
        agua = document.getElementById("boton-agua");
        tierra = document.getElementById("boton-tierra")       
        botones = document.querySelectorAll('.BAtaque')
       
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                boton.style.display = "none"
                
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                boton.style.display = "none"
               
            } else {
                ataqueJugador.push('TIERRA')        
                boton.style.display = "none"
            
            }
            ataqueAleatorioEnemigo()
        })
    })
    
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1)
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    mascotaEnemigo = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(){ // esto esta mal planteado
    //podria arreglarse utilizando tecnicas de DRY
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)
  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push ("FUEGO")
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push ("AGUA")
  } else if (ataqueAleatorio == 2 || ataqueAleatorio == 5) {
    ataqueEnemigo.push("TIERRA")
  }
    iniciarPelea()
}

function iniciarPelea(){
    if (ataqueJugador.length === 5){
        combate()
    }
}

function indexOponentes(jugador,enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){ 
    let resultadoCombate
    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueEnemigo [i]){
            indexOponentes(i,i)
            resultadoCombate = "Empate"
            
        }else if((ataqueJugador[i] == "FUEGO"  && ataqueEnemigo[i] == "TIERRA" )||(ataqueJugador[i] == "AGUA" && ataqueEnemigo[i] == "FUEGO" )||(ataqueJugador[i] == "TIERRA"  && ataqueEnemigo[i] == "AGUA" )){
            indexOponentes(i,i)
            resultadoCombate = "Ganaste"
            victoriasJugador ++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if((ataqueJugador[i] == "TIERRA"  && ataqueEnemigo[i] == "FUEGO" )||(ataqueJugador[i] == "FUEGO" && ataqueEnemigo[i] == "AGUA" )||(ataqueJugador[i] == "AGUA"  && ataqueEnemigo[i] == "TIERRA" )){
            indexOponentes(i,i)
            resultadoCombate = "Perdiste"
            victoriasEnemigo ++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
          
        }
        crearMensaje(resultadoCombate);
    }   
    
    revisarVidas()
}

function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")
    
    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function revisarVidas(){
    if (victoriasJugador == victoriasEnemigo){
        crearMensajeFinal(`Tu ${mascotaJugador} y ${mascotaEnemigo} del enemigo han empatado!`)
        
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal(`${mascotaEnemigo} del enemigo ya no puede mas. \nGanaste el campeonato`)
    }
    else if(victoriasJugador < victoriasEnemigo){
        crearMensajeFinal(`Tu ${mascotaJugador} ya no puede mas. \nPerdiste el campeonato `)
    }
}

function crearMensajeFinal(resultadoFinal){
    ocultarReiniciar.style.display = "block"
    sectionMensajes.innerHTML = resultadoFinal
}

function reiniciarJuego(){
    location.reload()
}

window.addEventListener('load', iniciarJuego)
