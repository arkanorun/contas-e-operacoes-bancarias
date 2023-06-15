const { format } = require('date-fns');
let { dadosBancariosParaArray, dadosBancariosParaJson, encontrarConta } = require('../utils/manipularArquivos')
const caminhoConta = 'src/bancoDeDados/dadosBancarios.Json'
let usuario = dadosBancariosParaArray(caminhoConta)
let { contas, depositos, saques, transferencias } = usuario

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body
    const data = format(new Date(), "dd-MM-yyy HH:mm:ss")

    const buscaConta = encontrarConta(numero_conta, contas)

    buscaConta.saldo = Number(buscaConta.saldo + valor)

    depositos.push({
        data,
        numero_conta: String(numero_conta),
        valor: Number(valor)
    })

    dadosBancariosParaJson(caminhoConta, usuario)

    return res.status(201).json({ mensagem: "Depósito realizado com sucesso!" })
}


const sacar = (req, res) => {
    const { numero_conta, valor } = req.body
    const data = format(new Date(), "dd-MM-yyy HH:mm:ss")

    const buscaConta = encontrarConta(numero_conta, contas)

    buscaConta.saldo = Number(buscaConta.saldo - valor)
    saques.push({
        data,
        numero_conta: String(numero_conta),
        valor: Number(valor)
    })
    dadosBancariosParaJson(caminhoConta, usuario)

    return res.json({ mensagem: "Saque realizado com sucesso!" })
}

const tranferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor } = req.body
    const data = format(new Date(), "dd-MM-yyy HH:mm:ss")

    const buscaContaOrigem = encontrarConta(numero_conta_origem, contas)

    buscaContaOrigem.saldo = Number(buscaContaOrigem.saldo - valor)

    transferencias.push({

        data,
        numero_conta_origem: String(numero_conta_origem),
        numero_conta_destino: String(numero_conta_destino),
        valor: Number(valor)

    })

    const buscaContaDestino = encontrarConta(numero_conta_destino, contas)

    buscaContaDestino.saldo = Number(buscaContaDestino.saldo + valor)

    dadosBancariosParaJson(caminhoConta, usuario)

    return res.json({ mensagem: "Transferência realizada com sucesso!" })
}

module.exports = { depositar, sacar, tranferir }