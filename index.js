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
    botaoFechar.innerText = 'Fechar Pedido'; 
  } else {
    botaoFechar.classList.remove('habilitado');
    botaoFechar.disabled = true;
    botaoFechar.innerText = 'Selecione os 3 itens para fechar o pedido'; 
  }
}

document.getElementById('fechar-pedido').addEventListener('click', function() {
  if (!this.disabled) {
    const overlay = document.getElementById('overlay');
    const pedidoDetalhes = document.getElementById('pedido-detalhes');
    const totalPreco = document.getElementById('total-preco');

    const prato = pratoSelecionado.querySelector('.nome').innerText;
    const precoPrato = pratoSelecionado.querySelector('.preco').innerText.replace('', '').trim();

    const bebida = bebidaSelecionada.querySelector('.nome').innerText;
    const precoBebida = bebidaSelecionada.querySelector('.preco').innerText.replace('', '').trim();

    const sobremesa = sobremesaSelecionada.querySelector('.nome').innerText;
    const precoSobremesa = sobremesaSelecionada.querySelector('.preco').innerText.replace('', '').trim();

    const total = (parseFloat(precoPrato) + parseFloat(precoBebida) + parseFloat(precoSobremesa)).toFixed(2);

    const mensagemPedido = `
  ${prato}: ${precoPrato}<br> <br>
 ${bebida}: ${precoBebida}<br> <br>
 ${sobremesa}: ${precoSobremesa}<br> <br>

    `;

    pedidoDetalhes.innerHTML = mensagemPedido;
    totalPreco.innerHTML = `Total: ${total}`;

    overlay.style.display = 'flex'; 
  }
});

function cancelarPedido() {
  document.getElementById('overlay').style.display = 'none';
}
