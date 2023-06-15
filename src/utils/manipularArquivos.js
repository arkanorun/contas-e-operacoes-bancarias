const fs = require('fs')

const dadosBancariosParaArray = (caminhoArquivo) => {
    let dados = fs.readFileSync(caminhoArquivo)
    let dadosArray = JSON.parse(dados)
    return dadosArray
}

const dadosBancariosParaJson = (caminhoArquivo, array) => {
    let dadosString = JSON.stringify(array)
    fs.writeFileSync(caminhoArquivo, dadosString)
}

const encontrarConta = (numero_conta, contas) => {
    const contaEncontrada = contas.find((elemento) => {
        return Number(elemento.numero) === Number(numero_conta)
    })
    return contaEncontrada
}

module.exports = { dadosBancariosParaArray, dadosBancariosParaJson, encontrarConta }