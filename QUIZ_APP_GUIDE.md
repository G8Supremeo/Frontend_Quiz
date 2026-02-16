# Quiz App — Complete Guide

## Build It. Understand It. Master It.

This guide is split into two halves:
- **Part 1 (Sections 1-9):** Complete, working code. Copy each file and run it.
- **Part 2 (Sections 10-13):** Deep-dive explanations of every concept, method, and property used.

**New features in this version:**
- 📂 **Category Selection** — Choose HTML, CSS, JavaScript, or All Questions
- 🛑 **End Quiz Anytime** — Button always visible to stop and see your results

---

## Table of Contents

### Part 1: The Code (Build It)
1. [Project Setup & Folder Structure](#1-project-setup--folder-structure)
2. [Complete index.html](#2-complete-indexhtml)
3. [Complete css/style.css](#3-complete-cssstylecss)
4. [Complete js/questions.js](#4-complete-jsquestionsjs)
5. [Complete js/timer.js](#5-complete-jstimerjs)
6. [Complete js/auth.js](#6-complete-jsauthjs)
7. [Complete js/charts.js](#7-complete-jschartsjs)
8. [Complete js/app.js](#8-complete-jsappjs)
9. [Backend (Python/Flask)](#9-backend-pythonflask)

### Part 2: The Knowledge (Master It)
10. [HTML Deep-Dive](#10-html-deep-dive)
11. [CSS Deep-Dive](#11-css-deep-dive)
12. [JavaScript Deep-Dive](#12-javascript-deep-dive)
13. [Python/Flask Deep-Dive](#13-pythonflask-deep-dive)

### Part 3: Extras
14. [Deployment Guide](#14-deployment-guide)
15. [Creativity & Next Steps](#15-creativity--next-steps)

---

# PART 1: THE CODE (Build It)

> Copy each file below into your project. When all files are in place, open `index.html` in your browser — it works immediately.

---

## 1. Project Setup & Folder Structure

Create these folders and files:

```
quiz-app/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── questions.js
│   ├── timer.js
│   ├── auth.js
│   ├── charts.js
│   └── app.js
└── backend/           ← Optional (for multi-user mode)
    ├── server.py
    ├── models.py
    ├── .env
    ├── requirements.txt
    └── Procfile
```

---

## 2. Complete index.html

Create `index.html` in the root of your project folder:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Master</title>
    <link rel="stylesheet" href="./css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="app" id="app">

        <!-- ========== SCREEN 1: LOGIN / SIGNUP ========== -->
        <section id="auth-screen" class="screen">
            <div class="auth-container">
                <h1 class="auth-title">Quiz Master</h1>

                <div class="auth-tabs">
                    <button class="auth-tab active" id="login-tab">Login</button>
                    <button class="auth-tab" id="signup-tab">Sign Up</button>
                </div>

                <!-- Login Form -->
                <form id="login-form" class="auth-form">
                    <div class="form-group">
                        <label for="login-email">Email</label>
                        <input type="email" id="login-email" required>
                    </div>
                    <div class="form-group">
                        <label for="login-password">Password</label>
                        <input type="password" id="login-password" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                    <p id="login-error" class="error-message"></p>
                </form>

                <!-- Signup Form -->
                <form id="signup-form" class="auth-form hidden">
                    <div class="form-group">
                        <label for="signup-name">Full Name</label>
                        <input type="text" id="signup-name" required>
                    </div>
                    <div class="form-group">
                        <label for="signup-email">Email</label>
                        <input type="email" id="signup-email" required>
                    </div>
                    <div class="form-group">
                        <label for="signup-password">Password</label>
                        <input type="password" id="signup-password" required minlength="6">
                    </div>
                    <button type="submit" class="btn btn-primary">Create Account</button>
                    <p id="signup-error" class="error-message"></p>
                </form>
            </div>
        </section>

        <!-- ========== SCREEN 2: CATEGORY SELECTION ========== -->
        <section id="category-screen" class="screen hidden">
            <div class="category-container">
                <h1 class="category-title">Choose Your Topic</h1>
                <p class="category-subtitle" id="category-welcome">Welcome! Pick a category to begin.</p>

                <div class="category-grid">
                    <button class="category-card" data-category="html">
                        <span class="category-icon">🌐</span>
                        <span class="category-name">HTML</span>
                        <span class="category-count">15 Questions</span>
                    </button>

                    <button class="category-card" data-category="css">
                        <span class="category-icon">🎨</span>
                        <span class="category-name">CSS</span>
                        <span class="category-count">15 Questions</span>
                    </button>

                    <button class="category-card" data-category="javascript">
                        <span class="category-icon">⚡</span>
                        <span class="category-name">JavaScript</span>
                        <span class="category-count">20 Questions</span>
                    </button>

                    <button class="category-card" data-category="all">
                        <span class="category-icon">📚</span>
                        <span class="category-name">All Topics</span>
                        <span class="category-count">50 Questions</span>
                    </button>
                </div>

                <button class="btn btn-small" id="category-logout-btn">Logout</button>
            </div>
        </section>

        <!-- ========== SCREEN 3: QUIZ ========== -->
        <section id="quiz-screen" class="screen hidden">
            <header class="quiz-header">
                <div class="quiz-info">
                    <span class="user-name" id="user-display">Welcome, User</span>
                    <button class="btn btn-danger btn-small" id="end-quiz-btn">End Quiz</button>
                </div>

                <div class="progress-container">
                    <div class="progress-bar" id="progress-bar"></div>
                    <span class="progress-text" id="progress-text">1/50</span>
                </div>

                <div class="timer-container">
                    <div class="timer-circle" id="timer-circle">
                        <span class="timer-text" id="timer-text">30</span>
                    </div>
                </div>
            </header>

            <main class="quiz-content">
                <p class="question-category" id="question-category">Category: HTML</p>
                <h2 class="question-text" id="question-text">
                    Question will appear here
                </h2>
                <div class="options-container" id="options-container"></div>
            </main>

            <footer class="quiz-footer">
                <button class="btn btn-secondary" id="prev-btn" disabled>Previous</button>
                <button class="btn btn-primary" id="next-btn">Next</button>
                <button class="btn btn-success hidden" id="submit-btn">Submit Quiz</button>
            </footer>
        </section>

        <!-- ========== SCREEN 4: RESULTS ========== -->
        <section id="results-screen" class="screen hidden">
            <header class="results-header">
                <h1>Quiz Complete!</h1>
                <div class="score-display">
                    <span class="score-label">Your Score</span>
                    <span class="score-value" id="final-score">0</span>
                    <span class="score-max" id="score-max">/ 1000</span>
                </div>
                <p class="results-summary" id="results-summary"></p>
            </header>

            <main class="results-content">
                <div class="charts-container">
                    <div class="chart-wrapper">
                        <h3>Correct vs Incorrect</h3>
                        <canvas id="pie-chart"></canvas>
                    </div>
                    <div class="chart-wrapper">
                        <h3>Time per Question</h3>
                        <canvas id="bar-chart"></canvas>
                    </div>
                </div>

                <div class="review-container" id="review-container">
                    <h3>Review Your Answers</h3>
                </div>

                <div class="leaderboard-container" id="leaderboard">
                    <h3>Leaderboard</h3>
                    <ol class="leaderboard-list" id="leaderboard-list"></ol>
                </div>
            </main>

            <footer class="results-footer">
                <button class="btn btn-primary" id="retry-btn">Try Again</button>
                <button class="btn btn-secondary" id="home-btn">Choose Category</button>
            </footer>
        </section>

    </div>

    <!-- Load order matters: questions first, then helpers, then main app -->
    <script src="./js/questions.js"></script>
    <script src="./js/timer.js"></script>
    <script src="./js/auth.js"></script>
    <script src="./js/charts.js"></script>
    <script src="./js/app.js"></script>
</body>
</html>
```

## 3. Complete css/style.css

Create `css/style.css`:

```css
/* ===== RESET & VARIABLES ===== */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

:root {
    --primary: #6366f1;
    --primary-dark: #4f46e5;
    --secondary: #64748b;
    --success: #22c55e;
    --danger: #ef4444;
    --warning: #f59e0b;
    --bg-main: #0f172a;
    --bg-card: #1e293b;
    --bg-input: #334155;
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --border-color: #475569;
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --radius-sm: 0.5rem;
    --radius-md: 1rem;
    --radius-lg: 1.5rem;
    --radius-full: 9999px;
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.4);
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg-main);
    color: var(--text-primary);
    min-height: 100vh;
    line-height: 1.6;
}

/* ===== LAYOUT ===== */
.app {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--spacing-md);
    min-height: 100vh;
}

.screen {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    animation: fadeIn 0.3s ease;
}

.screen.hidden { display: none; }
.hidden { display: none; }

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

/* ===== BUTTONS ===== */
.btn {
    padding: var(--spacing-sm) var(--spacing-md);
    border: none;
    border-radius: var(--radius-sm);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.btn:active { transform: translateY(0); }

.btn-primary { background: var(--primary); color: white; }
.btn-primary:hover { background: var(--primary-dark); }
.btn-secondary { background: var(--bg-input); color: var(--text-primary); }
.btn-success { background: var(--success); color: white; }
.btn-danger { background: var(--danger); color: white; }

.btn-small {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.875rem;
}

/* ===== AUTH SCREEN ===== */
.auth-container {
    max-width: 400px;
    margin: 10vh auto;
    padding: var(--spacing-lg);
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
}

.auth-title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: var(--spacing-lg);
    background: linear-gradient(135deg, var(--primary), var(--success));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.auth-tabs {
    display: flex;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-lg);
}

.auth-tab {
    flex: 1;
    padding: var(--spacing-sm);
    background: var(--bg-input);
    border: 2px solid transparent;
    border-radius: var(--radius-sm);
    color: var(--text-secondary);
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.2s ease;
}

.auth-tab.active {
    border-color: var(--primary);
    color: var(--primary);
    background: rgba(99, 102, 241, 0.1);
}

.form-group { margin-bottom: var(--spacing-md); }

.form-group label {
    display: block;
    margin-bottom: var(--spacing-xs);
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.form-group input {
    width: 100%;
    padding: var(--spacing-sm);
    background: var(--bg-input);
    border: 2px solid transparent;
    border-radius: var(--radius-sm);
    color: var(--text-primary);
    font-size: 1rem;
    transition: border-color 0.2s ease;
}

.form-group input:focus {
    outline: none;
    border-color: var(--primary);
}

.error-message {
    color: var(--danger);
    font-size: 0.875rem;
    margin-top: var(--spacing-sm);
    min-height: 1.25rem;
}

.auth-form .btn { width: 100%; }

/* ===== CATEGORY SELECTION SCREEN ===== */
.category-container {
    max-width: 600px;
    margin: 8vh auto;
    text-align: center;
}

.category-title {
    font-size: 2rem;
    margin-bottom: var(--spacing-xs);
    background: linear-gradient(135deg, var(--primary), var(--success));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.category-subtitle {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
}

.category-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.category-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-lg);
    background: var(--bg-card);
    border: 2px solid transparent;
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-sm);
    color: var(--text-primary);
}

.category-card:hover {
    border-color: var(--primary);
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}

.category-icon { font-size: 3rem; }
.category-name { font-size: 1.25rem; font-weight: 700; }
.category-count { font-size: 0.875rem; color: var(--text-secondary); }

/* ===== QUIZ SCREEN ===== */
.quiz-header { margin-bottom: var(--spacing-lg); }

.quiz-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
}

.user-name { font-weight: 600; }

.timer-container {
    display: flex;
    justify-content: center;
    margin: var(--spacing-md) 0;
}

.timer-circle {
    width: 80px;
    height: 80px;
    border-radius: var(--radius-full);
    background: conic-gradient(
        var(--primary) var(--timer-progress, 100%),
        var(--bg-input) 0%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.timer-circle::before {
    content: '';
    position: absolute;
    width: 64px;
    height: 64px;
    background: var(--bg-main);
    border-radius: var(--radius-full);
}

.timer-text {
    position: relative;
    z-index: 1;
    font-size: 1.5rem;
    font-weight: 700;
}

.timer-circle.warning {
    background: conic-gradient(var(--warning) var(--timer-progress), var(--bg-input) 0%);
}

.timer-circle.danger {
    background: conic-gradient(var(--danger) var(--timer-progress), var(--bg-input) 0%);
    animation: pulse 0.5s infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.question-category {
    font-size: 0.875rem;
    color: var(--primary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: var(--spacing-xs);
}

.question-text {
    font-size: 1.25rem;
    margin-bottom: var(--spacing-lg);
    line-height: 1.6;
}

.options-container {
    display: grid;
    gap: var(--spacing-sm);
    margin: var(--spacing-lg) 0;
}

.option-btn {
    padding: var(--spacing-md);
    background: var(--bg-card);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
}

.option-btn:hover:not(.disabled) {
    border-color: var(--primary);
    transform: translateX(8px);
}

.option-btn.selected {
    border-color: var(--primary);
    background: rgba(99, 102, 241, 0.15);
}

.option-btn.correct {
    border-color: var(--success);
    background: rgba(34, 197, 94, 0.15);
}

.option-btn.wrong {
    border-color: var(--danger);
    background: rgba(239, 68, 68, 0.15);
}

.option-btn.disabled { cursor: not-allowed; opacity: 0.6; }

.progress-container {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin: var(--spacing-sm) 0;
}

.progress-bar {
    flex: 1;
    height: 8px;
    background: var(--bg-input);
    border-radius: var(--radius-full);
    overflow: hidden;
}

.progress-bar::after {
    content: '';
    display: block;
    height: 100%;
    width: var(--progress, 0%);
    background: linear-gradient(90deg, var(--primary), var(--success));
    border-radius: var(--radius-full);
    transition: width 0.3s ease;
}

.progress-text { font-size: 0.875rem; color: var(--text-secondary); }

.quiz-footer {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-sm);
    margin-top: auto;
    padding-top: var(--spacing-lg);
}

/* ===== RESULTS SCREEN ===== */
.results-header { text-align: center; margin-bottom: var(--spacing-lg); }

.score-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: var(--spacing-md);
}

.score-label { color: var(--text-secondary); }

.score-value {
    font-size: 4rem;
    font-weight: 700;
    background: linear-gradient(135deg, var(--primary), var(--success));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.score-max { color: var(--text-secondary); font-size: 1.25rem; }

.results-summary { color: var(--text-secondary); margin-top: var(--spacing-sm); }

.charts-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
}

.chart-wrapper {
    background: var(--bg-card);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
}

.chart-wrapper h3 {
    margin-bottom: var(--spacing-sm);
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.review-container, .leaderboard-container {
    background: var(--bg-card);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-lg);
}

.review-item {
    padding: var(--spacing-sm);
    border-left: 4px solid var(--secondary);
    margin-bottom: var(--spacing-sm);
    background: var(--bg-input);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.review-item.correct { border-left-color: var(--success); }
.review-item.wrong { border-left-color: var(--danger); }

.review-question {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-xs);
}

.review-number { font-weight: 600; }
.review-status { font-size: 1.25rem; }
.review-text { margin-bottom: var(--spacing-xs); }
.review-answer, .review-correct { font-size: 0.875rem; color: var(--text-secondary); }
.review-correct { color: var(--success); }
.review-time { font-size: 0.75rem; color: var(--text-secondary); margin-top: var(--spacing-xs); }

.leaderboard-list { list-style: none; }

.leaderboard-item {
    display: flex;
    padding: var(--spacing-sm);
    border-bottom: 1px solid var(--bg-input);
    align-items: center;
    gap: var(--spacing-sm);
}

.leaderboard-item .rank { font-weight: 700; color: var(--primary); width: 2rem; }
.leaderboard-item .name { flex: 1; }
.leaderboard-item .score { font-weight: 700; color: var(--success); }

.results-footer {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    padding: var(--spacing-lg) 0;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 600px) {
    .charts-container { grid-template-columns: 1fr; }
    .quiz-footer { flex-direction: column; }
    .category-grid { grid-template-columns: 1fr; }
    .auth-container { margin: 5vh auto; padding: var(--spacing-md); }
}
```

## 4. Complete js/questions.js

Create `js/questions.js`. Each question has a `category` field ("html", "css", or "javascript"):

```javascript
const questions = [
    // ===== HTML QUESTIONS (1–15) =====
    {
        category: "html",
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0,
        explanation: "HTML = Hyper Text Markup Language. It's the standard language for creating web pages."
    },
    {
        category: "html",
        question: "Which HTML element is used for the largest heading?",
        options: ["<heading>", "<h6>", "<h1>", "<head>"],
        correct: 2,
        explanation: "<h1> is the largest heading. Headings go from <h1> (biggest) to <h6> (smallest)."
    },
    {
        category: "html",
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<break>", "<lb>", "<br>", "<newline>"],
        correct: 2,
        explanation: "<br> is a self-closing tag that creates a line break."
    },
    {
        category: "html",
        question: "Which attribute specifies a unique identifier for an HTML element?",
        options: ["class", "name", "id", "key"],
        correct: 2,
        explanation: "The id attribute gives an element a unique identifier. No two elements should share the same id."
    },
    {
        category: "html",
        question: "What does the <a> tag define?",
        options: ["An image", "A paragraph", "A hyperlink", "A heading"],
        correct: 2,
        explanation: "The <a> (anchor) tag creates hyperlinks to other pages or resources."
    },
    {
        category: "html",
        question: "Which input type creates a checkbox?",
        options: [
            '<input type="check">',
            '<input type="checkbox">',
            '<input type="tick">',
            '<checkbox>'
        ],
        correct: 1,
        explanation: "type='checkbox' creates a checkbox input element."
    },
    {
        category: "html",
        question: "What is the purpose of the <meta> tag?",
        options: [
            "To create a paragraph",
            "To provide metadata about the HTML document",
            "To add a hyperlink",
            "To insert an image"
        ],
        correct: 1,
        explanation: "The <meta> tag provides metadata (character set, viewport, description) that isn't displayed on the page."
    },
    {
        category: "html",
        question: "Which tag is used to define an unordered list?",
        options: ["<ol>", "<list>", "<ul>", "<li>"],
        correct: 2,
        explanation: "<ul> creates an unordered (bulleted) list. <ol> creates an ordered (numbered) list."
    },
    {
        category: "html",
        question: "What does the 'required' attribute do on an input element?",
        options: [
            "Makes the input read-only",
            "Sets the input value",
            "Prevents form submission if empty",
            "Changes input color"
        ],
        correct: 2,
        explanation: "The 'required' attribute blocks form submission until the user fills in that field."
    },
    {
        category: "html",
        question: "Which HTML element defines the document's body?",
        options: ["<content>", "<body>", "<main>", "<page>"],
        correct: 1,
        explanation: "<body> contains all the visible content of an HTML document."
    },
    {
        category: "html",
        question: "What is a semantic HTML element?",
        options: [
            "An element with no meaning",
            "An element that describes its meaning to browser and developer",
            "An element that only works in Chrome",
            "An element that requires JavaScript"
        ],
        correct: 1,
        explanation: "Semantic elements (<header>, <nav>, <section>, <article>) clearly describe their purpose."
    },
    {
        category: "html",
        question: "Which attribute makes a link open in a new tab?",
        options: [
            'href="new"',
            'target="_blank"',
            'open="new"',
            'window="new"'
        ],
        correct: 1,
        explanation: 'target="_blank" tells the browser to open the link in a new tab or window.'
    },
    {
        category: "html",
        question: "What is the correct way to add a comment in HTML?",
        options: [
            "// comment",
            "/* comment */",
            "<!-- comment -->",
            "# comment"
        ],
        correct: 2,
        explanation: "HTML uses <!-- --> for comments. These are invisible to users but readable in source code."
    },
    {
        category: "html",
        question: "Which element is used to embed a JavaScript file?",
        options: ["<js>", "<javascript>", "<script>", "<code>"],
        correct: 2,
        explanation: "The <script> tag either contains JavaScript code or links to an external .js file via the src attribute."
    },
    {
        category: "html",
        question: "What is the purpose of the 'alt' attribute on images?",
        options: [
            "Sets image width",
            "Provides alternative text if image cannot load",
            "Changes image color",
            "Makes image clickable"
        ],
        correct: 1,
        explanation: "The 'alt' attribute describes the image for accessibility and when the image fails to load."
    },

    // ===== CSS QUESTIONS (16–30) =====
    {
        category: "css",
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Colorful Style Syntax"
        ],
        correct: 2,
        explanation: "CSS = Cascading Style Sheets. 'Cascading' means styles can override each other based on specificity."
    },
    {
        category: "css",
        question: "Which CSS property changes text color?",
        options: ["font-color", "text-color", "color", "foreground"],
        correct: 2,
        explanation: "The 'color' property sets the text color. 'background-color' sets the background."
    },
    {
        category: "css",
        question: "What does 'display: none' do?",
        options: [
            "Makes element transparent",
            "Completely removes element from page layout",
            "Makes element invisible but keeps its space",
            "Moves element off-screen"
        ],
        correct: 1,
        explanation: "'display: none' removes the element entirely. 'visibility: hidden' hides it but keeps the space."
    },
    {
        category: "css",
        question: "Which selector targets elements with class='header'?",
        options: ["#header", ".header", "header", "*header"],
        correct: 1,
        explanation: "A dot (.) targets classes. A hash (#) targets IDs. No prefix targets element names."
    },
    {
        category: "css",
        question: "What is the CSS box model order (outside to inside)?",
        options: [
            "Content → Padding → Border → Margin",
            "Margin → Border → Padding → Content",
            "Border → Margin → Padding → Content",
            "Padding → Content → Border → Margin"
        ],
        correct: 1,
        explanation: "From outside in: Margin (space outside) → Border → Padding (space inside) → Content."
    },
    {
        category: "css",
        question: "What does 'box-sizing: border-box' do?",
        options: [
            "Adds a border to all elements",
            "Makes padding and border included in the element's total width/height",
            "Changes the border color",
            "Removes all margins"
        ],
        correct: 1,
        explanation: "border-box includes padding and border in the element's width, preventing layout surprises."
    },
    {
        category: "css",
        question: "Which property creates rounded corners?",
        options: ["corner-radius", "border-curve", "border-radius", "round-corner"],
        correct: 2,
        explanation: "border-radius rounds corners. Use pixels (10px) or percentages (50% = circle)."
    },
    {
        category: "css",
        question: "What does 'position: relative' do?",
        options: [
            "Removes element from normal flow",
            "Positions element relative to the viewport",
            "Allows offset without affecting other elements' positions",
            "Centers the element"
        ],
        correct: 2,
        explanation: "'position: relative' lets you offset an element with top/left/right/bottom without disturbing neighbors."
    },
    {
        category: "css",
        question: "How do you apply a style only when the user hovers over an element?",
        options: [
            ".element:active",
            ".element:hover",
            ".element:focus",
            ".element:mouseover"
        ],
        correct: 1,
        explanation: ":hover is a pseudo-class that applies styles when the mouse is over the element."
    },
    {
        category: "css",
        question: "What is a CSS variable?",
        options: [
            "A JavaScript variable used in CSS",
            "A custom property defined with -- prefix, reusable across the stylesheet",
            "A browser default style",
            "An animation keyframe"
        ],
        correct: 1,
        explanation: "CSS variables (custom properties) use --name syntax and are accessed with var(--name)."
    },
    {
        category: "css",
        question: "What does 'flex: 1' do?",
        options: [
            "Sets font size to 1",
            "Makes the element take up all available space in a flex container",
            "Adds 1px border",
            "Sets opacity to 1"
        ],
        correct: 1,
        explanation: "'flex: 1' tells a flex child to grow and fill all remaining space in the flex container."
    },
    {
        category: "css",
        question: "Which unit is relative to the root element's font size?",
        options: ["px", "em", "rem", "vh"],
        correct: 2,
        explanation: "'rem' = root em. It's relative to the <html> font size (usually 16px). 'em' is relative to the parent."
    },
    {
        category: "css",
        question: "What does 'z-index' control?",
        options: [
            "Zoom level",
            "Element width",
            "Stacking order (which element appears on top)",
            "Animation speed"
        ],
        correct: 2,
        explanation: "z-index controls the stacking order. Higher values appear in front of lower values."
    },
    {
        category: "css",
        question: "What is the purpose of '@keyframes'?",
        options: [
            "To import external stylesheets",
            "To define animation sequences with start and end states",
            "To create media queries",
            "To declare variables"
        ],
        correct: 1,
        explanation: "@keyframes defines animation steps. You name it and reference it with the 'animation' property."
    },
    {
        category: "css",
        question: "What does 'media query' do in CSS?",
        options: [
            "Plays audio files",
            "Imports images",
            "Applies styles based on device properties (like screen width)",
            "Creates animations"
        ],
        correct: 2,
        explanation: "Media queries let you apply different styles for different screen sizes (responsive design)."
    },

    // ===== JAVASCRIPT QUESTIONS (31–50) =====
    {
        category: "javascript",
        question: "What is the correct way to declare a variable that can be reassigned?",
        options: ["const x = 5", "let x = 5", "var x = 5", "Both let and var"],
        correct: 3,
        explanation: "Both 'let' and 'var' allow reassignment. 'const' creates a constant. 'let' is preferred over 'var'."
    },
    {
        category: "javascript",
        question: "What does document.getElementById('test') return?",
        options: [
            "All elements with id 'test'",
            "The single element with id='test', or null",
            "A boolean",
            "The element's text content"
        ],
        correct: 1,
        explanation: "getElementById returns the ONE element matching that ID, or null if not found."
    },
    {
        category: "javascript",
        question: "What is an arrow function?",
        options: [
            "A function that draws arrows on screen",
            "A shorter syntax for writing functions using =>",
            "A function that only runs once",
            "A function with no return value"
        ],
        correct: 1,
        explanation: "Arrow functions use => instead of the function keyword: (x) => x * 2 instead of function(x) { return x * 2; }"
    },
    {
        category: "javascript",
        question: "What does .addEventListener() do?",
        options: [
            "Creates a new HTML element",
            "Attaches a function to run when a specific event occurs",
            "Removes an event from an element",
            "Styles an element"
        ],
        correct: 1,
        explanation: "addEventListener tells the browser: 'when THIS event happens on THIS element, run THIS function.'"
    },
    {
        category: "javascript",
        question: "What is .textContent used for?",
        options: [
            "Getting/setting the CSS of an element",
            "Getting/setting the text inside an element",
            "Creating a new text file",
            "Adding text animation"
        ],
        correct: 1,
        explanation: ".textContent is a property that reads or writes the text inside an HTML element."
    },
    {
        category: "javascript",
        question: "What does localStorage.setItem('key', 'value') do?",
        options: [
            "Sends data to a server",
            "Saves a key-value pair in the browser permanently",
            "Creates a cookie",
            "Deletes local data"
        ],
        correct: 1,
        explanation: "localStorage saves data in the browser. It persists even after closing the tab or browser."
    },
    {
        category: "javascript",
        question: "What will console.log(typeof []) output?",
        options: ['"array"', '"object"', '"list"', '"undefined"'],
        correct: 1,
        explanation: "In JavaScript, arrays are technically objects. Use Array.isArray() to check if something is an array."
    },
    {
        category: "javascript",
        question: "What does .classList.add('hidden') do?",
        options: [
            "Creates a new HTML element called 'hidden'",
            "Adds the CSS class 'hidden' to an element",
            "Hides the page",
            "Deletes the element"
        ],
        correct: 1,
        explanation: "classList.add() adds a CSS class. classList.remove() removes it. classList.toggle() switches it."
    },
    {
        category: "javascript",
        question: "What is the difference between == and ===?",
        options: [
            "No difference",
            "== checks value only; === checks value AND type",
            "=== is for strings only",
            "== is faster"
        ],
        correct: 1,
        explanation: "== converts types before comparing (1 == '1' is true). === requires same type AND value (1 === '1' is false)."
    },
    {
        category: "javascript",
        question: "What does JSON.parse() do?",
        options: [
            "Converts a JavaScript object to a string",
            "Converts a JSON string back into a JavaScript object",
            "Validates JSON syntax",
            "Sends JSON to a server"
        ],
        correct: 1,
        explanation: "JSON.parse() reads a JSON string and creates a JS object. JSON.stringify() does the reverse."
    },
    {
        category: "javascript",
        question: "What is the purpose of setInterval()?",
        options: [
            "Runs a function once after a delay",
            "Runs a function repeatedly at fixed time intervals",
            "Pauses the program",
            "Sets the time zone"
        ],
        correct: 1,
        explanation: "setInterval(fn, ms) calls fn every ms milliseconds. clearInterval() stops it."
    },
    {
        category: "javascript",
        question: "What does .forEach() do?",
        options: [
            "Creates a new array",
            "Runs a function once for each item in an array",
            "Filters array items",
            "Sorts the array"
        ],
        correct: 1,
        explanation: ".forEach() loops through every item: [1,2,3].forEach(x => console.log(x)) prints 1, 2, 3."
    },
    {
        category: "javascript",
        question: "What does .filter() return?",
        options: [
            "A single value",
            "A new array containing only items that pass a test",
            "The original array modified",
            "A boolean"
        ],
        correct: 1,
        explanation: ".filter() creates a new array with items where the callback returns true."
    },
    {
        category: "javascript",
        question: "What is an object in JavaScript?",
        options: [
            "A number type",
            "A collection of key-value pairs",
            "A type of function",
            "An HTML element"
        ],
        correct: 1,
        explanation: "Objects store data as key-value pairs: { name: 'John', age: 25 }."
    },
    {
        category: "javascript",
        question: "What does .map() do?",
        options: [
            "Creates a geographic map",
            "Transforms each item in an array and returns a new array",
            "Finds a single item",
            "Removes items from an array"
        ],
        correct: 1,
        explanation: ".map() creates a new array by transforming each element: [1,2,3].map(x => x*2) returns [2,4,6]."
    },
    {
        category: "javascript",
        question: "What is event.preventDefault() used for?",
        options: [
            "Stops all JavaScript",
            "Prevents the browser's default action (like form submission reloading the page)",
            "Prevents other events from firing",
            "Prevents CSS from loading"
        ],
        correct: 1,
        explanation: "preventDefault() stops default browser behavior. For forms, it prevents page reload on submit."
    },
    {
        category: "javascript",
        question: "What does the spread operator (...) do?",
        options: [
            "Multiplies numbers",
            "Expands an array or object into individual elements",
            "Creates a loop",
            "Compares two values"
        ],
        correct: 1,
        explanation: "The spread operator unpacks: [...arr1, ...arr2] merges arrays. {...obj1, ...obj2} merges objects."
    },
    {
        category: "javascript",
        question: "What is a callback function?",
        options: [
            "A function that calls itself",
            "A function passed as an argument to another function",
            "A function that returns HTML",
            "A function that only runs on page load"
        ],
        correct: 1,
        explanation: "A callback is a function passed to another function to be called later, like in addEventListener or forEach."
    },
    {
        category: "javascript",
        question: "What does .querySelector('.btn') return?",
        options: [
            "All elements with class 'btn'",
            "The first element matching the CSS selector '.btn'",
            "A boolean",
            "The element's style"
        ],
        correct: 1,
        explanation: "querySelector returns the FIRST matching element. querySelectorAll returns ALL matching elements."
    },
    {
        category: "javascript",
        question: "What is template literal syntax in JavaScript?",
        options: [
            "Using single quotes: 'hello'",
            "Using backticks with ${}: `Hello ${name}`",
            "Using double quotes: \"hello\"",
            "Using plus sign: 'hello' + name"
        ],
        correct: 1,
        explanation: "Template literals use backticks (`) and ${} to embed variables: `Hello ${name}` instead of 'Hello ' + name."
    }
];
```

---

## 5. Complete js/timer.js

Create `js/timer.js`:

```javascript
// ===== TIMER MODULE =====
// Manages the 30-second countdown for each question

const Timer = {
    timeLimit: 30,
    timeLeft: 30,
    intervalId: null,
    questionStartTime: null,

    // Start the timer for a new question
    start(onTick, onTimeUp) {
        this.stop();
        this.timeLeft = this.timeLimit;
        this.questionStartTime = Date.now();

        // Update display immediately
        onTick(this.timeLeft);
        this.updateVisual();

        // Tick every second
        this.intervalId = setInterval(() => {
            this.timeLeft--;
            onTick(this.timeLeft);
            this.updateVisual();

            if (this.timeLeft <= 0) {
                this.stop();
                onTimeUp();
            }
        }, 1000);
    },

    // Stop the timer
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    },

    // Get elapsed time in seconds for this question
    getElapsed() {
        if (!this.questionStartTime) return 0;
        return Math.round((Date.now() - this.questionStartTime) / 1000);
    },

    // Update the visual circle and warning colors
    updateVisual() {
        const timerCircle = document.getElementById('timer-circle');
        const progress = (this.timeLeft / this.timeLimit) * 100;

        timerCircle.style.setProperty('--timer-progress', progress + '%');

        // Remove old color classes
        timerCircle.classList.remove('warning', 'danger');

        // Add warning/danger colors
        if (this.timeLeft <= 5) {
            timerCircle.classList.add('danger');
        } else if (this.timeLeft <= 10) {
            timerCircle.classList.add('warning');
        }
    }
};
```

---

## 6. Complete js/auth.js

Create `js/auth.js`:

```javascript
// ===== AUTHENTICATION MODULE =====
// Handles login, signup, and session management using localStorage

const Auth = {
    // Get currently logged-in user (or null)
    getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    },

    // Sign up a new user
    signup(name, email, password) {
        // Get existing users or empty array
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if email already exists
        const exists = users.find(u => u.email === email);
        if (exists) {
            return { success: false, message: 'Email already registered!' };
        }

        // Create new user
        const newUser = {
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        };

        // Save to users list
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Log them in
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        return { success: true };
    },

    // Log in an existing user
    login(email, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            return { success: false, message: 'Invalid email or password!' };
        }

        // Save session
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user: user };
    },

    // Log out the current user
    logout() {
        localStorage.removeItem('currentUser');
    }
};
```

## 7. Complete js/charts.js

Create `js/charts.js`:

```javascript
// ===== CHARTS MODULE =====
// Creates visual charts for the results screen using Chart.js

const Charts = {
    pieChart: null,
    barChart: null,

    // Create the doughnut chart (Correct vs Incorrect)
    createPieChart(correct, incorrect, unanswered) {
        const ctx = document.getElementById('pie-chart').getContext('2d');

        // Destroy old chart if it exists
        if (this.pieChart) this.pieChart.destroy();

        this.pieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Correct', 'Incorrect', 'Unanswered'],
                datasets: [{
                    data: [correct, incorrect, unanswered],
                    backgroundColor: ['#22c55e', '#ef4444', '#64748b'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#f8fafc', padding: 15 }
                    }
                }
            }
        });
    },

    // Create the bar chart (Time per question)
    createBarChart(timesArray) {
        const ctx = document.getElementById('bar-chart').getContext('2d');

        // Destroy old chart if it exists
        if (this.barChart) this.barChart.destroy();

        const labels = timesArray.map((_, i) => `Q${i + 1}`);

        this.barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Seconds',
                    data: timesArray,
                    backgroundColor: timesArray.map(t =>
                        t <= 10 ? '#22c55e' :
                        t <= 20 ? '#f59e0b' :
                        '#ef4444'
                    ),
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 30,
                        ticks: { color: '#94a3b8' },
                        grid: { color: '#334155' }
                    },
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
};
```

---

## 8. Complete js/app.js

Create `js/app.js` — this is the **main file** that ties everything together:

```javascript
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
        // Record as unanswered — do NOT reveal the correct answer
        state.answers[index] = {
            selected: -1,
            correct: false,
            timeTaken: 30
        };
        // // Show correct answer
        // const q = state.activeQuestions[index];
        // const buttons = document.querySelectorAll('.option-btn');
        // buttons.forEach((btn, i) => {
        //     btn.classList.add('disabled');
        //     if (i === q.correct) btn.classList.add('correct');
        // });

        // Auto-advance: move to the next question or finish the quiz
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
```

## 9. Backend (Python/Flask)

> **This section is optional.** The frontend works perfectly on its own using `localStorage`. Add the backend only when you want multi-user support with a real database.

Create a `backend/` folder with these files:

### 9.1 requirements.txt

```
flask==3.0.0
flask-cors==4.0.0
flask-sqlalchemy==3.1.1
psycopg2-binary==2.9.9
python-dotenv==1.0.0
bcrypt==4.1.2
gunicorn==21.2.0
```

### 9.2 .env

```
DATABASE_URL=postgresql://username:password@localhost:5432/quiz_db
SECRET_KEY=your-secret-key-here
```

### 9.3 models.py

```python
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class QuizResult(db.Model):
    __tablename__ = 'quiz_results'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    total_questions = db.Column(db.Integer, nullable=False)
    correct_answers = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    user = db.relationship('User', backref='results')
```

### 9.4 server.py

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, User, QuizResult
from dotenv import load_dotenv
import bcrypt
import os

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app)
db.init_app(app)

with app.app_context():
    db.create_all()

# --- Auth Routes ---
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'success': False, 'message': 'Email already registered'}), 400

    hashed = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt())
    user = User(name=data['name'], email=data['email'], password_hash=hashed.decode())
    db.session.add(user)
    db.session.commit()
    return jsonify({'success': True, 'user': {'name': user.name, 'email': user.email}})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user or not bcrypt.checkpw(data['password'].encode(), user.password_hash.encode()):
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
    return jsonify({'success': True, 'user': {'name': user.name, 'email': user.email}})

# --- Quiz Routes ---
@app.route('/api/results', methods=['POST'])
def save_result():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    result = QuizResult(
        user_id=user.id,
        score=data['score'],
        category=data['category'],
        total_questions=data['totalQuestions'],
        correct_answers=data['correctAnswers']
    )
    db.session.add(result)
    db.session.commit()
    return jsonify({'success': True})

@app.route('/api/leaderboard', methods=['GET'])
def leaderboard():
    top = QuizResult.query.order_by(QuizResult.score.desc()).limit(10).all()
    return jsonify([{
        'name': r.user.name,
        'score': r.score,
        'category': r.category,
        'date': r.date.strftime('%Y-%m-%d')
    } for r in top])

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

### 9.5 Setting Up PostgreSQL

**Step 1: Install PostgreSQL**
- Download from [postgresql.org/download](https://www.postgresql.org/download/)
- During installation, remember the password you set for the `postgres` user

**Step 2: Create the database**

Open a terminal (or pgAdmin) and run:

```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create a new database for the quiz app
CREATE DATABASE quiz_db;

-- Verify it was created
\l

-- Exit
\q
```

**Step 3: Update your `.env` file**

```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD_HERE@localhost:5432/quiz_db
SECRET_KEY=any-random-string-you-want-here
```

Replace `YOUR_PASSWORD_HERE` with the password you set during PostgreSQL installation.

### 9.6 Running the Backend

```bash
# Navigate to the backend folder
cd backend

# Install Python packages
pip install -r requirements.txt

# Start the Flask server
python server.py
```

You should see:
```
 * Running on http://127.0.0.1:5000
 * Debugger is active!
```

The tables (`users` and `quiz_results`) are created automatically the first time you run the server.

### 9.7 Updating auth.js to Use the Backend

Now we need to modify the frontend to talk to the Flask server instead of using localStorage for user accounts. Replace the contents of `js/auth.js` with:

```javascript
// ===== AUTH MODULE (Backend Version) =====
// Uses fetch() to communicate with Flask backend for multi-user support
// Session is still stored in localStorage for persistence across page refreshes

const API_URL = 'http://localhost:5000';  // Change this to your deployed URL later
const AUTH_KEY = 'quizAppUser';

const Auth = {
    // ----- SIGN UP (sends data to Flask) -----
    async signup(name, email, password) {
        try {
            const response = await fetch(`${API_URL}/api/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (data.success) {
                // Save session locally so the page remembers you after refresh
                localStorage.setItem(AUTH_KEY, JSON.stringify(data.user));
            }
            return data;  // { success: true/false, message: '...' }

        } catch (error) {
            // If backend is down, fall back to localStorage
            console.warn('Backend unreachable, using localStorage fallback');
            return this.localSignup(name, email, password);
        }
    },

    // ----- LOG IN (verifies credentials with Flask) -----
    async login(email, password) {
        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem(AUTH_KEY, JSON.stringify(data.user));
            }
            return data;

        } catch (error) {
            console.warn('Backend unreachable, using localStorage fallback');
            return this.localLogin(email, password);
        }
    },

    // ----- LOG OUT -----
    logout() {
        localStorage.removeItem(AUTH_KEY);
    },

    // ----- GET CURRENT USER (from local session) -----
    getCurrentUser() {
        const data = localStorage.getItem(AUTH_KEY);
        return data ? JSON.parse(data) : null;
    },

    // ----- FALLBACK: localStorage signup (if backend is down) -----
    localSignup(name, email, password) {
        const users = JSON.parse(localStorage.getItem('quizAppUsers') || '[]');
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already registered' };
        }
        const user = { name, email };
        users.push({ name, email, password });
        localStorage.setItem('quizAppUsers', JSON.stringify(users));
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        return { success: true, user };
    },

    // ----- FALLBACK: localStorage login (if backend is down) -----
    localLogin(email, password) {
        const users = JSON.parse(localStorage.getItem('quizAppUsers') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }
        const session = { name: user.name, email: user.email };
        localStorage.setItem(AUTH_KEY, JSON.stringify(session));
        return { success: true, user: session };
    }
};
```

**Key changes from the localStorage-only version:**
- `signup()` and `login()` now use `fetch()` to send requests to the Flask server
- They are `async` functions (because `fetch()` returns a Promise)
- If the backend is unreachable, they gracefully fall back to localStorage
- The user session is still saved in localStorage so the page remembers you after refresh

### 9.8 Updating app.js to Use the Backend

In `js/app.js`, two functions need to change: `saveResults()` must send results to the server, and `updateLeaderboard()` must fetch the shared leaderboard. Also, the form handlers must become `async` since auth is now async.

**Replace the login/signup form handlers:**

```javascript
// Login form submission (NOW ASYNC)
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // await because Auth.login() now talks to the server
    const result = await Auth.login(email, password);

    if (result.success) {
        showCategoryScreen();
    } else {
        document.getElementById('login-error').textContent = result.message;
    }
});

// Signup form submission (NOW ASYNC)
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const result = await Auth.signup(name, email, password);

    if (result.success) {
        showCategoryScreen();
    } else {
        document.getElementById('signup-error').textContent = result.message;
    }
});
```

**Replace the `saveResults()` function:**

```javascript
// Save results to backend (with localStorage fallback)
async function saveToBackend(correct, total, category) {
    const user = Auth.getCurrentUser();
    if (!user) return;

    try {
        await fetch(`${API_URL}/api/results`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user.email,
                score: state.score,
                category: state.selectedCategory,
                totalQuestions: total,
                correctAnswers: correct
            })
        });
    } catch (error) {
        console.warn('Could not save to backend, saving locally');
        // Fallback: save to localStorage
        const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
        results.push({
            name: user.name,
            score: state.score,
            category: state.selectedCategory,
            date: new Date().toLocaleDateString()
        });
        localStorage.setItem('quizResults', JSON.stringify(results));
    }
}
```

**Replace the `saveToLeaderboard()` function:**

```javascript
// Fetch leaderboard from backend (with localStorage fallback)
async function saveToLeaderboard() {
    const user = Auth.getCurrentUser();
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = '';

    // First, save this result to the backend
    const total = state.activeQuestions.length;
    let correctCount = 0;
    state.answers.forEach(a => { if (a && a.correct) correctCount++; });
    await saveToBackend(correctCount, total, state.selectedCategory);

    // Then, fetch the shared leaderboard
    try {
        const response = await fetch(`${API_URL}/api/leaderboard`);
        const leaderboard = await response.json();

        leaderboard.forEach((entry, i) => {
            const li = document.createElement('li');
            li.className = 'leaderboard-item';
            li.innerHTML = `
                <span class="rank">${i + 1}</span>
                <span class="name">${entry.name}</span>
                <span class="score">${entry.score}</span>
            `;
            list.appendChild(li);
        });

    } catch (error) {
        console.warn('Backend unreachable, using local leaderboard');
        // Fallback: show local leaderboard
        const local = JSON.parse(localStorage.getItem('quizResults') || '[]');
        local.sort((a, b) => b.score - a.score);
        local.slice(0, 10).forEach((entry, i) => {
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
}
```

**Make `finishQuiz()` async** (since it now calls async `saveToLeaderboard()`):

```javascript
// Change the function signature:
async function finishQuiz() {
    // ... all existing code stays the same ...
    // Just add 'await' before saveToLeaderboard():
    await saveToLeaderboard();
    // ... rest stays the same ...
}
```

### 9.9 How the Multi-User Flow Works

```
SIGNUP FLOW:
┌──────────┐    POST /api/signup     ┌──────────┐    INSERT INTO    ┌────────────┐
│ Browser  │ ───────────────────────>│  Flask   │ ──────────────── │ PostgreSQL │
│ (fetch)  │ { name, email, pass }  │  Server  │  users table     │  Database  │
│          │ <───────────────────────│          │ <──────────────── │            │
└──────────┘  { success: true }     └──────────┘   user created    └────────────┘
     │
     ▼
 Save session to localStorage (so page remembers you)

QUIZ RESULT FLOW:
┌──────────┐    POST /api/results    ┌──────────┐    INSERT INTO    ┌────────────┐
│ Browser  │ ───────────────────────>│  Flask   │ ──────────────── │ PostgreSQL │
│ (fetch)  │ { score, category }    │  Server  │  quiz_results    │  Database  │
└──────────┘                        └──────────┘                   └────────────┘

LEADERBOARD FLOW:
┌──────────┐    GET /api/leaderboard ┌──────────┐    SELECT TOP 10  ┌────────────┐
│ Browser  │ ───────────────────────>│  Flask   │ ──────────────── │ PostgreSQL │
│ (fetch)  │ <───────────────────────│          │ <──────────────── │            │
└──────────┘  [{ name, score }, ...] └──────────┘  ORDER BY score   └────────────┘
```

**Why this design?**
- **Multi-user**: All users share the same PostgreSQL database, so the leaderboard shows everyone's scores
- **Graceful fallback**: If the server is down, the app still works with localStorage
- **Session persistence**: `localStorage` keeps the session so refreshing the page doesn't log you out
- **Passwords are hashed**: bcrypt hashes passwords in the database — even if the database is leaked, passwords are safe

---

# PART 2: THE KNOWLEDGE (Master It)

> This section explains **every concept, method, and property** used in the code above. Study these to truly understand what you built.

---

## 10. HTML Deep-Dive

### 10.1 What is HTML?

HTML (HyperText Markup Language) is the **skeleton** of every web page. It tells the browser **what** things are, not how they look (that's CSS) or how they behave (that's JavaScript).

**Analogy:** If a web page is a house, HTML is the walls, rooms, and doors. CSS is the paint and furniture. JavaScript is the electricity and plumbing.

### 10.2 The Document Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Invisible stuff: settings, links, title -->
</head>
<body>
    <!-- Visible stuff: what users see -->
</body>
</html>
```

| Line | What It Does |
|------|-------------|
| `<!DOCTYPE html>` | Tells browser "this is HTML5" (the modern version) |
| `<html lang="en">` | Root element. `lang="en"` helps screen readers and search engines |
| `<head>` | Contains metadata — things users don't see directly |
| `<body>` | Contains everything users see and interact with |

### 10.3 Every HTML Element Used in This Project

| Element | Purpose | Example from Project |
|---------|---------|---------------------|
| `<meta charset="UTF-8">` | Supports all characters (emojis, accents, etc.) | In `<head>` |
| `<meta name="viewport">` | Makes page responsive on mobile | In `<head>` |
| `<title>` | Text shown in browser tab | "Quiz Master" |
| `<link>` | Connects external files (CSS, fonts) | Links to `style.css` |
| `<script>` | Loads JavaScript files | Links to `app.js` etc. |
| `<div>` | Generic container (no meaning) | `<div class="app">` |
| `<section>` | Semantic container (meaningful group) | Each quiz screen |
| `<header>` | Top part of a section | Quiz header with timer |
| `<main>` | Main content area | Quiz questions area |
| `<footer>` | Bottom part of a section | Navigation buttons |
| `<h1>` - `<h3>` | Headings (h1 = biggest) | "Quiz Complete!" |
| `<p>` | Paragraph of text | Error messages |
| `<span>` | Inline text container | Score display, timer |
| `<form>` | Groups inputs for submission | Login/signup forms |
| `<input>` | User input field | Email, password fields |
| `<label>` | Describes an input field | "Email", "Password" |
| `<button>` | Clickable button | "Login", "Next", etc. |
| `<canvas>` | Drawing area for graphics | Charts |
| `<ol>` | Ordered (numbered) list | Leaderboard |
| `<li>` | List item | Each leaderboard entry |

### 10.4 HTML Attributes Explained

Attributes are extra information added to tags:

```html
<input type="email" id="login-email" required minlength="6">
```

| Attribute | What It Does | Analogy |
|-----------|-------------|---------|
| `id="login-email"` | Gives a **unique name** to this element | Like a person's social security number — no duplicates |
| `class="btn btn-primary"` | Assigns one or more **CSS classes** | Like categories — many elements can share the same class |
| `type="email"` | Tells browser what kind of input to expect | Browser auto-validates email format |
| `type="password"` | Hides typed characters with dots | Security feature |
| `required` | Form won't submit if this field is empty | No value needed — just the word |
| `minlength="6"` | Minimum characters required | Password must be 6+ characters |
| `disabled` | Makes element unclickable | "Previous" button on first question |
| `for="login-email"` | Connects a label to an input by ID | Clicking label focuses the input |
| `data-category="html"` | Custom data attribute (you invent the name) | Stores category info for JavaScript to read |

### 10.5 Key Concept: data-* Attributes

The `data-*` pattern lets you store custom data on any HTML element:

```html
<!-- In HTML -->
<button class="category-card" data-category="html">HTML</button>

<!-- In JavaScript, you read it like this: -->
<script>
    const card = document.querySelector('.category-card');
    const category = card.getAttribute('data-category'); // "html"
</script>
```

**Why use it?** It keeps your data in the HTML where it belongs, so JavaScript can read it when needed. Any attribute starting with `data-` is valid HTML.

### 10.6 Semantic vs Non-Semantic HTML

| Semantic (meaningful) | Non-Semantic (generic) |
|----------------------|----------------------|
| `<section>` = a distinct section | `<div>` = just a box |
| `<header>` = top area | `<div class="header">` = works but less meaningful |
| `<footer>` = bottom area | `<div class="footer">` = works but less meaningful |
| `<main>` = primary content | `<div class="main">` = works but less meaningful |

**Why care?** Screen readers (for blind users) and search engines understand semantic elements. `<section>` tells them "this is a distinct part of the page." `<div>` tells them nothing.

---

## 11. CSS Deep-Dive

### 11.1 What is CSS?

CSS (Cascading Style Sheets) controls **how** HTML looks. Without CSS, every page would be plain black text on white background.

**"Cascading"** means when multiple styles target the same element, the most specific one wins.

### 11.2 How CSS Selectors Work

A selector tells CSS **which** element to style:

```css
/* TARGET → { what to do } */
.btn { color: white; }
```

**Every Selector Type Used in This Project:**

| Selector | Syntax | What It Targets | Example |
|----------|--------|----------------|---------|
| Element | `body` | All `<body>` elements | `body { font-family: ... }` |
| Class | `.btn` | All elements with `class="btn"` | `.option-btn { padding: ... }` |
| ID | `#app` | The ONE element with `id="app"` | `#timer-text { font-size: ... }` |
| Universal | `*` | Every single element | `* { box-sizing: border-box; }` |
| Descendant | `.quiz-info .user-name` | `.user-name` inside `.quiz-info` | Targets nested elements |
| Combined Class | `.screen.hidden` | Elements with BOTH classes | An element that is a screen AND hidden |
| Pseudo-class | `.btn:hover` | Element in a specific state | Styles when mouse hovers over button |
| Pseudo-element | `.progress-bar::after` | A virtual element created by CSS | The colored fill inside the progress bar |
| Attribute | `.option-btn:not(.disabled)` | Elements that DON'T have a class | Hover effect only on enabled options |

### 11.3 The Difference: `.screen.hidden` vs `.screen .hidden`

This confuses many beginners:

```css
/* NO SPACE: Element with BOTH classes on the SAME element */
.screen.hidden { display: none; }
/* Matches: <section class="screen hidden"> */

/* WITH SPACE: .hidden element INSIDE a .screen element */
.screen .hidden { display: none; }
/* Matches: <section class="screen"><div class="hidden"></div></section> */
```

**Our project uses `.screen.hidden`** (no space) because we add/remove the `hidden` class on the same `<section>` element.

### 11.4 CSS Variables (Custom Properties)

Variables let you define a value once and reuse it everywhere:

```css
:root {
    --primary: #6366f1;    /* Define */
}

.btn-primary {
    background: var(--primary);  /* Use */
}
```

| Concept | Explanation |
|---------|-------------|
| `:root` | The highest-level selector (targets `<html>`). Variables here are available everywhere |
| `--name` | The `--` prefix marks it as a custom property. You choose the name |
| `var(--name)` | Retrieves the value of a custom property |
| Why use them? | Change `--primary` in one place → every button, link, accent color updates automatically |

### 11.5 CSS Box Model

Every element is a box with four layers:

```
┌─── Margin (space OUTSIDE the border) ───┐
│  ┌─── Border ─────────────────────────┐  │
│  │  ┌─── Padding (space INSIDE) ───┐  │  │
│  │  │                              │  │  │
│  │  │        Content               │  │  │
│  │  │                              │  │  │
│  │  └──────────────────────────────┘  │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

**`box-sizing: border-box`** (used in our reset) means:
- Width you set = total width (including padding + border)
- Without it: width = content only, padding and border are ADDED on top (unexpected)

### 11.6 Flexbox Layout

Flexbox arranges items in a row or column with automatic spacing:

```css
.quiz-info {
    display: flex;              /* Enable flexbox */
    justify-content: space-between;  /* Space items apart horizontally */
    align-items: center;        /* Center items vertically */
}
```

| Property | What It Does |
|----------|-------------|
| `display: flex` | Turns container into a flex container |
| `flex-direction: column` | Stack children vertically (default is row) |
| `justify-content` | Horizontal alignment (space-between, center, flex-end) |
| `align-items` | Vertical alignment (center, flex-start, flex-end) |
| `gap` | Space between flex children |
| `flex: 1` | Child grows to fill remaining space |

### 11.7 CSS Grid Layout

Grid creates a 2D layout (rows AND columns):

```css
.category-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;  /* Two equal columns */
    gap: 1.5rem;
}
```

| Value | Meaning |
|-------|---------|
| `1fr` | 1 fraction of available space |
| `1fr 1fr` | Two equal columns |
| `gap` | Space between grid cells |

### 11.8 Animations and Transitions

**Transitions** = smooth change when a property changes:

```css
.btn {
    transition: all 0.2s ease;  /* Animate ALL property changes over 0.2 seconds */
}
.btn:hover {
    transform: translateY(-2px);  /* Moves up 2px — transition makes it smooth */
}
```

**Animations** = multi-step sequences that play automatically:

```css
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }  /* Start: invisible, 20px down */
    to { opacity: 1; transform: translateY(0); }        /* End: visible, normal position */
}

.screen {
    animation: fadeIn 0.3s ease;  /* Play fadeIn over 0.3 seconds */
}
```

| Keyword | Meaning |
|---------|---------|
| `@keyframes` | Defines the animation steps |
| `from` / `to` | Start and end states (can also use percentages: `0%`, `50%`, `100%`) |
| `animation: name duration timing` | Applies the animation to an element |
| `ease` | Starts slow, speeds up, then slows down (natural feel) |

### 11.9 The `conic-gradient` Timer Circle

The timer uses a clever CSS trick:

```css
.timer-circle {
    background: conic-gradient(
        var(--primary) var(--timer-progress),  /* Colored arc */
        var(--bg-input) 0%                     /* Gray remainder */
    );
    border-radius: 9999px;  /* Makes it circular */
}
```

JavaScript updates `--timer-progress` from `100%` to `0%` each second, creating a circular countdown animation purely with CSS.

### 11.10 Responsive Design with Media Queries

```css
@media (max-width: 600px) {
    .category-grid { grid-template-columns: 1fr; }  /* Single column on small screens */
}
```

`@media` applies styles **only** when the condition is true. `max-width: 600px` means "screens narrower than 600 pixels" (most phones).

---

## 12. JavaScript Deep-Dive

### 12.1 Variables: `const`, `let`, `var`

```javascript
const name = 'John';   // Cannot be reassigned. Use for things that don't change.
let score = 0;         // Can be reassigned. Use for things that change.
var old = 'avoid';     // Old syntax. Use let instead.
```

| Keyword | Can Reassign? | Block Scoped? | Use When |
|---------|:---:|:---:|----------|
| `const` | ❌ No | ✅ Yes | Default choice. Values that shouldn't change |
| `let` | ✅ Yes | ✅ Yes | Values that will change (counters, state) |
| `var` | ✅ Yes | ❌ No | Avoid. Legacy code only |

**"Block scoped"** means the variable only exists inside its `{ }` block. `var` leaks out, which causes bugs.

### 12.2 Data Types

| Type | Example | Used For |
|------|---------|---------|
| String | `'hello'` or `"hello"` | Text |
| Number | `42` or `3.14` | Math, scores, indices |
| Boolean | `true` or `false` | Conditions, flags |
| Array | `[1, 2, 3]` | Lists of items |
| Object | `{ name: 'John' }` | Grouped data with labels |
| null | `null` | Intentionally empty |
| undefined | `undefined` | Not yet assigned |

### 12.3 Objects — The Core Data Structure

An object stores related data as **key-value pairs**:

```javascript
// Each question is an object:
{
    category: "html",           // key: value
    question: "What does...",   // key: value
    options: ["A", "B", "C"],   // key: value (value is an array)
    correct: 2                  // key: value
}
```

**Accessing values:**
```javascript
const q = questions[0];
q.category       // "html"        — dot notation
q['category']    // "html"        — bracket notation (same result)
q.options[2]     // Third option  — dot + array index
```

### 12.4 Arrow Functions (`=>`)

Arrow functions are a shorter way to write functions:

```javascript
// Traditional function:
function add(a, b) {
    return a + b;
}

// Arrow function (same thing):
const add = (a, b) => {
    return a + b;
};

// Even shorter (if only one expression):
const add = (a, b) => a + b;

// No parameters:
const greet = () => console.log('Hello!');

// One parameter (parentheses optional):
const double = x => x * 2;
```

**Where we use arrow functions in this project:**

```javascript
// In addEventListener callbacks:
button.addEventListener('click', () => {
    // do something when clicked
});

// In array methods:
questions.filter(q => q.category === 'html');

// In setInterval:
setInterval(() => {
    this.timeLeft--;
}, 1000);
```

#### ⚠️ Common Mistake: Arrow Functions and `this`

```javascript
// Arrow functions do NOT have their own 'this'.
// This matters when used as object methods:

// ❌ WRONG — arrow function as object method:
const obj = {
    name: 'Timer',
    getName: () => this.name   // 'this' is NOT obj — it's the outer scope!
};

// ✅ CORRECT — regular function as object method:
const obj = {
    name: 'Timer',
    getName() { return this.name; }  // 'this' IS obj. Works correctly.
};
```

> **When to use which?** Use `() =>` for callbacks (event listeners, array methods, timers). Use `function` or shorthand (`getName() {}`) for object methods.

### 12.5 `.textContent` — Reading and Writing Text

`.textContent` is a **property** (not a method — no parentheses when reading):

```javascript
// READ the text inside an element:
const score = document.getElementById('final-score').textContent;  // "0"

// WRITE new text into an element:
document.getElementById('final-score').textContent = '850';
// Now the HTML shows: <span id="final-score">850</span>

// Difference from .innerHTML:
element.textContent = '<b>Bold</b>';   // Shows literal text: "<b>Bold</b>"
element.innerHTML = '<b>Bold</b>';     // Shows formatted: Bold
// textContent is safer (prevents HTML injection attacks)
```

### 12.6 `document.getElementById()` and `document.querySelector()`

These find HTML elements so you can manipulate them:

```javascript
// getElementById — finds by ID attribute (fastest, most common)
const timer = document.getElementById('timer-text');

// querySelector — finds by ANY CSS selector (more flexible)
const firstBtn = document.querySelector('.btn');         // First .btn
const allBtns = document.querySelectorAll('.btn');       // ALL .btn elements

// querySelectorAll returns a NodeList (like an array):
allBtns.forEach(btn => {
    btn.classList.add('disabled');
});
```

| Method | Returns | Use When |
|--------|---------|---------|
| `getElementById('x')` | Single element or null | You have an `id` attribute |
| `querySelector('.x')` | First match or null | You need CSS selector power |
| `querySelectorAll('.x')` | All matches (NodeList) | You need ALL matching elements |

### 12.7 `.addEventListener()` — Making Things Interactive

This is how JavaScript makes your page respond to user actions:

```javascript
// Syntax:
element.addEventListener('eventName', callbackFunction);

// Example from this project:
document.getElementById('next-btn').addEventListener('click', () => {
    state.currentQuestionIndex++;
    loadQuestion();
});
// Translation: "When #next-btn is CLICKED, run this arrow function"
```

**Common Events:**

| Event | Fires When |
|-------|-----------|
| `'click'` | User clicks the element |
| `'submit'` | Form is submitted |
| `'mouseover'` | Mouse enters the element |
| `'keydown'` | Key is pressed |
| `'change'` | Input value changes |
| `'load'` | Page finishes loading |

### 12.8 `e.preventDefault()` — Stopping Default Behavior

Browsers have default actions for certain events. `preventDefault()` stops them:

```javascript
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();  // STOP the page from reloading!
    // Now handle the form with JavaScript instead
});
```

| Event | Default Behavior | Why Prevent It |
|-------|-----------------|---------------|
| Form `submit` | Page reloads | We want to handle login with JS |
| Link `click` | Navigates to URL | We want to do something else |

The `e` parameter is the **event object** — it contains info about what happened.

### 12.9 `.classList` — Adding/Removing CSS Classes

```javascript
const element = document.getElementById('quiz-screen');

element.classList.add('hidden');      // Adds the 'hidden' class
element.classList.remove('hidden');   // Removes the 'hidden' class
element.classList.toggle('hidden');   // Adds if missing, removes if present
element.classList.contains('hidden'); // Returns true or false
```

**This is how we switch screens:**
```javascript
function showScreen(screenId) {
    // 1. Hide ALL screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    // 2. Show the ONE we want
    document.getElementById(screenId).classList.remove('hidden');
}
```

### 12.10 `localStorage` — Saving Data in the Browser

#### What IS `localStorage`?

`localStorage` is **NOT** a variable you declare, a keyword, or a function you define. It is a **built-in Web API object** that the browser provides automatically — just like `document`, `console`, and `window`. Every browser tab has access to it without you writing a single line of setup code.

**Analogy:** Think of `localStorage` as a **notebook built into the browser**. Any website can write notes in it, read them back later, and erase them. The notebook survives even if you close the browser and reopen it tomorrow. Each website gets its own separate notebook — `google.com` can't read `facebook.com`'s notes.

```javascript
// You DON'T declare it — it already exists:
console.log(localStorage);  // Storage { length: 0 }   ← it's just THERE

// It's actually a property of the global 'window' object:
window.localStorage === localStorage;  // true
// That's why you can use 'localStorage' directly, just like 'document' and 'console'
```

#### How It Works — All Methods

```javascript
// 1. SAVE data (key-value pair — both are stored as STRINGS):
localStorage.setItem('username', 'John');

// 2. READ data (returns a string, or null if key doesn't exist):
const name = localStorage.getItem('username');   // "John"
const missing = localStorage.getItem('xyz');     // null  (not undefined!)

// 3. DELETE one item:
localStorage.removeItem('username');

// 4. DELETE ALL items for this website:
localStorage.clear();

// 5. Check how many items are stored:
localStorage.length;  // 0, 1, 2, etc.
```

| Method | What It Does | Returns |
|--------|-------------|---------|
| `.setItem(key, value)` | Saves a key-value pair | Nothing |
| `.getItem(key)` | Reads the value for that key | String or `null` |
| `.removeItem(key)` | Deletes that one key-value pair | Nothing |
| `.clear()` | Deletes ALL stored data for this site | Nothing |
| `.length` | Number of items stored (property, not method) | Number |

#### The String-Only Rule — Why We Need JSON

localStorage can **only store strings**. If you try to store an object or array, it converts it to the useless string `"[object Object]"`:

```javascript
// ❌ WRONG — this stores the string "[object Object]", not the actual data!
localStorage.setItem('user', { name: 'John', score: 100 });
localStorage.getItem('user');  // "[object Object]"  ← USELESS

// ✅ CORRECT — convert to JSON string first, then parse when reading:
localStorage.setItem('user', JSON.stringify({ name: 'John', score: 100 }));
// Stored as: '{"name":"John","score":100}'  ← readable string

const user = JSON.parse(localStorage.getItem('user'));
// user is now a real object: { name: 'John', score: 100 }
```

| Function | Direction | Example |
|----------|-----------|---------|
| `JSON.stringify(obj)` | Object → String | `{ name: 'John' }` → `'{"name":"John"}'` |
| `JSON.parse(str)` | String → Object | `'{"name":"John"}'` → `{ name: 'John' }` |

#### ⚠️ Common Mistake: `getItem` returns `null`, not `undefined`

```javascript
const data = localStorage.getItem('nonexistent');

// data is null, NOT undefined
// But JSON.parse(null) returns null (no crash), so this pattern is safe:
const user = JSON.parse(localStorage.getItem('currentUser'));
// If key doesn't exist: user = null
// If key exists: user = { name: 'John', ... }

// Our project uses this pattern with a fallback:
const users = JSON.parse(localStorage.getItem('users') || '[]');
// If 'users' key doesn't exist: null || '[]' → JSON.parse('[]') → empty array
// If 'users' key exists: returns the stored array
```

#### localStorage vs sessionStorage

| Feature | `localStorage` | `sessionStorage` |
|---------|:-:|:-:|
| Survives page refresh? | ✅ Yes | ✅ Yes |
| Survives closing browser? | ✅ Yes | ❌ No |
| Shared between tabs? | ✅ Yes (same site) | ❌ No (per tab) |
| Storage limit | ~5-10 MB | ~5-10 MB |
| **We use it for** | User accounts, leaderboard | — |

#### Where localStorage Is Used in This Project

| What's Stored | Key | Purpose |
|--------------|-----|---------|
| Current logged-in user | `'currentUser'` | Session persistence (remembers you after refresh) |
| All registered users | `'users'` | User database (when backend is offline) |
| Leaderboard scores | `'leaderboard'` | Top 10 scores list |

#### When Else Would You Use localStorage?

- **Dark/light theme preference** — save user's theme choice
- **Shopping cart** — remember items between visits
- **Form drafts** — auto-save a half-written blog post
- **Game saves** — store game progress
- **Language preference** — remember if user switched to Spanish

### 12.11 Array Methods Used in This Project

```javascript
const nums = [3, 1, 4, 1, 5];

// .forEach() — Do something with each item (no return value)
nums.forEach(n => console.log(n));  // Prints: 3, 1, 4, 1, 5

// .filter() — Keep only items that pass a test (returns NEW array)
const big = nums.filter(n => n > 2);  // [3, 4, 5]

// .map() — Transform each item (returns NEW array)
const doubled = nums.map(n => n * 2);  // [6, 2, 8, 2, 10]

// .find() — Get the FIRST item that passes a test
const found = nums.find(n => n > 3);   // 4

// .sort() — Sort items (MODIFIES original array)
nums.sort((a, b) => a - b);  // [1, 1, 3, 4, 5]

// .slice() — Copy a portion (returns NEW array)
const first3 = nums.slice(0, 3);  // [1, 1, 3]

// .push() — Add to end
nums.push(9);  // [1, 1, 3, 4, 5, 9]

// .fill() — Fill with a value
new Array(5).fill(null);  // [null, null, null, null, null]

// Spread operator — Copy an array
const copy = [...nums];  // New array, same values
```

**Where each is used in the project:**

| Method | Where Used | Purpose |
|--------|-----------|---------|
| `.forEach()` | `options.forEach(...)` | Build option buttons |
| `.filter()` | `questions.filter(q => q.category === 'html')` | Get questions for selected category |
| `.map()` | `timesArray.map((_, i) => 'Q' + (i + 1))` | Create chart labels |
| `.find()` | `users.find(u => u.email === email)` | Look up user by email |
| `.sort()` | `leaderboard.sort((a, b) => b.score - a.score)` | Sort by score descending |
| `.slice()` | `leaderboard.slice(0, 10)` | Keep only top 10 |
| `.push()` | `users.push(newUser)` | Add user to the list |
| `.fill()` | `new Array(length).fill(null)` | Initialize answers array |
| `...spread` | `[...questions]` | Copy array (so we don't modify original) |

### 12.12 `setInterval` and `clearInterval` — Timers

```javascript
// Start a repeating timer:
const timerId = setInterval(() => {
    console.log('Tick!');  // Runs every 1000ms (1 second)
}, 1000);

// Stop the timer:
clearInterval(timerId);
```

**In our timer module:**
```javascript
// Start: runs callback every second
this.intervalId = setInterval(() => {
    this.timeLeft--;          // Decrease time
    onTick(this.timeLeft);    // Update display
    if (this.timeLeft <= 0) {
        this.stop();          // Clear interval
        onTimeUp();           // Handle timeout
    }
}, 1000);

// Stop: prevents further ticks
clearInterval(this.intervalId);
```

| Function | What It Does |
|----------|-------------|
| `setInterval(fn, ms)` | Calls `fn` every `ms` milliseconds. Returns an ID |
| `clearInterval(id)` | Stops the interval with that ID |
| `setTimeout(fn, ms)` | Calls `fn` ONCE after `ms` milliseconds |
| `Date.now()` | Current time in milliseconds since 1970 |

#### When Else Would You Use Timers?

| Pattern | Use Case | Example |
|---------|----------|---------|
| `setInterval(fn, 1000)` | Repeat every N ms | Clocks, live updates, polling a server |
| `setTimeout(fn, 3000)` | Run ONCE after delay | Show a notification after 3 seconds |
| `requestAnimationFrame(fn)` | Smooth visual animations | Games, scroll effects (runs at 60fps) |

> **Tip:** Always store the ID from `setInterval` / `setTimeout` so you can cancel them later with `clearInterval` / `clearTimeout`. Forgetting this causes **memory leaks** — the timer runs forever in the background.

### 12.13 `document.createElement()` and `.innerHTML`

```javascript
// createElement — Build elements one by one (safer):
const btn = document.createElement('button');
btn.className = 'option-btn';
btn.textContent = 'Option A';
container.appendChild(btn);

// innerHTML — Write HTML as a string (faster for complex markup):
container.innerHTML = `
    <div class="review-item">
        <span>Q1</span>
        <p>Question text here</p>
    </div>
`;
```

| Approach | Pros | Cons |
|----------|------|------|
| `createElement` | Safer (no XSS), precise control | More code for complex HTML |
| `innerHTML` | Concise for complex HTML | XSS risk if using user input |

### 12.14 Template Literals (Backtick Strings)

Template literals use backticks (`` ` ``) instead of quotes, and allow embedded expressions:

```javascript
const name = 'John';
const score = 850;

// Old way (concatenation):
const msg = 'Hello ' + name + '! Your score is ' + score + '.';

// Template literal way:
const msg = `Hello ${name}! Your score is ${score}.`;

// Multi-line strings:
const html = `
    <div class="review-item">
        <span>${name}</span>
        <span>${score} points</span>
    </div>
`;
```

The `${}` syntax can contain any JavaScript expression:
```javascript
`${isCorrect ? '✅' : '❌'}`         // Ternary operator inside template
`Q${i + 1}`                           // Math inside template
`${q.options[answer.selected]}`       // Array access inside template
```

### 12.15 The Ternary Operator (`? :`)

A shorthand for if/else that returns a value:

```javascript
// if/else version:
let icon;
if (isCorrect) {
    icon = '✅';
} else {
    icon = '❌';
}

// Ternary version (same result):
const icon = isCorrect ? '✅' : '❌';

// Syntax: condition ? valueIfTrue : valueIfFalse

// Nested ternary (used in charts.js for bar colors):
const color = t <= 10 ? '#22c55e' :    // green if fast
              t <= 20 ? '#f59e0b' :    // yellow if medium
              '#ef4444';               // red if slow
```

### 12.16 Object Pattern: The Module

Our `Timer`, `Auth`, and `Charts` files use the **object module pattern**:

```javascript
const Timer = {
    timeLeft: 30,              // Property (data)
    start(onTick, onTimeUp) {  // Method (function)
        // ...
    },
    stop() {                   // Another method
        // ...
    }
};
```

**Why?** Groups related functions and data together. `Timer.start()` is cleaner than having loose functions everywhere.

### 12.17 `getAttribute()` and `data-*` Attributes

```javascript
// HTML: <button data-category="html">HTML</button>

const card = document.querySelector('.category-card');
const category = card.getAttribute('data-category');  // "html"

// Alternative (dataset property):
const category = card.dataset.category;  // "html"
// data-category → dataset.category (removes 'data-' prefix, uses camelCase)
```

### 12.18 `confirm()` — Browser Dialog

```javascript
const confirmed = confirm('Are you sure you want to end the quiz?');
// Shows a popup with OK and Cancel buttons
// Returns true if OK, false if Cancel

if (confirmed) {
    finishQuiz();
}
```

### 12.19 Immediately Invoked Function Expression (IIFE)

```javascript
(function init() {
    const user = Auth.getCurrentUser();
    if (user) {
        showCategoryScreen();
    } else {
        showScreen('auth-screen');
    }
})();
```

The `()` at the end **immediately calls** the function. This runs once when the page loads, checking if a user is already logged in.

### 12.20 `style.setProperty()` — Changing CSS Variables from JavaScript

```javascript
// Update a CSS variable from JavaScript:
document.getElementById('progress-bar').style.setProperty('--progress', '75%');

// This changes the CSS variable, which CSS uses:
// .progress-bar::after { width: var(--progress); }
```

This is how the progress bar and timer circle animate — JavaScript updates CSS variables, and CSS transitions handle the smooth animation.

### 12.21 Template Literals (Backtick Strings)

Our project uses backtick strings (`` ` ` ``) extensively instead of regular quotes. They are **not just a different quote style** — they unlock powerful features:

#### Basic Syntax

```javascript
// Regular strings — NO variable embedding:
const greeting = 'Hello, ' + name + '! Your score is ' + score + '.';

// Template literal — EMBED variables directly with ${}:
const greeting = `Hello, ${name}! Your score is ${score}.`;
// These produce the EXACT same result, but template literals are cleaner
```

#### Why Template Literals Are Better

**1. Variable Embedding (String Interpolation)**
```javascript
const name = 'John';
const score = 850;

// Old way (string concatenation — messy with many variables):
const msg = 'Player ' + name + ' scored ' + score + ' out of ' + max + ' points.';

// Template literal way (clean and readable):
const msg = `Player ${name} scored ${score} out of ${max} points.`;
```

**2. Multi-Line Strings**
```javascript
// Old way — need \n for each line break:
const html = '<div class="item">\n  <span>' + name + '</span>\n</div>';

// Template literal — just press Enter:
const html = `
    <div class="item">
        <span>${name}</span>
    </div>
`;
// Much easier to read, especially for HTML!
```

**3. Expressions Inside `${}`**
```javascript
// You can put ANY JavaScript expression inside ${}:
const msg = `You got ${correct} out of ${total} (${Math.round(correct/total * 100)}%)`;
const status = `Status: ${isCorrect ? '✅ Correct' : '❌ Wrong'}`;
```

#### Where Template Literals Are Used in This Project

```javascript
// In buildReview() — building HTML for each review item:
li.innerHTML = `
    <span class="rank">${i + 1}</span>
    <span class="name">${entry.name}</span>
    <span class="score">${entry.score}</span>
`;

// In fetch URLs — embedding the API base URL:
const response = await fetch(`${API_URL}/api/signup`);

// In progress text:
document.getElementById('progress-text').textContent = `${index + 1}/${total}`;
```

#### ⚠️ Common Mistake: Wrong Quote Type

```javascript
// ❌ Using regular quotes with ${} — it prints literally:
const msg = 'Hello, ${name}';    // "Hello, ${name}"  ← treated as text!

// ✅ Using backticks — variable is replaced:
const msg = `Hello, ${name}`;    // "Hello, John"     ← variable inserted!
```

> **Rule:** If you need `${}` or multi-line strings, you MUST use backticks (`` ` ``). Single (`'`) and double (`"`) quotes do NOT support these features.

---

### 12.22 The Object/Module Pattern — Why `const Auth = { ... }`

Our project groups related functions into objects: `Auth`, `Timer`, and `Charts`. This is called the **Module Pattern** and it's used to organize code.

#### The Problem Without It

```javascript
// ❌ BAD — Functions scattered everywhere with no organization:
function startTimer() { ... }
function stopTimer() { ... }
function getElapsed() { ... }
function signup() { ... }
function login() { ... }
function logout() { ... }
function createPieChart() { ... }
function createBarChart() { ... }

// Which function belongs to which feature?
// What if two features need a 'start()' function? Naming conflict!
```

#### The Solution: Object Modules

```javascript
// ✅ GOOD — Functions grouped by feature:
const Timer = {
    timeLeft: 30,
    start() { ... },      // Timer.start()
    stop() { ... },       // Timer.stop()
    getElapsed() { ... }  // Timer.getElapsed()
};

const Auth = {
    signup() { ... },         // Auth.signup()
    login() { ... },          // Auth.login()
    logout() { ... },         // Auth.logout()
    getCurrentUser() { ... }  // Auth.getCurrentUser()
};

const Charts = {
    pieChart: null,
    createPieChart() { ... },  // Charts.createPieChart()
    createBarChart() { ... }   // Charts.createBarChart()
};
```

#### Why This Is Better

| Benefit | Explanation |
|---------|------------|
| **Organization** | All timer code is in `Timer`, all auth code is in `Auth` |
| **No naming conflicts** | `Timer.start()` and `Game.start()` can coexist |
| **Shared state** | Functions in the same object can share variables (like `Timer.timeLeft`) |
| **Clear ownership** | When you read `Auth.login()`, you instantly know it's authentication code |

#### What Is `this` Inside These Objects?

Inside an object's method, `this` refers to **the object itself**:

```javascript
const Timer = {
    timeLeft: 30,
    intervalId: null,

    start() {
        this.timeLeft = 30;         // this = Timer → Timer.timeLeft = 30
        this.stop();                // this = Timer → calls Timer.stop()
        this.intervalId = setInterval(() => {
            this.timeLeft--;        // this = Timer (arrow function inherits it)
        }, 1000);
    },

    stop() {
        clearInterval(this.intervalId);   // this = Timer → Timer.intervalId
        this.intervalId = null;
    }
};
```

| `this.____` | Is the same as | Value |
|------------|----------------|-------|
| `this.timeLeft` | `Timer.timeLeft` | `30` |
| `this.intervalId` | `Timer.intervalId` | `null` or a number |
| `this.stop()` | `Timer.stop()` | Calls the stop function |

#### ⚠️ Common Mistake: `this` in Regular Functions vs Arrow Functions

```javascript
const Timer = {
    timeLeft: 30,

    start() {
        // ❌ REGULAR function — 'this' is LOST inside setInterval:
        setInterval(function() {
            this.timeLeft--;    // 'this' is NOT Timer here! It's 'window'.
        }, 1000);

        // ✅ ARROW function — 'this' is INHERITED from start():
        setInterval(() => {
            this.timeLeft--;    // 'this' IS Timer here. Arrow functions inherit it.
        }, 1000);
    }
};
```

> **Rule:** Inside `setInterval`, `setTimeout`, `addEventListener`, and other callbacks, always use `() => {}` (arrow function) if you need `this` to refer to your object. Regular `function() {}` creates its own `this`.

#### How Is This Different From a `class`?

```javascript
// Object pattern (what we use — simpler for one-off modules):
const Timer = {
    timeLeft: 30,
    start() { ... },
    stop() { ... }
};
// There's only ONE Timer. You use it directly: Timer.start()

// Class pattern (for when you need MULTIPLE instances):
class Timer {
    constructor() { this.timeLeft = 30; }
    start() { ... }
    stop() { ... }
}
// You create instances: const timer1 = new Timer(); const timer2 = new Timer();
```

| Pattern | Use When | Our Project |
|---------|---------|-------------|
| Object `{ }` | You need exactly ONE (singleton) | `Timer`, `Auth`, `Charts` |
| `class` | You need MULTIPLE instances | If we had multiple timers on screen |

---

### 12.23 `async/await` — Handling Things That Take Time

Some operations take time — fetching data from a server, reading a file, waiting for a database. JavaScript uses **Promises** and **async/await** to handle these without freezing the page.

#### The Problem: Why Can't We Just Wait?

```javascript
// ❌ If JavaScript COULD do this (it can't):
const response = waitForServer('https://api.example.com/data');
// The ENTIRE page would freeze for 2 seconds while waiting.
// No scrolling, no clicking, no animations. Terrible user experience.

// ✅ JavaScript's solution: do it ASYNCHRONOUSLY
// "Start the request, keep the page running, tell me when it's done."
```

#### What Is a Promise?

A **Promise** is an object that represents a value that **doesn't exist yet** but will eventually:

```javascript
// Analogy: A Promise is like ordering food at a restaurant.
// You get a receipt (the Promise), not the food itself.
// The receipt says: "Your order WILL be ready soon."
// You can go sit down and chat (other code runs) while waiting.
// When the food IS ready, the waiter brings it to you (the Promise resolves).

const receipt = fetch('https://api.example.com/data');
// receipt is a Promise — the data isn't here yet
// It's either:
//   - Pending    (food is being prepared)
//   - Fulfilled  (food is ready — here's your data!)
//   - Rejected   (kitchen fire — error!)
```

| State | Meaning | Analogy |
|-------|---------|---------|
| **Pending** | Still waiting for a result | Food is being cooked |
| **Fulfilled** | Success — result is available | Food is served |
| **Rejected** | Error — something went wrong | Kitchen fire, order cancelled |

#### `async` / `await` Syntax

`async/await` is **syntactic sugar** — a cleaner way to work with Promises:

```javascript
// STEP 1: Mark the function as 'async'
async function getScore() {

    // STEP 2: Use 'await' before any Promise to pause and wait for its result
    const response = await fetch('https://api.example.com/scores');
    // JavaScript pauses HERE (but the page stays responsive!)
    // When the server responds, it continues to the next line:

    const data = await response.json();
    // .json() is ALSO a Promise (it takes time to parse the response body)

    return data;
}
```

| Keyword | What It Does | Where To Put It |
|---------|-------------|----------------|
| `async` | Marks a function as asynchronous (can use `await` inside) | Before `function` keyword |
| `await` | Pauses execution until the Promise resolves, then gives you the result | Before any Promise (only inside `async` functions) |

#### `try/catch` — Handling Errors in Async Code

Network requests can fail (server down, no internet). Use `try/catch` to handle errors gracefully:

```javascript
async function signup(name, email, password) {
    try {
        // TRY to do these steps:
        const response = await fetch(`${API_URL}/api/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        return data;

    } catch (error) {
        // If ANYTHING above fails, jump here:
        console.warn('Server unreachable:', error);
        return this.localSignup(name, email, password);  // Fallback!
    }
}
```

| Block | When It Runs | Analogy |
|-------|-------------|---------|
| `try { }` | Attempts to execute the code inside | "Try driving to the store" |
| `catch (error) { }` | Only runs if `try` block threw an error | "If the car breaks down, walk instead" |

#### Where async/await Is Used in This Project

| Function | Why It's Async | What It Awaits |
|----------|---------------|---------------|
| `Auth.signup()` | Sends user data to Flask server | `fetch()` and `.json()` |
| `Auth.login()` | Verifies credentials with server | `fetch()` and `.json()` |
| `finishQuiz()` | Needs to save results to server | `saveToLeaderboard()` |
| `saveToLeaderboard()` | Fetches shared leaderboard from server | `fetch()` and `.json()` |
| `saveToBackend()` | Saves quiz results to PostgreSQL | `fetch()` |

#### ⚠️ Common Mistake: Forgetting `await`

```javascript
// ❌ WRONG — forgot 'await', so 'data' is a Promise, not the actual data:
async function getData() {
    const response = fetch('https://api.example.com/data');  // Missing await!
    const data = response.json();                            // Missing await!
    console.log(data);  // Promise { <pending> }  ← NOT the data!
}

// ✅ CORRECT — 'await' unwraps the Promise to give you the actual value:
async function getData() {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);  // { scores: [100, 200, 300] }  ← actual data!
}
```

---

### 12.24 `fetch()` — The Browser's Way to Talk to a Server

`fetch()` is a **built-in browser function** (like `localStorage`, you don't install it) that sends HTTP requests to a server and receives responses.

#### Basic Syntax

```javascript
// Simplest form — GET request (just fetch data):
const response = await fetch('https://api.example.com/scores');
const data = await response.json();
```

#### The Two-Step Process

Every `fetch()` is a **two-step** operation:

```javascript
// STEP 1: Get the response envelope (headers, status code)
const response = await fetch('https://api.example.com/data');
//                     └─ Returns a Response object (like a sealed envelope)

// STEP 2: Read the body (open the envelope and read the letter)
const data = await response.json();
//                  └─ Parses the JSON body into a JavaScript object
```

| Step | What You Get | Analogy |
|------|-------------|---------|
| `await fetch(url)` | Response object (envelope) | Receiving a sealed letter |
| `await response.json()` | Parsed JavaScript object (data) | Opening and reading the letter |

#### Sending Data — POST Requests

To **send** data to a server (like signup info), you add options:

```javascript
const response = await fetch('https://api.example.com/api/signup', {
    method: 'POST',                                    // What type of request
    headers: { 'Content-Type': 'application/json' },   // "I'm sending JSON"
    body: JSON.stringify({ name, email, password })     // The actual data
});
```

| Option | What It Means | Analogy |
|--------|-------------|---------|
| `method: 'POST'` | Sending data TO the server | Mailing a letter |
| `method: 'GET'` | Requesting data FROM the server (default) | Checking your mailbox |
| `headers` | Extra info about the request | Writing "FRAGILE" on a package |
| `'Content-Type': 'application/json'` | "The data I'm sending is in JSON format" | Label on the package |
| `body` | The actual data being sent | Contents inside the package |

#### HTTP Methods Explained

| Method | Purpose | Example in Our Project |
|--------|---------|----------------------|
| `GET` | Retrieve/read data | `fetch('/api/leaderboard')` — get top scores |
| `POST` | Create/send new data | `fetch('/api/signup', { method: 'POST', ... })` — create account |
| `PUT` | Update existing data | (Not used in our project yet) |
| `DELETE` | Remove data | (Not used in our project yet) |

#### The Complete Fetch Pattern Used in Our Project

```javascript
async function signup(name, email, password) {
    try {
        // 1. SEND the request
        const response = await fetch(`${API_URL}/api/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        // 2. READ the response
        const data = await response.json();
        // data = { success: true, user: { name: 'John', email: '...' } }

        // 3. USE the response
        if (data.success) {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
        }
        return data;

    } catch (error) {
        // 4. HANDLE failure (server unreachable)
        console.warn('Backend down:', error);
        return fallbackMethod();
    }
}
```

#### ⚠️ Common Mistake: `fetch()` Doesn't Throw on HTTP Errors

```javascript
// fetch() only throws on NETWORK errors (no internet, DNS failure)
// It does NOT throw on HTTP errors like 404 or 500!

const response = await fetch('/api/nonexistent');
// response.ok === false
// response.status === 404
// But NO error is thrown! You must check manually:

if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
}
```

#### When Else Would You Use fetch()?

- **Weather app** — fetch forecast data from a weather API
- **Social media** — load posts, send comments
- **E-commerce** — load products, submit orders
- **Any website** that loads data without refreshing the full page

---

### 12.25 Common Mistakes & Gotchas for Beginners

These are the mistakes that trip up almost every beginner. Knowing these will save you hours of debugging:

#### 1. `===` vs `==` (Strict vs Loose Equality)

```javascript
// == (loose) converts types before comparing:
5 == '5'       // true   ← string '5' is converted to number 5
0 == false     // true   ← false is converted to 0
null == undefined  // true

// === (strict) compares WITHOUT converting:
5 === '5'      // false  ← number is not a string
0 === false    // false  ← number is not a boolean
null === undefined  // false
```

> **Rule:** Always use `===` and `!==`. The loose versions (`==`, `!=`) cause subtle bugs.

#### 2. Forgetting `e.preventDefault()` on Forms

```javascript
// ❌ Without preventDefault — the page RELOADS and your code does nothing:
form.addEventListener('submit', (e) => {
    // This code runs, but then the browser immediately reloads the page!
    // Everything you did is lost.
});

// ✅ With preventDefault — the page stays put:
form.addEventListener('submit', (e) => {
    e.preventDefault();  // "Browser, do NOT reload the page"
    // Now your code actually works.
});
```

**What default behaviors can be prevented?**

| Event | Default Behavior | Why Prevent It |
|-------|-----------------|---------------|
| Form `submit` | Reloads the page | We want to handle it with JavaScript |
| Link `click` | Navigates to `href` | We want to do something else on click |
| Keyboard `keydown` | Types the character | We want to use the key as a shortcut |
| Right-click `contextmenu` | Shows context menu | We want a custom menu |

#### 3. String vs Number Confusion

```javascript
// Input values are ALWAYS strings, even if the user types a number:
const input = document.getElementById('age-input');
const age = input.value;    // "25" ← STRING, not number!

// ❌ String math is wrong:
"25" + 5     // "255"  ← concatenation, not addition!

// ✅ Convert to number first:
Number("25") + 5     // 30  ← actual math
parseInt("25") + 5   // 30  ← also works
+"25" + 5            // 30  ← shorthand (unary +)
```

#### 4. Modifying an Array While Looping Over It

```javascript
// ❌ DANGEROUS — removing items while looping causes skips:
const items = [1, 2, 3, 4, 5];
items.forEach((item, i) => {
    if (item === 3) items.splice(i, 1);  // Removes index 2
    // Now index 3 (the old "4") shifted to index 2 — SKIPPED!
});

// ✅ SAFE — use .filter() to create a new array:
const filtered = items.filter(item => item !== 3);  // [1, 2, 4, 5]
```

#### 5. Not Handling `null` / `undefined`

```javascript
// ❌ CRASH — trying to access a property on null:
const user = JSON.parse(localStorage.getItem('nonexistent'));
// user is null
console.log(user.name);  // TypeError: Cannot read property 'name' of null

// ✅ SAFE — check first:
const user = JSON.parse(localStorage.getItem('nonexistent'));
if (user) {
    console.log(user.name);  // Only runs if user is not null
}

// ✅ Even safer — using optional chaining (?.) :
console.log(user?.name);  // Returns undefined instead of crashing
```

#### 6. Async Functions Return Promises, Not Values

```javascript
// ❌ WRONG — result is a Promise, not the data:
function getUserData() {
    const data = Auth.login(email, password);  // Auth.login is async!
    console.log(data);  // Promise { <pending> }
}

// ✅ CORRECT — use await (and make the calling function async too):
async function getUserData() {
    const data = await Auth.login(email, password);
    console.log(data);  // { success: true, user: { ... } }
}
```

---

### 12.26 Debugging with Browser DevTools

When something doesn't work, **DevTools** is how you figure out why. Every browser has it built in.

#### Opening DevTools

| Method | How |
|--------|-----|
| Keyboard shortcut | **F12** (all browsers) |
| Alternative shortcut | **Ctrl+Shift+I** (Windows) or **Cmd+Option+I** (Mac) |
| Right-click | Right-click any element → **Inspect** |
| Menu | Browser menu → **More Tools** → **Developer Tools** |

#### The Console Tab — Your Best Friend

The **Console** tab shows errors, warnings, and your `console.log()` messages:

```javascript
// These show up in the Console tab:
console.log('Hello!');           // Normal message (gray)
console.warn('Watch out!');      // Warning (yellow)
console.error('Something broke!');  // Error (red)
console.table([{a: 1}, {a: 2}]); // Displays data as a table
```

**Common errors you'll see and what they mean:**

| Error Message | What It Means | How to Fix |
|---------------|-------------|-----------|
| `Uncaught ReferenceError: x is not defined` | You're using a variable that doesn't exist | Check spelling, or make sure the script is loaded |
| `Uncaught TypeError: Cannot read property 'x' of null` | You tried to access `.x` on something that is `null` | The element wasn't found — check your `getElementById` |
| `Uncaught SyntaxError: Unexpected token` | You have a typo in your JavaScript | Look at the line number — missing comma, bracket, etc. |
| `404 (Not Found)` | A file path is wrong | Check that the file exists at the path in the error |
| `CORS error` | Browser blocked a cross-origin request | Your Flask server needs `flask-cors` (we have it) |
| `net::ERR_CONNECTION_REFUSED` | Can't reach the server | Make sure Flask is running (`python server.py`) |

#### The Elements Tab — Inspecting HTML/CSS

Click the **Elements** tab to see the live HTML. You can:
- **Hover** over elements to highlight them on the page
- **Click** an element to see its CSS styles on the right
- **Edit** CSS values live to experiment (changes are temporary)
- **Toggle** CSS properties on/off with checkboxes

#### The Network Tab — Watching fetch() Requests

When your `fetch()` calls don't work, the **Network** tab shows exactly what happened:

| Column | What It Shows |
|--------|-------------|
| **Name** | The URL that was requested |
| **Status** | HTTP status code (200 = OK, 404 = not found, 500 = server error) |
| **Type** | `fetch` for our API calls, `script` for JS files, `stylesheet` for CSS |
| **Payload** | What data you SENT (click the request to see) |
| **Response** | What data the server SENT BACK |

#### Using `console.log()` to Debug

When your code doesn't do what you expect, add `console.log()` at key points:

```javascript
function selectOption(optionIndex) {
    console.log('selectOption called with:', optionIndex);  // Is this even running?

    const index = state.currentQuestionIndex;
    console.log('Current question index:', index);          // What question are we on?

    const q = state.activeQuestions[index];
    console.log('Question object:', q);                     // Does the question exist?

    const isCorrect = (optionIndex === q.correct);
    console.log('Is correct?', isCorrect, 'Selected:', optionIndex, 'Correct:', q.correct);
    // ↑ This tells you everything about the comparison
}
```

> **Tip:** After debugging, remember to **remove** your `console.log()` statements (or at least the ones that print a lot).

#### Quick Debugging Checklist

When something doesn't work, check these in order:

1. **Console tab** — Are there red error messages?
2. **Network tab** — Did all files load? (check for 404s)
3. **Elements tab** — Is the HTML structure right?
4. **Add `console.log()`** — Is your function being called at all?
5. **Check variable values** — Are they what you expect?
6. **Check spelling** — `getElementById` vs `getElementByID` (capital D!)

---

### 12.27 Every Function in timer.js — Explained

The Timer module manages the 30-second countdown for each question.

**`Timer.start(onTick, onTimeUp)`**
```javascript
start(onTick, onTimeUp) {
    this.stop();              // Kill any existing timer first
    this.timeLeft = 30;       // Reset to 30 seconds
    this.startTime = Date.now();  // Record when we started
    this.intervalId = setInterval(() => {
        this.timeLeft--;
        onTick(this.timeLeft);          // Call the callback to update display
        if (this.timeLeft <= 0) {
            this.stop();
            onTimeUp();                 // Call the callback when time runs out
        }
    }, 1000);
}
```

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Starts a 30-second countdown timer |
| **Parameters** | `onTick` — a function called every second with remaining time; `onTimeUp` — a function called when time hits 0 |
| **Returns** | Nothing (void) |
| **Why `this.stop()` first?** | If a timer is already running (e.g., user navigated back and forth), we need to kill the old one before starting a new one, otherwise we'd have two timers running simultaneously |
| **Why `Date.now()`?** | Records the exact millisecond the timer started, so `getElapsed()` can calculate the precise time the user took to answer |
| **What is `setInterval`?** | Calls the arrow function every 1000ms (1 second). Returns an ID we store so we can stop it later |

**`Timer.stop()`**
```javascript
stop() {
    if (this.intervalId) {
        clearInterval(this.intervalId);  // Stop the repeating timer
        this.intervalId = null;          // Clear the reference
    }
}
```

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Stops the countdown immediately |
| **When called** | When user selects an answer, navigates away, ends quiz, or submits |
| **Why check `if (this.intervalId)`?** | `clearInterval(null)` would throw no error, but it's good practice to only clear timers that actually exist |
| **Why set to `null`?** | Prevents accidentally clearing the same interval twice |

**`Timer.getElapsed()`**
```javascript
getElapsed() {
    if (!this.startTime) return 0;
    return Math.round((Date.now() - this.startTime) / 1000);
}
```

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Returns how many seconds have passed since the timer started |
| **Returns** | A number (e.g., `7` meaning 7 seconds elapsed) |
| **How it works** | `Date.now()` gives current time in ms, subtract `startTime` to get elapsed ms, divide by 1000 for seconds, round to nearest whole number |
| **Used by** | `selectOption()` — to record how long the user took to answer each question |

---

### 12.28 Every Function in auth.js — Explained

The Auth module handles user registration, login, and session management.

**`Auth.signup(name, email, password)`**
```javascript
async signup(name, email, password) {
    try {
        const response = await fetch(`${API_URL}/api/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem(AUTH_KEY, JSON.stringify(data.user));
        }
        return data;
    } catch (error) {
        return this.localSignup(name, email, password);
    }
}
```

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Registers a new user account |
| **Parameters** | `name` (string), `email` (string), `password` (string) |
| **Returns** | `{ success: true, user: {...} }` or `{ success: false, message: '...' }` |
| **`async` keyword** | Marks this function as asynchronous — it can `await` Promises |
| **`fetch()`** | Sends an HTTP request to the Flask server. `method: 'POST'` means we're sending data (not requesting it). `headers` tells the server we're sending JSON. `body` converts the JavaScript object to a JSON string |
| **`await`** | Pauses execution until the `fetch()` Promise resolves. Without `await`, we'd get a Promise object instead of the actual response |
| **`response.json()`** | Parses the response body from JSON string into a JavaScript object. Also returns a Promise, so needs `await` |
| **`try/catch`** | If `fetch()` fails (server is down, network error), the `catch` block runs instead of crashing. This is how we implement the localStorage fallback |
| **Why save to `localStorage`?** | The browser session is stored locally so refreshing the page doesn't log the user out. The actual account exists in PostgreSQL |

**`Auth.login(email, password)`**
```javascript
async login(email, password) { /* similar structure to signup */ }
```

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Authenticates an existing user |
| **How it differs from signup** | Sends to `/api/login` instead of `/api/signup`. The server checks if the password matches the stored hash (using bcrypt) |
| **Returns** | Same format as signup: `{ success: true/false }` |
| **What happens on success** | Saves user info to localStorage session, then `showCategoryScreen()` is called |
| **What happens on failure** | Error message is displayed in the form |

**`Auth.logout()`**
```javascript
logout() {
    localStorage.removeItem(AUTH_KEY);
}
```

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Logs the user out by deleting their session |
| **How** | Removes the `quizAppUser` key from localStorage. Next time `getCurrentUser()` is called, it returns `null` |
| **No server call needed** | The session is purely client-side. The server doesn't track "logged in" users (stateless design) |

**`Auth.getCurrentUser()`**
```javascript
getCurrentUser() {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
}
```

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Returns the currently logged-in user or `null` |
| **Returns** | `{ name: 'John', email: 'john@test.com' }` or `null` |
| **`data ? ... : null`** | Ternary operator: if data exists, parse it; if not, return null. This prevents `JSON.parse(null)` which would throw an error |
| **Used by** | `showCategoryScreen()`, `startQuiz()`, `saveToLeaderboard()`, and the IIFE init function |

**`Auth.localSignup(name, email, password)` / `Auth.localLogin(email, password)`**

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Fallback functions that work exactly like the localStorage-only version |
| **When called** | Only when `fetch()` fails (server is down, no internet) |
| **How** | Reads/writes user data from `localStorage` directly |
| **Limitation** | Users registered locally aren't in PostgreSQL, so they won't appear in the shared leaderboard |

---

### 12.29 Every Function in charts.js — Explained

The Charts module creates visual data displays using the Chart.js library.

**`Charts.createPieChart(correct, incorrect, unanswered)`**
```javascript
createPieChart(correct, incorrect, unanswered) {
    const ctx = document.getElementById('pie-chart').getContext('2d');
    if (this.pieChart) this.pieChart.destroy();
    this.pieChart = new Chart(ctx, { /* config */ });
}
```

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Creates a doughnut chart showing correct vs incorrect vs unanswered |
| **Parameters** | Three numbers: e.g., `(35, 10, 5)` for 35 correct, 10 wrong, 5 skipped |
| **`getContext('2d')`** | Gets the 2D drawing context from the `<canvas>` element. This is required by Chart.js to draw on the canvas |
| **`if (this.pieChart) this.pieChart.destroy()`** | If a chart already exists (e.g., user retries quiz), destroy it first. Without this, Chart.js would draw the new chart ON TOP of the old one |
| **`new Chart(ctx, config)`** | Creates a new Chart.js instance. `type: 'doughnut'` makes it a ring shape. `data` provides the values and colors. `options` configures the legend |
| **`backgroundColor: ['#22c55e', '#ef4444', '#64748b']`** | Green for correct, red for incorrect, gray for unanswered |

**`Charts.createBarChart(timesArray)`**
```javascript
createBarChart(timesArray) {
    const ctx = document.getElementById('bar-chart').getContext('2d');
    if (this.barChart) this.barChart.destroy();
    const labels = timesArray.map((_, i) => `Q${i + 1}`);
    this.barChart = new Chart(ctx, { /* config */ });
}
```

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Creates a bar chart showing time spent per question |
| **Parameter** | `timesArray` — array of numbers, e.g., `[5, 12, 8, 25, ...]` (seconds per question) |
| **`map((_, i) => ...)`** | The `_` underscore means "I don't need this parameter" (the value). We only care about `i` (the index) to generate labels like "Q1", "Q2", etc. |
| **Color coding** | `t <= 10` → green (fast), `t <= 20` → yellow (medium), `t > 20` → red (slow). Uses nested ternary operators |
| **`borderRadius: 4`** | Rounds the top corners of each bar |
| **`scales.y.beginAtZero`** | Forces the y-axis to start at 0, not at the minimum value |

---

### 12.30 Every Function in app.js — Explained

The main application file orchestrates the entire quiz flow.

**`showScreen(screenId)`**
```javascript
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}
```

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Shows one screen and hides all others (SPA navigation) |
| **Parameter** | `screenId` — a string like `'auth-screen'`, `'quiz-screen'`, `'results-screen'` |
| **How** | Step 1: Add `hidden` class to ALL screens (hides them). Step 2: Remove `hidden` from the ONE screen we want to show |
| **Why this pattern?** | This is a Single Page Application (SPA). Instead of separate HTML pages, we show/hide sections. The browser never reloads |
| **Called by** | Login success, signup success, logout, quiz start, quiz end, retry, home |

**`showCategoryScreen()`**
```javascript
function showCategoryScreen() {
    const user = Auth.getCurrentUser();
    document.getElementById('category-welcome').textContent =
        `Welcome, ${user.name}! Pick a category to begin.`;
    showScreen('category-screen');
}
```

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Displays the category selection screen with a personalized welcome message |
| **How** | Gets the user's name from localStorage, sets it in the welcome text, then shows the category screen |
| **Called by** | After login, after signup, and when clicking "Home" from results |

**`startQuiz(category)`**
```javascript
function startQuiz(category) {
    state.selectedCategory = category;
    if (category === 'all') {
        state.activeQuestions = [...questions];              // Copy ALL questions
    } else {
        state.activeQuestions = questions.filter(q => q.category === category);  // Filter by category
    }
    state.activeQuestions.sort(() => Math.random() - 0.5);  // Shuffle randomly
    state.currentQuestionIndex = 0;
    state.answers = new Array(state.activeQuestions.length).fill(null);
    state.score = 0;
    state.quizStartTime = Date.now();
    showScreen('quiz-screen');
    loadQuestion();
}
```

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Initializes the quiz with the selected category and loads the first question |
| **Parameter** | `category` — `'html'`, `'css'`, `'javascript'`, or `'all'` |
| **`[...questions]`** | The spread operator creates a COPY of the array. Without it, `sort()` would rearrange the original `questions` array permanently |
| **`.filter(q => q.category === category)`** | Creates a new array containing ONLY questions whose category matches. If user picked "html", only HTML questions are included |
| **`.sort(() => Math.random() - 0.5)`** | Shuffles the array randomly. `Math.random()` returns 0-1; subtracting 0.5 gives roughly 50% chance of positive/negative, causing random swaps |
| **`new Array(length).fill(null)`** | Creates an array like `[null, null, null, ...]` with one slot per question. `null` means "not answered yet" |
| **`Date.now()`** | Records the quiz start time in milliseconds. Used for total time calculation |

**`loadQuestion()`**
```javascript
function loadQuestion() {
    const index = state.currentQuestionIndex;
    const total = state.activeQuestions.length;
    const q = state.activeQuestions[index];
    // ... updates progress bar, question text, options, navigation buttons, timer
}
```

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Displays the current question with its options, progress, and timer |
| **No parameters** | Reads from `state.currentQuestionIndex` to know which question to show |
| **Progress bar** | Uses `style.setProperty('--progress', ...)` to update the CSS variable that controls the bar width |
| **Option buttons** | Dynamically created with `document.createElement('button')`. Each gets a click listener that calls `selectOption(i)` |
| **Already-answered check** | If `state.answers[index] !== null`, options appear disabled and the user's previous selection is shown |
| **Navigation logic** | Previous button is disabled on first question. Submit button appears on last question, Next button appears on all others |
| **Timer** | Only starts if the question hasn't been answered yet. If it has, shows `'-'` instead |

**`selectOption(optionIndex)`**
```javascript
function selectOption(optionIndex) {
    const index = state.currentQuestionIndex;
    if (state.answers[index] !== null) return;           // Already answered — do nothing
    const q = state.activeQuestions[index];
    const isCorrect = (optionIndex === q.correct);       // Compare user's choice to correct index
    const timeTaken = Timer.getElapsed();                // How long they took
    Timer.stop();
    state.answers[index] = { selected: optionIndex, correct: isCorrect, timeTaken };
    // Visual feedback: mark correct answer green, wrong answer red
    if (isCorrect) {
        const timeBonus = Math.max(0, Math.round((1 - timeTaken / 30) * 10));
        state.score += 10 + timeBonus;                   // Base 10 + up to 10 bonus
    }
}
```

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Records the user's answer and provides immediate visual feedback |
| **Parameter** | `optionIndex` — which option was clicked (0, 1, 2, or 3) |
| **Guard clause** | `if (state.answers[index] !== null) return` — prevents answering the same question twice |
| **Scoring formula** | Base 10 points for correct + time bonus. If answered in 0 seconds: bonus = 10. If answered in 30 seconds: bonus = 0. Formula: `(1 - timeTaken/30) * 10` |
| **Visual feedback** | All buttons get `disabled` class. Correct answer gets `correct` class (green). Wrong answer gets `wrong` class (red) |
| **`state.answers[index]`** | Stores an object: `{ selected: 2, correct: true, timeTaken: 7 }` — used later for review and charts |

**`handleTimeUp()`**
```javascript
function handleTimeUp() {
    const index = state.currentQuestionIndex;
    if (state.answers[index] === null) {
        // Record as unanswered — do NOT show the correct answer
        state.answers[index] = { selected: -1, correct: false, timeTaken: 30 };
        // // Show correct answer visually
        // const q = state.activeQuestions[index];
        // const buttons = document.querySelectorAll('.option-btn');
        // buttons.forEach((btn, i) => {
        //     btn.classList.add('disabled');
        //     if (i === q.correct) btn.classList.add('correct');
        // });

        // Auto-advance to the next question, or finish if it was the last one
        if (index < state.activeQuestions.length - 1) {
            state.currentQuestionIndex++;
            loadQuestion();      // loads the next question immediately
        } else {
            finishQuiz();        // no more questions — show results
        }
    }
}
```

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Handles what happens when the 30-second timer runs out |
| **`selected: -1`** | `-1` means "no option was selected" (user ran out of time) |
| **`timeTaken: 30`** | Full 30 seconds elapsed |
<!-- | **Shows correct answer** | Even though time ran out, the correct answer is highlighted in green so the user can learn | -->
| **Does NOT reveal the answer** | Unlike `selectOption()`, this function does NOT highlight the correct answer. The user only sees what they got right/wrong in the final review screen. This keeps the quiz challenging and discourages "waiting out the clock" to see answers for free |
| **Auto-advances** | Immediately loads the next question via `loadQuestion()`. If the user was on the last question, it calls `finishQuiz()` to show results. The user never gets stuck on a timed-out question |
| **Why auto-advance?** | Without this, the user would be stuck on a dead screen with disabled buttons after time expires. Auto-advancing keeps the quiz flowing smoothly |

**`finishQuiz()`**
```javascript
async function finishQuiz() {
    const total = state.activeQuestions.length;
    const maxScore = total * 20;
    let correctCount = 0, incorrectCount = 0, unanswered = 0;
    const times = [];
    state.answers.forEach((answer) => {
        if (answer === null) { unanswered++; times.push(0); }
        else if (answer.correct) { correctCount++; times.push(answer.timeTaken); }
        else { incorrectCount++; times.push(answer.timeTaken); }
    });
    // Display score, create charts, build review, save to leaderboard
    showScreen('results-screen');
}
```

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Calculates final results, creates charts, builds review, and shows the results screen |
| **`async`** | Because `saveToLeaderboard()` is async (it talks to the backend) |
| **`maxScore = total * 20`** | Each question is worth max 20 points (10 base + 10 bonus) |
| **Counting loop** | Iterates through all answers: `null` = unanswered, `.correct === true` = correct, else = incorrect |
| **`times` array** | Collects time-per-question for the bar chart. Unanswered questions get `0` |
| **Percentage** | `Math.round((correctCount / total) * 100)` — used for the summary message |
| **Called by** | Submit button click OR End Quiz button click (with confirmation) |

**`buildReview()`**
```javascript
function buildReview() {
    const container = document.getElementById('review-container');
    container.innerHTML = '<h3>Review Your Answers</h3>';
    state.activeQuestions.forEach((q, i) => {
        const answer = state.answers[i];
        const isCorrect = answer && answer.correct;
        const wasSkipped = !answer || answer.selected === -1;
        // Create and append a review item div for each question
    });
}
```

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Creates a scrollable list of all questions with the user's answer and the correct answer |
| **Visual indicators** | ✅ for correct, ❌ for wrong, ⏭️ for skipped/timed out |
| **`answer && answer.correct`** | Short-circuit evaluation: checks if `answer` exists first, THEN checks `.correct`. Without `&&`, accessing `.correct` on `null` would crash |
| **`!answer || answer.selected === -1`** | Two ways a question can be "skipped": `null` (never reached) or `selected: -1` (time ran out) |

**`saveToLeaderboard()`**
```javascript
async function saveToLeaderboard() {
    // 1. Save result to backend via fetch()
    // 2. Fetch shared leaderboard from backend
    // 3. Display top 10 entries
    // Falls back to localStorage if backend is down
}
```

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Saves the quiz result to PostgreSQL and displays the shared leaderboard |
| **`async`** | Uses `await fetch()` to communicate with the Flask server |
| **Backend first, fallback second** | Tries to save to server. If that fails (catch block), saves locally |
| **`leaderboard.forEach()`** | Creates a `<li>` element for each of the top 10 scores |
| **Shared across users** | Because data is in PostgreSQL, ALL users see each other's scores |

**`init()` (IIFE)**
```javascript
(function init() {
    const user = Auth.getCurrentUser();
    if (user) { showCategoryScreen(); }
    else { showScreen('auth-screen'); }
})();
```

| Detail | Explanation |
|--------|-------------|
| **Purpose** | Runs once when the page loads. Checks if a user is already logged in |
| **If logged in** | Shows the category selection screen (skip login) |
| **If not logged in** | Shows the auth screen (login/signup forms) |
| **IIFE pattern** | The `()` at the end immediately executes the function. It's wrapped in `(function() {...})()` to keep its variables private |

### 12.31 How All the Functions Connect

Here's the complete call chain from start to finish:

```
PAGE LOADS
    └→ init() (IIFE)
        ├→ Auth.getCurrentUser() → user exists?
        │   ├→ YES → showCategoryScreen()
        │   └→ NO  → showScreen('auth-screen')

