const questions = [
    {
        question: "1️⃣ Você já tentou engravidar e não conseguiu?",
        answers: [
            "Sim, há mais de um ano",
            "Sim, há alguns meses",
            "Ainda não tentei, mas quero me preparar"
        ]
    },
    {
        question: "2️⃣ Seu ciclo menstrual costuma ser irregular?",
        answers: [
            "Sim, frequentemente",
            "Às vezes, mas nunca investiguei a fundo",
            "Não, meu ciclo é regulado"
        ]
    },
    {
        question: "3️⃣ Como você avalia sua alimentação?",
        answers: [
            "Muito saudável, focada em nutrientes essenciais",
            "Razoável, mas sem um foco específico",
            "Preciso melhorar bastante"
        ]
    },
    {
        question: "4️⃣ Você já usou suplementos para melhorar a fertilidade?",
        answers: [
            "Sim, sob orientação profissional",
            "Já ouvi falar, mas não sei quais são os melhores",
            "Não, nunca considerei isso"
        ]
    },
    {
        question: "5️⃣ Você sente sintomas como fadiga, inchaço ou dificuldade em perder peso?",
        answers: [
            "Sim, com frequência",
            "Às vezes, mas não me incomoda tanto",
            "Não, me sinto bem e com energia"
        ]
    },
    {
        question: "6️⃣ Você acredita que sua saúde emocional pode estar afetando sua fertilidade?",
        answers: [
            "Sim, sinto que o estresse e ansiedade me afetam",
            "Talvez, mas nunca pensei muito nisso",
            "Não, acho que não tem relação"
        ]
    }
];

let currentQuestion = 0;
let userAnswers = [];

function startQuiz() {
    document.getElementById('welcome-card').classList.remove('active');
    document.getElementById('quiz-card').classList.add('active');
    showQuestion();
}

function showQuestion() {
    const questionEl = document.getElementById('question');
    const answersEl = document.getElementById('answers');
    const progressEl = document.getElementById('progress');
    
    questionEl.textContent = questions[currentQuestion].question;
    answersEl.innerHTML = '';
    
    questions[currentQuestion].answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.onclick = () => selectAnswer(index);
        answersEl.appendChild(button);
    });
    
    progressEl.style.width = `${(currentQuestion / questions.length) * 100}%`;
}

function selectAnswer(answerIndex) {
    userAnswers.push(answerIndex);
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-card').classList.remove('active');
    document.getElementById('result-card').classList.add('active');
    
    const resultContent = document.getElementById('result-content');
    const positiveAnswers = userAnswers.filter(answer => answer === 0).length;
    
    let message = '';
    if (positiveAnswers >= 4) {
        message = "Parabéns! Você já está no caminho certo, mas pode potencializar ainda mais suas chances de engravidar com um método estruturado e seguro!";
    } else if (positiveAnswers >= 2) {
        message = "Você está buscando informações, mas pode estar deixando de lado estratégias essenciais. O segredo para engravidar pode estar nos detalhes que ainda não aplicou!";
    } else {
        message = "Seu corpo pode não estar totalmente preparado para uma gestação saudável. Mas não se preocupe! Com os ajustes certos, você pode aumentar suas chances naturalmente.";
    }
    
    resultContent.innerHTML = `
        <p class="result-message">${message}</p>
        <p class="result-tip">✨ Com o Método Você Mais Fértil, você terá acesso a estratégias comprovadas para aumentar sua fertilidade naturalmente!</p>
    `;
}
