const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');

let itemProduto = JSON.parse(localStorage.getItem("produtos")) || [];
let modoEdicao = false;
let itemEditandoIndex = null;

document.getElementById("adicionarProduto").addEventListener("click", function () {
  const nomeProduto = document.getElementById("nomeProduto").value;
  const quantidade = document.getElementById("quantidadeProduto").value;
  const unidade = document.getElementById("unidadeMedida").value;

  if (nomeProduto.trim() === "" || quantidade.trim() === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const produto = {
    nomeProduto,
    quantidadeProduto: quantidade,
    unidade,
  };

  if (modoEdicao) {
    itemProduto[itemEditandoIndex] = produto;
    modoEdicao = false;
    itemEditandoIndex = null;
  } else {
    itemProduto.push(produto);
  }

  // Salvar no localStorage
  localStorage.setItem("produtos", JSON.stringify(itemProduto));

  document.getElementById("nomeProduto").value = "";
  document.getElementById("quantidadeProduto").value = "";
  document.getElementById("unidadeMedida").value = "";

  atualizarTabela();
});

function carregarProdutos() {
  itemProduto = JSON.parse(localStorage.getItem("produtos")) || [];
  itemProduto.sort((a, b) => a.nomeProduto.localeCompare(b.nomeProduto));
  atualizarTabela();
}

function editarItem(index) {
  const item = itemProduto[index];
  document.getElementById("nomeProduto").value = item.nomeProduto;
  document.getElementById("quantidadeProduto").value = item.quantidadeProduto;
  document.getElementById("unidadeMedida").value = item.unidade;
  modoEdicao = true;
  itemEditandoIndex = index;
}

function excluirItem(index) {
  itemProduto.splice(index, 1);

  // Atualizar no localStorage
  localStorage.setItem("produtos", JSON.stringify(itemProduto));

  atualizarTabela();
}

function atualizarTabela() {
  const tabela = document.getElementById("ProdutosCadastrados");
  const tbody = tabela.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  itemProduto.forEach((item, i) => {
    const novaLinha = tbody.insertRow();
    const celularProduto = novaLinha.insertCell(0);
    const celulaQuantidade = novaLinha.insertCell(1);
    const acoes = novaLinha.insertCell(2);

    celularProduto.textContent = item.nomeProduto;
    celulaQuantidade.textContent = `${item.quantidadeProduto} ${item.unidade}`;

    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.classList.add("botao", "editar-botao");
    botaoEditar.innerHTML = '<i class="fas fa-edit"></i>';
    botaoEditar.addEventListener("click", () => editarItem(i));

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.classList.add("botao-red", "excluir-botao");
    botaoExcluir.innerHTML = '<i class="fas fa-trash-alt"></i>';
    botaoExcluir.addEventListener("click", () => excluirItem(i));

    const divAcoes = document.createElement("div");
    divAcoes.classList.add("acao-botao");
    divAcoes.appendChild(botaoEditar);
    divAcoes.appendChild(botaoExcluir);

    acoes.appendChild(divAcoes);
  });
}

window.onload = carregarProdutos;