USER SIGNS UP / LOGS IN
    └→ Auth.signup() or Auth.login()
        └→ fetch() → Flask → PostgreSQL
            └→ showCategoryScreen()

USER PICKS A CATEGORY
    └→ startQuiz('html')
        └→ filter & shuffle questions
            └→ loadQuestion()
                ├→ display question + options
                └→ Timer.start()

USER ANSWERS
    └→ selectOption(2)
        ├→ Timer.stop()
        ├→ calculate score
        └→ visual feedback (green/red)

TIMER EXPIRES (no answer selected)
    └→ handleTimeUp()
        ├→ record as unanswered (selected: -1)
        ├→ do NOT reveal correct answer
        └→ auto-advance:
            ├→ more questions? → loadQuestion() (next question)
            └→ last question? → finishQuiz()

USER CLICKS NEXT
    └→ state.currentQuestionIndex++
        └→ loadQuestion() (next question)

USER SUBMITS / ENDS QUIZ
    └→ finishQuiz()
        ├→ count correct/incorrect/unanswered
        ├→ Charts.createPieChart()
        ├→ Charts.createBarChart()
        ├→ buildReview()
        ├→ saveToLeaderboard()
        │   ├→ saveToBackend() → Flask → PostgreSQL
        │   └→ fetch leaderboard → display top 10
        └→ showScreen('results-screen')

