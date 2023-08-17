# contas-e-operacoes-bancarias

Este projeto feito no vs code (node.js) utilizando a linguagem java script, realiza simulações de operações bancárias diversas através de uma api restfull.  
A persistência dos dados foi feita através utilizando a escrita em arquivos pelo uso da biblioteca utils-playground, os mesmos foram alocados em um arquivo 
chamado banco de dados no vs code os dados foram salvos no formato json.

Banco de Dados:
![image](https://github.com/arkanorun/contas-e-operacoes-bancarias/assets/124944071/68cfb2a1-e0e9-43ab-b00b-2bdcda6816e1)

Para a realização deste projeto formam importadas as seguintes bibliotecas:
date-fns, express, utils-playground e nodemon.

Os endpoins presentes do projeto o prsentes nos arquivos contaBancaria e transações da pasta controladores e suas respectivas funcionalidades são:

listarConta: Lista todas as contas existentes, caso não exista nenhuma enviará um array vazio.

![image](https://github.com/arkanorun/contas-e-operacoes-bancarias/assets/124944071/ee7966cc-1f87-48c4-a802-383a84cbbfe4)

criarConta : Cria uma conta bancária, onde será gerado um número único para identificação da conta (número da conta).

![image](https://github.com/arkanorun/contas-e-operacoes-bancarias/assets/124944071/7ebafe9c-e3d6-4bda-bd26-ade5d31368db)

atualizarConta: Atualiza os dados do usuário de uma conta bancária.

![image](https://github.com/arkanorun/contas-e-operacoes-bancarias/assets/124944071/455f4619-b1ae-4930-86f0-e04f7663c0dc)

excluirConta: Este endpoint irá excluir uma conta bancária existente.

extrato: Listará as transações realizadas de uma conta específica.

![image](https://github.com/arkanorun/contas-e-operacoes-bancarias/assets/124944071/e61f0e50-8c3d-430a-bb5e-d39463fdccd6)

saldo: Vai retornar o saldo de uma conta bancária.

depositar:  Soma o valor do depósito ao saldo de uma conta existente e registrar essa transação no aruivo do banco de dados.

sacar: Faz o saque de um valor em uma conta bancária específica e registrar essa transação.

![image](https://github.com/arkanorun/contas-e-operacoes-bancarias/assets/124944071/6e5bd50a-decb-420b-8f3b-ee76e8a7ca53)

transferir: Realiza a transferência do dinheiro de uma conta bancária para outra e registrar essa transação.

![image](https://github.com/arkanorun/contas-e-operacoes-bancarias/assets/124944071/e6ea83c1-5f22-4acb-af9b-fede256bbf98)

Utilizou-se diversos intermediários na construção dos endpoints apresentados, abaixo seguem uma imagens de alguns deles:

![image](https://github.com/arkanorun/contas-e-operacoes-bancarias/assets/124944071/5da80527-5379-45a0-8937-4977615cfccf)

![image](https://github.com/arkanorun/contas-e-operacoes-bancarias/assets/124944071/394b3f09-9840-4b1b-8e76-4a680d4e0870)

![image](https://github.com/arkanorun/contas-e-operacoes-bancarias/assets/124944071/7007a5d1-e873-4ee3-849e-d8a853bb4744)

![image](https://github.com/arkanorun/contas-e-operacoes-bancarias/assets/124944071/de748939-f2fd-46fe-a332-ee529adaf2ae)











