// ===== MAIN APPLICATION =====
// Controls the entire quiz flow: screens, state, scoring, and navigation

// ----- APPLICATION STATE -----
const state = {
    currentQuestionIndex: 0,
    selectedCategory: 'all',
    activeQuestions: [],
    answers: [],
    score: 0,
    quizStartTime: null
};

// ----- HELPER: Show one screen, hide all others -----
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

// ===== AUTH SCREEN SETUP =====
document.getElementById('login-tab').addEventListener('click', () => {
    document.getElementById('login-tab').classList.add('active');
    document.getElementById('signup-tab').classList.remove('active');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('signup-form').classList.add('hidden');
});

document.getElementById('signup-tab').addEventListener('click', () => {
    document.getElementById('signup-tab').classList.add('active');
    document.getElementById('login-tab').classList.remove('active');
    document.getElementById('signup-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
});

// Login form submission
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const result = Auth.login(email, password);

    if (result.success) {
        showCategoryScreen();
    } else {
        document.getElementById('login-error').textContent = result.message;
    }
});

// Signup form submission
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const result = Auth.signup(name, email, password);

    if (result.success) {
        showCategoryScreen();
    } else {
        document.getElementById('signup-error').textContent = result.message;
    }
});

// ===== CATEGORY SCREEN =====
function showCategoryScreen() {
    const user = Auth.getCurrentUser();
    document.getElementById('category-welcome').textContent =
        `Welcome, ${user.name}! Pick a category to begin.`;
    showScreen('category-screen');
}

// Category card clicks
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        startQuiz(category);
    });
});

// Category logout button
document.getElementById('category-logout-btn').addEventListener('click', () => {
    Auth.logout();
    showScreen('auth-screen');
});

// ===== START QUIZ =====
function startQuiz(category) {
    state.selectedCategory = category;

    // Filter questions by category (or use all)
    if (category === 'all') {
        state.activeQuestions = [...questions];
    } else {
        state.activeQuestions = questions.filter(q => q.category === category);
    }

    // Shuffle questions
    state.activeQuestions.sort(() => Math.random() - 0.5);

    // Reset state
    state.currentQuestionIndex = 0;
    state.answers = new Array(state.activeQuestions.length).fill(null);
    state.score = 0;
    state.quizStartTime = Date.now();

    // Set up user display
    const user = Auth.getCurrentUser();
    document.getElementById('user-display').textContent = `Welcome, ${user.name}`;

    // Show quiz screen and load first question
    showScreen('quiz-screen');
    loadQuestion();
}

// ===== LOAD A QUESTION =====
function loadQuestion() {
    const index = state.currentQuestionIndex;
    const total = state.activeQuestions.length;
    const q = state.activeQuestions[index];

    // Update progress
    document.getElementById('progress-bar').style.setProperty(
        '--progress', ((index + 1) / total * 100) + '%'
    );
    document.getElementById('progress-text').textContent = `${index + 1}/${total}`;

    // Show category label
    document.getElementById('question-category').textContent =
        `Category: ${q.category.toUpperCase()}`;

    // Show question text
    document.getElementById('question-text').textContent = q.question;

    // Build option buttons
    const container = document.getElementById('options-container');
    container.innerHTML = '';

    q.options.forEach((option, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;

        // If user already answered this question, show their selection
        if (state.answers[index] !== null) {
            if (i === state.answers[index].selected) {
                btn.classList.add('selected');
            }
            btn.classList.add('disabled');
        }

        btn.addEventListener('click', () => selectOption(i));
        container.appendChild(btn);
    });

    // Handle navigation buttons
    document.getElementById('prev-btn').disabled = (index === 0);

    if (index === total - 1) {
        document.getElementById('next-btn').classList.add('hidden');
        document.getElementById('submit-btn').classList.remove('hidden');
    } else {
        document.getElementById('next-btn').classList.remove('hidden');
        document.getElementById('submit-btn').classList.add('hidden');
    }

    // Start timer (only if question hasn't been answered yet)
    if (state.answers[index] === null) {
        Timer.start(
            (timeLeft) => {
                document.getElementById('timer-text').textContent = timeLeft;
            },
            () => handleTimeUp()
        );
    } else {
        Timer.stop();
        document.getElementById('timer-text').textContent = '-';
    }
}

// ===== SELECT AN OPTION =====
function selectOption(optionIndex) {
    const index = state.currentQuestionIndex;

    // Don't allow re-answering
    if (state.answers[index] !== null) return;

    const q = state.activeQuestions[index];
    const isCorrect = (optionIndex === q.correct);
    const timeTaken = Timer.getElapsed();

    // Stop timer
    Timer.stop();

    // Save answer
    state.answers[index] = {
        selected: optionIndex,
        correct: isCorrect,
        timeTaken: timeTaken
    };

    // Visual feedback
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, i) => {
        btn.classList.add('disabled');
        if (i === q.correct) btn.classList.add('correct');
        if (i === optionIndex && !isCorrect) btn.classList.add('wrong');
    });

    // Calculate score: base 10 + time bonus (up to 10)
    if (isCorrect) {
        const timeBonus = Math.max(0, Math.round((1 - timeTaken / 30) * 10));
        state.score += 10 + timeBonus;
    }
}