USER RETRIES
    └→ startQuiz(same category) → cycle repeats

USER GOES HOME
    └→ showCategoryScreen() → pick new category
```

---

## 13. Python/Flask Deep-Dive

### 13.1 What is Flask?

Flask is a Python **web framework** — it lets Python handle web requests (URLs) and send back responses. Think of it as a phone operator:

```
Browser (front desk) → sends request → Flask (operator) → sends response → Browser displays it
```

### 13.2 Key Flask Concepts

```python
from flask import Flask, request, jsonify

app = Flask(__name__)  # Create the app

# A ROUTE: maps a URL to a Python function
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()     # Read JSON from the request body
    return jsonify({'success': True})  # Send JSON response back
```

| Concept | What It Does |
|---------|-------------|
| `@app.route('/url')` | **Decorator** — connects a URL to a function |
| `methods=['POST']` | Only responds to POST requests (not GET) |
| `request.get_json()` | Reads the JSON body sent by JavaScript's `fetch()` |
| `jsonify({...})` | Converts a Python dictionary to a JSON response |
| `app.run(debug=True)` | Starts the server. `debug=True` auto-reloads when you edit code |

### 13.3 SQLAlchemy — Database Without Writing SQL

```python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True)
```

| Code | What It Means |
|------|--------------|
| `db.Model` | This Python class represents a database table |
| `db.Column(db.Integer)` | A column that stores numbers |
| `db.Column(db.String(100))` | A column that stores text (up to 100 chars) |
| `primary_key=True` | Unique ID for each row, auto-increments |
| `unique=True` | No two rows can have the same value |
| `nullable=False` | Column cannot be empty |

**CRUD operations:**
```python
# CREATE
user = User(name='John', email='john@test.com')
db.session.add(user)
db.session.commit()

