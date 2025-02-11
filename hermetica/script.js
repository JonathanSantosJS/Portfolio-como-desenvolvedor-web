class Quiz {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.initializeElements();
        this.addEventListeners();
    }

    initializeElements() {
        this.startScreen = document.getElementById('start-screen');
        this.questionScreen = document.getElementById('question-screen');
        this.resultsScreen = document.getElementById('results-screen');
        this.questions = document.querySelectorAll('.question');
        this.progressBar = document.querySelector('.progress');
    }

    addEventListeners() {
        document.querySelector('.start-btn').addEventListener('click', () => this.startQuiz());
        
        document.querySelectorAll('.option-btn').forEach(button => {
            button.addEventListener('click', (e) => this.handleAnswer(e));
        });

        document.querySelector('.cta-btn').addEventListener('click', () => {
            window.location.href = 'your-sales-page-url';
        });
    }

    startQuiz() {
        this.startScreen.style.display = 'none';
        this.questionScreen.style.display = 'block';
        this.questions[0].style.display = 'block';
        this.updateProgress();
    }

    handleAnswer(e) {
        this.answers.push(e.target.textContent);
        this.currentQuestion++;
        this.updateProgress();

        if (this.currentQuestion < this.questions.length) {
            this.showNextQuestion();
        } else {
            this.showResults();
        }
    }

    showNextQuestion() {
        this.questions.forEach(q => q.style.display = 'none');
        this.questions[this.currentQuestion].style.display = 'block';
    }

    updateProgress() {
        const progress = (this.currentQuestion / this.questions.length) * 100;
        this.progressBar.style.width = `${progress}%`;
    }

    showResults() {
        this.questionScreen.style.display = 'none';
        this.resultsScreen.style.display = 'block';

        const resultsText = document.getElementById('results-text');
        const recommendation = document.getElementById('personalized-recommendation');

        resultsText.innerHTML = this.generateResultsText();
        recommendation.innerHTML = this.generateRecommendation();
    }

    generateResultsText() {
        return `
            Baseado em suas respostas, identificamos que você está buscando uma transformação profunda em ${this.answers[0].toLowerCase()}.
            Sua jornada até aqui mostra que você está pronto para uma mudança real e duradoura.
        `;
    }

    generateRecommendation() {
        return `
            O curso "Hermética - O poder do Conhecimento Hermetista" foi desenvolvido especialmente para pessoas como você,
            que buscam uma transformação profunda e duradoura. Nossa metodologia única combina sabedoria milenar com técnicas
            modernas comprovadas, proporcionando resultados extraordinários.
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Quiz();
});
