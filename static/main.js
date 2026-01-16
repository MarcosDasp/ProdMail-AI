emailText =document.getElementById('textAreaEmail').value

async function analisarEmail() {
    // consultar na api
    await fetch('http://127.0.0.1:5000/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: emailText
        })
    }) 
    .then(response => response.json())
    .then(data => {
        const produtividade = data.category;
        const sugestaoResposta = data.suggested_reply;

            if (produtividade === 'produtivo') {
                document.getElementById('cardProdutivo').style.display = 'block';
                document.getElementById('cardImprodutivo').style.display = 'none';
            } else {
                document.getElementById('cardProdutivo').style.display = 'none';
                document.getElementById('cardImprodutivo').style.display = 'block';
            }

            document.getElementById('inputRespostaIA').value = sugestaoResposta;
    });

    document.getElementById('secaoResultadoAnalise').style.display = 'block';
    document.getElementById('secaoResultadoAnalise').scrollIntoView({ behavior: 'smooth' });
 }

window.onbeforeunload = function() {
    return "Tem certeza que deseja recarregar a página? Os resultados serão perdidos.";
};

function copiarRespostaIA() {
    var respostaIA = document.getElementById('inputRespostaIA');
    respostaIA.select();
    respostaIA.setSelectionRange(0, 99999);
    document.execCommand('copy');

    var botaoCopiar = document.getElementById('btn-copy');
    botaoCopiar.innerHTML = '<i class="bi bi-clipboard-check"></i> Copiado!';
    setTimeout(function() {
        botaoCopiar.innerHTML = '<i class="bi bi-clipboard"></i> Copiar resposta';
    }, 2000);

}