# READ
user = User.query.filter_by(email='john@test.com').first()
all_users = User.query.all()

# UPDATE
user.name = 'Jane'
db.session.commit()

# DELETE
db.session.delete(user)
db.session.commit()
```

### 13.4 bcrypt — Password Hashing

**Never store passwords as plain text.** Hashing converts them into unreadable strings:

```python
import bcrypt

# Hash a password (when signing up):
password = 'mypassword123'
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
# Result: b'$2b$12$...' (random, irreversible)

# Check a password (when logging in):
is_valid = bcrypt.checkpw(password.encode(), hashed)
# Returns True if password matches, False otherwise
```

### 13.5 CORS — Cross-Origin Resource Sharing

```python
from flask_cors import CORS
CORS(app)
```

Without CORS, browsers **block** requests from your frontend (localhost:5500) to your backend (localhost:5000) because they're on different ports. `CORS(app)` tells Flask to allow these cross-origin requests.

### 13.6 Environment Variables (.env)

```python
from dotenv import load_dotenv
import os

load_dotenv()  # Load variables from .env file

db_url = os.getenv('DATABASE_URL')  # Read the value
```

**Why?** Passwords and API keys should never be in your code. The `.env` file keeps them separate and should be in `.gitignore`.

---

# PART 3: EXTRAS

---

## 14. Deployment Guide

### 14.1 Deploy Frontend (Free — Netlify)

1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag your project folder onto the Netlify dashboard
3. Your site is live at `https://your-app.netlify.app`

