//exercicio 3

const getRndInterger = (min, max) => {
    return Math.floor((Math.random() * (max - min + 1) + min))
}

const parOuImpar = process.argv[2]

const numero = Number(process.argv[3])

const soma = getRndInterger(0,10) + numero

if(soma % 2 === 0){
    if(parOuImpar == "par"){
        console.log(`Você escolheu par e o computador escolheu impar. O resultado foi ${soma}. Você ganhou!`)
    } else {
        console.log(`Você escolheu impar e o computador escolheu par. O resultado foi ${soma}. Você perdeu!`)
    }
} else {
    if(parOuImpar === "impar"){
        console.log(`Você escolheu impar e o computador escolheu par. O resultado foi ${soma}. Você ganhou!`)
    } else {
        console.log(`Você escolheu par e o computador escolheu impar. O resultado foi ${soma}. Você perdeu!`)
    }
}

