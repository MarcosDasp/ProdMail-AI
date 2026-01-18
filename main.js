const cardUnproductive = document.getElementById('cardUnproductive');
const cardProductive = document.getElementById('cardProductive');
const cardError = document.getElementById('cardError');
const loadingScreen = document.getElementById('loadingScreen');
const sectionAnalysisResult = document.getElementById('sectionAnalysisResult');
const responseIA = document.getElementById('responseIA');

document.getElementById("emailForm").addEventListener("submit", async (e) => {
e.preventDefault();

sectionAnalysisResult.style.display = 'none';
loadingScreen.style.display = 'block';
cardProductive.style.display = 'none';
cardUnproductive.style.display = 'none';
cardError.style.display = 'none';

const formData = new FormData(e.target);

// Se não tiver arquivo ou texto, mostrar erro dentro do modal

const fileInput = document.getElementById('emailFile');
const textInput = document.getElementById('emailTextArea');
if (fileInput.files.length === 0 && textInput.value.trim() === "") {
    document.getElementById('loadingScreen').style.setProperty('display', 'none', 'important');
    const modalErro = document.getElementById('modalError')
    const modal = new bootstrap.Modal(modalErro);
    const textModal = document.getElementById('modalErrorText');
    textModal.textContent = "Por favor, envie um arquivo ou insira o texto do email.";
    modal.show();
    return;
}

if (fileInput.files.length > 0 && textInput.value.trim() !== "") {
    document.getElementById('loadingScreen').style.setProperty('display', 'none', 'important');
    const modalErro = document.getElementById('modalError')
    const modal = new bootstrap.Modal(modalErro);
    const textModal = document.getElementById('modalErrorText');
    textModal.textContent = "Por favor, envie apenas um arquivo ou insira o texto do email, não ambos.";
    modal.show();
    return;
}


try {
    const response = await fetch("/analyze", {
    method: "POST",
    body: formData
    });

    await response.json().then(data => {
    const produtividade = data.category;
    const sugestaoResposta = data.suggested_reply;

    console.log(produtividade);
    console.log(sugestaoResposta);

    if (produtividade === undefined || sugestaoResposta === undefined) {
        responseIA.value = "Erro: Resposta inválida do servidor. Tente novamente mais tarde.";

        cardError.style.display = 'block';

        loadingScreen.style.setProperty('display', 'none', 'important');
        sectionAnalysisResult.style.display = 'block';
        sectionAnalysisResult.scrollIntoView({ behavior: 'smooth' });   

        throw new Error("Resposta inválida do servidor");
    }

    if (produtividade === 'Produtivo') {
        cardProductive.style.display = 'block';
    } else {
        cardUnproductive.style.display = 'block';
    }

    responseIA.value = sugestaoResposta;
    });

    loadingScreen.style.setProperty('display', 'none', 'important');

    sectionAnalysisResult.style.display = 'block';
    sectionAnalysisResult.scrollIntoView({ behavior: 'smooth' });
    fileInput.value = "";
    textInput.value = "";

} catch (error) {
    console.error("Erro ao analisar o email:", error);
    return
}
});


window.onbeforeunload = function() {
    return "Tem certeza que deseja recarregar a página? Os resultados serão perdidos.";
};

function copiarRespostaIA() {
    var respostaIA = document.getElementById('responseIA');
    respostaIA.select();
    respostaIA.setSelectionRange(0, 99999);
    document.execCommand('copy');

    var botaoCopiar = document.getElementById('btn-copy');
    botaoCopiar.innerHTML = '<i class="bi bi-clipboard-check"></i> Copiado!';
    setTimeout(function() {
        botaoCopiar.innerHTML = '<i class="bi bi-clipboard"></i> Copiar resposta';
    }, 2000);

}