const getRndInterger = (min, max) => {
    return Math.floor((Math.random() * (max - min + 1) + min))
}

const number = getRndInterger(1,3)

const pedraPapelTesoura = process.argv[2]

let escolhaDoCompurador
if(number === 1){
    escolhaDoCompurador = "pedra"
} else if( number === 2){
    escolhaDoCompurador = "papel"
} else {
    escolhaDoCompurador = "tesoura"
}


if((pedraPapelTesoura === "pedra" && escolhaDoCompurador === "tesoura") || 
(pedraPapelTesoura === "papel" && escolhaDoCompurador === "pedra") ||
(pedraPapelTesoura === "tesoura" && escolhaDoCompurador === "pedra")
){
    console.log(`Você escolheu ${pedraPapelTesoura} e o computador escolheu ${escolhaDoCompurador}. Você ganhou!`)
} else if (
(pedraPapelTesoura === "tesoura" && escolhaDoCompurador === "pedra") || 
(pedraPapelTesoura === "pedra" && escolhaDoCompurador === "papel") ||
(pedraPapelTesoura === "pedra" && escolhaDoCompurador === "tesoura")
){
    console.log(`Você escolheu ${pedraPapelTesoura} e o computador escolheu ${escolhaDoCompurador}. Você perdeu!`)
} else {
    console.log(`Você escolheu ${pedraPapelTesoura} e o computador escolheu ${escolhaDoCompurador}. Empate!`)
}