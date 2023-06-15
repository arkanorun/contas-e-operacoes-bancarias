let { dadosBancariosParaArray, encontrarConta } = require('../utils/manipularArquivos')
const caminhoConta = 'src/bancoDeDados/dadosBancarios.Json'
let usuario = dadosBancariosParaArray(caminhoConta)
let { contas } = usuario

const verificaSenha = (req, res, next) => {
    const { senha } = req.query

    if (!senha) {
        return res.status(404).json({
            mensagem: 'por favor digite a senha'
        })
    } else if (senha !== 'Cubos123Bank') {
        return res.status(400).json({
            mensagem: 'senha incorreta'
        })
    }
    next()
}

const verificaCriar = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome) {
        return res.status(404).json({
            mensagem: 'por favor insira o nome'
        })
    }

    if (!cpf || `${cpf}`.length !== 11) {
        return res.status(404).json({
            mensagem: 'por favor insira um cpf válido'
        })
    }

    const verficaCpf = contas.find((elemento) => {
        return Number(elemento.usuario.cpf) === Number(cpf)
    })

    if (verficaCpf) {
        return res.status(400).json({ mensagem: 'já existe um usuário com o cpf informado' })
    }

    if (!data_nascimento) {
        return res.status(404).json({ mensagem: 'por favor insira a data de nascimento' })
    }

    if (!telefone) {
        return res.status(404).json({ mensagem: 'por favor insira o telefone' })
    }

    if (!email) {
        return res.status(404).json({ mensagem: 'por favor insira o email' })
    } else if ((email.lastIndexOf(".") === email.length - 1) || (email.lastIndexOf(".") ===
        email.length - 1) || (email.indexOf("@") < 0) || (email.indexOf(".") < 0)) {
        return res.status(400).json({ mensagem: 'por favor insira um email válido' })
    }

    const verificaEmail = contas.find((elemento) => { return elemento.usuario.email === email })

    if (verificaEmail) {
        return res.status(400).json({
            mensagem: 'já existe um usuário com o email informado'
        })
    }

    if (!senha) {
        return res.status(404).json({
            mensagem: 'por favor insira uma senha'
        })
    }
    next()
}

const verificaAtualizar = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
    const { numeroConta } = req.params
    const buscaConta = encontrarConta(numeroConta, contas)

    if (!Number(numeroConta)) {
        return res.status(400).json({ mensagem: "numero da conta inválido ou não informado" })
    }
    if (!buscaConta) {
        return res.status(404).json({ mensagem: "não existe usuário com o numero da conta informado" })
    }

    if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
        return res.status(404).json({
            mensagem: "não foram informados dados para atualização da conta"
        })
    }

    const verficaCpf = contas.find((elemento) => {
        return Number(elemento.usuario.cpf) === Number(cpf)
    })

    if (verficaCpf) {
        return res.status(400).json({ mensagem: 'já existe um usuário com o cpf informado' })
    }

    if (cpf && `${cpf}`.length !== 11) {
        return res.status(404).json({
            mensagem: 'por favor insira um cpf válido'
        })
    }

    const verificaEmail = contas.find((elemento) => { return elemento.usuario.email === email })

    if (verificaEmail) {
        return res.status(400).json({ mensagem: 'já existe um usuário com o email informado' })
    }
    next()
}

const verificaExcluir = (req, res, next) => {
    const { numeroConta } = req.params

    const idconta = encontrarConta(numeroConta, contas)

    if (!Number(numeroConta)) {
        return res.status(400).json({ mensagem: "numero da conta inválido ou não informado" })
    }
    if (!idconta) {
        return res.status(404).json({ mensagem: "não existe usuário com o numero da conta informado" })
    }

    if (contas.length === 0) {
        return res.status(400).json({ mensagem: "não existem contas para excluir" })
    }

    if (idconta.saldo > 0) {
        return res.status(400).json({ mensagem: "conta não excluída, saldo maior que 0" })
    }


    next()
}

const verificaSaldo = (req, res, next) => {
    const { numero_conta, senha } = req.query;

    const buscaConta = encontrarConta(numero_conta, contas)

    if (!Number(numero_conta)) {
        return res.status(400).json({ mensagem: "numero da conta inválido ou não informado" })
    }

    if (!buscaConta) {
        return res.status(400).json({ mensagem: "numero da conta não existe" })
    }



    if (!senha) {
        return res.status(404).json({
            mensagem: "senha inválida ou não informada"
        })
    }

    if (senha !== buscaConta.usuario.senha) {
        return res.status(400).json({ mensagem: "senha incorreta, por favor informe a senha correta" })

    }

    next()
}



module.exports = { verificaSenha, verificaAtualizar, verificaCriar, verificaExcluir, verificaSaldo }