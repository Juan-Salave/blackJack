/**
 * 2C = 2 of clubs    (trebol)
 * 2D = 2 of diamonds (diamantes)
 * 2H = 2 of hearts   (corazones)
 * 2S = 2 of spades   (espadas)
 */

let deck         = [];                      /** Mazo de cartas */
const tipos      = ['C', 'D', 'H', 'S'];    /** Arreglo de tipos de cartas "trebol, diamantes, corazones, espadas" */
const especiales = ['A', 'J', 'Q', 'K'];    /** Arreglo de las cartas que no son numeros A, J, Q, K */

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
    console.log ( deck );
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
    console.log ( deck );
    
    console.log( carta );
    return carta
}

pedirCarta();






