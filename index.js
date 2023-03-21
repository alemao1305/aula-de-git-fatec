// run `node index.js` in the terminal
const express = require("express");
const app = express();
const { WebhookClient } = require("dialogflow-fulfillment");
const bodyParser = require("body-parser");
const axios = require("axios");
const { request } = require("http");
const { response } = require("express");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extende: true,
  })
);

//FUNÇÃO PARA INSERIR ID ÚNICO
function uniqueID() {
  function char4() {
    return Math.random().toString(16).slice(-6);
  }
  return char4();
}

app.use(express.static("public"));
app.get("/", (request, response) => {
  response.send("CET Glitch para Dialogflow");
});

app.post("/webhook", function (request, response) {
  const agent = new WebhookClient({ request: request, response: response });

  //FUNÇÃO PARA PUXAR HORÁRIO
  let date = new Date();
  let data = date.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "numeric",
    hour12: false,
  });

  //FUNÇÃO DE SALDAÇÃO AVANÇADA
  function welcome(agent) {
    if (data >= 8 && data <= 11)
      agent.add(
        `Oi 👨‍💻 Bom dia! /n/nOlá seja Bem vindo ao atendimento online da CETQual o seu nome?/n/n[1] /n[2]/n[3]/n[4]${""}`
      );
    else if (data >= 12 && data <= 17)
      agent.add(
        `Oi 👨‍💻 Boa tarde! /n/nOlá seja Bem vindo ao atendimento online da CETQual o seu nome?/n/n[1] /n[2]/n[3]/n[4]${""}`
      );
    else
      agent.add(
        `Oi 👨‍💻 Boa noite! /n/nOlá seja Bem vindo ao atendimento online da CET Qual o seu nome?/n/n[1] /n[2]/n[3]/n[4]${""}`
      );
  }

  //CADASTRO DE CLIENTE
  function cadastro(agent) {
    const { nome, telefone, email } = agent.parameters;
    const data = [
      {
        Nome: nome,
        Telefone: telefone,
        Email: email,
        ID: uniqueID(),
      },
    ];
    axios.post(
      "https://sheet.best/api/sheets/8ccd9ca9-8f60-4708-88e2-a394d9517b69",
      data
    );
    agent.add(``);
    agent.add("" + "/n"`/n`);
  }

  //MAPEAMENTO DAS INTENTS DO DIALOGFLOW
  let intentMap = Map();
  //DESNTRO DAS ASPAS VAI O NOME DA INTENT E DEPOIS DA VIRGULA A FUNÇÃO
  intentMap.set("desk", welcome);
  intentMap.set("desk - yes", cadastro);
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
