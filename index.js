let pratoSelecionado = null;
let bebidaSelecionada = null;
let sobremesaSelecionada = null;

function selecionarItem(elemento, categoria) {
  const itens = document.querySelectorAll(`#${categoria} .item`);
  itens.forEach(item => item.classList.remove('selecionado'));



  elemento.classList.add('selecionado');

  if (categoria === 'prato') {
    pratoSelecionado = elemento;
  } else if (categoria === 'bebida') {
    bebidaSelecionada = elemento;
  } else if (categoria === 'sobremesa') {
    sobremesaSelecionada = elemento;
  }

  verificarSelecao();
}

function verificarSelecao() {
  const botaoFechar = document.getElementById('fechar-pedido');
  if (pratoSelecionado && bebidaSelecionada && sobremesaSelecionada) {
    botaoFechar.classList.add('habilitado');  
    botaoFechar.disabled = false;  
  } else {
    botaoFechar.classList.remove('habilitado'); 
    botaoFechar.disabled = true;        
  }
}

document.getElementById('fechar-pedido').addEventListener('click', function() {
  if (!this.disabled) {
    const overlay = document.getElementById('overlay');
    const pedidoDetalhes = document.getElementById('pedido-detalhes');
    const totalPreco = document.getElementById('total-preco');

    const prato = pratoSelecionado.querySelector('.nome').innerText;
    const bebida = bebidaSelecionada.querySelector('.nome').innerText;
    const sobremesa = sobremesaSelecionada.querySelector('.nome').innerText;

    const precoPrato = parseFloat(pratoSelecionado.querySelector('.preco').innerText);
    const precoBebida = parseFloat(bebidaSelecionada.querySelector('.preco').innerText);
    const precoSobremesa = parseFloat(sobremesaSelecionada.querySelector('.preco').innerText);

    const total = (precoPrato + precoBebida + precoSobremesa).toFixed(2);

    pedidoDetalhes.innerHTML = `
      Prato: ${prato}<br>
      Bebida: ${bebida}<br>
      Sobremesa: ${sobremesa}
    `;
    totalPreco.innerText = `TOTAL: R$ ${total}`;

    overlay.style.display = 'flex';
  }
});


function cancelarPedido() {
  document.getElementById('overlay').style.display = 'none';
}

