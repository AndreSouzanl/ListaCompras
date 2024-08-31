let itemProduto = [];
let modoEdicao = false;
let itemEditandoIndex = null;




document
  .getElementById("adicionarProduto")
  .addEventListener("click", async function () {
    const nomeProduto = document.getElementById("nomeProduto").value;
    const quantidade = document.getElementById("quantidadeProduto").value;
    const unidade = document.getElementById("unidadeMedida").value;

    //   // Adicionar um novo item
    if (nomeProduto.trim() === "" || quantidade.trim() === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const produto = {
      nomeProduto,
      quantidadeProduto: quantidade,
      unidade,
    };

    try {
      if (modoEdicao) {
        await fetch(
          `http://localhost:3000/produtos/${itemProduto[itemEditandoIndex]._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(produto),
          }
        );
        modoEdicao = false;
        itemEditandoIndex = null;
      } else {
        await fetch(`http://localhost:3000/produtos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(produto),
        });
      }

      document.getElementById("nomeProduto").value = "";
      document.getElementById("quantidadeProduto").value = "";
      document.getElementById("unidadeMedida").value = "";

      carregarProdutos();
    } catch (error) {
      console.error("Erro ao adicionar/atualizar produto:", error);
    }
  });

async function carregarProdutos() {
  // try {
    const response = await fetch(`http://localhost:3000/produtos`);
    // if (!response.ok) {
    //   throw new Error("Erro na resposta da rede");
    // }
    itemProduto = await response.json();
    itemProduto.sort((a, b) => a.nomeProduto.localeCompare(b.nomeProduto));
    atualizarTabela();
  // } catch (error) {
  //   console.error("Erro ao carregar produtos:", error);
  // }
}

function editarItem(index) {
  const item = itemProduto[index];
  document.getElementById("nomeProduto").value = item.nomeProduto;
  document.getElementById("quantidadeProduto").value = item.quantidadeProduto;
  document.getElementById("unidadeMedida").value = item.unidade;
  modoEdicao = true;
  itemEditandoIndex = index;
}

async function excluirItem(index) {
  await fetch(`http://localhost:3000/produtos/${itemProduto[index]._id}`, {
    method: "DELETE",
  });
  carregarProdutos();
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
