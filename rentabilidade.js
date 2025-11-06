document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rentabilityForm');
    const resultTable = document.getElementById('resultTable');
    const resultBody = document.getElementById('resultBody');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const route = document.getElementById('route').value;
      const revenue = parseFloat(document.getElementById('revenue').value);
      const fuelCost = parseFloat(document.getElementById('fuelCost').value);
      const taxes = parseFloat(document.getElementById('taxes').value);
  
      const totalCosts = fuelCost + taxes;
      const profit = revenue - totalCosts;
      const profitability = ((profit / revenue) * 100).toFixed(2);
  
      // Cria a linha do resultado
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${route}</td>
        <td>R$ ${revenue.toFixed(2)}</td>
        <td>R$ ${totalCosts.toFixed(2)}</td>
        <td class="${profit >= 0 ? 'positive' : 'negative'}">R$ ${profit.toFixed(2)}</td>
        <td class="${profitability >= 0 ? 'positive' : 'negative'}">${profitability}%</td>
      `;
  
      // Adiciona a linha à tabela
      resultBody.innerHTML = ''; // limpa resultados anteriores
      resultBody.appendChild(tr);
      resultTable.style.display = 'table';
    });
  });
  
