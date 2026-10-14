const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const quizContainer = document.getElementById("quiz-container");

const btnOuvir = document.getElementById("btn-ouvir");
const btnCarregarNoticia = document.getElementById("btn-carregar-noticia");
const btnProximo = document.getElementById("btn-proximo");
const containerIframe = document.getElementById("container-iframe");
const formDdg = document.getElementById("form-ddg");
const queryDdg = document.getElementById("query-ddg");

// Perguntas baseadas em reportagens reais da web (G1, GZH, Exame, etc)
const perguntas = [
    {
        enunciado: "Quem criou os famosos livros de colorir 'Bobbie Goods' e onde foram criados?",
        alternativas: [
            "Foram criados pela ilustradora Abbie Goveia, na Califórnia (EUA).",
            "Surgiram no Japão desenvolvidos por um estúdio de mangás."
        ],
        respostaCorreta: 0,
        explicacao: "Conforme reportagens do GZH e da Exame, o Bobbie Goods foi criado pela ilustradora norte-americana Abbie Goveia, de 28 anos, na Califórnia. Ela começou os desenhos em 2021 registrando o cotidiano e virou um fenômeno global.",
        termoBusca: "Abbie Goveia criadora Bobbie Goods historia"
    },
    {
        enunciado: "Por que os livros de colorir Bobbie Goods são associados à saúde mental nas notícias?",
        alternativas: [
            "Servem apenas como passatempo infantil.",
            "Ajudam no alívio da ansiedade, estresse e auxiliam no detox de telas digitais."
        ],
        respostaCorreta: 1,
        explicacao: "Segundo matérias do G1 e O Liberal, os livros de colorir estimulam a atenção plena e ativam a área de relaxamento do cérebro, funcionando como terapia para aliviar o estresse diário e o vício em telas.",
        termoBusca: "Bobbie Goods livros colorir saude mental ansiedade G1"
    },
    {
        enunciado: "Qual material é mais indicado para pintar as páginas e qual cuidado tomar?",
        alternativas: [
            "Marcadores a base de álcool, colocando uma folha protetora por baixo.",
            "Tinta guache diluída com pincel de água."
        ],
        respostaCorreta: 0,
        explicacao: "Notícias e tutoriais do TikTok recomendam marcadores à base de álcool para uma cor uniforme. Como a tinta atravessa a folha, é essencial usar uma folha solta ou plástico por baixo para não manchar a ilustração seguinte.",
        termoBusca: "dicas como pintar Bobbie Goods marcadores papel protetor"
    }
];

let posicaoAtual = 0;
let perguntaAtual;

function mostraPergunta() {
    if (posicaoAtual >= perguntas.length) {
        exibeFimQuiz();
        return;
    }
    
    caixaResultado.classList.add("escondido");
    containerIframe.classList.add("escondido");
    quizContainer.classList.remove("escondido");
    caixaAlternativas.innerHTML = "";
    
    window.speechSynthesis.cancel();

    perguntaAtual = perguntas[posicaoAtual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;

    perguntaAtual.alternativas.forEach((alternativa, index) => {
        const botao = document.createElement("button");
        botao.textContent = alternativa;
        botao.classList.add("btn-3d");
        botao.addEventListener("click", () => selecionaAlternativa(index));
        caixaAlternativas.appendChild(botao);
    });
}

function selecionaAlternativa(indexSelecionado) {
    quizContainer.classList.add("escondido");
    caixaResultado.classList.remove("escondido");

    let status = indexSelecionado === perguntaAtual.respostaCorreta 
        ? "<strong>✨ Resposta Correta!</strong><br><br>" 
        : "<strong>❌ Resposta Incorreta!</strong><br><br>";

    textoResultado.innerHTML = status + perguntaAtual.explicacao;
}

// Executa a busca no DuckDuckGo diretamente no iFrame embutido da página
btnCarregarNoticia.addEventListener("click", () => {
    queryDdg.value = perguntaAtual.termoBusca;
    containerIframe.classList.remove("escondido");
    formDdg.submit();
});

// Leitura de Voz I.A (Web Speech API)
btnOuvir.addEventListener("click", () => {
    window.speechSynthesis.cancel();

    const textoParaLer = textoResultado.innerText;
    const utterance = new SpeechSynthesisUtterance(textoParaLer);
    utterance.lang = "pt-BR";
    utterance.rate = 1.0;

    window.speechSynthesis.speak(utterance);
});

btnProximo.addEventListener("click", () => {
    posicaoAtual++;
    mostraPergunta();
});

function exibeFimQuiz() {
    quizContainer.classList.add("escondido");
    caixaResultado.classList.remove("escondido");
    containerIframe.classList.add("escondido");
    
    textoResultado.innerHTML = "<strong>🎉 Quiz Concluído!</strong><br>Você aprendeu tudo sobre o universo Bobbie Goods com pesquisas ao vivo na web.";
    
    btnOuvir.classList.add("escondido");
    btnCarregarNoticia.classList.add("escondido");
    
    btnProximo.textContent = "Reiniciar Quiz 🔄";
    btnProximo.onclick = () => {
        posicaoAtual = 0;
        btnOuvir.classList.remove("escondido");
        btnCarregarNoticia.classList.remove("escondido");
        btnProximo.onclick = null;
        mostraPergunta();
    };
}

mostraPergunta();
