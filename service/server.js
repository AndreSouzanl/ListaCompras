const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

// conecta o MogoDB
mongoose.connect("mongodb+srv://devsouza:80584195als2%40@cluster0.o0qm3.mongodb.net/produtosDB?retryWrites=true&w=majority=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Conectado ao MongoDB com sucesso!");
}).catch((error) => {
  console.error("Erro ao conectar ao MongoDB:", error);
});

// Defina o schema e modelo do produto
const produtoSchema = new mongoose.Schema({
  nomeProduto: { type: String, required: true },
  quantidadeProduto: { type: Number, required: true },
  unidade: { type: String, required: true },
});

const Produto = mongoose.model("Produto", produtoSchema);

// Rota para adicionar um produto
app.post("/produtos", async (req, res) => {
  try {
    const novoProduto = new Produto(req.body);
    await novoProduto.save();
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ message: "Erro ao adicionar produto", error });
  }
});

// Rota para listar todos os produtos
app.get("/produtos", async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos', error });
  }
});

// Rota para editar um produto
app.put("/produtos/:id", async (req, res) => {
  try {
    const produtoAtualizado = await Produto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(produtoAtualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar produto', error });
  }
});


// Rota para excluir um produto
app.delete("/produtos/:id", async (req, res) => {
  try {
    await Produto.findByIdAndDelete(req.params.id);
    res.json({ message: "Produto excluído com sucesso!" });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao excluir produto', error });
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
