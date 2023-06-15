const { Router } = require('express')
const contas = require("../controladores/contaBancaria")
const transacoes = require('../controladores/transacoes')
const { verificaSenha } = require('../intermediarios/verificaConta')
const { verificaCriar } = require('../intermediarios/verificaConta')
const { verificaAtualizar } = require('../intermediarios/verificaConta')
const { verificaExcluir } = require('../intermediarios/verificaConta')
const { verificaDeposito } = require('../intermediarios/verificaTrasacoes')
const { verificaSaque } = require('../intermediarios/verificaTrasacoes')
const { verificaTransferir } = require('../intermediarios/verificaTrasacoes')
const { verificaSaldo } = require('../intermediarios/verificaConta')
const rotas = Router()

rotas.get('/contas', verificaSenha, contas.listarContas)

rotas.post('/contas', verificaCriar, contas.criarConta)

rotas.put('/contas/:numeroConta/usuario', verificaAtualizar, contas.atualizarConta)

rotas.delete('/contas/:numeroConta', verificaExcluir, contas.excluirConta)

rotas.post('/transacoes/depositar', verificaDeposito, transacoes.depositar)

rotas.post('/transacoes/sacar', verificaSaque, transacoes.sacar)

rotas.post('/transacoes/transferir', verificaTransferir, transacoes.tranferir)

rotas.get('/contas/saldo', verificaSaldo, contas.saldo)

rotas.get('/contas/extrato', verificaSaldo, contas.extrato)

module.exports = rotas 