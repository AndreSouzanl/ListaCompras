const itemProduto = [];
const numeroCelular = "+5531984055730";

document
  .getElementById("adicionarProduto")
  .addEventListener("click", function () {
    const nomeProduto = document.getElementById("nomeProduto").value;
    const quantidadeProduto =
      document.getElementById("quantidadeProduto").value;

    if (nomeProduto === " " || quantidadeProduto === " ") {
      alert("Por Favor ! Preencha todos os campos");
      return;
    }

    const itensProduto = {
      nomeProduto: nomeProduto,
      quantidadeProduto: quantidadeProduto,
    };

    itemProduto.push(itensProduto);

   const tabela = document
      .getElementById("ProdutosCadastrados")
      .getElementsByTagName("tbody")[0];

    // Cria uma nova linha (tr)
    const novaLinha = tabela.insertRow();

    // Cria células (td) para a linha
    const celularProduto = novaLinha.insertCell(0);
    const celulaQuantidade = novaLinha.insertCell(1);

    // Define o conteúdo das células com os valores inseridos
    celularProduto.textContent = nomeProduto;
    celulaQuantidade.textContent = quantidadeProduto;

    document.getElementById("nomeProduto").value = " ";
    document.getElementById("quantidadeProduto").value = " ";
  });

function EnviarWhattapp() {
  
  if (itemProduto.length === 0) {
    alert("Nenhum produto cadastrado para enviar no WhatsApp.");
    return;
  }

  let mensagem = "Lista de Produtos:\n";

  for (let i = 0; i < itemProduto.length; i++) {
    mensagem += ` Produto: ${itemProduto[i].nomeProduto},Quantidade: ${itemProduto[i].quantidadeProduto}\n`;
  }

  const numeroWhatsApp = numeroCelular;

  // Encode a mensagem para que seja uma URL válida
  mensagem = encodeURIComponent(mensagem);

  // Crie o link WhatsApp com o número de telefone e a mensagem
  const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

  window.open(linkWhatsApp, "_blank");
}

const botaoEnviar = document.getElementById("botaoEnviar");
botaoEnviar.addEventListener("click", EnviarWhattapp);
