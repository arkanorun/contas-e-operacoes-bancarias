let { dadosBancariosParaArray, dadosBancariosParaJson, encontrarConta } = require('../utils/manipularArquivos')
const caminhoConta = 'src/bancoDeDados/dadosBancarios.Json'
let usuario = dadosBancariosParaArray(caminhoConta)
let { contas, depositos, saques, transferencias } = usuario


const listarContas = (req, res) => {
    return res.json(contas)
}

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
    let numero = 1

    if (contas.length > 0) {
        numero = Number(contas[contas.length - 1].numero) + 1
    }

    contas.push({
        numero: String(numero),
        saldo: 0,
        usuario: {
            nome, cpf: String(cpf), data_nascimento, telefone: String(telefone), email,
            senha: String(senha)
        }
    })

    dadosBancariosParaJson(caminhoConta, usuario)
    return res.status(201).json(contas[contas.length - 1])
}

const atualizarConta = (req, res) => {

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
    const { numeroConta } = req.params

    const buscaConta = encontrarConta(numeroConta, contas)


    if (nome) {
        buscaConta.usuario.nome = nome
    }
    if (cpf) {
        buscaConta.usuario.cpf = String(cpf)
    }
    if (data_nascimento) {
        buscaConta.usuario.data_nascimento = String(data_nascimento)
    }
    if (telefone) {
        buscaConta.usuario.telefone = String(telefone)
    }
    if (email) {
        buscaConta.usuario.email = email
    }
    if (senha) {
        buscaConta.usuario.senha = String(senha)
    }
    dadosBancariosParaJson(caminhoConta, usuario)
    return res.status(201).json({ mensagem: "conta atualizada com sucesso!" })
}

const excluirConta = (req, res) => {
    const { numeroConta } = req.params
    const encontraNumero = contas.findIndex((elemento) => {
        return Number(elemento.numero) === Number(numeroConta)
    })

    contas.splice(encontraNumero, 1)

    dadosBancariosParaJson(caminhoConta, usuario)

    return res.json({ mensagem: "conta excluída com sucesso!" })
}

const saldo = (req, res) => {
    const { numero_conta } = req.query
    const buscaConta = encontrarConta(numero_conta, contas)

    return res.json({ saldo: buscaConta.saldo })

}

const extrato = (req, res) => {
    const { numero_conta } = req.query

    const buscaDepositos = depositos.filter((elemento) => {
        return elemento.numero_conta === numero_conta
    })

    const buscasaques = saques.filter((elemento) => {
        return elemento.numero_conta === numero_conta
    })

    const buscatransferenciasEnviadas = transferencias.filter((elemento) => {
        return elemento.numero_conta_origem === numero_conta
    })

    const buscatransferenciasRecebidas = transferencias.filter((elemento) => {
        return elemento.numero_conta_destino === numero_conta
    })

    return res.json({
        depositos: buscaDepositos,
        saques: buscasaques,
        transferenciasEnviadas: buscatransferenciasEnviadas,
        transferenciasRecebidas: buscatransferenciasRecebidas
    })
}


module.exports = { listarContas, criarConta, atualizarConta, excluirConta, saldo, extrato }