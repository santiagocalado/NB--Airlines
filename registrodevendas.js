// 1. Dados Iniciais Simulados (Opcional: Você pode carregar isso de uma API real)
const funcionarios = [
    { id: 'f01', nome: 'Ana Silva' },
    { id: 'f02', nome: 'Bruno Costa' },
    { id: 'f03', nome: 'Carlos Mendes' }
];

const produtos = [
    { id: 'p01', nome: 'Notebook Gamer', preco: 4500.00 },
    { id: 'p02', nome: 'Mouse Sem Fio', preco: 120.00 },
    { id: 'p03', nome: 'Monitor UltraWide', preco: 1800.00 },
    { id: 'p04', nome: 'Teclado Mecânico', preco: 350.00 }
];

// Array para armazenar todas as vendas registradas
let vendas = [];

// 2. Elementos DOM
const formVenda = document.getElementById('formVenda');
const selectFuncionario = document.getElementById('funcionarioVenda');
const selectProduto = document.getElementById('produtoVenda');
const inputQuantidade = document.getElementById('quantidadeVenda');
const listaVendasUL = document.getElementById('listaVendas');

// 3. Função para preencher os Selects (Dropdowns)
function preencherSelects() {
    // Preenche Funcionários
    funcionarios.forEach(f => {
        const option = document.createElement('option');
        option.value = f.id;
        option.textContent = f.nome;
        selectFuncionario.appendChild(option);
    });

    // Preenche Produtos
    produtos.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        // Exibe o nome e o preço (formatado) no dropdown
        option.textContent = `${p.nome} - R$ ${p.preco.toFixed(2).replace('.', ',')}`;
        // Armazena o preço como um atributo data para fácil acesso
        option.dataset.preco = p.preco; 
        selectProduto.appendChild(option);
    });
}

// 4. Função para exibir as vendas na lista (UL)
function exibirVendas() {
    // Limpa a lista atual
    listaVendasUL.innerHTML = ''; 

    vendas.forEach((venda, index) => {
        // Encontra o nome do funcionário e do produto para exibir
        const nomeFuncionario = funcionarios.find(f => f.id === venda.funcionarioId)?.nome || 'Desconhecido';
        const nomeProduto = produtos.find(p => p.id === venda.produtoId)?.nome || 'Desconhecido';
        
        // Calcula o total da venda
        const totalVenda = venda.quantidade * venda.precoUnitario;
        const totalFormatado = totalVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const li = document.createElement('li');
        // Adiciona classes Bootstrap para estilização
        li.className = 'list-group-item d-flex justify-content-between align-items-center'; 
        
        li.innerHTML = `
            <div>
                <strong>${nomeProduto}</strong> (${venda.quantidade} un.)
                <span class="d-block text-muted">Vendedor: ${nomeFuncionario}</span>
            </div>
            <span class="badge bg-success rounded-pill">${totalFormatado}</span>
        `;
        
        listaVendasUL.appendChild(li);
    });
}

// 5. Função para lidar com o envio do formulário
function registrarVenda(event) {
    // Impede o recarregamento da página
    event.preventDefault(); 

    const funcionarioId = selectFuncionario.value;
    const produtoId = selectProduto.value;
    const quantidade = parseInt(inputQuantidade.value); // Converte para número inteiro

    // Validação básica
    if (!funcionarioId || !produtoId || quantidade <= 0) {
        alert('Por favor, selecione um funcionário, um produto e uma quantidade válida.');
        return;
    }

    // Pega o preço unitário do atributo 'data-preco' do option selecionado
    const selectedOption = selectProduto.options[selectProduto.selectedIndex];
    const precoUnitario = parseFloat(selectedOption.dataset.preco);

    // Cria o objeto da nova venda
    const novaVenda = {
        funcionarioId,
        produtoId,
        quantidade,
        precoUnitario,
        data: new Date().toISOString()
    };

    // Adiciona a venda ao array
    vendas.push(novaVenda);

    // Atualiza a exibição da lista
    exibirVendas();

    // Limpa o formulário
    formVenda.reset(); 
    
    // Opcional: Log no console para verificar
    console.log('Venda Registrada:', novaVenda);
    console.log('Todas as Vendas:', vendas);
}


// 6. Configuração dos Event Listeners (Execução inicial)

// Roda a função para preencher os selects assim que a página carregar
preencherSelects(); 

// Adiciona o listener para o envio do formulário
formVenda.addEventListener('submit', registrarVenda);

// Inicializa a lista (no início, estará vazia)
exibirVendas();
