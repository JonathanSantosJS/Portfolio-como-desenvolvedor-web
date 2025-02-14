const questions = [
    {
        question: "Com que frequência você consome alimentos processados ou fast food?",
        answers: ["Diariamente", "Algumas vezes por semana", "Raramente", "Nunca"],
        category: "alimentacao"
    },
    {
        question: "Você inclui frutas e vegetais frescos em suas refeições diárias?",
        answers: ["Nunca", "Raramente", "Algumas vezes por semana", "Diariamente"],
        category: "alimentacao"
    },
    {
        question: "Quantos copos de água você bebe por dia?",
        answers: ["Menos de 4", "4-6", "7-9", "10 ou mais"],
        category: "hidratacao"
    },
    {
        question: "Com que frequência você pratica exercícios físicos?",
        answers: ["Nunca", "Menos de 2 vezes por semana", "2-4 vezes por semana", "Mais de 4 vezes por semana"],
        category: "exercicio"
    },
    {
        question: "Quantas horas de sono você tem, em média, por noite?",
        answers: ["Menos de 5 horas", "5-6 horas", "7-8 horas", "Mais de 8 horas"],
        category: "sono"
    },
    {
        question: "Como você classificaria seu nível de estresse diário?",
        answers: ["Muito alto", "Alto", "Moderado", "Baixo"],
        category: "estresse"
    },
    {
        question: "Você consome bebidas alcoólicas com que frequência?",
        answers: ["Diariamente", "Algumas vezes por semana", "Raramente", "Nunca"],
        category: "habitos"
    },
    {
        question: "Você fuma ou utiliza produtos de tabaco?",
        answers: ["Sim, diariamente", "Sim, ocasionalmente", "Não, mas já fumei no passado", "Nunca"],
        category: "habitos"
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
    userAnswers.push({
        category: questions[currentQuestion].category,
        score: answerIndex
    });
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
}

function analyzeResponses() {
    const categoryScores = {
        alimentacao: 0,
        hidratacao: 0,
        exercicio: 0,
        sono: 0,
        estresse: 0,
        habitos: 0
    };
    
    userAnswers.forEach(answer => {
        categoryScores[answer.category] += answer.score;
    });
    
    return categoryScores;
}

function showResult() {
    document.getElementById('quiz-card').classList.remove('active');
    document.getElementById('result-card').classList.add('active');
    
    const scores = analyzeResponses();
    const resultContent = document.getElementById('result-content');
    
    let feedback = "<h3>Análise Personalizada da Sua Fertilidade</h3>";
    
    // Alimentação
    if (scores.alimentacao <= 2) {
        feedback += "<p>🍎 <strong>Alimentação:</strong> Seus hábitos alimentares precisam de atenção. Considere aumentar o consumo de alimentos frescos e reduzir processados para melhorar sua fertilidade.</p>";
    } else if (scores.alimentacao <= 4) {
        feedback += "<p>🍎 <strong>Alimentação:</strong> Sua alimentação está no caminho certo, mas ainda há espaço para melhorias. Tente incluir mais alimentos ricos em antioxidantes.</p>";
    } else {
        feedback += "<p>🍎 <strong>Alimentação:</strong> Excelentes escolhas alimentares! Continue mantendo uma dieta rica em nutrientes essenciais para a fertilidade.</p>";
    }

    // Hidratação
    if (scores.hidratacao <= 1) {
        feedback += "<p>💧 <strong>Hidratação:</strong> Você precisa aumentar significativamente seu consumo de água. A hidratação adequada é crucial para a saúde reprodutiva.</p>";
    } else if (scores.hidratacao <= 2) {
        feedback += "<p>💧 <strong>Hidratação:</strong> Sua hidratação está razoável, mas aumentar o consumo de água pode trazer benefícios adicionais.</p>";
    } else {
        feedback += "<p>💧 <strong>Hidratação:</strong> Ótimo nível de hidratação! Continue mantendo este hábito saudável.</p>";
    }

    // Exercícios
    if (scores.exercicio <= 1) {
        feedback += "<p>🏃‍♀️ <strong>Atividade Física:</strong> Considere incluir mais exercícios em sua rotina. Atividades moderadas podem melhorar significativamente sua fertilidade.</p>";
    } else {
        feedback += "<p>🏃‍♀️ <strong>Atividade Física:</strong> Seu nível de atividade física está contribuindo positivamente para sua saúde reprodutiva!</p>";
    }

    // Sono
    if (scores.sono <= 2) {
        feedback += "<p>😴 <strong>Qualidade do Sono:</strong> Seu padrão de sono pode estar afetando sua fertilidade. Tente estabelecer uma rotina mais regular de sono.</p>";
    } else {
        feedback += "<p>😴 <strong>Qualidade do Sono:</strong> Você mantém bons hábitos de sono, o que é excelente para o equilíbrio hormonal.</p>";
    }

    // Estresse
    if (scores.estresse <= 1) {
        feedback += "<p>🧘‍♀️ <strong>Nível de Estresse:</strong> Altos níveis de estresse podem impactar negativamente sua fertilidade. Considere técnicas de relaxamento e meditação.</p>";
    } else {
        feedback += "<p>🧘‍♀️ <strong>Nível de Estresse:</strong> Você está lidando bem com o estresse, continue mantendo este equilíbrio.</p>";
    }

    // Hábitos
    if (scores.habitos <= 4) {
        feedback += "<p>⚠️ <strong>Hábitos Gerais:</strong> Alguns de seus hábitos podem estar impactando sua fertilidade. Considere fazer mudanças graduais para um estilo de vida mais saudável.</p>";
    } else {
        feedback += "<p>✨ <strong>Hábitos Gerais:</strong> Seus hábitos de vida estão alinhados com uma boa saúde reprodutiva!</p>";
    }

    feedback += "<p class='summary'><strong>Próximos Passos:</strong> Com base em sua análise, recomendamos fortemente conhecer o Método Você Mais Fértil para potencializar ainda mais seus resultados.</p>";

    resultContent.innerHTML = feedback;
}

function calculateScore() {
    return userAnswers.reduce((total, answer) => total + answer.score, 0);
}