// ===== TIME UP =====
function handleTimeUp() {
    const index = state.currentQuestionIndex;

    if (state.answers[index] === null) {
        state.answers[index] = {
            selected: -1,
            correct: false,
            timeTaken: 30
        };

        // Show correct answer
        const q = state.activeQuestions[index];
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach((btn, i) => {
            btn.classList.add('disabled');
            if (i === q.correct) btn.classList.add('correct');
        });
        if (index < state.activeQuestions.length - 1) {
            state.currentQuestionIndex++;
            loadQuestion();
        } else {
            finishQuiz();
        }
    }
}

// ===== NAVIGATION =====
document.getElementById('next-btn').addEventListener('click', () => {
    if (state.currentQuestionIndex < state.activeQuestions.length - 1) {
        state.currentQuestionIndex++;
        loadQuestion();
    }
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex--;
        loadQuestion();
    }
});

// ===== END QUIZ EARLY =====
document.getElementById('end-quiz-btn').addEventListener('click', () => {
    const confirmed = confirm('Are you sure you want to end the quiz? Unanswered questions will count as incorrect.');
    if (confirmed) {
        Timer.stop();
        finishQuiz();
    }
});

// ===== SUBMIT QUIZ =====
document.getElementById('submit-btn').addEventListener('click', () => {
    Timer.stop();
    finishQuiz();
});

// ===== FINISH & SHOW RESULTS =====
function finishQuiz() {
    const total = state.activeQuestions.length;
    const maxScore = total * 20;

    // Count results
    let correctCount = 0;
    let incorrectCount = 0;
    let unanswered = 0;
    const times = [];

    state.answers.forEach((answer, i) => {
        if (answer === null) {
            unanswered++;
            times.push(0);
        } else if (answer.correct) {
            correctCount++;
            times.push(answer.timeTaken);
        } else {
            incorrectCount++;
            times.push(answer.timeTaken);
        }
    });

    // Display score
    document.getElementById('final-score').textContent = state.score;
    document.getElementById('score-max').textContent = `/ ${maxScore}`;

    // Summary message
    const percentage = Math.round((correctCount / total) * 100);
    let message = '';
    if (percentage >= 80) message = '🏆 Excellent! You really know your stuff!';
    else if (percentage >= 60) message = '👍 Good job! Keep learning!';
    else if (percentage >= 40) message = '📚 Not bad, but there\'s room to improve.';
    else message = '💪 Keep practicing! You\'ll get there!';
    document.getElementById('results-summary').textContent =
        `${correctCount}/${total} correct (${percentage}%) — ${message}`;

    // Create charts
    Charts.createPieChart(correctCount, incorrectCount, unanswered);
    Charts.createBarChart(times);

    // Build answer review
    buildReview();

    // Save to leaderboard
    saveToLeaderboard();

    // Show results screen
    showScreen('results-screen');
}

// ===== BUILD ANSWER REVIEW =====
function buildReview() {
    const container = document.getElementById('review-container');
    // Keep the h3 heading
    container.innerHTML = '<h3>Review Your Answers</h3>';

    state.activeQuestions.forEach((q, i) => {
        const answer = state.answers[i];
        const isCorrect = answer && answer.correct;
        const wasSkipped = !answer || answer.selected === -1;

        const item = document.createElement('div');
        item.className = `review-item ${isCorrect ? 'correct' : 'wrong'}`;

        item.innerHTML = `
            <div class="review-question">
                <span class="review-number">Q${i + 1}</span>
                <span class="review-status">${isCorrect ? '✅' : wasSkipped ? '⏭️' : '❌'}</span>
            </div>
            <p class="review-text">${q.question}</p>
            <p class="review-answer">Your answer: ${wasSkipped ? 'Skipped' : q.options[answer.selected]}</p>
            <p class="review-correct">Correct answer: ${q.options[q.correct]}</p>
            <p class="review-time">Time: ${answer ? answer.timeTaken : 0}s</p>
        `;

        container.appendChild(item);
    });
}

// ===== LEADERBOARD =====
function saveToLeaderboard() {
    const user = Auth.getCurrentUser();
    const entry = {
        name: user.name,
        score: state.score,
        category: state.selectedCategory,
        date: new Date().toLocaleDateString()
    };

    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    leaderboard.push(entry);
    leaderboard.sort((a, b) => b.score - a.score);

    // Keep top 10
    const top10 = leaderboard.slice(0, 10);
    localStorage.setItem('leaderboard', JSON.stringify(top10));

    // Display
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = '';

    top10.forEach((entry, i) => {
        const li = document.createElement('li');
        li.className = 'leaderboard-item';
        li.innerHTML = `
            <span class="rank">${i + 1}</span>
            <span class="name">${entry.name}</span>
            <span class="score">${entry.score}</span>
        `;
        list.appendChild(li);
    });
}

// ===== RETRY / HOME BUTTONS =====
document.getElementById('retry-btn').addEventListener('click', () => {
    startQuiz(state.selectedCategory);
});

document.getElementById('home-btn').addEventListener('click', () => {
    showCategoryScreen();
});

// ===== ON PAGE LOAD: CHECK IF USER IS LOGGED IN =====
(function init() {
    const user = Auth.getCurrentUser();
    if (user) {
        showCategoryScreen();
    } else {
        showScreen('auth-screen');
    }
})();
