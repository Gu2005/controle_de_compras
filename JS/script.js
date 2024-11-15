let saldoDisponivel = 0; // Armazena o saldo disponível
let listaDeProdutos = []; // Lista de produtos que o usuário adicionar

// Função para definir o orçamento inicial
function adicionarValor() {
    const valorAdicionado = document.getElementById("valorAdicionado").value;
    if (valorAdicionado && valorAdicionado > 0) {
        saldoDisponivel = parseFloat(valorAdicionado);
        atualizarSaldo();
    } else {
        alert("Por favor, defina um valor válido para o orçamento.");
    }
}

// Função para adicionar o produto à lista
function adicionarProduto() {
    const nomeProduto = document.getElementById("nomeProduto").value;
    const valorProduto = parseFloat(document.getElementById("valorProduto").value);
    const quantidadeProduto = parseInt(document.getElementById("quantidadeProduto").value);

    if (!nomeProduto || !valorProduto || !quantidadeProduto) {
        alert("Preencha todos os campos.");
        return;
    }

    const produto = {
        nome: nomeProduto,
        valor: valorProduto,
        quantidade: quantidadeProduto,
        total: valorProduto * quantidadeProduto,
        comprado: false // Novo atributo para verificar se o produto foi riscado
    };

    listaDeProdutos.push(produto);
    exibirListaDeCompras();
    limparCampos();
}

// Função para exibir a lista de compras
function exibirListaDeCompras() {
    const listaDeCompras = document.getElementById("listaDeCompras");
    listaDeCompras.innerHTML = ""; // Limpa a lista antes de exibir novamente

    listaDeProdutos.forEach((produto, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.setAttribute("data-index", index);
        
        li.innerHTML = `${produto.nome} - R$ ${produto.total.toFixed(2)} (${produto.quantidade} unidade(s)) 
        <button onclick="removerProduto(${index})" class="btn-remove">Excluir</button>`;

        // Adiciona o evento de riscar/desriscar item
        li.onclick = function() {
            alternarMarcacaoProduto(index);
        };

        if (produto.comprado) {
            li.style.textDecoration = "line-through";
            li.style.color = "gray";
        }

        listaDeCompras.appendChild(li);
    });
}

// Função para alternar entre riscar e desriscar o produto e ajustar o saldo
function alternarMarcacaoProduto(index) {
    const produto = listaDeProdutos[index];

    if (produto.comprado) {
        // Se o produto já estiver riscado, desriscar e adicionar o valor de volta
        produto.comprado = false;
        saldoDisponivel += produto.total; // Restaurar o saldo
    } else {
        // Se o produto não estiver riscado, riscar e descontar do saldo
        produto.comprado = true;
        saldoDisponivel -= produto.total; // Subtrair do saldo
    }

    // Atualizar o saldo na tela
    atualizarSaldo();

    // Exibir a lista de compras novamente
    exibirListaDeCompras();
}

// Função para remover o produto da lista (caso o usuário queira excluir)
function removerProduto(index) {
    listaDeProdutos.splice(index, 1);
    exibirListaDeCompras();
}

// Função para atualizar o saldo na tela
function atualizarSaldo() {
    const saldoElemento = document.getElementById("faltaGastar");
    saldoElemento.innerText = `R$ ${saldoDisponivel.toFixed(2)} Restante`;

    // Alterar a cor do saldo para vermelho se estiver negativo
    if (saldoDisponivel < 0) {
        saldoElemento.style.color = "red";
    } else {
        saldoElemento.style.color = "white";
    }
}

// Função para limpar os campos após adicionar o produto
function limparCampos() {
    document.getElementById("nomeProduto").value = "";
    document.getElementById("valorProduto").value = "";
    document.getElementById("quantidadeProduto").value = "";
}