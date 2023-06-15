let { dadosBancariosParaArray, encontrarConta } = require('../utils/manipularArquivos')
const caminhoConta = 'src/bancoDeDados/dadosBancarios.Json'
let usuario = dadosBancariosParaArray(caminhoConta)
let { contas } = usuario

const verificaDeposito = (req, res, next) => {
    const { numero_conta, valor } = req.body
    const buscaConta = encontrarConta(numero_conta, contas)

    if (valor <= 0) {
        return res.status(400).json({ mensagem: "deposito não realizado, insira um valor maior que 0" })
    }

    if (!valor || !numero_conta) {
        return res.status(404).json({ mensagem: "informe o número da conta e o valor a ser depositado" })
    }

    if (!Number(numero_conta)) {
        return res.status(400).json({ mensagem: "numero da conta inválido ou não informado" })
    }
    if (!Number(valor)) {
        return res.status(400).json({ mensagem: "valor inválido ou não informado" })
    }

    if (!buscaConta) {
        return res.status(404).json({ mensagem: "não existe usuário com o numero da conta informado" })
    }

    next()
}

const verificaSaque = (req, res, next) => {
    const { numero_conta, valor } = req.body
    const buscaConta = encontrarConta(numero_conta, contas)

    if (Number(valor) <= 0) {
        return res.status(400).json({ mensagem: "saque não realizado, insira um valor maior que 0" })
    }

    if (!valor || !numero_conta) {
        return res.status(404).json({ mensagem: "informe o número da conta e o valor a ser sacado" })
    }

    if (!Number(numero_conta)) {
        return res.status(400).json({ mensagem: "numero da conta inválido ou não informado" })
    }

    if (!Number(valor)) {
        return res.status(400).json({ mensagem: "valor inválido ou não informado" })
    }

    if (!buscaConta) {
        res.status(404).json({ mensagem: "não existe usuário com o numero da conta informado" })
    }

    if (buscaConta.saldo - valor < 0) {
        return res.status(400).json({ mensagem: "saldo insuficiente para realizar o saque" })
    }
    next()
}

const verificaTransferir = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino, senha, valor } = req.body

    const buscaContaOrigem = encontrarConta(numero_conta_origem, contas)

    const buscaContaDestino = encontrarConta(numero_conta_destino, contas)

    if (Number(valor) <= 0) {
        return res.status(400).json({
            mensagem: "transferencia não realizado, insira um valor maior que 0"
        })
    }

    if (!valor || !numero_conta_origem || !numero_conta_destino || !senha) {
        return res.status(404).json({
            mensagem: "informe o número das contas de origem e destino, senha e o valor a ser transferido"
        })
    }

    if (!Number(numero_conta_origem)) {

        return res.status(400).json({ mensagem: "numero da conta de origem inválido ou não informado" })
    }

    if (!Number(numero_conta_destino)) {

        return res.status(400).json({ mensagem: "numero da conta de destino inválido ou não informado" })
    }

    if (!Number(valor)) {
        return res.status(400).json({ mensagem: "valor inválido ou não informado" })
    }

    if (!buscaContaOrigem || !buscaContaDestino) {
        return res.status(404).json({ mensagem: "numero da conta de destino inexistente" })
    }

    if (!buscaContaDestino || !buscaContaOrigem) {
        res.status(404).json({ mensagem: "numero da conta de origem inexistente" })
    }

    if (buscaContaOrigem.saldo - valor < 0) {
        return res.status(400).json({ mensagem: "saldo insuficiente para realizar a transferencia" })
    }

    if (buscaContaOrigem.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "senha incorreta, por favor informe a senha correta" })
    }

    if (Number(numero_conta_destino) === Number(numero_conta_origem)) {
        return res.status(400).json({
            mensagem: "a conta de destino não pode ser igual a conta de origem"
        })
    }
    next()
}




module.exports = { verificaDeposito, verificaSaque, verificaTransferir }