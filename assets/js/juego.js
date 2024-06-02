/**
 * 2C = 2 of clubs    (trebol)
 * 2D = 2 of diamonds (diamantes)
 * 2H = 2 of hearts   (corazones)
 * 2S = 2 of spades   (espadas)
 */

let deck         = [];                      /** Mazo de cartas */
const tipos      = ['C', 'D', 'H', 'S'];    /** Arreglo de tipos de cartas "trebol, diamantes, corazones, espadas" */
const especiales = ['A', 'J', 'Q', 'K'];    /** Arreglo de las cartas que no son numeros A, J, Q, K */

let puntosJugador = 0,
     puntosComputadora = 0;


// Referencias del html
const btnPedir   = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevoJuego = document.querySelector('#btnNuevoJuego');
 

const divCartaJugador     = document.querySelector('#jugador-carta')
const divCartaComputadora = document.querySelector('#computadora-carta')

const puntosHtml = document.querySelectorAll('small')



const crearDeck = () => {                   /** Este for nos crea las cartas de numeros iterando desde el 2 al 10 */
    for ( let i =  2; i <=10; i++ ) {
        for ( let tipo of tipos) {
           deck.push( i + tipo );           /** Incertamos con push al deck "mazo de cartas" */
        }                             
    }
    for ( let tipo of tipos) {              /** Este for nos crea la cartas de letras usando el arreglo especial */
        for ( let esp of especiales) {
            deck.push( esp + tipo );        /** El segundo for dentro dell for nos 
                                            suma lo que  es el arreglo tipos  */         
        }
    }
    // console.log ( deck );                /** Deck ordenado */
    deck = _.shuffle( deck );               
    // console.log ( deck );
    return deck;                            /** Se usa el shuffle de la 
                                            libreria underscore.js "devuelve un arreglo desordenado" */

}
crearDeck();

/**  Esta funcion me permite pedir cartas */

const pedirCarta = () => {

    if ( deck.length === 0 ) {
        throw 'No hay mas cartas';
    }
    const carta = deck.pop();
    // console.log ( deck );
    
    // console.log( carta );
    return carta
}

// pedirCarta();

/**
const valorCarta =( carta ) => {

    const valor = carta.substring(0, carta.length - 1);
    let puntos = 0;

    if ( isNaN( valor )) {
        console.log('No es un numero');
        puntos = ( valor === 'A' ) ? 11 : 10; 

    } else {
        console.log('Es un numero');
        puntos = valor * 1;
    }
    console.log(puntos);
}
valorCarta('KD');               */


const valorCarta = ( carta ) => {

     const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor )) ?
            (valor === 'A' ) ? 11 : 10
            : valor *  1;
}
const valor = valorCarta( pedirCarta() );
// console.log( { valor });

// Turno computadora 
const turnoComputadora = ( puntosMinimos) => {

    do {
        const carta = pedirCarta();
        
        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHtml[1].innerText = puntosComputadora;
        
        // <img class="carta" src="assets/cartas/grey_back.png" alt=""></img>
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`
        imgCarta.classList.add('carta');
        divCartaComputadora.append( imgCarta );

        if ( puntosMinimos > 21 ) {
            break;
        }

    } while ( (puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21) );

    setTimeout(() => {
        if ( puntosJugador === puntosComputadora) {
            alert('Nadie Gana ');
        } else if ( puntosMinimos > 21 ) {
            alert('Computadora Gana')       
        } else if (puntosComputadora > 21 ) {
            alert('Jugador Gana');        
        } else {
            alert('Computadora Gana')
        }
    }, 200 );
}




// EVENTOS | creacion e incertar elementos en el DOM 

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHtml[0].innerText = puntosJugador;
    
    // <img class="carta" src="assets/cartas/grey_back.png" alt=""></img>
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`
    imgCarta.classList.add('carta');
    divCartaJugador.append( imgCarta );

    if (puntosJugador > 21) {
        console.warn("perdiste");
        btnPedir.disabled   =  true;            /** .disabled = funcion para bloquear el boton */
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
         
    } else if ( puntosJugador === 21 ) {
        console.warn("21 genial");            /** .disabled = funcion para bloquear el boton */
        btnPedir.disabled   =  true;
        btnDetener.disabled = true;
        turnoComputadora ( puntosJugador );
    }
})

btnDetener.addEventListener('click', () => {

    btnPedir.disabled   = true;
    btnDetener.disabled = true;
    
    turnoComputadora( puntosJugador );
}) 

btnNuevoJuego.addEventListener('click',() => {

    console.clear()

    deck = [];
    deck = crearDeck();

    puntosJugador     = 0;
    puntosComputadora = 0;

    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText = 0;

    divCartaJugador.innerText     = '';
    divCartaComputadora.innerText = '';

    btnPedir.disabled   = false;
    btnDetener.disabled = false;

})