### 14.2 Deploy Backend (Free — Render)

1. Push `backend/` folder to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repository
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `gunicorn server:app`
6. Add environment variables (`DATABASE_URL`, `SECRET_KEY`)
7. Render provides a free PostgreSQL database too

### 14.3 Connect Frontend to Backend

Update your JavaScript to use the deployed backend URL instead of `localhost`:

```javascript
const API_URL = 'https://your-app.onrender.com';

// Example: Login
const response = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
});
const result = await response.json();
```

---

## 15. Creativity & Next Steps

### Ideas to Make It Yours

| Feature | Difficulty | Technologies |
|---------|:---:|------------|
| Sound effects on correct/wrong | Easy | `new Audio()` |
| Dark/light theme toggle | Medium | CSS variables + JS |
| Question time limit per category | Medium | Timer module tweak |
| Multiplayer mode (real-time) | Hard | WebSockets |
| Question editor (add your own) | Medium | Form + localStorage |
| Achievement badges | Medium | Conditional logic + CSS |
| Animated confetti on high scores | Easy | Canvas or library |
| Mobile app (PWA) | Medium | Service Worker + manifest.json |

### Recommended Learning Path

1. ✅ **You are here** — Built a full quiz app
2. **Next:** Add theme switching (see old guide Section 16)
3. **Then:** Connect to the Flask backend
4. **Then:** Deploy to Netlify + Render
5. **Advanced:** Learn React or Vue (same concepts, better organization for bigger apps)

---

## Conclusion

You've built a complete, production-quality quiz application featuring:
- ✅ User authentication (localStorage)
- ✅ Category-based question selection
- ✅ 30-second countdown timer with visual feedback
- ✅ Score calculation with time bonuses
- ✅ Interactive charts (Chart.js)
- ✅ Answer review with explanations
- ✅ Leaderboard system
- ✅ End-quiz-anytime functionality
- ✅ Optional Python/Flask backend with PostgreSQL

**More importantly**, you now understand the JavaScript concepts, CSS techniques, and HTML patterns that make it all work. This foundation applies to every web application you'll ever build.

---

*Happy coding! 🚀*
