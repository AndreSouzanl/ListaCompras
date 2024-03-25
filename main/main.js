let itemProduto = [];
let modoEdicao = false;
let itemEditandoIndex = null;

// Carregar dados do localStorage no início
const dadosArmazenados = localStorage.getItem('produtos');

if (dadosArmazenados) {
  // Se houver dados armazenados, converte de JSON para o formato de objeto JavaScript
  itemProduto = JSON.parse(dadosArmazenados);
  atualizarTabela();
}

document
  .getElementById("adicionarProduto")
  .addEventListener("click", function () {
    const nomeProduto = document.getElementById("nomeProduto").value;
    const quantidade =
      document.getElementById("quantidadeProduto").value;
    const unidade = document.getElementById("unidadeMedida").value
    
    if (modoEdicao) {
      // Editar o item existente
      itemProduto[itemEditandoIndex].nomeProduto = nomeProduto;
      itemProduto[itemEditandoIndex].quantidadeProduto = quantidade;
      itemProduto[itemEditandoIndex].unidade = unidade
      modoEdicao = false;
      itemEditandoIndex = null;
      atualizarTabela(itemProduto);
    } else {
      // Adicionar um novo item
      if (nomeProduto.trim() === "" || quantidade.trim() === "") {
        alert("Por favor, preencha todos os campos.");
        return;
      }
      const itensProduto = {
        nomeProduto,
        quantidadeProduto: quantidade,
        unidade
      };
      itemProduto.push(itensProduto);
      itemProduto.sort((a, b) => a.nomeProduto.localeCompare(b.nomeProduto));
      atualizarTabela();
    }
     
    document.getElementById("nomeProduto").value = "";
    document.getElementById("quantidadeProduto").value = "";
    document.getElementById("unidadeMedida").value = "";
  });

// function EnviarWhattapp() {
//   if (itemProduto.length === 0) {
//     alert("Nenhum produto cadastrado para enviar via WhatsApp.");
//     return;
//   }

//   let mensagem = "Lista de Produtos:\n";

//   for (let i = 0; i < itemProduto.length; i++) {
//     mensagem += `Produto: ${itemProduto[i].nomeProduto},\nQuantidade: ${itemProduto[i].quantidadeProduto}\n`;
//   }

//   const numeroWhatsApp = numeroCelular;

//   // Encode a mensagem para que seja uma URL válida
//   mensagem = encodeURIComponent(mensagem);

//   // Crie o link WhatsApp com o número de telefone e a mensagem
//   const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

//   window.open(linkWhatsApp, "_blank");
// }

function editarItem(index) {
  const item = itemProduto[index];
  document.getElementById("nomeProduto").value = item.nomeProduto;
  document.getElementById("quantidadeProduto").value = item.quantidadeProduto;
  modoEdicao = true;
  itemEditandoIndex = index;
}

function excluirItem(index) {
  itemProduto.splice(index, 1);
  atualizarTabela();
}

function atualizarTabela() {
  const tabela = document.getElementById("ProdutosCadastrados");
  const tbody = tabela.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  for (let i = 0; i < itemProduto.length; i++) {
    const item = itemProduto[i];
    const novaLinha = tbody.insertRow();
    const celularProduto = novaLinha.insertCell(0);
    const celulaQuantidade = novaLinha.insertCell(1);
    const acoes = novaLinha.insertCell(2);
    celularProduto.textContent = item.nomeProduto;
    celulaQuantidade.textContent = `${item.quantidadeProduto} ${item.unidade}`; // Concatena quantidade e unidade em uma única string
   
    


    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.classList.add("botao", "editar-botao");
    botaoEditar.addEventListener("click", () => editarItem(i));

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.classList.add("botao-red", "excluir-botao");
    botaoExcluir.addEventListener("click", () => excluirItem(i));

    const divAcoes = document.createElement("div");
    divAcoes.classList.add("acao-botao");
    divAcoes.appendChild(botaoEditar);
    divAcoes.appendChild(botaoExcluir);

    acoes.appendChild(divAcoes);
  }

  // Adicione a chamada para atualizarLocalStorage() ao final da função
  atualizarLocalStorage();
 
}

const botaoEnviar = document.getElementById("botaoEnviar");
botaoEnviar.addEventListener("click", EnviarWhattapp);

// Nova função para atualizar o localStorage
function atualizarLocalStorage() {
  // Converte o array de itens para JSON e armazena no localStorage
  localStorage.setItem('produtos', JSON.stringify(itemProduto));
}
