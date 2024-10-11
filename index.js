
let pratoSelecionado = null;
let bebidaSelecionada = null;
let sobremesaSelecionada = null;


function selecionarItem(elemento, categoria) {

  const jaSelecionado = elemento.classList.contains('selecionado');

  
  const itens = document.querySelectorAll(`#${categoria} .item`);


  if (jaSelecionado) {
    elemento.classList.remove('selecionado');


    if (categoria === 'prato') {
      pratoSelecionado = null;
    } else if (categoria === 'bebida') {
      bebidaSelecionada = null;
    } else if (categoria === 'sobremesa') {
      sobremesaSelecionada = null;
    }
  } else {

    itens.forEach(item => item.classList.remove('selecionado'));


    elemento.classList.add('selecionado');

    if (categoria === 'prato') {
      pratoSelecionado = elemento;
    } else if (categoria === 'bebida') {
      bebidaSelecionada = elemento;
    } else if (categoria === 'sobremesa') {
      sobremesaSelecionada = elemento;
    }
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
      const precoPrato = pratoSelecionado.querySelector('.preco').innerText;

      const bebida = bebidaSelecionada.querySelector('.nome').innerText;
      const precoBebida = bebidaSelecionada.querySelector('.preco').innerText;

      const sobremesa = sobremesaSelecionada.querySelector('.nome').innerText;
      const precoSobremesa = sobremesaSelecionada.querySelector('.preco').innerText;

      const total = (parseFloat(precoPrato) + parseFloat(precoBebida) + parseFloat(precoSobremesa)).toFixed(2);


      pedidoDetalhes.innerHTML = `
        ${prato}: R$ ${precoPrato}<br>
        ${bebida}: R$ ${precoBebida}<br>
        ${sobremesa}: R$ ${precoSobremesa}
      `;
      totalPreco.innerHTML = `Total: R$ ${total}`;

      overlay.style.display = 'flex'; 
  }
});


function cancelarPedido() {
  document.getElementById('overlay').style.display = 'none';
}