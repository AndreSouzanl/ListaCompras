    const itemProduto = [];
    const numeroCelular = "+5531984055730";
    let modoEdicao = false;
    let itemEditandoIndex = null;

      document.getElementById("adicionarProduto").addEventListener("click", function () {
        const nomeProduto = document.getElementById("nomeProduto").value;
        const quantidadeProduto =
          document.getElementById("quantidadeProduto").value;

        if (modoEdicao) {
          // Editar o item existente
          itemProduto[itemEditandoIndex].nomeProduto = nomeProduto;
          itemProduto[itemEditandoIndex].quantidadeProduto = quantidadeProduto;
          modoEdicao = false;
          itemEditandoIndex = null;
          atualizarTabela();
        } else {
          // Adicionar um novo item
          if (nomeProduto.trim() === "" || quantidadeProduto.trim() === "") {
            alert("Por favor, preencha todos os campos.");
            return;
          }
          const itensProduto = {
            nomeProduto,
            quantidadeProduto,
          };
          itemProduto.push(itensProduto);
          atualizarTabela();
        }

        document.getElementById("nomeProduto").value = "";
        document.getElementById("quantidadeProduto").value = "";
      });


      function EnviarWhattapp() {
        if (itemProduto.length === 0) {
          alert("Nenhum produto cadastrado para enviar via WhatsApp.");
          return;
        }
  
        let mensagem = "Lista de Produtos:\n";
  
        for (let i = 0; i < itemProduto.length; i++) {
          mensagem += `Produto: ${itemProduto[i].nomeProduto},\nQuantidade: ${itemProduto[i].quantidadeProduto}\n`;
        }
  
        const numeroWhatsApp = numeroCelular;
  
        // Encode a mensagem para que seja uma URL válida
        mensagem = encodeURIComponent(mensagem);
  
        // Crie o link WhatsApp com o número de telefone e a mensagem
        const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
  
        window.open(linkWhatsApp, "_blank");
      }

    

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
        celulaQuantidade.textContent = item.quantidadeProduto;

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
    }

    const botaoEnviar = document.getElementById("botaoEnviar");
    botaoEnviar.addEventListener("click", EnviarWhattapp);