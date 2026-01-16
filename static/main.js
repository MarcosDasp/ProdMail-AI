async function analisarEmail() {
    // consultar na api
    await fetch('http://127.0.0.1:5000/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: document.getElementById('emailTextArea').value
        })
    }) 
    .then(response => response.json())
    .then(data => {
        const produtividade = data.category;
        const sugestaoResposta = data.suggested_reply;

        console.log(produtividade);
        console.log(sugestaoResposta);

            if (produtividade === 'Produtivo') {
                document.getElementById('cardProductive').style.display = 'block';
                document.getElementById('cardUnproductive').style.display = 'none';
            } else {
                document.getElementById('cardProductive').style.display = 'none';
                document.getElementById('cardUnproductive').style.display = 'block';
            }

            document.getElementById('responseIA').value = sugestaoResposta;
    });

    document.getElementById('sectionAnalysisResult').style.display = 'block';
    document.getElementById('sectionAnalysisResult').scrollIntoView({ behavior: 'smooth' });
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