const appContainer = document.getElementById('app-container');

// Jogo do número secreto
function carregarJogoNumeroSecreto() {
  appContainer.innerHTML = `
    <div id="app-jogo" class="app">
      <h1></h1>
      <p></p>
      <input type="number" min="1" max="10">
      <div>
        <button onclick="verificarChute()">Chutar</button>
        <button onclick="reiniciarJogo()" id="reiniciar" disabled>Novo jogo</button>
      </div>
    </div>
  `;
  setupJogo();
}
function setupJogo() {
  let listaDeNumerosSorteados = [];
  let numeroLimite = 10;
  let numeroSecreto = gerarNumeroAleatorio();
  let tentativas = 1;

  window.exibirTextoNaTela = function(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if (typeof responsiveVoice !== 'undefined') {
        responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
    }
  }

  function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
  }

  exibirMensagemInicial();

  window.verificarChute = function() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
      exibirTextoNaTela('h1', 'Acertou!');
      let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
      let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
      exibirTextoNaTela('p', mensagemTentativas);
      document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
      if (chute > numeroSecreto) {
        exibirTextoNaTela('p', 'O número secreto é menor');
      } else {
        exibirTextoNaTela('p', 'O número secreto é maior');
      }
      tentativas++;
      limparCampo();
    }
  }

  function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == numeroLimite) {
      listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
      return gerarNumeroAleatorio();
    } else {
      listaDeNumerosSorteados.push(numeroEscolhido);
      console.log(listaDeNumerosSorteados);
      return numeroEscolhido;
    }
  }

  window.limparCampo = function() {
    let chute = document.querySelector('input');
    chute.value = '';
  }

  window.reiniciarJogo = function() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
  }
}


// Formulário
function carregarFormulario() {
  appContainer.innerHTML = `
    <div id="app-formulario" class="app">
      <h2>Formulário de Cadastro</h2>
      <form id="formulario">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" required>

        <label for="cpf">CPF:</label>
        <input type="text" id="cpf" placeholder="000.000.000-00" required>

        <label for="idade">Idade:</label>
        <input type="number" id="idade" min="0" required> 

        <label for="email">Email:</label>
        <input type="email" id="email" placeholder="seuemail@exemplo.com" required>

        <label for="endereco">Endereço:</label>
        <input type="text" id="endereco" required>

        <button type="submit">Salvar em TXT</button>
      </form>
    </div>
  `;

  setupFormulario();
}

function setupFormulario() {
  document.getElementById("formulario").addEventListener("submit", function (e) {
    e.preventDefault();
    const campos = [
      { id: 'nome', label: 'Nome' },
      { id: 'cpf', label: 'CPF' },
      { id: 'idade', label: 'Idade' },
      { id: 'email', label: 'Email' },
      { id: 'endereco', label: 'Endereço' }
    ];

    const valoresParaSalvar = [];

    for (const campo of campos) {
      const input = document.getElementById(campo.id);
      const valor = input.value.trim();

      if (valor === "") {
        alert(`O campo "${campo.label}" não pode estar vazio.`);
        input.focus(); 
        return; 
      }
      valoresParaSalvar.push(`${campo.label}: ${valor}`);
    }

    const conteudo = valoresParaSalvar.join("\n");

    const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "dados_formulario.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  });
}


// Jogo da média
function carregarJogoDaMedia() {
  appContainer.innerHTML = `
    <div id="app-media" class="app">
      <h2>Calculadora de Média 📊</h2>
      <button onclick="iniciarJogoDaMedia()">Começar Cálculo</button>
    </div>
  `;
}

function iniciarJogoDaMedia() {
  alert("Bem-vindo ao Jogo da Média!");

  let quantidade = prompt("Quantos números você quer usar para o cálculo?");
  quantidade = Number(quantidade);

  if (!quantidade || quantidade <= 0 || isNaN(quantidade)) {
    alert("Quantidade inválida. Tente novamente com um número maior que zero.");
    return; 
  }
  
  let soma = 0;
  for (let i = 1; i <= quantidade; i++) {
    let entrada = prompt(`Digite o ${i}º número:`);

    if (entrada === null) {
        alert("Cálculo cancelado.");
        return;
    }
    
    let numero = Number(entrada.replace(',', '.')); 

    if (entrada.trim() === "" || isNaN(numero)) {
      alert("Valor inválido. Por favor, digite um número.");
      i--; 
      continue;
    }
    soma += numero;
  }
  const media = soma / quantidade;
  alert(`A média calculada entre os ${quantidade} números digitados é: ${media.toFixed(2)}`);
}