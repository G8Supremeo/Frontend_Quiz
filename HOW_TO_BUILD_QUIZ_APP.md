# How to Build a JavaScript-Powered Quiz App from Scratch

## A Complete Beginner's Guide with Detailed Explanations

This document teaches you everything needed to build a fully-featured quiz application with:
- User authentication (sign-up/login)
- Timed questions (like Mentimeter)
- Score calculation based on correctness AND speed
- Results visualization with charts
- Answer review after submission

---

## Table of Contents

0. [**The Thinking Process: Making Technology Decisions**](#0-the-thinking-process-making-technology-decisions)
   - [0.1 The Three Questions](#01-the-three-questions)
   - [0.2 What Needs JavaScript?](#02-what-needs-javascript)
   - [0.3 Native JS vs Framework Decision](#03-native-js-vs-framework-decision)
   - [0.4 Complete Feature Breakdown](#04-complete-feature-breakdown)
1. [Project Structure](#1-project-structure)
2. [HTML Structure Explained](#2-html-structure-explained)
3. [CSS Styling Guide](#3-css-styling-guide)
4. [JavaScript Core Concepts](#4-javascript-core-concepts)
   - [4.1 Question Data Structure](#41-the-question-data-structure)
   - [4.2 Application State](#42-application-state)
   - [4.3 **JavaScript Methods Dictionary** ⭐](#43-javascript-methods-dictionary-for-beginners)
   - [4.4 How to Know Which Method to Use](#44-how-to-know-which-method-to-use)
5. [Building the Quiz Logic](#5-building-the-quiz-logic)
6. [Implementing the Timer](#6-implementing-the-timer)
7. [Calculating Scores with Time Bonus](#7-calculating-scores-with-time-bonus)
8. [Creating Charts for Results](#8-creating-charts-for-results)
9. [User Authentication System](#9-user-authentication-system)
10. [Data Storage Options](#10-data-storage-options)
11. [Deployment Guide](#11-deployment-guide)
12. [Creativity Points](#12-creativity-points-make-it-yours)
13. [Complete Code Reference](#13-complete-code-reference)
14. [Memorization Guide](#14-memorization-guide-learn-it-dont-copy-it)
15. [**Adding Python to the Project** 🐍](#15-adding-python-to-the-project-optional-backend)
    - [15.1 Frontend vs Backend](#151-understanding-frontend-vs-backend)
    - [15.2 What Python Adds](#152-what-can-python-add-to-this-quiz-app)
    - [15.3 JS ↔ Python Communication](#153-how-javascript-and-python-communicate)
    - [15.4 Python Basics](#154-python-basics-for-beginners)
    - [15.5 Building Flask Backend](#155-building-a-simple-python-backend-flask)
    - [15.6 Updating JS for Backend](#156-updating-javascript-to-use-the-python-backend)
    - [15.7 Complete Architecture](#157-the-complete-architecture)
    - [15.8 Running Both Together](#158-running-both-together-development)
    - [15.9 More Python Features](#159-what-else-can-python-do)
    - [15.10 Python Methods Dictionary](#1510-python-methods-dictionary-for-beginners)
    - [15.11 When to Add Python](#1511-when-to-add-python-to-your-project)
16. [**Theme Switching (Light/Dark Mode)** 🌓](#16-theme-switching-lightdark-mode)
    - [16.1 What is Theme Switching?](#161-what-is-theme-switching)
    - [16.2 Three Approaches](#162-the-three-approaches-to-theme-switching)
    - [16.3 Required Concepts](#163-required-concepts-explained)
    - [16.4 Step-by-Step Implementation](#164-step-by-step-implementation)
    - [16.5 Code Breakdown](#165-code-breakdown---line-by-line)
    - [16.6 DOMContentLoaded Explained](#166-domcontentloaded---why-its-important)
    - [16.7 Avoiding Flash (FOUC)](#167-avoiding-flash-of-unstyled-content-fouc)
    - [16.8 Adding More Themes](#168-adding-more-themes)
    - [16.9 Complete HTML Example](#169-complete-html-example)
    - [16.10 Methods Summary](#1610-methods-summary-table)
17. [**Flask + PostgreSQL: Multi-User Quiz** 🚀](#17-flask--postgresql-multi-user-quiz-with-deployment-)
    - [17.1 Why PostgreSQL?](#171-why-postgresql)
    - [17.2 Local PostgreSQL Setup](#172-local-postgresql-setup-windows)
    - [17.3 Database Schema Design](#173-database-schema-design)
    - [17.4 Flask-SQLAlchemy Setup](#174-flask-sqlalchemy-setup)
    - [17.5 Secure Authentication (bcrypt)](#175-secure-authentication-with-bcrypt)
    - [17.6 Complete Backend Code](#176-complete-backend-code)
    - [17.7 Testing Locally](#177-testing-locally)
    - [17.8 Updated Frontend (api.js)](#178-updated-frontend-apijs)
    - [17.9 Deploying Backend to Render](#179-deploying-backend-to-render)
    - [17.10 Deploying Frontend to Netlify](#1710-deploying-frontend-to-netlify)
    - [17.11 Connecting Frontend ↔ Backend](#1711-connecting-frontend--backend)
    - [17.12 Complete Code Reference](#1712-complete-code-reference)
    - [17.13 Troubleshooting](#1713-troubleshooting-common-issues)
    - [17.14 What You've Accomplished](#1714-what-youve-accomplished)

---

## 0. The Thinking Process: Making Technology Decisions

### 0.1 The Three Questions

Before writing ANY code, ask:

```
1. WHAT needs to appear on screen? → HTML
2. HOW should it look? → CSS  
3. WHAT should happen when user interacts? → JavaScript (maybe)
```

**Let's apply this to the Quiz App:**

| Requirement | Question | Technology |
|-------------|----------|------------|
| Login/signup forms | WHAT appears? | HTML |
| Quiz questions and options | WHAT appears? | HTML |
| Timer display | WHAT appears? | HTML |
| Progress bar | WHAT appears? | HTML |
| Results summary | WHAT appears? | HTML |
| Chart visualization | WHAT appears? | HTML (canvas) |
| Modern, clean design | HOW should it look? | CSS |
| Responsive on mobile/desktop | HOW should it look? | CSS |
| Button hover effects | HOW should it look? | CSS |
| Countdown timer animation | HOW should it look? | CSS + JS |
| Validate user login | WHAT happens? | **JavaScript** |
| Show next question on click | WHAT happens? | **JavaScript** |
| Track time per question | WHAT happens? | **JavaScript** |
| Check if answer is correct | WHAT happens? | **JavaScript** |
| Calculate final score | WHAT happens? | **JavaScript** |
| Generate chart from data | WHAT happens? | **JavaScript** |
| Save user progress | WHAT happens? | **JavaScript** |

---

### 0.2 What Needs JavaScript?

**JavaScript is ONLY needed when the page must CHANGE or DO SOMETHING after loading.**

For the Quiz App, JavaScript handles:

| Feature | Why JS is Needed |
|---------|------------------|
| **Timer countdown** | Must update every second |
| **Question navigation** | Change content without page reload |
| **Answer validation** | Check correctness, give feedback |
| **Score calculation** | Process user responses |
| **Chart generation** | Create visual from data |
| **User authentication** | Validate credentials |
| **Data persistence** | Save/load from storage |

**What CSS alone can handle:**

| Feature | CSS Solution |
|---------|--------------|
| Button hover effects | `:hover` pseudo-class |
| Correct/wrong answer colors | `.correct`/`.wrong` classes |
| Progress bar appearance | CSS transitions |
| Responsive layout | Media queries |
| Loading animations | `@keyframes` |

---

### 0.3 Native JS vs Framework Decision

```
┌─────────────────────────────────────────────────────┐
│           Quiz App Complexity Check                 │
└─────────────────────────────────────────────────────┘
                        │
    ┌───────────────────┼───────────────────┐
    ▼                   ▼                   ▼
┌─────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ Simple Quiz │  │ Multi-user Quiz │  │ Real-time       │
│ (1 player,  │  │ with database,  │  │ multiplayer,    │
│ local only) │  │ leaderboards    │  │ live scoring    │
└─────────────┘  └─────────────────┘  └─────────────────┘
       │                 │                   │
       ▼                 ▼                   ▼
┌─────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ VANILLA JS  │  │ VANILLA JS +    │  │ FRAMEWORK       │
│ + localStorage│ │ Firebase/Supabase│ │ (React/Vue) +   │
└─────────────┘  └─────────────────┘  │ WebSockets      │
                                      └─────────────────┘
```

**For this guide, we'll use:**
- **Vanilla JavaScript** - Best for learning fundamentals
- **localStorage** - For single-device persistence
- **Chart.js** - For visualizations (lightweight library)
- **Optional: Firebase** - If you want cloud storage

---

### 0.4 Complete Feature Breakdown

Here's EXACTLY what JavaScript handles for each feature:

#### 🎯 Quiz Logic

| Task | JS Concept Used |
|------|-----------------|
| Store questions | Arrays of objects |
| Track current question | Variable (index) |
| Show question | DOM manipulation |
| Check answer | Comparison operators |
| Move to next | Increment index |

#### ⏱️ Timer System

| Task | JS Concept Used |
|------|-----------------|
| Start countdown | `setInterval()` |
| Update display | DOM manipulation |
| Stop when answered | `clearInterval()` |
| Record time taken | Math (start - end) |

#### 📊 Charts

| Task | JS Concept Used |
|------|-----------------|
| Collect results data | Arrays |
| Create chart | Chart.js library |
| Update dynamically | Chart.js methods |

#### 🔐 Authentication

| Task | JS Concept Used |
|------|-----------------|
| Capture form data | Event listeners |
| Validate input | Conditionals |
| Store credentials | localStorage/database |
| Check on login | Comparison |

---

## 1. Project Structure

```
quiz-app/
├── index.html              ← Main page structure
├── css/
│   └── style.css           ← All styling
├── js/
│   ├── app.js              ← Main application logic
│   ├── questions.js        ← Question data
│   ├── timer.js            ← Timer functionality
│   ├── auth.js             ← Authentication
│   └── charts.js           ← Chart generation
└── images/
    └── (your assets)
```

**Why separate files?**
- Easier to maintain
- Find code faster
- Reuse components
- Better organization

---

## 2. HTML Structure Explained

### 2.0 How to Decide Your HTML Sections (The Thinking Process)

Before writing any HTML, you need to understand **why** we split content into sections. This is crucial for building any single-page application (SPA).

---

#### Step 1: Map Out the User Journey

Ask yourself: **"What does the user DO from start to finish?"**

For the Quiz App:

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           USER JOURNEY MAP                                │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   START                                                                  │
│     │                                                                    │
│     ▼                                                                    │
│   ┌─────────────────┐                                                    │
│   │  Step 1: Login  │  ← User sees login/signup forms                   │
│   │  or Sign Up     │  ← Enters credentials                             │
│   └────────┬────────┘  ← Clicks submit                                  │
│            │                                                             │
│            ▼                                                             │
│   ┌─────────────────┐                                                    │
│   │  Step 2: Take   │  ← User sees questions one by one                 │
│   │  the Quiz       │  ← Timer counts down                              │
│   └────────┬────────┘  ← Selects answers, clicks next                   │
│            │                                                             │
│            ▼                                                             │
│   ┌─────────────────┐                                                    │
│   │  Step 3: View   │  ← User sees final score                          │
│   │  Results        │  ← Charts show performance                        │
│   └────────┬────────┘  ← Can retry or view leaderboard                  │
│            │                                                             │
│            ▼                                                             │
│          END                                                             │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

**Rule: Each major step = One HTML `<section>`**

---

#### Step 2: Convert Steps to Sections

| User Journey Step | HTML Section | What It Contains |
|-------------------|--------------|------------------|
| Login / Sign Up | `<section id="auth-screen">` | Forms, tabs, error messages |
| Take Quiz | `<section id="quiz-screen">` | Question, options, timer, progress |
| View Results | `<section id="results-screen">` | Score, charts, review, leaderboard |

---

#### Step 3: Understand the "Hidden Screen" Pattern

In a **Single-Page Application (SPA)**, all screens exist in the HTML at once, but only ONE is visible at a time.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        index.html (One File)                             │
│                                                                          │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ <section id="auth-screen" class="screen">         ← VISIBLE     │   │
│   │   Login form here...                                            │   │
│   │ </section>                                                      │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ <section id="quiz-screen" class="screen hidden">  ← HIDDEN      │   │
│   │   Quiz content here...                                          │   │
│   │ </section>                                                      │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ <section id="results-screen" class="screen hidden"> ← HIDDEN    │   │
│   │   Results content here...                                       │   │
│   │ </section>                                                      │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**How JavaScript Switches Screens:**

```javascript
// To show quiz and hide auth:
document.getElementById('auth-screen').classList.add('hidden');
document.getElementById('quiz-screen').classList.remove('hidden');
```

The CSS is simple:

```css
.hidden {
    display: none;
}
```

---

#### Step 4: The Decision Framework

Use this flowchart when building ANY app:

```
┌─────────────────────────────────────────────────────────────────────┐
│                   SHOULD THIS BE A NEW SECTION?                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   Ask: "Does the user's PRIMARY TASK change?"                       │
│                                                                      │
│           YES                              NO                        │
│            │                                │                        │
│            ▼                                ▼                        │
│   ┌─────────────────┐           ┌─────────────────────────┐          │
│   │  NEW SECTION    │           │  SAME SECTION           │          │
│   │                 │           │  (use divs, modals,     │          │
│   │  id="new-screen"│           │   or components)        │          │
│   └─────────────────┘           └─────────────────────────┘          │
│                                                                      │
│   Examples:                     Examples:                            │
│   • Login → Quiz (YES)          • Question 1 → Question 2 (NO)      │
│   • Quiz → Results (YES)        • Show hint popup (NO)              │
│   • Results → Retry (YES)       • Toggle settings (NO)              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### Real-World Examples

| App Type | Sections You'd Create |
|----------|----------------------|
| **E-commerce** | Product List → Product Detail → Cart → Checkout → Confirmation |
| **Social Media** | Feed → Profile → Settings → Messages |
| **Banking App** | Login → Dashboard → Transfer → History |
| **Quiz App** | Auth → Quiz → Results |

---

#### Why This Matters

| Without Proper Sections | With Proper Sections |
|------------------------|---------------------|
| Messy, unorganized code | Clean, logical structure |
| Hard to add new features | Easy to extend |
| Difficult to debug | Each section is isolated |
| Users see everything at once | Smooth, app-like experience |

---

### 2.1 The Complete Page Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz App</title>
    <link rel="stylesheet" href="./css/style.css">
    <!-- Chart.js for visualizations -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="app" id="app">
        <!-- Screens will be shown/hidden via JavaScript -->
        
        <!-- Screen 1: Login/Signup -->
        <section id="auth-screen" class="screen">
            <!-- Auth forms here -->
        </section>
        
        <!-- Screen 2: Quiz -->
        <section id="quiz-screen" class="screen hidden">
            <!-- Quiz content here -->
        </section>
        
        <!-- Screen 3: Results -->
        <section id="results-screen" class="screen hidden">
            <!-- Results and charts here -->
        </section>
    </div>
    
    <script src="./js/questions.js"></script>
    <script src="./js/timer.js"></script>
    <script src="./js/auth.js"></script>
    <script src="./js/charts.js"></script>
    <script src="./js/app.js"></script>
</body>
</html>
```

### 2.2 Authentication Screen

```html
<section id="auth-screen" class="screen">
    <div class="auth-container">
        <h1 class="auth-title">Quiz Master</h1>
        
        <!-- Tab Switches -->
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
        
        <!-- Signup Form (hidden by default) -->
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
```

**Breaking down the HTML elements:**

| Element | Purpose |
|---------|---------|
| `<section>` | Groups related content (semantic) |
| `id="auth-screen"` | Unique identifier for JS to find/hide |
| `class="screen"` | Shared styling for all screens |
| `<form>` | Groups inputs, handles submission |
| `type="email"` | Built-in email validation |
| `required` | Prevents empty submission |
| `minlength="6"` | Minimum password length |

### 2.3 Quiz Screen

```html
<section id="quiz-screen" class="screen hidden">
    <header class="quiz-header">
        <div class="quiz-info">
            <span class="user-name" id="user-display">Welcome, User</span>
            <button class="btn btn-small" id="logout-btn">Logout</button>
        </div>
        
        <!-- Progress Bar -->
        <div class="progress-container">
            <div class="progress-bar" id="progress-bar"></div>
            <span class="progress-text" id="progress-text">1/10</span>
        </div>
        
        <!-- Timer -->
        <div class="timer-container">
            <div class="timer-circle" id="timer-circle">
                <span class="timer-text" id="timer-text">30</span>
            </div>
        </div>
    </header>
    
    <main class="quiz-content">
        <h2 class="question-text" id="question-text">
            Question will appear here
        </h2>
        
        <div class="options-container" id="options-container">
            <!-- Options generated by JavaScript -->
        </div>
    </main>
    
    <footer class="quiz-footer">
        <button class="btn btn-secondary" id="prev-btn" disabled>Previous</button>
        <button class="btn btn-primary" id="next-btn">Next</button>
        <button class="btn btn-success hidden" id="submit-btn">Submit Quiz</button>
    </footer>
</section>
```

### 2.4 Results Screen

```html
<section id="results-screen" class="screen hidden">
    <header class="results-header">
        <h1>Quiz Complete!</h1>
        <div class="score-display">
            <span class="score-label">Your Score</span>
            <span class="score-value" id="final-score">0</span>
            <span class="score-max">/ 1000</span>
        </div>
    </header>
    
    <main class="results-content">
        <!-- Charts Section -->
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
        
        <!-- Answer Review -->
        <div class="review-container" id="review-container">
            <h3>Review Your Answers</h3>
            <!-- Generated by JavaScript -->
        </div>
        
        <!-- Leaderboard (if multiplayer) -->
        <div class="leaderboard-container" id="leaderboard">
            <h3>Leaderboard</h3>
            <ol class="leaderboard-list" id="leaderboard-list">
                <!-- Generated by JavaScript -->
            </ol>
        </div>
    </main>
    
    <footer class="results-footer">
        <button class="btn btn-primary" id="retry-btn">Try Again</button>
        <button class="btn btn-secondary" id="home-btn">Back to Home</button>
    </footer>
</section>
```

---

## 3. CSS Styling Guide

### 3.0 How CSS Works — Selectors Explained

Before writing any CSS, you need to understand **how to target HTML elements**. CSS uses **selectors** to find elements and apply styles to them.

**The Basic CSS Rule Structure:**

```css
selector {
    property: value;
    property: value;
}
```

```
┌─────────────────────────────────────────────────────┐
│                   CSS RULE                          │
│                                                     │
│   .card  {  background: blue;  color: white;  }    │
│   ─────     ────────────────   ────────────        │
│     │              │                │               │
│  Selector     Declaration 1    Declaration 2        │
│  (WHO?)       (WHAT?)          (WHAT?)              │
│                                                     │
│  "Find all       "Make their      "Make their       │
│   elements        background       text              │
│   with class      blue"            white"            │
│   card"                                              │
└─────────────────────────────────────────────────────┘
```

---

#### 1. Element Selector (Tag Name)

Targets **every instance** of an HTML tag.

```css
/* Targets ALL <body> elements */
body {
    background: #0f172a;
    color: white;
}

/* Targets ALL <h1> elements */
h1 {
    font-size: 2rem;
}

/* Targets ALL <button> elements */
button {
    cursor: pointer;
}

/* Targets ALL <input> elements */
input {
    border: 1px solid gray;
}
```

**When to use:** For base/default styles that should apply to every instance of that tag.

---

#### 2. Class Selector (`.className`)

Targets elements with a specific `class` attribute. **Most commonly used selector.**

```html
<!-- HTML -->
<div class="card">Quiz Card</div>
<div class="card">Another Card</div>
<button class="btn-primary">Start</button>
```

```css
/* CSS — Dot (.) before the name */
.card {
    background: #1e293b;
    border-radius: 1rem;
    padding: 1.5rem;
}

.btn-primary {
    background: #6366f1;
    color: white;
    border: none;
}
```

**Key facts:**
- Use a dot `.` before the class name
- Multiple elements CAN share the same class
- One element CAN have multiple classes: `<div class="card large highlighted">`
- **This is your go-to selector for 90% of styling**

---

#### 3. ID Selector (`#idName`)

Targets a **single unique element** with a specific `id` attribute.

```html
<!-- HTML -->
<section id="auth-screen">Login here</section>
<section id="quiz-screen">Quiz here</section>
```

```css
/* CSS — Hash (#) before the name */
#auth-screen {
    display: flex;
    justify-content: center;
}

#quiz-screen {
    padding: 2rem;
}
```

**Key facts:**
- Use a hash `#` before the ID name
- Each ID must be **unique** on the page (only one element can have `id="auth-screen"`)
- Has **higher priority** than class selectors
- **Use sparingly** — prefer classes for styling, IDs for JavaScript targeting

---

#### 4. Universal Selector (`*`)

Targets **every single element** on the page.

```css
/* Apply to ALL elements */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

**When to use:** Only for CSS resets (removing default browser styles).

---

#### 5. Descendant Selector (Space)

Targets elements **inside** another element.

```css
/* Any <li> that's inside a <ul> */
ul li {
    list-style: none;
}

/* Any element with class .option inside .quiz-screen */
.quiz-screen .option {
    padding: 1rem;
    cursor: pointer;
}
```

```
HTML Structure:                  What gets styled:
┌─────────────────────────┐
│ <div class="quiz-screen">│
│   ┌──────────────────┐  │
│   │ <div class="option"> │  ← ✅ THIS gets styled
│   │ </div>             │  │
│   ├──────────────────┤  │
│   │ <div class="option"> │  ← ✅ THIS gets styled
│   │ </div>             │  │
│   └──────────────────┘  │
│ </div>                   │
└─────────────────────────┘

│ <div class="other">      │
│   <div class="option">   │  ← ❌ NOT styled (different parent)
│   </div>                 │
│ </div>                   │
```

---

#### 6. Grouping Selector (Comma)

Applies the **same styles** to multiple selectors.

```css
/* Without grouping (repetitive): */
h1 { font-family: 'Inter', sans-serif; }
h2 { font-family: 'Inter', sans-serif; }
h3 { font-family: 'Inter', sans-serif; }

/* With grouping (clean): */
h1, h2, h3 {
    font-family: 'Inter', sans-serif;
}

/* Mix selector types freely: */
.card, .modal, #header, button {
    border-radius: 0.5rem;
}
```

---

#### 7. Pseudo-Class Selectors (`:state`)

Target elements in a **specific state**.

```css
/* When mouse hovers over a button */
.btn:hover {
    background: #4f46e5;
    transform: scale(1.05);
}

/* When a button is being clicked */
.btn:active {
    transform: scale(0.95);
}

/* When an input is focused (cursor inside) */
input:focus {
    border-color: #6366f1;
    outline: none;
}

/* First child element */
.option:first-child {
    border-top: none;
}

/* Even-numbered items (great for tables) */
tr:nth-child(even) {
    background: #f8fafc;
}
```

| Pseudo-class | When it applies |
|-------------|----------------|
| `:hover` | Mouse is over the element |
| `:active` | Element is being clicked |
| `:focus` | Element has keyboard focus |
| `:first-child` | First element among siblings |
| `:last-child` | Last element among siblings |
| `:nth-child(n)` | Element at position n |
| `:not(.class)` | Elements that DON'T match |
| `:disabled` | Disabled form elements |

---

#### 8. Pseudo-Element Selectors (`::part`)

Target a **specific part** of an element (not a real HTML element).

```css
/* Style placeholder text inside inputs */
input::placeholder {
    color: #94a3b8;
    font-style: italic;
}

/* Add content before an element */
.required::before {
    content: "* ";
    color: red;
}

/* Add content after an element */
.link::after {
    content: " →";
}
```

| Pseudo-element | What it targets |
|----------------|----------------|
| `::before` | Inserts content before element |
| `::after` | Inserts content after element |
| `::placeholder` | Placeholder text in inputs |
| `::selection` | Text highlighted by user |
| `::first-line` | First line of text |

---

#### 9. Attribute Selector (`[attribute]`)

Targets elements based on their **HTML attributes**.

```css
/* Any element with a "required" attribute */
[required] {
    border-left: 3px solid red;
}

/* Inputs with type="password" */
input[type="password"] {
    letter-spacing: 0.3em;
}

/* Links that open in new tab */
a[target="_blank"]::after {
    content: " ↗";
}
```

---

#### 10. Combinator Selectors

```css
/* Direct child (>) — only immediate children */
.card > h2 {
    margin-bottom: 1rem;
}

/* Adjacent sibling (+) — element immediately after */
h2 + p {
    font-size: 1.1rem;
}

/* General sibling (~) — any sibling after */
h2 ~ p {
    color: gray;
}
```

```
Direct Child (>) vs Descendant (space):

.card > p     targets:              .card p     targets:
┌──────────┐                       ┌──────────┐
│ .card    │                       │ .card    │
│  ├─ p  ✅│                       │  ├─ p  ✅│
│  ├─ div  │                       │  ├─ div  │
│  │  └─ p ❌ (not direct child)  │  │  └─ p ✅ (any descendant)
│  └─ p  ✅│                       │  └─ p  ✅│
└──────────┘                       └──────────┘
```

---

#### Specificity — Which Style Wins?

When multiple rules target the same element, CSS uses **specificity** to decide which wins:

```
Priority (highest to lowest):
┌─────────────────────────────────────────────────────────┐
│  1. !important           →  color: red !important;      │  ⚠️ Avoid!
│  2. Inline styles        →  <div style="color: red">    │  ⚠️ Avoid!
│  3. #id selector         →  #header { color: red; }     │  1-0-0
│  4. .class selector      →  .card { color: red; }       │  0-1-0
│  5. element selector     →  div { color: red; }         │  0-0-1
│  6. universal selector   →  * { color: red; }           │  0-0-0
└─────────────────────────────────────────────────────────┘
```

**Example conflict:**

```css
p { color: blue; }           /* Specificity: 0-0-1 */
.intro { color: green; }     /* Specificity: 0-1-0  ← WINS */
#main p { color: red; }      /* Specificity: 1-0-1  ← WINS OVER BOTH */
```

---

#### Quick Reference Table

| Selector | Syntax | Example | Targets |
|----------|--------|---------|---------|
| Element | `tag` | `body { }` | All `<body>` elements |
| Class | `.name` | `.card { }` | All elements with `class="card"` |
| ID | `#name` | `#header { }` | The one element with `id="header"` |
| Universal | `*` | `* { }` | Every element |
| Descendant | `A B` | `.card p { }` | `<p>` inside `.card` |
| Direct Child | `A > B` | `.card > p { }` | `<p>` directly inside `.card` |
| Grouping | `A, B` | `h1, h2 { }` | All `<h1>` and `<h2>` |
| Pseudo-class | `:state` | `.btn:hover { }` | Button being hovered |
| Pseudo-element | `::part` | `p::before { }` | Before content of `<p>` |
| Attribute | `[attr]` | `[required] { }` | Elements with `required` |

---

### 3.1 CSS Reset and Variables

#### Understanding `:root` — The CSS Variables Hub

**What is `:root`?**

`:root` is a special CSS **pseudo-class** that represents the very top-level element of your HTML document (the `<html>` tag). Think of it as the **"global settings panel"** for your entire website.

**Why not just use `html {}`?**

`:root` and `html {}` target the same element, but `:root` has **higher specificity** (priority). The community convention is: use `:root` specifically for defining CSS Variables (also called CSS Custom Properties).

**What are CSS Variables?**

CSS variables are **reusable values** that you define once and use everywhere. They start with `--` (double dash).

```
Without variables (BAD):              With variables (GOOD):
┌───────────────────────────┐        ┌───────────────────────────┐
│ .btn { color: #6366f1; }  │        │ :root { --primary: #6366f1; } │
│ .link { color: #6366f1; } │   →    │ .btn  { color: var(--primary); } │
│ .icon { color: #6366f1; } │        │ .link { color: var(--primary); } │
│                           │        │ .icon { color: var(--primary); } │
│ Want to change color?     │        │                           │
│ Change in 3 places! 😩    │        │ Change in 1 place! ✅     │
└───────────────────────────┘        └───────────────────────────┘
```

**Syntax Breakdown:**

```css
:root {
    --primary: #6366f1;          /* Define a variable */
}

.button {
    color: var(--primary);       /* Use the variable */
    background: var(--bg-main, #000);  /* Fallback if variable is missing */
}
```

| Syntax | Meaning |
|--------|---------|
| `:root` | Target the top-level HTML element |
| `--primary` | Custom variable name (must start with `--`) |
| `#6366f1` | The value stored in the variable |
| `var(--primary)` | Retrieve the value of `--primary` |
| `var(--bg, #000)` | Use `--bg` value, or `#000` if `--bg` is not defined |

**Real benefit — Theme switching:**

```css
/* Dark theme (default) */
:root {
    --bg-main: #0f172a;
    --text-primary: #f8fafc;
}

/* Light theme — just change the variables! */
[data-theme="light"] {
    --bg-main: #ffffff;
    --text-primary: #1e293b;
}

/* All elements using var(--bg-main) automatically switch colors */
```

**Here is the full `:root` block for our quiz app:**

```css
/* Reset default browser styles */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* CSS Variables for easy theming */
:root {
    /* Colors - 🎨 CREATIVITY POINT: Change these! */
    --primary: #6366f1;
    --primary-dark: #4f46e5;
    --secondary: #64748b;
    --success: #22c55e;
    --danger: #ef4444;
    --warning: #f59e0b;
    
    /* Backgrounds */
    --bg-main: #0f172a;
    --bg-card: #1e293b;
    --bg-input: #334155;
    
    /* Text */
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    
    /* Spacing */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    
    /* Borders */
    --radius-sm: 0.5rem;
    --radius-md: 1rem;
    --radius-lg: 1.5rem;
    --radius-full: 9999px;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg-main);
    color: var(--text-primary);
    min-height: 100vh;
}
```

### 3.2 Screen Management

#### Understanding `@keyframes` — CSS Animations

**What is `@keyframes`?**

`@keyframes` defines a **custom animation** by describing what an element looks like at different points during the animation. Think of it like a **flipbook** — you define the key frames, and the browser fills in the movement between them.

```
Frame 1 (from/0%)         In Between (browser fills this)       Frame 2 (to/100%)
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│                  │      │                  │      │                  │
│   ░░░░░░░░░░░   │      │   ▓▓▓▓▓▓▓▓▓▓▓   │      │   ███████████   │
│   (invisible)    │  →   │   (half visible) │  →   │   (fully visible)│
│   (shifted down) │      │   (moving up)    │      │   (final spot)   │
│                  │      │                  │      │                  │
└──────────────────┘      └──────────────────┘      └──────────────────┘
    opacity: 0               opacity: 0.5               opacity: 1
    translateY(20px)         translateY(10px)           translateY(0)
```

**Syntax Breakdown:**

```css
/* Step 1: DEFINE the animation */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}
```

| Part | Meaning |
|------|---------|
| `@keyframes` | Keyword that says "I'm defining an animation" |
| `fadeIn` | **Your custom name** for this animation (you choose it) |
| `from` | The **starting state** (same as `0%`) |
| `to` | The **ending state** (same as `100%`) |
| `opacity: 0` | Fully transparent (invisible) |
| `opacity: 1` | Fully visible |
| `transform: translateY(20px)` | Shifted 20px downward |
| `transform: translateY(0)` | Back to original position |

```css
/* Step 2: APPLY the animation to an element */
.screen {
    animation: fadeIn 0.3s ease;
}
```

| Part | Meaning |
|------|---------|
| `animation:` | CSS property to apply an animation |
| `fadeIn` | Name of animation (matches `@keyframes fadeIn`) |
| `0.3s` | Duration: takes 0.3 seconds |
| `ease` | Timing: starts slow, speeds up, slows down at end |

**You can also use percentages for multiple steps:**

```css
@keyframes bounce {
    0%   { transform: translateY(0); }      /* Start: normal position */
    25%  { transform: translateY(-10px); }   /* Quarter: move up */
    50%  { transform: translateY(0); }       /* Half: back to normal */
    75%  { transform: translateY(-5px); }    /* Three-quarter: small bounce */
    100% { transform: translateY(0); }       /* End: back to normal */
}
```

**Common animation timing options:**

| Value | Behavior |
|-------|----------|
| `linear` | Same speed throughout |
| `ease` | Slow start → fast middle → slow end |
| `ease-in` | Slow start → fast end |
| `ease-out` | Fast start → slow end |
| `ease-in-out` | Slow start → slow end |

**Here is our screen management code that uses `@keyframes`:**

```css
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

.screen.hidden {
    display: none;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
```

### 3.3 Timer Styling

```css
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
    background: var(--bg-card);
    border-radius: var(--radius-full);
}

.timer-text {
    position: relative;
    z-index: 1;
    font-size: 1.5rem;
    font-weight: 700;
}

/* Color changes based on time remaining */
.timer-circle.warning {
    background: conic-gradient(
        var(--warning) var(--timer-progress),
        var(--bg-input) 0%
    );
}

.timer-circle.danger {
    background: conic-gradient(
        var(--danger) var(--timer-progress),
        var(--bg-input) 0%
    );
    animation: pulse 0.5s infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}
```

### 3.4 Option Button Styling

```css
.options-container {
    display: grid;
    gap: var(--spacing-sm);
    margin: var(--spacing-lg) 0;
}

.option-btn {
    padding: var(--spacing-md);
    background: var(--bg-input);
    border: 2px solid transparent;
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
    background: rgba(99, 102, 241, 0.2);
}

.option-btn.correct {
    border-color: var(--success);
    background: rgba(34, 197, 94, 0.2);
}

.option-btn.wrong {
    border-color: var(--danger);
    background: rgba(239, 68, 68, 0.2);
}

.option-btn.disabled {
    cursor: not-allowed;
    opacity: 0.7;
}
```

### 3.5 Progress Bar

```css
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

.progress-text {
    font-size: 0.875rem;
    color: var(--text-secondary);
}
```

---

## 4. JavaScript Core Concepts

### 4.1 The Question Data Structure

```javascript
// questions.js

const questions = [
    // ==================== HTML (Questions 1-15) ====================
    {
        id: 1,
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correctIndex: 0,
        timeLimit: 20,
        points: 100
    },
    {
        id: 2,
        question: "Which HTML element is used for the largest heading?",
        options: ["<heading>", "<h6>", "<h1>", "<head>"],
        correctIndex: 2,
        timeLimit: 20,
        points: 100
    },
    {
        id: 3,
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<break>", "<lb>", "<br>", "<newline>"],
        correctIndex: 2,
        timeLimit: 20,
        points: 100
    },
    {
        id: 4,
        question: "Which attribute specifies an alternate text for an image?",
        options: ["title", "alt", "src", "longdesc"],
        correctIndex: 1,
        timeLimit: 25,
        points: 100
    },
    {
        id: 5,
        question: "What is the correct HTML for creating a hyperlink?",
        options: [
            "<a url='http://example.com'>",
            "<a href='http://example.com'>",
            "<link href='http://example.com'>",
            "<hyperlink src='http://example.com'>"
        ],
        correctIndex: 1,
        timeLimit: 25,
        points: 100
    },
    {
        id: 6,
        question: "Which HTML tag is used to define an unordered list?",
        options: ["<ol>", "<li>", "<ul>", "<list>"],
        correctIndex: 2,
        timeLimit: 20,
        points: 100
    },
    {
        id: 7,
        question: "What does the <em> tag do?",
        options: [
            "Creates emphasized/italic text",
            "Embeds multimedia",
            "Creates an email link",
            "Defines an empty element"
        ],
        correctIndex: 0,
        timeLimit: 25,
        points: 100
    },
    {
        id: 8,
        question: "Which input type is used for password fields?",
        options: ["text", "password", "hidden", "secret"],
        correctIndex: 1,
        timeLimit: 20,
        points: 100
    },
    {
        id: 9,
        question: "What is the purpose of the <meta> tag?",
        options: [
            "To create navigation menus",
            "To provide metadata about the HTML document",
            "To define main content",
            "To add multimedia"
        ],
        correctIndex: 1,
        timeLimit: 30,
        points: 100
    },
    {
        id: 10,
        question: "Which HTML5 element defines navigation links?",
        options: ["<navigation>", "<nav>", "<navigate>", "<links>"],
        correctIndex: 1,
        timeLimit: 20,
        points: 100
    },
    {
        id: 11,
        question: "What is the correct way to add a comment in HTML?",
        options: [
            "// This is a comment",
            "/* This is a comment */",
            "<!-- This is a comment -->",
            "# This is a comment"
        ],
        correctIndex: 2,
        timeLimit: 20,
        points: 100
    },
    {
        id: 12,
        question: "Which attribute makes an input field required?",
        options: ["validate", "required", "mandatory", "needed"],
        correctIndex: 1,
        timeLimit: 20,
        points: 100
    },
    {
        id: 13,
        question: "What is the HTML5 element for playing video?",
        options: ["<movie>", "<media>", "<video>", "<film>"],
        correctIndex: 2,
        timeLimit: 20,
        points: 100
    },
    {
        id: 14,
        question: "Which tag is used for creating a table row?",
        options: ["<td>", "<tr>", "<th>", "<table-row>"],
        correctIndex: 1,
        timeLimit: 20,
        points: 100
    },
    {
        id: 15,
        question: "What does the 'defer' attribute do on a <script> tag?",
        options: [
            "Loads script immediately",
            "Delays script execution until HTML parsing is complete",
            "Prevents script from running",
            "Runs script in a web worker"
        ],
        correctIndex: 1,
        timeLimit: 30,
        points: 150
    },

    // ==================== CSS (Questions 16-30) ====================
    {
        id: 16,
        question: "Which CSS property controls text size?",
        options: ["text-style", "font-size", "text-size", "font-style"],
        correctIndex: 1,
        timeLimit: 20,
        points: 100
    },
    {
        id: 17,
        question: "What is the correct CSS syntax to change text color?",
        options: [
            "text-color: red;",
            "font-color: red;",
            "color: red;",
            "text: red;"
        ],
        correctIndex: 2,
        timeLimit: 20,
        points: 100
    },
    {
        id: 18,
        question: "Which property is used to change the background color?",
        options: ["bgcolor", "background-color", "bg-color", "color-background"],
        correctIndex: 1,
        timeLimit: 20,
        points: 100
    },
    {
        id: 19,
        question: "How do you select an element with id 'header' in CSS?",
        options: [".header", "#header", "header", "*header"],
        correctIndex: 1,
        timeLimit: 20,
        points: 100
    },
    {
        id: 20,
        question: "How do you select all elements with class 'card' in CSS?",
        options: ["#card", ".card", "card", "*card"],
        correctIndex: 1,
        timeLimit: 20,
        points: 100
    },
    {
        id: 21,
        question: "Which property controls the space OUTSIDE an element?",
        options: ["padding", "margin", "border", "spacing"],
        correctIndex: 1,
        timeLimit: 25,
        points: 100
    },
    {
        id: 22,
        question: "Which property controls the space INSIDE an element?",
        options: ["margin", "padding", "border", "spacing"],
        correctIndex: 1,
        timeLimit: 25,
        points: 100
    },
    {
        id: 23,
        question: "What is the default value of 'position' in CSS?",
        options: ["relative", "absolute", "static", "fixed"],
        correctIndex: 2,
        timeLimit: 25,
        points: 100
    },
    {
        id: 24,
        question: "Which display value makes an element a flex container?",
        options: ["block", "inline", "flex", "grid"],
        correctIndex: 2,
        timeLimit: 20,
        points: 100
    },
    {
        id: 25,
        question: "What does 'z-index' control?",
        options: [
            "Horizontal positioning",
            "Vertical positioning",
            "Stacking order (front-to-back)",
            "Zoom level"
        ],
        correctIndex: 2,
        timeLimit: 25,
        points: 100
    },
    {
        id: 26,
        question: "Which CSS unit is relative to the viewport width?",
        options: ["px", "em", "vw", "rem"],
        correctIndex: 2,
        timeLimit: 25,
        points: 100
    },
    {
        id: 27,
        question: "What does 'box-sizing: border-box' do?",
        options: [
            "Adds a border to the box",
            "Includes padding and border in element's total width/height",
            "Removes all borders",
            "Creates a shadow box"
        ],
        correctIndex: 1,
        timeLimit: 30,
        points: 150
    },
    {
        id: 28,
        question: "Which pseudo-class selects an element when hovering?",
        options: [":active", ":focus", ":hover", ":visited"],
        correctIndex: 2,
        timeLimit: 20,
        points: 100
    },
    {
        id: 29,
        question: "How do you make a CSS Grid with 3 equal columns?",
        options: [
            "grid-columns: 3;",
            "grid-template-columns: 1fr 1fr 1fr;",
            "columns: 3;",
            "display: grid-3;"
        ],
        correctIndex: 1,
        timeLimit: 30,
        points: 150
    },
    {
        id: 30,
        question: "What does 'justify-content: space-between' do in Flexbox?",
        options: [
            "Centers all items",
            "Distributes items with equal space between them",
            "Aligns items to the start",
            "Wraps items to next line"
        ],
        correctIndex: 1,
        timeLimit: 30,
        points: 150
    },

    // ==================== JavaScript Beginner (Questions 31-40) ====================
    {
        id: 31,
        question: "Which keyword declares a variable that cannot be reassigned?",
        options: ["var", "let", "const", "static"],
        correctIndex: 2,
        timeLimit: 20,
        points: 100
    },
    {
        id: 32,
        question: "What is the correct way to write a JavaScript array?",
        options: [
            "var colors = (1:'red', 2:'green')",
            "var colors = ['red', 'green']",
            "var colors = 'red', 'green'",
            "var colors = {red, green}"
        ],
        correctIndex: 1,
        timeLimit: 25,
        points: 100
    },
    {
        id: 33,
        question: "How do you write 'Hello World' in an alert box?",
        options: [
            "msg('Hello World');",
            "alertBox('Hello World');",
            "alert('Hello World');",
            "popup('Hello World');"
        ],
        correctIndex: 2,
        timeLimit: 20,
        points: 100
    },
    {
        id: 34,
        question: "What does DOM stand for?",
        options: [
            "Document Object Model",
            "Data Object Management",
            "Digital Ordinance Model",
            "Document Orientation Mode"
        ],
        correctIndex: 0,
        timeLimit: 25,
        points: 100
    },
    {
        id: 35,
        question: "Which method finds an element by its ID?",
        options: [
            "document.findById()",
            "document.getElementById()",
            "document.querySelector('#id')",
            "Both B and C are correct"
        ],
        correctIndex: 3,
        timeLimit: 25,
        points: 100
    },
    {
        id: 36,
        question: "What symbol is used for single-line comments in JavaScript?",
        options: ["#", "//", "/*", "--"],
        correctIndex: 1,
        timeLimit: 20,
        points: 100
    },
    {
        id: 37,
        question: "Which method adds an element to the END of an array?",
        options: ["append()", "push()", "add()", "addToEnd()"],
        correctIndex: 1,
        timeLimit: 20,
        points: 100
    },
    {
        id: 38,
        question: "What does '===' check in JavaScript?",
        options: [
            "Only value equality",
            "Value and type equality",
            "Reference equality",
            "Approximate equality"
        ],
        correctIndex: 1,
        timeLimit: 25,
        points: 100
    },
    {
        id: 39,
        question: "Which event fires when a user clicks on an element?",
        options: ["onmouseclick", "onclick", "onpress", "onclicked"],
        correctIndex: 1,
        timeLimit: 20,
        points: 100
    },
    {
        id: 40,
        question: "What does 'typeof null' return in JavaScript?",
        options: ["'null'", "'undefined'", "'object'", "'boolean'"],
        correctIndex: 2,
        timeLimit: 30,
        points: 150
    },

    // ==================== JavaScript Intermediate (Questions 41-45) ====================
    {
        id: 41,
        question: "What is a closure in JavaScript?",
        options: [
            "A function that closes the browser",
            "A function with access to its outer scope's variables",
            "A method to close database connections",
            "A way to end a loop"
        ],
        correctIndex: 1,
        timeLimit: 35,
        points: 150
    },
    {
        id: 42,
        question: "What does the spread operator (...) do?",
        options: [
            "Spreads elements of an array/object",
            "Multiplies numbers",
            "Creates a range of numbers",
            "Defines default parameters"
        ],
        correctIndex: 0,
        timeLimit: 30,
        points: 150
    },
    {
        id: 43,
        question: "What is the output of: [1, 2, 3].map(x => x * 2)?",
        options: ["[1, 2, 3]", "[2, 4, 6]", "6", "[1, 4, 9]"],
        correctIndex: 1,
        timeLimit: 30,
        points: 150
    },
    {
        id: 44,
        question: "What is the purpose of 'async/await'?",
        options: [
            "To make synchronous code run faster",
            "To handle promises more cleanly",
            "To create web workers",
            "To define class methods"
        ],
        correctIndex: 1,
        timeLimit: 30,
        points: 150
    },
    {
        id: 45,
        question: "What does Array.prototype.filter() return?",
        options: [
            "A single value",
            "A new array with elements that pass the test",
            "The original array modified",
            "A boolean"
        ],
        correctIndex: 1,
        timeLimit: 30,
        points: 150
    },

    // ==================== JavaScript Advanced (Questions 46-50) ====================
    {
        id: 46,
        question: "What is event bubbling?",
        options: [
            "Events that create visual bubbles",
            "Events propagating from child to parent elements",
            "Events that repeat automatically",
            "Events that only fire once"
        ],
        correctIndex: 1,
        timeLimit: 35,
        points: 200
    },
    {
        id: 47,
        question: "What does 'use strict' do?",
        options: [
            "Enables strict type checking",
            "Enables stricter parsing and error handling",
            "Prevents all errors",
            "Enables strict CSS mode"
        ],
        correctIndex: 1,
        timeLimit: 35,
        points: 200
    },
    {
        id: 48,
        question: "What is the difference between 'call' and 'apply'?",
        options: [
            "They are identical",
            "'call' takes arguments as a list, 'apply' takes an array",
            "'apply' is faster than 'call'",
            "'call' only works with objects"
        ],
        correctIndex: 1,
        timeLimit: 40,
        points: 200
    },
    {
        id: 49,
        question: "What is the purpose of the Proxy object in JavaScript?",
        options: [
            "To make HTTP requests",
            "To intercept and customize object operations",
            "To create private variables",
            "To proxy between servers"
        ],
        correctIndex: 1,
        timeLimit: 40,
        points: 200
    },
    {
        id: 50,
        question: "What is the event loop in JavaScript?",
        options: [
            "A loop that repeats events",
            "The mechanism that handles async callbacks via call stack and task queue",
            "A special for...of loop",
            "A browser feature for animations"
        ],
        correctIndex: 1,
        timeLimit: 45,
        points: 200
    }
];
```

**Breaking down the data structure:**

| Property | Type | Purpose |
|----------|------|---------|
| `id` | Number | Unique identifier |
| `question` | String | The question text |
| `options` | Array | All possible answers |
| `correctIndex` | Number | Which option is correct (0-based) |
| `timeLimit` | Number | Seconds allowed |
| `points` | Number | Base score for correct answer |

### 4.2 Application State

```javascript
// app.js

// Global state object - tracks everything
const state = {
    currentUser: null,
    currentQuestionIndex: 0,
    answers: [],           // User's selected answers
    timeSpent: [],         // Seconds spent on each question
    startTime: null,       // When current question started
    timerInterval: null,   // Reference to timer
    isQuizComplete: false
};
```

**What is "state"?**

State is the current condition of your application:
- Which user is logged in?
- What question are we on?
- What answers have been selected?
- How much time has passed?

**Why track state?**

Without state, you can't:
- Know what to show next
- Calculate final scores
- Review answers later
- Maintain user session

---

### 4.3 JavaScript Methods Dictionary (For Beginners)

This section explains EVERY JavaScript method and function used in this quiz app. Read this before the code sections!

---

#### 📌 CATEGORY 1: Finding HTML Elements

These methods help JavaScript "find" elements on your HTML page.

---

##### `document.getElementById('id')`

**What it does**: Finds ONE element by its unique `id` attribute.

**When you need it**: When you want to change, read, or interact with a specific element.

**Syntax breakdown**:

```javascript
document.getElementById('my-button')
```

| Part | Meaning |
|------|---------|
| `document` | The entire HTML page as a JavaScript object |
| `.` | Access a property or method of document |
| `getElementById` | Built-in method that searches for an ID |
| `('my-button')` | The ID to search for (from your HTML) |

**Example**:

```html
<!-- In HTML -->
<button id="submit-btn">Click Me</button>
```

```javascript
// In JavaScript
const button = document.getElementById('submit-btn');
// button now refers to that <button> element
// If no element has that ID, button will be null
```

---

##### `document.querySelector('.class')` or `document.querySelector('#id')`

**What it does**: Finds the FIRST element matching a CSS selector.

**When you need it**: When you want to use CSS-style selectors (more flexible than getElementById).

**Syntax breakdown**:

```javascript
document.querySelector('.option-btn')
```

| Part | Meaning |
|------|---------|
| `querySelector` | Searches using CSS selector syntax |
| `'.option-btn'` | CSS selector: `.` = class, `#` = id, `tag` = element |

**Selector types**:

| Selector | Finds |
|----------|-------|
| `'#my-id'` | Element with `id="my-id"` |
| `'.my-class'` | First element with `class="my-class"` |
| `'button'` | First `<button>` element |
| `'.container p'` | First `<p>` inside `.container` |

---

##### `document.querySelectorAll('.class')`

**What it does**: Finds ALL elements matching a CSS selector (returns a list).

**When you need it**: When you want to work with multiple elements at once.

```javascript
const allButtons = document.querySelectorAll('.option-btn');
// Returns a NodeList (like an array) of all matching elements

// Loop through all of them:
allButtons.forEach(button => {
    button.classList.add('disabled');
});
```

---

#### 📌 CATEGORY 2: Changing Element Content

---

##### `.textContent`

**What it does**: Gets or sets the TEXT inside an element.

**When you need it**: When you want to change what text the user sees.

```javascript
// GET the current text
const currentText = element.textContent;

// SET new text
element.textContent = 'Hello World';
```

**Example**:

```html
<p id="score">0</p>
```

```javascript
const scoreElement = document.getElementById('score');
scoreElement.textContent = '100';  // Page now shows "100" instead of "0"
```

**Important**: This only handles TEXT. Any HTML tags become visible as text:
```javascript
element.textContent = '<strong>Bold</strong>';
// Shows literally: <strong>Bold</strong>
```

---

##### `.innerHTML`

**What it does**: Gets or sets the HTML content inside an element.

**When you need it**: When you want to add HTML elements dynamically.

```javascript
element.innerHTML = '<p>New paragraph</p>';
// The element now contains a <p> tag
```

**⚠️ Warning**: Be careful with innerHTML! Never put user input directly into innerHTML (security risk).

**Safe use**:
```javascript
container.innerHTML = '';  // Clear all contents (common pattern)
```

---

##### `.value`

**What it does**: Gets or sets the value of form inputs (text fields, etc.).

**When you need it**: When you want to read what the user typed.

```html
<input type="text" id="username">
```

```javascript
const input = document.getElementById('username');

// GET what user typed
const username = input.value;

// SET the input's value
input.value = 'Default name';

// CLEAR the input
input.value = '';
```

---

#### 📌 CATEGORY 3: CSS Class Management

These methods add, remove, or toggle CSS classes on elements.

---

##### `.classList.add('class')`

**What it does**: Adds a CSS class to an element.

**When you need it**: When you want to apply styling or show something.

```javascript
element.classList.add('active');
// Now the element has class="... active"
```

**Real example**:
```javascript
button.classList.add('selected');
// Now CSS rule .selected { background: blue; } applies
```

---

##### `.classList.remove('class')`

**What it does**: Removes a CSS class from an element.

**When you need it**: When you want to remove styling or hide something.

```javascript
element.classList.remove('hidden');
// Now the element is visible (assuming .hidden has display: none)
```

---

##### `.classList.toggle('class')`

**What it does**: Adds the class if missing, removes it if present.

**When you need it**: For on/off switches like dark mode, menus, etc.

```javascript
body.classList.toggle('dark');
// First call: adds 'dark'
// Second call: removes 'dark'
// Third call: adds 'dark' again
// ...and so on
```

**With second argument**:
```javascript
element.classList.toggle('active', isActive);
// If isActive is true: adds 'active'
// If isActive is false: removes 'active'
```

---

##### `.classList.contains('class')`

**What it does**: Checks if an element has a specific class.

**When you need it**: When you need to check the current state.

```javascript
if (button.classList.contains('selected')) {
    // Button is selected, do something
}
```

---

#### 📌 CATEGORY 4: Creating & Adding Elements

---

##### `document.createElement('tag')`

**What it does**: Creates a new HTML element (not on the page yet).

**When you need it**: When you want to dynamically add content to the page.

```javascript
const newButton = document.createElement('button');
// Creates: <button></button> (in memory, not visible yet)

newButton.textContent = 'Click Me';
// Now: <button>Click Me</button>

newButton.className = 'btn primary';
// Now: <button class="btn primary">Click Me</button>
```

---

##### `.appendChild(child)`

**What it does**: Adds an element as the last child of a parent element.

**When you need it**: To put the element you created onto the page.

```javascript
const container = document.getElementById('options-container');
const newOption = document.createElement('button');
newOption.textContent = 'Option A';

container.appendChild(newOption);
// The button now appears inside the container
```

**Complete pattern**:
```javascript
// 1. Create element
const item = document.createElement('li');

// 2. Set its content
item.textContent = 'New item';

// 3. Add classes if needed
item.className = 'list-item';

// 4. Add to page
document.getElementById('my-list').appendChild(item);
```

---

##### `.dataset.propertyName`

**What it does**: Stores or reads custom data on an element.

**When you need it**: When you need to attach extra information to an element.

```html
<button data-index="2" data-correct="true">Answer C</button>
```

```javascript
const button = document.querySelector('button');

// READ data attributes
console.log(button.dataset.index);    // "2"
console.log(button.dataset.correct);  // "true"

// SET data attributes
button.dataset.selected = "yes";
// Now: <button data-index="2" data-correct="true" data-selected="yes">
```

---

#### 📌 CATEGORY 5: Event Listeners

Event listeners wait for user actions and run code when they happen.

---

##### `.addEventListener('event', function)`

**What it does**: Attaches a function to run when an event occurs.

**When you need it**: When you want to react to user actions (clicks, typing, etc.).

**Syntax breakdown**:

```javascript
button.addEventListener('click', handleClick);
```

| Part | Meaning |
|------|---------|
| `button` | The element to watch |
| `.addEventListener()` | Method to attach a listener |
| `'click'` | The event type to listen for |
| `handleClick` | Function to run when event happens |

**Common events**:

| Event | When it fires |
|-------|---------------|
| `'click'` | Element is clicked |
| `'submit'` | Form is submitted |
| `'keydown'` | Key is pressed |
| `'keyup'` | Key is released |
| `'input'` | Text input changes |
| `'change'` | Select/checkbox changes |
| `'mouseover'` | Mouse hovers over |
| `'mouseout'` | Mouse leaves element |

**Example with inline function**:
```javascript
button.addEventListener('click', () => {
    alert('Button clicked!');
});
```

**Example with named function**:
```javascript
function handleClick() {
    alert('Button clicked!');
}

button.addEventListener('click', handleClick);
```

---

##### `event.preventDefault()`

**What it does**: Stops the browser's default action for an event.

**When you need it**: To stop forms from reloading the page on submit.

```javascript
form.addEventListener('submit', (event) => {
    event.preventDefault();  // STOP page reload
    
    // Now handle submission with JavaScript
    const data = new FormData(form);
    // ... process data
});
```

**Other uses**:
- Stop links from navigating
- Stop right-click context menu
- Stop drag-and-drop defaults

---

#### 📌 CATEGORY 6: Timers

---

##### `setInterval(function, milliseconds)`

**What it does**: Runs a function repeatedly at set intervals.

**When you need it**: For countdown timers, animations, polling.

```javascript
let seconds = 30;

const intervalId = setInterval(() => {
    seconds--;
    console.log(seconds);  // Runs every 1000ms
    
    if (seconds <= 0) {
        clearInterval(intervalId);  // Stop the interval
    }
}, 1000);  // 1000ms = 1 second
```

| Argument | Meaning |
|----------|---------|
| First | Function to run |
| Second | Milliseconds between runs (1000 = 1 second) |
| Returns | An ID you can use to stop it later |

---

##### `clearInterval(intervalId)`

**What it does**: Stops a running interval.

**When you need it**: To stop a timer or repeating action.

```javascript
let intervalId = setInterval(someFunction, 1000);

// Later, to stop it:
clearInterval(intervalId);
```

---

##### `setTimeout(function, milliseconds)`

**What it does**: Runs a function ONCE after a delay.

**When you need it**: For delayed actions, animations, showing messages.

```javascript
setTimeout(() => {
    alert('3 seconds have passed!');
}, 3000);  // 3000ms = 3 seconds
```

**Common uses**:
```javascript
// Auto-advance after answer
setTimeout(() => nextQuestion(), 1500);

// Hide message after delay
setTimeout(() => {
    message.classList.add('hidden');
}, 2000);
```

---

#### 📌 CATEGORY 7: Arrays

Arrays are lists that store multiple values.

---

##### `array.push(item)`

**What it does**: Adds an item to the END of an array.

```javascript
const answers = [];
answers.push('A');  // ['A']
answers.push('B');  // ['A', 'B']
answers.push('C');  // ['A', 'B', 'C']
```

---

##### `array.forEach((item, index) => { })`

**What it does**: Runs a function for EACH item in the array.

**When you need it**: When you want to do something with every item.

```javascript
const options = ['Apple', 'Banana', 'Cherry'];

options.forEach((option, index) => {
    console.log(`${index}: ${option}`);
});
// Output:
// 0: Apple
// 1: Banana
// 2: Cherry
```

| Parameter | Meaning |
|-----------|---------|
| `option` | Current item being processed |
| `index` | Position in array (0, 1, 2, ...) |

---

##### `array.map((item) => newItem)`

**What it does**: Creates a NEW array by transforming each item.

**When you need it**: When you want to convert data.

```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
// doubled = [2, 4, 6]
// original numbers still = [1, 2, 3]
```

**Real example**:
```javascript
const results = questions.map((q, index) => {
    return {
        question: q.question,
        userAnswer: answers[index],
        isCorrect: answers[index] === q.correctIndex
    };
});
```

---

##### `array.filter((item) => condition)`

**What it does**: Creates a NEW array with only items that pass a test.

**When you need it**: When you want to select specific items.

```javascript
const scores = [45, 82, 91, 38, 77];
const passing = scores.filter(score => score >= 60);
// passing = [82, 91, 77]
```

---

##### `array.find((item) => condition)`

**What it does**: Returns the FIRST item that passes a test.

**When you need it**: When you need one specific item.

```javascript
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

const bob = users.find(user => user.name === 'Bob');
// bob = { id: 2, name: 'Bob' }
```

---

##### `array.some((item) => condition)`

**What it does**: Returns `true` if ANY item passes the test.

**When you need it**: To check if at least one item matches.

```javascript
const emails = ['a@test.com', 'b@test.com', 'c@test.com'];

if (emails.some(email => email === 'a@test.com')) {
    console.log('Email already registered!');
}
```

---

##### `array.slice(start, end)`

**What it does**: Returns a portion of the array (doesn't modify original).

**When you need it**: To get a subset of items.

```javascript
const items = ['a', 'b', 'c', 'd', 'e'];

items.slice(0, 3);   // ['a', 'b', 'c'] (index 0, 1, 2)
items.slice(2);      // ['c', 'd', 'e'] (from index 2 to end)
items.slice(-2);     // ['d', 'e'] (last 2 items)
```

---

#### 📌 CATEGORY 8: Local Storage

localStorage saves data in the browser permanently (until cleared).

---

##### `localStorage.setItem('key', 'value')`

**What it does**: Saves a string to the browser's storage.

**When you need it**: To save data that persists between sessions.

```javascript
localStorage.setItem('username', 'John');
```

**Important**: localStorage ONLY stores strings!

```javascript
// ❌ WRONG - doesn't work for objects/arrays
localStorage.setItem('user', { name: 'John' });  // Stores "[object Object]"

// ✅ CORRECT - convert to string first
localStorage.setItem('user', JSON.stringify({ name: 'John' }));
```

---

##### `localStorage.getItem('key')`

**What it does**: Retrieves a value from storage.

```javascript
const username = localStorage.getItem('username');
// Returns the string, or null if not found
```

**For objects/arrays**:
```javascript
const userString = localStorage.getItem('user');
const user = JSON.parse(userString);
// Now user is an object: { name: 'John' }
```

---

##### `localStorage.removeItem('key')`

**What it does**: Deletes a specific item from storage.

```javascript
localStorage.removeItem('username');
```

---

#### 📌 CATEGORY 9: JSON

JSON methods convert between objects and strings.

---

##### `JSON.stringify(object)`

**What it does**: Converts an object or array to a JSON string.

**When you need it**: Before saving to localStorage or sending to API.

```javascript
const data = { name: 'John', score: 100 };
const jsonString = JSON.stringify(data);
// jsonString = '{"name":"John","score":100}'
```

---

##### `JSON.parse(string)`

**What it does**: Converts a JSON string back to an object or array.

**When you need it**: After reading from localStorage or API.

```javascript
const jsonString = '{"name":"John","score":100}';
const data = JSON.parse(jsonString);
// data = { name: 'John', score: 100 }
// data.name = 'John'
// data.score = 100
```

---

#### 📌 CATEGORY 10: Time & Math

---

##### `Date.now()`

**What it does**: Returns current time as milliseconds since 1970.

**When you need it**: For timing, unique IDs, performance measurement.

```javascript
const startTime = Date.now();
// ... do something
const endTime = Date.now();

const elapsedSeconds = (endTime - startTime) / 1000;
```

---

##### `Math.round(number)`

**What it does**: Rounds to nearest whole number.

```javascript
Math.round(4.5);   // 5
Math.round(4.4);   // 4
Math.round(4.6);   // 5
```

---

##### `Math.floor(number)`

**What it does**: Rounds DOWN to whole number.

```javascript
Math.floor(4.9);   // 4
Math.floor(4.1);   // 4
```

---

##### `Math.ceil(number)`

**What it does**: Rounds UP to whole number.

```javascript
Math.ceil(4.1);    // 5
Math.ceil(4.9);    // 5
```

---

#### 📌 CATEGORY 11: String Methods

---

##### `string.trim()`

**What it does**: Removes spaces from start and end.

```javascript
const input = '  hello world  ';
input.trim();  // 'hello world'
```

**Common use**:
```javascript
const email = inputField.value.trim();  // Clean user input
```

---

##### `string.toLowerCase()` / `string.toUpperCase()`

**What it does**: Converts case.

```javascript
'Hello'.toLowerCase();  // 'hello'
'Hello'.toUpperCase();  // 'HELLO'
```

**Common use** (case-insensitive comparison):
```javascript
if (input.toLowerCase() === 'yes') {
    // Works for 'YES', 'Yes', 'yes', etc.
}
```

---

#### 📌 CATEGORY 12: Modern JavaScript Syntax

---

##### Arrow Functions `() => {}`

**What it does**: Shorter way to write functions.

```javascript
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function (same thing)
const add = (a, b) => {
    return a + b;
};

// Arrow function (even shorter for single expression)
const add = (a, b) => a + b;
```

**When used inline**:
```javascript
button.addEventListener('click', () => {
    alert('Clicked!');
});
```

---

##### Template Literals `` `text ${variable}` ``

**What it does**: Lets you embed variables in strings easily.

```javascript
const name = 'John';
const score = 100;

// Old way
const message = 'Hello ' + name + ', you scored ' + score;

// Template literal (much cleaner!)
const message = `Hello ${name}, you scored ${score}`;
```

**Important**: Use backticks `` ` `` not regular quotes!

---

##### Spread Operator `...`

**What it does**: "Spreads" an array or object into individual items.

```javascript
// Array spreading
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]

// Object spreading
const user = { name: 'John', age: 25 };
const updatedUser = { ...user, age: 26 };  // { name: 'John', age: 26 }
```

---

##### Destructuring `{ prop } = object`

**What it does**: Extracts properties from objects into variables.

```javascript
const user = { name: 'John', email: 'john@test.com', age: 25 };

// Instead of:
const name = user.name;
const email = user.email;

// You can do:
const { name, email } = user;
// name = 'John', email = 'john@test.com'
```

---

##### Optional Chaining `?.`

**What it does**: Safely access nested properties (returns undefined if missing).

```javascript
const user = { profile: { name: 'John' } };

// Without optional chaining (might crash):
const name = user.profile.name;  // OK
const city = user.address.city;  // ❌ ERROR! address is undefined

// With optional chaining (safe):
const city = user.address?.city;  // undefined (no error)
const country = user.address?.country ?? 'Unknown';  // 'Unknown'
```

---

##### Nullish Coalescing `??`

**What it does**: Returns right side if left side is null or undefined.

```javascript
const value = null;
const result = value ?? 'default';  // 'default'

const zero = 0;
const num = zero ?? 10;  // 0 (NOT 10, because 0 is not null/undefined)
```

**Difference from `||`**:
```javascript
0 || 10    // 10 (because 0 is "falsy")
0 ?? 10    // 0 (because 0 is not null/undefined)
```

---

### 4.4 How to Know Which Method to Use

**Quick Decision Guide:**

| I want to... | Use this |
|--------------|----------|
| Find an element by ID | `document.getElementById('id')` |
| Find elements by class | `document.querySelectorAll('.class')` |
| Change visible text | `element.textContent = '...'` |
| Add/remove CSS classes | `element.classList.add/remove/toggle()` |
| React to user clicks | `element.addEventListener('click', fn)` |
| Create new elements | `document.createElement()` + `appendChild()` |
| Run code repeatedly | `setInterval()` |
| Run code once after delay | `setTimeout()` |
| Loop through array | `array.forEach()` |
| Transform array items | `array.map()` |
| Filter array items | `array.filter()` |
| Save data permanently | `localStorage.setItem()` |
| Read saved data | `localStorage.getItem()` |
| Convert object to string | `JSON.stringify()` |
| Convert string to object | `JSON.parse()` |
| Get current time | `Date.now()` |
| Clean up user input | `string.trim()` |

---

## 5. Building the Quiz Logic


### 5.1 Starting the Quiz

```javascript
function startQuiz() {
    // Reset state
    state.currentQuestionIndex = 0;
    state.answers = [];
    state.timeSpent = [];
    state.isQuizComplete = false;
    
    // Show quiz screen
    showScreen('quiz-screen');
    
    // Load first question
    loadQuestion(0);
}
```

**Breaking it down:**

| Line | What it Does |
|------|--------------|
| `state.currentQuestionIndex = 0` | Start at first question |
| `state.answers = []` | Clear any previous answers |
| `showScreen('quiz-screen')` | Hide other screens, show quiz |
| `loadQuestion(0)` | Display the first question |

### 5.2 Loading a Question

```javascript
function loadQuestion(index) {
    const question = questions[index];
    
    // Update progress bar
    updateProgress(index);
    
    // Update question text
    document.getElementById('question-text').textContent = question.question;
    
    // Generate option buttons
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';  // Clear previous options
    
    question.options.forEach((option, optionIndex) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.dataset.index = optionIndex;  // Store which option this is
        
        // Check if user already answered this question
        if (state.answers[index] !== undefined) {
            if (state.answers[index] === optionIndex) {
                button.classList.add('selected');
            }
        }
        
        button.addEventListener('click', () => selectAnswer(optionIndex));
        optionsContainer.appendChild(button);
    });
    
    // Start timer
    startTimer(question.timeLimit);
    
    // Record start time
    state.startTime = Date.now();
    
    // Update navigation buttons
    updateNavigationButtons();
}
```

**Key JavaScript concepts used:**

| Concept | Example | What it Does |
|---------|---------|--------------|
| `questions[index]` | Array access | Gets question at position |
| `.textContent` | DOM property | Changes visible text |
| `.innerHTML = ''` | DOM property | Clears all children |
| `.forEach()` | Array method | Loops through each option |
| `document.createElement()` | DOM method | Creates new HTML element |
| `.dataset.index` | Data attribute | Stores custom data on element |
| `.addEventListener()` | Event handling | Runs function on click |
| `.appendChild()` | DOM method | Adds element to page |
| `Date.now()` | Time function | Gets current timestamp |

### 5.3 Selecting an Answer

```javascript
function selectAnswer(optionIndex) {
    const currentIndex = state.currentQuestionIndex;
    
    // Record the answer
    state.answers[currentIndex] = optionIndex;
    
    // Record time spent
    const timeSpent = (Date.now() - state.startTime) / 1000;
    state.timeSpent[currentIndex] = timeSpent;
    
    // Stop timer
    stopTimer();
    
    // Update UI - show selected
    const options = document.querySelectorAll('.option-btn');
    options.forEach((btn, index) => {
        btn.classList.remove('selected');
        if (index === optionIndex) {
            btn.classList.add('selected');
        }
    });
    
    // 🎨 CREATIVITY POINT: Add feedback animation here!
    // Examples: shake for wrong, bounce for right
    
    // Auto-advance after short delay (optional)
    // setTimeout(() => nextQuestion(), 1000);
}
```

### 5.4 Navigation

```javascript
function nextQuestion() {
    if (state.currentQuestionIndex < questions.length - 1) {
        state.currentQuestionIndex++;
        loadQuestion(state.currentQuestionIndex);
    } else {
        // Last question - show submit button
        document.getElementById('next-btn').classList.add('hidden');
        document.getElementById('submit-btn').classList.remove('hidden');
    }
}

function previousQuestion() {
    if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex--;
        loadQuestion(state.currentQuestionIndex);
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    // Disable previous on first question
    prevBtn.disabled = state.currentQuestionIndex === 0;
    
    // Show submit on last question
    if (state.currentQuestionIndex === questions.length - 1) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
}
```

### 5.5 Submitting the Quiz

```javascript
function submitQuiz() {
    state.isQuizComplete = true;
    
    // Calculate results
    const results = calculateResults();
    
    // Show results screen
    showScreen('results-screen');
    
    // Display score
    displayScore(results);
    
    // Generate charts
    generateCharts(results);
    
    // Show answer review
    generateReview();
    
    // Save results to storage
    saveResults(results);
    
    // Update leaderboard
    updateLeaderboard(results);
}
```

---

## 6. Implementing the Timer

### 6.1 The Timer Module

```javascript
// timer.js

let timerInterval = null;
let timeRemaining = 0;
let totalTime = 0;

function startTimer(seconds) {
    // Clear any existing timer
    stopTimer();
    
    timeRemaining = seconds;
    totalTime = seconds;
    
    // Update display immediately
    updateTimerDisplay();
    
    // Start countdown
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            stopTimer();
            handleTimeUp();
        }
    }, 1000);  // Run every 1000ms (1 second)
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerDisplay() {
    const timerText = document.getElementById('timer-text');
    const timerCircle = document.getElementById('timer-circle');
    
    // Update text
    timerText.textContent = timeRemaining;
    
    // Update progress (CSS variable)
    const progress = (timeRemaining / totalTime) * 100;
    timerCircle.style.setProperty('--timer-progress', `${progress}%`);
    
    // Change color based on time remaining
    timerCircle.classList.remove('warning', 'danger');
    if (timeRemaining <= 10 && timeRemaining > 5) {
        timerCircle.classList.add('warning');
    } else if (timeRemaining <= 5) {
        timerCircle.classList.add('danger');
    }
}

function handleTimeUp() {
    // Record that time ran out (null or -1 to indicate no answer)
    const currentIndex = state.currentQuestionIndex;
    if (state.answers[currentIndex] === undefined) {
        state.answers[currentIndex] = -1;  // No answer selected
        state.timeSpent[currentIndex] = totalTime;  // Used all time
    }
    
    // 🎨 CREATIVITY POINT: Add "Time's Up!" animation
    
    // Auto-advance to next question
    setTimeout(() => nextQuestion(), 1500);
}
```

**Key timer concepts:**

| Function | What it Does |
|----------|--------------|
| `setInterval(fn, ms)` | Runs function every X milliseconds |
| `clearInterval(id)` | Stops a running interval |
| `Date.now()` | Gets current time in milliseconds |
| `setTimeout(fn, ms)` | Runs function once after delay |

---

## 7. Calculating Scores with Time Bonus

### 7.1 The Scoring Formula

Like Mentimeter, we reward both **correctness** and **speed**:

```
Final Score = Base Points × Time Multiplier

Time Multiplier = 1 + (Time Remaining / Time Limit)

Example:
- 30 second question, answered in 10 seconds (20 remaining)
- Time Multiplier = 1 + (20/30) = 1.67
- If base points = 100
- Final Score = 100 × 1.67 = 167 points
```

### 7.2 Score Calculation Function

```javascript
function calculateResults() {
    let totalScore = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let unanswered = 0;
    
    const questionResults = questions.map((question, index) => {
        const userAnswer = state.answers[index];
        const timeSpent = state.timeSpent[index] || question.timeLimit;
        const isCorrect = userAnswer === question.correctIndex;
        const wasAnswered = userAnswer !== undefined && userAnswer !== -1;
        
        // Calculate score for this question
        let questionScore = 0;
        if (isCorrect) {
            const timeRemaining = question.timeLimit - timeSpent;
            const timeMultiplier = 1 + (timeRemaining / question.timeLimit);
            questionScore = Math.round(question.points * timeMultiplier);
            correctCount++;
        } else if (wasAnswered) {
            wrongCount++;
        } else {
            unanswered++;
        }
        
        totalScore += questionScore;
        
        return {
            questionId: question.id,
            question: question.question,
            userAnswer: wasAnswered ? question.options[userAnswer] : 'No answer',
            correctAnswer: question.options[question.correctIndex],
            isCorrect,
            timeSpent: Math.round(timeSpent * 10) / 10,  // Round to 1 decimal
            score: questionScore
        };
    });
    
    return {
        totalScore,
        correctCount,
        wrongCount,
        unanswered,
        totalQuestions: questions.length,
        percentage: Math.round((correctCount / questions.length) * 100),
        questionResults,
        userName: state.currentUser?.name || 'Anonymous',
        completedAt: new Date().toISOString()
    };
}
```

---

## 8. Creating Charts for Results

### 8.1 Using Chart.js

Chart.js is a lightweight library that creates beautiful charts.

**Including Chart.js:**
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

### 8.2 Pie Chart (Correct vs Incorrect)

```javascript
// charts.js

function createPieChart(results) {
    const ctx = document.getElementById('pie-chart').getContext('2d');
    
    // Destroy existing chart if any
    if (window.pieChart) {
        window.pieChart.destroy();
    }
    
    window.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Correct', 'Wrong', 'Unanswered'],
            datasets: [{
                data: [
                    results.correctCount,
                    results.wrongCount,
                    results.unanswered
                ],
                backgroundColor: [
                    '#22c55e',  // Green for correct
                    '#ef4444',  // Red for wrong
                    '#64748b'   // Gray for unanswered
                ],
                borderColor: '#1e293b',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#f8fafc'
                    }
                },
                title: {
                    display: true,
                    text: 'Answer Distribution',
                    color: '#f8fafc'
                }
            }
        }
    });
}
```

### 8.3 Bar Chart (Time per Question)

```javascript
function createBarChart(results) {
    const ctx = document.getElementById('bar-chart').getContext('2d');
    
    if (window.barChart) {
        window.barChart.destroy();
    }
    
    const labels = results.questionResults.map((_, i) => `Q${i + 1}`);
    const times = results.questionResults.map(r => r.timeSpent);
    const colors = results.questionResults.map(r => 
        r.isCorrect ? '#22c55e' : '#ef4444'
    );
    
    window.barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Time (seconds)',
                data: times,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Seconds',
                        color: '#f8fafc'
                    },
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

function generateCharts(results) {
    createPieChart(results);
    createBarChart(results);
}
```

---

## 9. User Authentication System

### 9.1 The Authentication Module

```javascript
// auth.js

// Check if user is logged in on page load
function checkAuth() {
    const savedUser = localStorage.getItem('quizUser');
    if (savedUser) {
        state.currentUser = JSON.parse(savedUser);
        updateUserDisplay();
        return true;
    }
    return false;
}

// Handle signup
function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    
    // Validation
    if (!name || !email || !password) {
        showError('signup-error', 'All fields are required');
        return;
    }
    
    if (password.length < 6) {
        showError('signup-error', 'Password must be at least 6 characters');
        return;
    }
    
    // Check if email already exists
    const users = getUsers();
    if (users.some(u => u.email === email)) {
        showError('signup-error', 'Email already registered');
        return;
    }
    
    // Create user object
    const newUser = {
        id: Date.now(),  // Simple unique ID
        name,
        email,
        password: hashPassword(password),  // Never store plain passwords!
        createdAt: new Date().toISOString(),
        highScore: 0
    };
    
    // Save user
    users.push(newUser);
    localStorage.setItem('quizUsers', JSON.stringify(users));
    
    // Auto-login
    loginUser(newUser);
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    const users = getUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
        showError('login-error', 'Email not found');
        return;
    }
    
    if (user.password !== hashPassword(password)) {
        showError('login-error', 'Incorrect password');
        return;
    }
    
    loginUser(user);
}

function loginUser(user) {
    // Don't store password in session
    const sessionUser = { ...user };
    delete sessionUser.password;
    
    state.currentUser = sessionUser;
    localStorage.setItem('quizUser', JSON.stringify(sessionUser));
    
    updateUserDisplay();
    showScreen('quiz-screen');
    startQuiz();
}

function logout() {
    state.currentUser = null;
    localStorage.removeItem('quizUser');
    showScreen('auth-screen');
}

// Helper functions
function getUsers() {
    return JSON.parse(localStorage.getItem('quizUsers')) || [];
}

function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function updateUserDisplay() {
    if (state.currentUser) {
        document.getElementById('user-display').textContent = 
            `Welcome, ${state.currentUser.name}`;
    }
}

// Simple hash function (for demo - use proper hashing in production!)
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString();
}
```

### 9.2 Setting Up Event Listeners

```javascript
// In app.js or auth.js

function initAuth() {
    // Tab switching
    document.getElementById('login-tab').addEventListener('click', () => {
        switchAuthTab('login');
    });
    
    document.getElementById('signup-tab').addEventListener('click', () => {
        switchAuthTab('signup');
    });
    
    // Form submissions
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('signup-form').addEventListener('submit', handleSignup);
    
    // Logout button
    document.getElementById('logout-btn').addEventListener('click', logout);
}

function switchAuthTab(tab) {
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (tab === 'login') {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    } else {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    }
}
```

---

## 10. Data Storage Options

### 10.1 localStorage (Client-Side Only)

**Pros:**
- Simple to use
- No server needed
- Works offline

**Cons:**
- Data only on one device
- Can be cleared by user
- No real security

```javascript
// Save results
function saveResults(results) {
    const allResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    allResults.push({
        ...results,
        oderId: state.currentUser?.id || 'anonymous'
    });
    localStorage.setItem('quizResults', JSON.stringify(allResults));
}

// Get leaderboard
function getLeaderboard() {
    const allResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    
    // Group by user, keep best score
    const userBestScores = {};
    allResults.forEach(result => {
        const key = result.userId;
        if (!userBestScores[key] || result.totalScore > userBestScores[key].totalScore) {
            userBestScores[key] = result;
        }
    });
    
    // Sort by score descending
    return Object.values(userBestScores)
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, 10);  // Top 10
}
```

### 10.2 Firebase (Cloud Database) - Optional Advanced

For multi-device sync and real leaderboards, use Firebase:

```javascript
// Example Firebase setup (requires Firebase SDK)
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    // Your Firebase config here
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function saveResultsToCloud(results) {
    await addDoc(collection(db, 'quizResults'), results);
}

async function getCloudLeaderboard() {
    const q = query(
        collection(db, 'quizResults'),
        orderBy('totalScore', 'desc'),
        limit(10)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
}
```

---

## 11. Deployment Guide

### 11.1 Option 1: GitHub Pages (Free & Simple)

1. **Create GitHub repository**
2. **Push your code**
3. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: main branch
   - Save

Your site will be at: `https://yourusername.github.io/quiz-app/`

### 11.2 Option 2: Vercel (Free & Professional)

1. **Sign up at vercel.com**
2. **Connect GitHub**
3. **Import your repository**
4. **Deploy**

Vercel provides:
- Free SSL
- Custom domains
- Automatic deployments

### 11.3 Option 3: Netlify (Free & Easy)

1. **Drag and drop your folder** at netlify.com/drop
2. **Done!**

Or connect to Git for auto-deploys.

---

## 12. Creativity Points: Make It Yours!

### 🎨 Visual Creativity

| Area | Ideas |
|------|-------|
| **Color Scheme** | Change CSS variables to match your brand |
| **Typography** | Try Google Fonts: Poppins, Outfit, Space Grotesk |
| **Animations** | Add confetti on perfect score, shake on wrong answer |
| **Themes** | Add light/dark mode toggle |
| **Progress Bar** | Make it animated, add particles |

### 🎮 Gameplay Creativity

| Area | Ideas |
|------|-------|
| **Difficulty Levels** | Easy (45s), Medium (30s), Hard (15s) |
| **Power-ups** | 50/50, Skip question, Extra time |
| **Streaks** | Bonus points for consecutive correct answers |
| **Categories** | Let users choose topics |
| **Daily Challenge** | New questions every day |

### 📊 Results Creativity

| Area | Ideas |
|------|-------|
| **Badges** | "Speed Demon", "Perfect Score", "First Try" |
| **Ranks** | Bronze, Silver, Gold, Platinum |
| **Social Sharing** | Share score on Twitter/WhatsApp |
| **Certificates** | Generate PDF certificates |

### 🔊 Sound & Effects

| Area | Ideas |
|------|-------|
| **Sound Effects** | Correct/wrong sounds, timer tick |
| **Background Music** | Subtle quiz show music |
| **Celebrations** | Fireworks animation on completion |

---

## 13. Complete Code Reference

> **This section contains COMPLETE, copy-paste-ready files.** Create each file exactly as shown. The code from Sections 2-12 is assembled here into working files you can use directly.

```
quiz-app/
├── index.html              ← Copy from 13.1
├── css/
│   └── style.css           ← Copy from 13.2
└── js/
    ├── questions.js         ← Copy from 13.3
    ├── timer.js             ← Copy from 13.4
    ├── auth.js              ← Copy from 13.5
    ├── charts.js            ← Copy from 13.6
    └── app.js               ← Copy from 13.7
```

### 13.1 Complete index.html

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

        <!-- ==================== SCREEN 1: AUTH ==================== -->
        <section id="auth-screen" class="screen">
            <div class="auth-container">
                <h1 class="auth-title">Quiz Master</h1>

                <div class="auth-tabs">
                    <button class="auth-tab active" id="login-tab">Login</button>
                    <button class="auth-tab" id="signup-tab">Sign Up</button>
                </div>

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

        <!-- ==================== SCREEN 2: QUIZ ==================== -->
        <section id="quiz-screen" class="screen hidden">
            <header class="quiz-header">
                <div class="quiz-info">
                    <span class="user-name" id="user-display">Welcome, User</span>
                    <button class="btn btn-small" id="logout-btn">Logout</button>
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

        <!-- ==================== SCREEN 3: RESULTS ==================== -->
        <section id="results-screen" class="screen hidden">
            <header class="results-header">
                <h1>Quiz Complete!</h1>
                <div class="score-display">
                    <span class="score-label">Your Score</span>
                    <span class="score-value" id="final-score">0</span>
                    <span class="score-max">/ 1000</span>
                </div>
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
                <button class="btn btn-secondary" id="home-btn">Back to Home</button>
            </footer>
        </section>

    </div>

    <script src="./js/questions.js"></script>
    <script src="./js/timer.js"></script>
    <script src="./js/auth.js"></script>
    <script src="./js/charts.js"></script>
    <script src="./js/app.js"></script>
</body>
</html>
```

### 13.2 Complete css/style.css

```css
/* ==================== RESET & VARIABLES ==================== */
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
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --radius-sm: 0.5rem;
    --radius-md: 1rem;
    --radius-lg: 1.5rem;
    --radius-full: 9999px;
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg-main);
    color: var(--text-primary);
    min-height: 100vh;
}

/* ==================== LAYOUT ==================== */
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

/* ==================== BUTTONS ==================== */
.btn {
    padding: var(--spacing-sm) var(--spacing-md);
    border: none;
    border-radius: var(--radius-sm);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn:hover { transform: translateY(-2px); }
.btn:active { transform: translateY(0); }

.btn-primary {
    background: var(--primary);
    color: white;
}
.btn-primary:hover { background: var(--primary-dark); }

.btn-secondary {
    background: var(--bg-input);
    color: var(--text-primary);
}

.btn-success {
    background: var(--success);
    color: white;
}

.btn-small {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.875rem;
    background: var(--bg-input);
    color: var(--text-secondary);
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
}

/* ==================== AUTH SCREEN ==================== */
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

.form-group {
    margin-bottom: var(--spacing-md);
}

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

/* ==================== QUIZ SCREEN ==================== */
.quiz-header {
    margin-bottom: var(--spacing-lg);
}

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
    background: var(--bg-card);
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
    background: var(--bg-input);
    border: 2px solid transparent;
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
    background: rgba(99, 102, 241, 0.2);
}

.option-btn.correct {
    border-color: var(--success);
    background: rgba(34, 197, 94, 0.2);
}

.option-btn.wrong {
    border-color: var(--danger);
    background: rgba(239, 68, 68, 0.2);
}

.option-btn.disabled { cursor: not-allowed; opacity: 0.7; }

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

.progress-text {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.quiz-footer {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-sm);
    margin-top: auto;
    padding-top: var(--spacing-lg);
}

/* ==================== RESULTS SCREEN ==================== */
.results-header {
    text-align: center;
    margin-bottom: var(--spacing-lg);
}

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
}

.score-max { color: var(--text-secondary); font-size: 1.25rem; }

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

.leaderboard-item .rank {
    font-weight: 700;
    color: var(--primary);
    width: 2rem;
}

.leaderboard-item .name { flex: 1; }
.leaderboard-item .score { font-weight: 700; color: var(--success); }

.results-footer {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    padding: var(--spacing-lg) 0;
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 600px) {
    .charts-container { grid-template-columns: 1fr; }
    .quiz-footer { flex-direction: column; }
    .auth-container { margin: 5vh auto; }
}
```

### 13.3 Complete js/questions.js

> **Note:** This file contains all 50 questions. The full question array was defined in Section 4.1. Copy it from there (it's too long to repeat here), or use this shortened reference structure:

```javascript
// questions.js — Copy the FULL 50-question array from Section 4.1

const questions = [
    // Questions 1-15: HTML
    // Questions 16-30: CSS
    // Questions 31-40: JavaScript Beginner
    // Questions 41-45: JavaScript Intermediate
    // Questions 46-50: JavaScript Advanced
    
    // Each question follows this structure:
    // {
    //     id: 1,
    //     question: "What does HTML stand for?",
    //     options: ["Option A", "Option B", "Option C", "Option D"],
    //     correctIndex: 0,
    //     timeLimit: 20,
    //     points: 100
    // }
    
    // ⚠️ SCROLL UP TO SECTION 4.1 and copy the full array!
];
```

### 13.4 Complete js/timer.js

```javascript
// timer.js — Timer functionality

let timerInterval = null;
let timeRemaining = 0;
let questionStartTime = 0;

function startTimer(seconds, onTick, onExpire) {
    stopTimer();
    timeRemaining = seconds;
    questionStartTime = Date.now();
    
    updateTimerDisplay(timeRemaining, seconds);
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        
        if (onTick) onTick(timeRemaining);
        updateTimerDisplay(timeRemaining, seconds);
        
        if (timeRemaining <= 0) {
            stopTimer();
            if (onExpire) onExpire();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function getElapsedTime() {
    return (Date.now() - questionStartTime) / 1000;
}

function updateTimerDisplay(remaining, total) {
    const timerText = document.getElementById('timer-text');
    const timerCircle = document.getElementById('timer-circle');
    
    if (!timerText || !timerCircle) return;
    
    timerText.textContent = remaining;
    
    const progress = (remaining / total) * 100;
    timerCircle.style.setProperty('--timer-progress', `${progress}%`);
    
    timerCircle.classList.remove('warning', 'danger');
    if (remaining <= 5) {
        timerCircle.classList.add('danger');
    } else if (remaining <= 10) {
        timerCircle.classList.add('warning');
    }
}
```

### 13.5 Complete js/auth.js

```javascript
// auth.js — Authentication using localStorage

const AUTH_KEY = 'quizAppUser';
const USERS_KEY = 'quizAppUsers';

function initAuth() {
    // Tab switching
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
    
    // Form submissions
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('signup-form').addEventListener('submit', handleSignup);
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    
    if (users.find(u => u.email === email)) {
        document.getElementById('signup-error').textContent = 'Email already registered!';
        return;
    }
    
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    loginUser(newUser);
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        document.getElementById('login-error').textContent = 'Invalid email or password!';
        return;
    }
    
    loginUser(user);
}

function loginUser(user) {
    const sessionUser = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem(AUTH_KEY, JSON.stringify(sessionUser));
    
    document.getElementById('user-display').textContent = `Welcome, ${user.name}`;
    showScreen('quiz-screen');
    startQuiz();
}

function handleLogout() {
    localStorage.removeItem(AUTH_KEY);
    showScreen('auth-screen');
    
    document.getElementById('login-form').reset();
    document.getElementById('signup-form').reset();
    document.getElementById('login-error').textContent = '';
    document.getElementById('signup-error').textContent = '';
}

function checkAuth() {
    const user = JSON.parse(localStorage.getItem(AUTH_KEY));
    if (user) {
        document.getElementById('user-display').textContent = `Welcome, ${user.name}`;
        return true;
    }
    return false;
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
}
```

### 13.6 Complete js/charts.js

```javascript
// charts.js — Chart.js visualizations

let pieChart = null;
let barChart = null;

function createCharts(results) {
    createPieChart(results);
    createBarChart(results);
}

function createPieChart(results) {
    const ctx = document.getElementById('pie-chart');
    if (!ctx) return;
    
    if (pieChart) pieChart.destroy();
    
    pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Correct', 'Incorrect', 'Unanswered'],
            datasets: [{
                data: [
                    results.correct,
                    results.incorrect,
                    results.unanswered
                ],
                backgroundColor: ['#22c55e', '#ef4444', '#64748b'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#f8fafc' }
                }
            }
        }
    });
}

function createBarChart(results) {
    const ctx = document.getElementById('bar-chart');
    if (!ctx) return;
    
    if (barChart) barChart.destroy();
    
    const labels = results.timePerQuestion.map((_, i) => `Q${i + 1}`);
    const colors = results.timePerQuestion.map((_, i) =>
        state.answers[i] === questions[i].correctIndex ? '#22c55e' : '#ef4444'
    );
    
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Time (seconds)',
                data: results.timePerQuestion,
                backgroundColor: colors,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
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
```

### 13.7 Complete js/app.js

```javascript
// app.js — Main application logic

// ==================== STATE ====================
const state = {
    currentQuestion: 0,
    answers: [],
    timeSpent: [],
    score: 0,
    currentUser: null,
    quizStartTime: null
};

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    initQuiz();
    
    if (checkAuth()) {
        showScreen('quiz-screen');
    } else {
        showScreen('auth-screen');
    }
});

function initQuiz() {
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('prev-btn').addEventListener('click', previousQuestion);
    document.getElementById('submit-btn').addEventListener('click', submitQuiz);
    document.getElementById('retry-btn').addEventListener('click', () => {
        showScreen('quiz-screen');
        startQuiz();
    });
    document.getElementById('home-btn').addEventListener('click', () => {
        showScreen('auth-screen');
    });
}

// ==================== SCREEN MANAGEMENT ====================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

// ==================== QUIZ LOGIC ====================
function startQuiz() {
    state.currentQuestion = 0;
    state.answers = new Array(questions.length).fill(-1);
    state.timeSpent = new Array(questions.length).fill(0);
    state.score = 0;
    state.quizStartTime = Date.now();
    state.currentUser = getCurrentUser();
    
    displayQuestion(0);
}

function displayQuestion(index) {
    const question = questions[index];
    if (!question) return;
    
    document.getElementById('question-text').textContent = question.question;
    updateProgress(index);
    
    // Generate option buttons
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    question.options.forEach((option, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        
        if (state.answers[index] === i) {
            btn.classList.add('selected');
        }
        
        btn.addEventListener('click', () => selectOption(index, i));
        container.appendChild(btn);
    });
    
    // Navigation buttons
    document.getElementById('prev-btn').disabled = index === 0;
    
    const isLast = index === questions.length - 1;
    document.getElementById('next-btn').classList.toggle('hidden', isLast);
    document.getElementById('submit-btn').classList.toggle('hidden', !isLast);
    
    // Start timer
    startTimer(
        question.timeLimit,
        null,
        () => {
            state.timeSpent[index] = question.timeLimit;
            nextQuestion();
        }
    );
}

function selectOption(questionIndex, optionIndex) {
    state.answers[questionIndex] = optionIndex;
    state.timeSpent[questionIndex] = getElapsedTime();
    
    // Update UI
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, i) => {
        btn.classList.remove('selected');
        if (i === optionIndex) btn.classList.add('selected');
    });
}

function nextQuestion() {
    if (state.currentQuestion < questions.length - 1) {
        if (state.timeSpent[state.currentQuestion] === 0) {
            state.timeSpent[state.currentQuestion] = getElapsedTime();
        }
        state.currentQuestion++;
        displayQuestion(state.currentQuestion);
    }
}

function previousQuestion() {
    if (state.currentQuestion > 0) {
        state.currentQuestion--;
        displayQuestion(state.currentQuestion);
    }
}

function updateProgress(index) {
    const total = questions.length;
    const progress = ((index + 1) / total) * 100;
    document.getElementById('progress-bar').style.setProperty('--progress', `${progress}%`);
    document.getElementById('progress-text').textContent = `${index + 1}/${total}`;
}

// ==================== SCORING & RESULTS ====================
function submitQuiz() {
    stopTimer();
    
    let totalScore = 0;
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    
    questions.forEach((question, index) => {
        const answer = state.answers[index];
        if (answer === -1) {
            unanswered++;
        } else if (answer === question.correctIndex) {
            correct++;
            const timeBonus = Math.max(0, question.timeLimit - state.timeSpent[index]);
            totalScore += question.points + Math.round(timeBonus * 2);
        } else {
            incorrect++;
        }
    });
    
    const results = {
        totalScore,
        correct,
        incorrect,
        unanswered,
        total: questions.length,
        timePerQuestion: state.timeSpent,
        userName: state.currentUser?.name || 'Anonymous',
        userId: state.currentUser?.id || 'anon',
        completedAt: new Date().toISOString()
    };
    
    // Save results
    saveResults(results);
    
    // Show results screen
    showScreen('results-screen');
    displayScore(results);
    createCharts(results);
    generateReview();
    updateLeaderboard();
}

function displayScore(results) {
    document.getElementById('final-score').textContent = results.totalScore;
}

function generateReview() {
    const container = document.getElementById('review-container');
    container.innerHTML = '<h3>Review Your Answers</h3>';
    
    questions.forEach((question, index) => {
        const result = state.answers[index];
        const isCorrect = result === question.correctIndex;
        const wasAnswered = result !== undefined && result !== -1;
        
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${isCorrect ? 'correct' : 'wrong'}`;
        
        reviewItem.innerHTML = `
            <div class="review-question">
                <span class="review-number">Q${index + 1}</span>
                <span class="review-status">${isCorrect ? '✓' : '✗'}</span>
            </div>
            <p class="review-text">${question.question}</p>
            <p class="review-answer">
                Your answer: <strong>${wasAnswered ? question.options[result] : 'No answer'}</strong>
            </p>
            ${!isCorrect ? `
                <p class="review-correct">
                    Correct answer: <strong>${question.options[question.correctIndex]}</strong>
                </p>
            ` : ''}
            <p class="review-time">Time: ${state.timeSpent[index]?.toFixed(1) || '0'}s</p>
        `;
        
        container.appendChild(reviewItem);
    });
}

// ==================== LEADERBOARD ====================
function saveResults(results) {
    const allResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    allResults.push(results);
    localStorage.setItem('quizResults', JSON.stringify(allResults));
}

function getLeaderboard() {
    const allResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    
    const userBestScores = {};
    allResults.forEach(result => {
        const key = result.userId;
        if (!userBestScores[key] || result.totalScore > userBestScores[key].totalScore) {
            userBestScores[key] = result;
        }
    });
    
    return Object.values(userBestScores)
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, 10);
}

function updateLeaderboard() {
    const leaderboard = getLeaderboard();
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = '';
    
    leaderboard.forEach((entry, index) => {
        const li = document.createElement('li');
        li.className = 'leaderboard-item';
        li.innerHTML = `
            <span class="rank">${index + 1}</span>
            <span class="name">${entry.userName}</span>
            <span class="score">${entry.totalScore}</span>
        `;
        list.appendChild(li);
    });
}
```

---

## 14. Memorization Guide: Learn It, Don't Copy It

### Phase 1: Core JavaScript Patterns (1-2 weeks)

**Practice these until you can write them from memory:**

```javascript
// 1. Get element and change content
const element = document.getElementById('id');
element.textContent = 'new text';

// 2. Add event listener
element.addEventListener('click', () => {
    // do something
});

// 3. Create and add element
const newElement = document.createElement('div');
newElement.textContent = 'Hello';
parent.appendChild(newElement);

// 4. setInterval / setTimeout
const intervalId = setInterval(() => {
    // runs every 1000ms
}, 1000);
clearInterval(intervalId);  // stop it

// 5. Store and retrieve data
localStorage.setItem('key', JSON.stringify(data));
const data = JSON.parse(localStorage.getItem('key'));

// 6. Show/hide elements
element.classList.add('hidden');
element.classList.remove('hidden');
element.classList.toggle('hidden');
```

### Phase 2: Quiz-Specific Logic (1-2 weeks)

**Build these features in order:**

1. ☐ Display a single question with options
2. ☐ Handle option selection
3. ☐ Move to next question
4. ☐ Track answers in array
5. ☐ Calculate score at end
6. ☐ Add timer to each question
7. ☐ Show results with review

### Phase 3: Advanced Features (2 weeks)

1. ☐ Add charts with Chart.js
2. ☐ Implement user authentication
3. ☐ Create leaderboard
4. ☐ Add time-based scoring
5. ☐ Style with animations

### Practice Exercise

**Build this WITHOUT looking at code:**

1. Create a simple counter app:
   - Display shows 0
   - + button adds 1
   - - button subtracts 1
   - Reset button sets to 0

2. Add timer:
   - Shows seconds
   - Start/Stop button
   - Reset button

3. Add storage:
   - Save counter value
   - Load on page refresh

**If you can do this from memory, you understand the fundamentals!**

---

## Quick Reference Card

Print this out until you memorize it:

```
DOM MANIPULATION
─────────────────────────────────────
Get element:     document.getElementById('id')
                 document.querySelector('.class')
Change text:     element.textContent = 'text'
Change HTML:     element.innerHTML = '<p>HTML</p>'
Add class:       element.classList.add('class')
Remove class:    element.classList.remove('class')
Toggle class:    element.classList.toggle('class')
Create element:  document.createElement('div')
Add to page:     parent.appendChild(child)

EVENTS
─────────────────────────────────────
Click:           element.addEventListener('click', fn)
Submit:          form.addEventListener('submit', fn)
Prevent default: event.preventDefault()

TIMERS
─────────────────────────────────────
Interval:        setInterval(fn, milliseconds)
Stop interval:   clearInterval(intervalId)
Timeout:         setTimeout(fn, milliseconds)

STORAGE
─────────────────────────────────────
Save:            localStorage.setItem('key', JSON.stringify(data))
Load:            JSON.parse(localStorage.getItem('key'))

ARRAYS
─────────────────────────────────────
Add to end:      array.push(item)
Loop:            array.forEach(item => { })
Transform:       array.map(item => newItem)
Filter:          array.filter(item => condition)
Find:            array.find(item => condition)
```

---

---

## 16. Theme Switching (Light/Dark Mode)

This section explains how to add theme switching to your quiz app - with **detailed explanations of every concept and method**.

---

### 16.1 What is Theme Switching?

Theme switching lets users change the visual appearance of your app. Most commonly:

- **Light Mode**: Bright background, dark text
- **Dark Mode**: Dark background, light text

**Why it matters:**
- ♿ **Accessibility**: Some users need high contrast
- 👁️ **Eye comfort**: Dark mode is easier in low light
- 🎨 **Personalization**: Users prefer control
- 📱 **Modern expectation**: Most apps have this now

---

### 16.2 The Three Approaches to Theme Switching

Before writing code, understand your options:

```
┌─────────────────────────────────────────────────────────────────────┐
│                  THEME SWITCHING APPROACHES                          │
├───────────────────┬─────────────────────┬───────────────────────────┤
│  Approach 1       │  Approach 2         │  Approach 3               │
│  CSS CLASSES      │  DATA ATTRIBUTES    │  CSS VARIABLES ONLY       │
├───────────────────┼─────────────────────┼───────────────────────────┤
│  body.dark        │  body[data-theme=   │  Separate stylesheets     │
│  body.light       │  "dark"]            │  (light.css, dark.css)    │
├───────────────────┼─────────────────────┼───────────────────────────┤
│  ✅ Easy          │  ✅ Clean           │  ❌ More files            │
│  ✅ Common        │  ✅ Semantic        │  ❌ Harder to manage      │
│  ✅ Flexible      │  ✅ Recommended     │  ✅ Full separation       │
└───────────────────┴─────────────────────┴───────────────────────────┘
```

**We'll use Approach 2 (Data Attributes)** - it's the cleanest and most modern.

---

### 16.3 Required Concepts Explained

#### CSS Variables (Custom Properties)

**What they are**: Reusable values you can change with JavaScript.

**Why you need them**: Instead of hardcoding colors everywhere, define them once and change them all at once.

```css
/* Without variables - hard to maintain */
.button { background: #6366f1; }
.header { background: #6366f1; }
.link { color: #6366f1; }
/* To change the color, you'd edit 3+ places! */

/* With variables - change in ONE place */
:root {
    --primary: #6366f1;
}
.button { background: var(--primary); }
.header { background: var(--primary); }
.link { color: var(--primary); }
```

**Syntax breakdown:**

```css
:root {
    --variable-name: value;
}
```

| Part | Meaning |
|------|---------|
| `:root` | The highest level element (html). Variables here are global. |
| `--` | All CSS variable names MUST start with `--` |
| `variable-name` | Your custom name (use kebab-case) |
| `value` | Any valid CSS value (color, size, etc.) |

**Using a variable:**

```css
element {
    property: var(--variable-name);
}
```

| Part | Meaning |
|------|---------|
| `var()` | Function to retrieve a variable's value |
| `--variable-name` | The variable to retrieve |

**With fallback (if variable doesn't exist):**

```css
element {
    color: var(--text-color, black);
}
/* If --text-color doesn't exist, uses black */
```

---

#### Data Attributes

**What they are**: Custom HTML attributes that start with `data-`.

**Why you need them**: To store information on HTML elements that CSS can read.

```html
<body data-theme="dark">
```

**In CSS, select elements by data attribute:**

```css
/* When theme is dark */
[data-theme="dark"] {
    --bg-main: #0f172a;
    --text-primary: #f8fafc;
}

/* When theme is light */
[data-theme="light"] {
    --bg-main: #ffffff;
    --text-primary: #1e293b;
}
```

**CSS Selector breakdown:**

| Selector | Matches |
|----------|---------|
| `[data-theme]` | Any element with data-theme attribute |
| `[data-theme="dark"]` | Only elements where data-theme equals "dark" |
| `body[data-theme="dark"]` | Only body elements with data-theme="dark" |

---

#### JavaScript Methods Needed

Here are ALL the methods you'll use, explained in detail:

---

##### `element.dataset.propertyName`

**What it does**: Reads or sets data attributes on an element.

**Important**: JavaScript converts `data-theme-name` to `dataset.themeName` (camelCase).

```html
<body data-theme="dark" data-user-preference="saved">
```

```javascript
// READ data attribute
document.body.dataset.theme          // "dark"
document.body.dataset.userPreference // "saved"

// SET data attribute
document.body.dataset.theme = "light";
// Now: <body data-theme="light">
```

| HTML Attribute | JavaScript Property |
|----------------|---------------------|
| `data-theme` | `dataset.theme` |
| `data-user-id` | `dataset.userId` |
| `data-is-active` | `dataset.isActive` |

---

##### `window.matchMedia(query)`

**What it does**: Checks if a CSS media query matches (like checking if dark mode is enabled on the OS).

**When you need it**: To detect the user's system preference.

```javascript
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
```

**What it returns**: A MediaQueryList object with these properties:

| Property | Meaning |
|----------|---------|
| `.matches` | `true` if the query matches, `false` otherwise |
| `.addEventListener()` | Listen for changes (user toggles system theme) |

**Usage:**

```javascript
// Check if system is in dark mode RIGHT NOW
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

if (prefersDark.matches) {
    console.log('User prefers dark mode');
} else {
    console.log('User prefers light mode');
}

// Listen for CHANGES (user toggles system settings)
prefersDark.addEventListener('change', (event) => {
    if (event.matches) {
        console.log('User switched TO dark mode');
    } else {
        console.log('User switched TO light mode');
    }
});
```

**Media queries you can check:**

| Query | What it Detects |
|-------|-----------------|
| `(prefers-color-scheme: dark)` | OS dark mode is ON |
| `(prefers-color-scheme: light)` | OS dark mode is OFF |
| `(prefers-reduced-motion: reduce)` | User wants less animation |
| `(min-width: 768px)` | Screen is at least 768px wide |

---

##### `localStorage.setItem()` and `localStorage.getItem()`

**What they do**: Save and retrieve data that persists between sessions.

**When you need them**: To remember the user's theme preference.

```javascript
// SAVE theme preference
localStorage.setItem('theme', 'dark');

// RETRIEVE theme preference
const savedTheme = localStorage.getItem('theme');
// Returns: 'dark' or null if not set
```

---

### 16.4 Step-by-Step Implementation

Now let's build it step by step!

---

#### Step 1: Define Theme Variables in CSS

```css
/* style.css */

/* ===== LIGHT THEME (Default) ===== */
:root,
[data-theme="light"] {
    /* Backgrounds */
    --bg-main: #f8fafc;
    --bg-card: #ffffff;
    --bg-input: #e2e8f0;
    
    /* Text */
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    
    /* Colors */
    --primary: #6366f1;
    --primary-dark: #4f46e5;
    --success: #22c55e;
    --danger: #ef4444;
    --warning: #f59e0b;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    
    /* Borders */
    --border-color: #e2e8f0;
}

/* ===== DARK THEME ===== */
[data-theme="dark"] {
    /* Backgrounds - inverted */
    --bg-main: #0f172a;
    --bg-card: #1e293b;
    --bg-input: #334155;
    
    /* Text - inverted */
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    
    /* Colors stay mostly the same, but may adjust for contrast */
    --primary: #818cf8;       /* Slightly lighter for dark bg */
    --primary-dark: #6366f1;
    
    /* Shadows - more subtle on dark */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3);
    
    /* Borders */
    --border-color: #334155;
}

/* Apply theme colors to body */
body {
    background-color: var(--bg-main);
    color: var(--text-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
}
```

**Breaking it down:**

| CSS Block | Purpose |
|-----------|---------|
| `:root, [data-theme="light"]` | Default theme + explicit light mode |
| `[data-theme="dark"]` | Dark mode overrides the variables |
| `transition` | Smooth animation when switching |

---

#### Step 2: Add Theme Toggle Button in HTML

```html
<!-- Add this in your header or navigation -->
<button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
    <span class="theme-icon" id="theme-icon">🌙</span>
</button>
```

**Accessibility note**: `aria-label` tells screen readers what the button does.

---

#### Step 3: Style the Toggle Button

```css
/* Theme Toggle Button */
.theme-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid var(--border-color);
    background: var(--bg-card);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    transition: all 0.3s ease;
    z-index: 1000;
}

.theme-toggle:hover {
    transform: scale(1.1);
    border-color: var(--primary);
}

/* Optional: Rotate icon on theme change */
.theme-toggle.rotating {
    animation: rotate 0.5s ease;
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
```

---

#### Step 4: JavaScript - The Theme Logic

```javascript
// theme.js - Complete theme switching logic

// ===== STEP 1: Get DOM Elements =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// ===== STEP 2: Define Theme Functions =====

/**
 * Gets the current theme from: 
 * 1. localStorage (user's saved preference)
 * 2. OR system preference 
 * 3. OR default to 'light'
 */
function getInitialTheme() {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        return savedTheme;  // 'light' or 'dark'
    }
    
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDark.matches) {
        return 'dark';
    }
    
    // Default to light
    return 'light';
}

/**
 * Applies a theme to the page
 * @param {string} theme - 'light' or 'dark'
 */
function applyTheme(theme) {
    // Set the data attribute on body
    document.body.dataset.theme = theme;
    
    // Update the icon
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Update aria-label for accessibility
    themeToggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
}

/**
 * Toggles between light and dark theme
 */
function toggleTheme() {
    // Get current theme
    const currentTheme = document.body.dataset.theme || 'light';
    
    // Switch to opposite
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Apply the new theme
    applyTheme(newTheme);
    
    // Add rotation animation to button
    themeToggle.classList.add('rotating');
    
    // Remove animation class after it finishes
    setTimeout(() => {
        themeToggle.classList.remove('rotating');
    }, 500);
}

// ===== STEP 3: Initialize on Page Load =====

// Apply saved/system theme immediately
document.addEventListener('DOMContentLoaded', () => {
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
});

// ===== STEP 4: Add Event Listener =====

themeToggle.addEventListener('click', toggleTheme);

// ===== STEP 5: Listen for System Theme Changes =====

const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

darkModeQuery.addEventListener('change', (event) => {
    // Only auto-change if user hasn't manually set preference
    const savedTheme = localStorage.getItem('theme');
    
    if (!savedTheme) {
        // No saved preference, follow system
        applyTheme(event.matches ? 'dark' : 'light');
    }
});
```

---

### 16.5 Code Breakdown - Line by Line

Let me explain the most important parts:

---

#### Getting Initial Theme

```javascript
function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        return savedTheme;
    }
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDark.matches) {
        return 'dark';
    }
    
    return 'light';
}
```

**Logic flow:**

```
┌─────────────────────────────────────────┐
│  Is there a saved theme in localStorage? │
└────────────────┬────────────────────────┘
                 │
         ┌───────┴───────┐
         │               │
        YES              NO
         │               │
         ▼               ▼
   Return saved    ┌──────────────────┐
    theme          │ Does system      │
                   │ prefer dark?     │
                   └────────┬─────────┘
                            │
                    ┌───────┴───────┐
                    │               │
                   YES              NO
                    │               │
                    ▼               ▼
              Return 'dark'   Return 'light'
```

---

#### Applying Theme

```javascript
function applyTheme(theme) {
    document.body.dataset.theme = theme;
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
}
```

| Line | What it Does |
|------|--------------|
| `document.body.dataset.theme = theme` | Sets `<body data-theme="dark">` |
| `theme === 'dark' ? '☀️' : '🌙'` | Ternary: if dark, show sun (to switch to light), else show moon |
| `localStorage.setItem('theme', theme)` | Remember choice for next visit |

---

#### Toggling Theme

```javascript
function toggleTheme() {
    const currentTheme = document.body.dataset.theme || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}
```

| Line | What it Does |
|------|--------------|
| `document.body.dataset.theme` | Gets current theme |
| `\|\| 'light'` | If undefined, default to 'light' |
| `currentTheme === 'dark' ? 'light' : 'dark'` | If dark, switch to light, otherwise switch to dark |

---

### 16.6 DOMContentLoaded - Why It's Important

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
});
```

**What is DOMContentLoaded?**

An event that fires when the HTML has been completely loaded and parsed.

**Why use it?**

JavaScript runs as soon as it's encountered. If your `<script>` is in the `<head>`, the body doesn't exist yet!

```
Timeline:
1. Browser starts loading HTML
2. Browser encounters <script> in head     ← JS runs here
3. Browser finishes loading body           ← Elements exist here
4. DOMContentLoaded fires                  ← Safe to access elements
5. Images, fonts, etc. finish loading
6. window.onload fires
```

**Without DOMContentLoaded:**
```javascript
const button = document.getElementById('theme-toggle');
// ERROR! Button doesn't exist yet!
```

**With DOMContentLoaded:**
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('theme-toggle');
    // ✅ Works! HTML is fully loaded
});
```

---

### 16.7 Avoiding Flash of Unstyled Content (FOUC)

**The Problem**: Page loads with default theme, THEN switches to saved theme. User sees a "flash".

**The Solution**: Apply theme BEFORE page renders, using a blocking script.

Add this in the `<head>` (BEFORE any CSS):

```html
<head>
    <script>
        // Immediately apply saved theme (blocks rendering until done)
        (function() {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const theme = savedTheme || (prefersDark ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', theme);
        })();
    </script>
    <link rel="stylesheet" href="style.css">
</head>
```

**Why this works:**

| Part | Explanation |
|------|-------------|
| In `<head>` | Runs before body is rendered |
| `(function() { ... })()` | IIFE - runs immediately, no waiting |
| `document.documentElement` | The `<html>` element (exists even before body) |

---

### 16.8 Adding More Themes

Want more than just light/dark? Here's how:

```css
/* Light (default) */
:root,
[data-theme="light"] {
    --bg-main: #ffffff;
    --text-primary: #1e293b;
    --primary: #6366f1;
}

/* Dark */
[data-theme="dark"] {
    --bg-main: #0f172a;
    --text-primary: #f8fafc;
    --primary: #818cf8;
}

/* Sepia (reading mode) */
[data-theme="sepia"] {
    --bg-main: #f4ecd8;
    --text-primary: #5c4b37;
    --primary: #8b7355;
}

/* High Contrast */
[data-theme="high-contrast"] {
    --bg-main: #000000;
    --text-primary: #ffffff;
    --primary: #00ff00;
}
```

**JavaScript for multiple themes:**

```javascript
const themes = ['light', 'dark', 'sepia', 'high-contrast'];
let currentIndex = 0;

function cycleTheme() {
    currentIndex = (currentIndex + 1) % themes.length;
    const newTheme = themes[currentIndex];
    applyTheme(newTheme);
}
```

| Code | Explanation |
|------|-------------|
| `currentIndex + 1` | Go to next theme |
| `% themes.length` | Wrap around (4 % 4 = 0, back to start) |

---

### 16.9 Complete HTML Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz App</title>
    
    <!-- Apply theme before render to prevent flash -->
    <script>
        (function() {
            const saved = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', 
                saved || (prefersDark ? 'dark' : 'light')
            );
        })();
    </script>
    
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <!-- Theme Toggle Button -->
    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
        <span id="theme-icon">🌙</span>
    </button>
    
    <!-- Rest of your app -->
    <div class="app" id="app">
        <!-- ... -->
    </div>
    
    <script src="./js/theme.js"></script>
    <script src="./js/app.js"></script>
</body>
</html>
```

---

### 16.10 Methods Summary Table

| I want to... | Use this |
|--------------|----------|
| Define reusable colors | CSS Variables: `--color: value` |
| Use a variable in CSS | `color: var(--color)` |
| Store theme on element | `data-theme="dark"` attribute |
| Select by data attribute | CSS: `[data-theme="dark"] { }` |
| Read data attribute in JS | `element.dataset.theme` |
| Set data attribute in JS | `element.dataset.theme = 'dark'` |
| Detect system dark mode | `window.matchMedia('(prefers-color-scheme: dark)')` |
| Check if query matches | `mediaQuery.matches` (true/false) |
| Listen for system changes | `mediaQuery.addEventListener('change', fn)` |
| Save user preference | `localStorage.setItem('theme', value)` |
| Load user preference | `localStorage.getItem('theme')` |
| Wait for DOM ready | `document.addEventListener('DOMContentLoaded', fn)` |
| Run immediately | IIFE: `(function() { })()` |
| Smooth transitions | CSS: `transition: property 0.3s ease` |

---

## 15. Adding Python to the Project (Optional Backend)

This section explains how Python fits into a web project, what it can do that JavaScript can't (on its own), and how to connect them together.

---

### 15.1 Understanding Frontend vs Backend

```
┌─────────────────────────────────────────────────────────────────────┐
│                        YOUR QUIZ APP                                 │
├───────────────────────────────┬─────────────────────────────────────┤
│         FRONTEND              │            BACKEND                  │
│    (What user sees)           │     (Behind the scenes)             │
├───────────────────────────────┼─────────────────────────────────────┤
│  📱 Runs in BROWSER           │  🖥️ Runs on SERVER                  │
│                               │                                     │
│  • HTML (structure)           │  • Python, Node.js, Java, etc.      │
│  • CSS (styling)              │  • Database management              │
│  • JavaScript (interactivity) │  • User authentication              │
│                               │  • Data processing                  │
│  User can see this code       │  User CANNOT see this code          │
│  (Right-click → View Source)  │  (It's on a different computer)     │
└───────────────────────────────┴─────────────────────────────────────┘
```

**The key insight:**
- **JavaScript in browser** = Frontend (client-side)
- **Python on server** = Backend (server-side)
- They communicate via **HTTP requests** (like the IPify API in the IP Tracker)

---

### 15.2 What Can Python Add to This Quiz App?

| Feature | Why Python is Needed | JavaScript Alone Can't Do This Because... |
|---------|---------------------|-------------------------------------------|
| **Central database** | Store questions, users, scores on a server | localStorage only works on ONE device |
| **Real leaderboard** | All users compete against each other | localStorage can't be shared between users |
| **Admin panel** | Add/edit questions without changing code | Would need to redeploy the frontend |
| **Analytics** | Track which questions are hardest | Need server-side data processing |
| **Email notifications** | Send score reports to users | Browsers can't send emails directly |
| **Secure authentication** | Passwords hashed on server | Client-side password storage is UNSAFE |
| **AI question generation** | Use machine learning to create questions | Heavy processing not suitable for browser |
| **Multiplayer real-time** | Sync quiz state across players | Need server to coordinate |

---

### 15.3 How JavaScript and Python Communicate

They talk through **HTTP requests** - the same way your browser loads websites!

```
┌─────────────────┐                      ┌─────────────────┐
│                 │   1. Request data    │                 │
│    FRONTEND     │ ─────────────────────▶    BACKEND     │
│   (JavaScript)  │                      │    (Python)     │
│                 │   2. Send response   │                 │
│                 │ ◀───────────────────── │                 │
└─────────────────┘                      └─────────────────┘

Example:
1. JS: "Hey Python, give me the questions"        (GET request)
2. Python: "Here's the JSON with 10 questions"   (Response)

3. JS: "Save this user's score: 850 points"      (POST request)
4. Python: "Got it, saved to database!"          (Response)
```

**This is called a REST API** (Representational State Transfer Application Programming Interface).

---

### 15.4 Python Basics for Beginners

Before looking at the web server, here are Python fundamentals:

---

#### Variables

```python
# Python uses = for assignment (same as JS)
name = "John"           # String (text)
age = 25                # Integer (whole number)
score = 85.5            # Float (decimal number)
is_admin = True         # Boolean (True or False)
```

| Python | JavaScript | Difference |
|--------|------------|------------|
| `True` / `False` | `true` / `false` | Capital T and F in Python |
| `None` | `null` | Different keyword for "nothing" |
| `print()` | `console.log()` | Different output function |

---

#### Lists (like JS Arrays)

```python
options = ["Apple", "Banana", "Cherry"]

# Access items (same as JS)
first = options[0]      # "Apple"

# Add item
options.append("Date")  # JS uses .push()

# Loop through
for option in options:
    print(option)
```

---

#### Dictionaries (like JS Objects)

```python
user = {
    "name": "John",
    "email": "john@test.com",
    "score": 100
}

# Access values
print(user["name"])     # "John"
print(user.get("age"))  # None (if key doesn't exist, no error)
```

---

#### Functions

```python
# Define a function
def calculate_score(correct, total, time_bonus):
    base_score = (correct / total) * 100
    return base_score + time_bonus

# Call the function
result = calculate_score(8, 10, 50)
print(result)  # 130
```

| Python Syntax | JavaScript Equivalent |
|---------------|----------------------|
| `def function_name():` | `function functionName() {}` |
| Indentation (spaces) | Curly braces `{}` |
| `return value` | `return value` (same) |
| No semicolons needed | Semicolons optional |

---

#### Conditionals

```python
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(grade)  # "B"
```

**Key difference**: Python uses `elif`, JavaScript uses `else if`.

---

### 15.5 Building a Simple Python Backend (Flask)

**Flask** is a lightweight Python web framework - perfect for beginners.

---

#### Step 1: Install Flask

Open your terminal (Command Prompt or PowerShell):

```bash
pip install flask flask-cors
```

| Package | What it does |
|---------|--------------|
| `flask` | The web framework |
| `flask-cors` | Allows your JS frontend to talk to the Python backend |

---

#### Step 2: Create the Server File

Create a new file: `backend/server.py`

```python
# server.py - A simple Python backend for the Quiz App

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from datetime import datetime

# Create the Flask app
app = Flask(__name__)
CORS(app)  # Allow frontend to connect

# ===== IN-MEMORY DATABASE (for learning) =====
# In a real app, you'd use SQLite, PostgreSQL, etc.

users = []        # List of registered users
scores = []       # List of quiz results
questions = [     # Quiz questions
    {
        "id": 1,
        "question": "What does HTML stand for?",
        "options": [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        "correctIndex": 0,
        "timeLimit": 30,
        "points": 100
    },
    {
        "id": 2,
        "question": "Which CSS property controls text size?",
        "options": ["text-style", "font-size", "text-size", "font-style"],
        "correctIndex": 1,
        "timeLimit": 20,
        "points": 100
    },
    {
        "id": 3,
        "question": "What does 'DOM' stand for?",
        "options": [
            "Document Object Model",
            "Data Object Management",
            "Digital Ordinance Model",
            "Document Orientation Mode"
        ],
        "correctIndex": 0,
        "timeLimit": 25,
        "points": 100
    }
]


# ===== API ENDPOINTS =====

# GET /api/questions - Return all quiz questions
@app.route('/api/questions', methods=['GET'])
def get_questions():
    """
    Returns all questions.
    Frontend calls this when quiz starts.
    """
    # Remove correctIndex before sending (don't reveal answers!)
    safe_questions = []
    for q in questions:
        safe_q = {
            "id": q["id"],
            "question": q["question"],
            "options": q["options"],
            "timeLimit": q["timeLimit"],
            "points": q["points"]
        }
        safe_questions.append(safe_q)
    
    return jsonify(safe_questions)


# POST /api/submit - Submit quiz answers and get score
@app.route('/api/submit', methods=['POST'])
def submit_quiz():
    """
    Receives user's answers, calculates score, returns results.
    """
    # Get data from the request
    data = request.get_json()
    
    user_name = data.get('userName', 'Anonymous')
    answers = data.get('answers', [])       # List of selected option indices
    times = data.get('timeSpent', [])       # Time spent on each question
    
    # Calculate score
    total_score = 0
    correct_count = 0
    results = []
    
    for i, question in enumerate(questions):
        user_answer = answers[i] if i < len(answers) else -1
        time_spent = times[i] if i < len(times) else question["timeLimit"]
        
        is_correct = user_answer == question["correctIndex"]
        
        if is_correct:
            correct_count += 1
            time_remaining = question["timeLimit"] - time_spent
            time_multiplier = 1 + (time_remaining / question["timeLimit"])
            question_score = round(question["points"] * time_multiplier)
        else:
            question_score = 0
        
        total_score += question_score
        
        results.append({
            "questionId": question["id"],
            "question": question["question"],
            "userAnswer": question["options"][user_answer] if user_answer >= 0 else "No answer",
            "correctAnswer": question["options"][question["correctIndex"]],
            "isCorrect": is_correct,
            "timeSpent": round(time_spent, 1),
            "score": question_score
        })
    
    # Save to "database"
    score_entry = {
        "userName": user_name,
        "totalScore": total_score,
        "correctCount": correct_count,
        "totalQuestions": len(questions),
        "completedAt": datetime.now().isoformat()
    }
    scores.append(score_entry)
    
    return jsonify({
        "totalScore": total_score,
        "correctCount": correct_count,
        "wrongCount": len(questions) - correct_count,
        "percentage": round((correct_count / len(questions)) * 100),
        "questionResults": results
    })


# GET /api/leaderboard - Get top scores
@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    """
    Returns top 10 scores, sorted by totalScore descending.
    """
    sorted_scores = sorted(scores, key=lambda x: x["totalScore"], reverse=True)
    top_10 = sorted_scores[:10]
    return jsonify(top_10)


# POST /api/register - Register a new user
@app.route('/api/register', methods=['POST'])
def register_user():
    """
    Creates a new user account.
    """
    data = request.get_json()
    
    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    
    # Validation
    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400
    
    if len(password) < 6:
        return jsonify({"error": "Password must be at least 6 characters"}), 400
    
    # Check if email exists
    for user in users:
        if user["email"] == email:
            return jsonify({"error": "Email already registered"}), 400
    
    # Create user (in real app, HASH the password!)
    new_user = {
        "id": len(users) + 1,
        "name": name,
        "email": email,
        "password": password,  # ⚠️ NEVER store plain passwords in production!
        "createdAt": datetime.now().isoformat()
    }
    users.append(new_user)
    
    # Return user without password
    return jsonify({
        "id": new_user["id"],
        "name": new_user["name"],
        "email": new_user["email"]
    }), 201


# POST /api/login - Login user
@app.route('/api/login', methods=['POST'])
def login_user():
    """
    Validates credentials and returns user data.
    """
    data = request.get_json()
    
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    
    # Find user
    for user in users:
        if user["email"] == email and user["password"] == password:
            return jsonify({
                "id": user["id"],
                "name": user["name"],
                "email": user["email"]
            })
    
    return jsonify({"error": "Invalid email or password"}), 401


# Run the server
if __name__ == '__main__':
    print("🚀 Quiz API Server running at http://localhost:5000")
    app.run(debug=True, port=5000)
```

---

#### Step 3: Understanding the Code

Let me break down each part:

**Imports:**

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
```

| Import | What it Does |
|--------|--------------|
| `Flask` | The main class to create a web server |
| `request` | Access data sent from the frontend |
| `jsonify` | Convert Python dictionaries to JSON for the response |
| `CORS` | Allow cross-origin requests (frontend → backend) |

**Creating the App:**

```python
app = Flask(__name__)
CORS(app)
```

| Line | Meaning |
|------|---------|
| `Flask(__name__)` | Create a new Flask application |
| `CORS(app)` | Allow any website to call this API |

**Defining an Endpoint:**

```python
@app.route('/api/questions', methods=['GET'])
def get_questions():
    return jsonify(safe_questions)
```

| Part | Meaning |
|------|---------|
| `@app.route(...)` | This is a "decorator" - it tells Flask what URL triggers this function |
| `'/api/questions'` | The URL path. Full URL: `http://localhost:5000/api/questions` |
| `methods=['GET']` | This endpoint responds to GET requests |
| `def get_questions():` | The function that runs when this endpoint is called |
| `return jsonify(...)` | Send data back as JSON |

**Getting Request Data:**

```python
data = request.get_json()
user_name = data.get('userName', 'Anonymous')
```

| Part | Meaning |
|------|---------|
| `request.get_json()` | Parse the JSON body sent by the frontend |
| `data.get('userName', 'Anonymous')` | Get 'userName' key, or use 'Anonymous' if missing |

---

#### Step 4: Run the Python Server

In your terminal, navigate to the backend folder and run:

```bash
cd backend
python server.py
```

You should see:

```
🚀 Quiz API Server running at http://localhost:5000
 * Running on http://127.0.0.1:5000
```

---

### 15.6 Updating JavaScript to Use the Python Backend

Now modify your frontend to call the Python API instead of using localStorage:

```javascript
// api.js - Functions to communicate with Python backend

const API_BASE = 'http://localhost:5000/api';

// Fetch questions from the server
async function fetchQuestions() {
    try {
        const response = await fetch(`${API_BASE}/questions`);
        if (!response.ok) throw new Error('Failed to fetch questions');
        return await response.json();
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
}

// Submit quiz answers to the server
async function submitQuizToServer(userName, answers, timeSpent) {
    try {
        const response = await fetch(`${API_BASE}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                answers,
                timeSpent
            })
        });
        
        if (!response.ok) throw new Error('Failed to submit quiz');
        return await response.json();
    } catch (error) {
        console.error('Error submitting quiz:', error);
        return null;
    }
}

// Get leaderboard from server
async function fetchLeaderboard() {
    try {
        const response = await fetch(`${API_BASE}/leaderboard`);
        if (!response.ok) throw new Error('Failed to fetch leaderboard');
        return await response.json();
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return [];
    }
}

// Register new user
async function registerUser(name, email, password) {
    try {
        const response = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
        }
        
        return { success: true, user: data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Login user
async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }
        
        return { success: true, user: data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
```

**Key difference from before:**

| Before (localStorage) | After (Python API) |
|----------------------|-------------------|
| `localStorage.getItem('questions')` | `await fetch('/api/questions')` |
| Data only on this device | Data shared across all users |
| Anyone can see in DevTools | Stored securely on server |

---

### 15.7 The Complete Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            USER'S BROWSER                                │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                         FRONTEND                                    │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │ │
│  │  │  HTML    │  │   CSS    │  │    JS    │  │  api.js  │           │ │
│  │  │(structure)│  │(styling)│  │ (logic)  │  │(API calls)│          │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └────┬─────┘           │ │
│  └──────────────────────────────────────────────────┼──────────────────┘ │
└─────────────────────────────────────────────────────┼───────────────────┘
                                                      │
                                   HTTP Requests (fetch)
                                                      │
                                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                            YOUR SERVER                                   │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                         BACKEND (Python)                            │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │ │
│  │  │   Flask      │  │   Routes     │  │   Logic      │             │ │
│  │  │  (server)    │  │ (/api/...)   │  │ (calculate)  │             │ │
│  │  └──────────────┘  └──────────────┘  └──────┬───────┘             │ │
│  │                                              │                      │ │
│  │                                              ▼                      │ │
│  │  ┌────────────────────────────────────────────┐                    │ │
│  │  │              DATABASE                      │                    │ │
│  │  │  (SQLite, PostgreSQL, MongoDB, etc.)       │                    │ │
│  │  │  - Users table                             │                    │ │
│  │  │  - Questions table                         │                    │ │
│  │  │  - Scores table                            │                    │ │
│  │  └────────────────────────────────────────────┘                    │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### 15.8 Running Both Together (Development)

**Terminal 1: Start Python Backend**

```bash
cd quiz-app/backend
python server.py
# 🚀 Server running at http://localhost:5000
```

**Terminal 2: Start Frontend (if using a dev server)**

```bash
cd quiz-app
# If using just HTML files, open index.html in browser
# If using Vite or similar:
npm run dev
# 🌐 Frontend running at http://localhost:5173
```

**Or serve with Python too:**

```bash
cd quiz-app
python -m http.server 8000
# 🌐 Frontend running at http://localhost:8000
```

---

### 15.9 What Else Can Python Do?

Here are more advanced features you could add:

| Feature | Python Skill Needed |
|---------|-------------------|
| **SQLite Database** | Basic SQL queries |
| **User avatars** | File upload handling |
| **Password hashing** | Using `bcrypt` library |
| **JWT tokens** | Using `PyJWT` for sessions |
| **Rate limiting** | Prevent spam requests |
| **Email sending** | Using `smtplib` or SendGrid |
| **AI questions** | Using OpenAI API |
| **Excel export** | Using `openpyxl` library |
| **PDF certificates** | Using `reportlab` library |

---

### 15.10 Python Methods Dictionary (For Beginners)

Just like the JavaScript section, here are common Python patterns:

| I want to... | Python Code |
|--------------|-------------|
| Print output | `print("Hello")` |
| Create a list | `items = [1, 2, 3]` |
| Add to list | `items.append(4)` |
| Loop through list | `for item in items:` |
| Create dictionary | `data = {"key": "value"}` |
| Get dictionary value | `data.get("key", "default")` |
| Check if in list | `if x in items:` |
| Define function | `def my_func(param):` |
| Return value | `return result` |
| Import module | `from flask import Flask` |
| Handle errors | `try: ... except:` |
| Read JSON from request | `data = request.get_json()` |
| Return JSON response | `return jsonify(data)` |

---

### 15.11 When to Add Python to Your Project

**You DON'T need Python if:**
- ✅ Single user, single device
- ✅ Data doesn't need to be shared
- ✅ No sensitive information
- ✅ Just learning frontend basics

**You SHOULD add Python when:**
- 📊 Multiple users need shared data
- 🏆 You want a real leaderboard
- 🔐 Security matters (passwords, payments)
- 📈 You need analytics and reporting
- 🤖 You want to add AI features

**Start with JavaScript-only, add Python later when you need it!**

---

## 17. Flask + PostgreSQL: Multi-User Quiz with Deployment 🚀

This section upgrades Section 15's in-memory Flask server to use **PostgreSQL** (a real database) and deploys everything to free cloud hosting so multiple users can compete on a real leaderboard.

---

### 17.1 Why PostgreSQL?

**The Problem with Section 15:**

| In-Memory (Section 15) | PostgreSQL (This Section) |
|------------------------|---------------------------|
| Data lost when server restarts | Data persists forever |
| Only works on your computer | Works online for everyone |
| Can't share leaderboard | Real multiplayer leaderboard |
| Good for learning | Good for production |

**What is PostgreSQL?**

PostgreSQL (often called "Postgres") is a powerful, open-source relational database used by:
- 🎵 **Spotify** - Stores music data
- 📸 **Instagram** - User profiles and posts
- 🎬 **Netflix** - Content metadata
- 🚗 **Uber** - Trip data

It uses **SQL** (Structured Query Language) to store and retrieve data in organized **tables**.

---

### 17.2 Local PostgreSQL Setup (Windows)

#### Step 1: Download PostgreSQL

1. Go to: https://www.postgresql.org/download/windows/
2. Click "Download the installer"
3. Choose **latest version** (16+) and Windows x86-64
4. Run the installer

#### Step 2: Installation Options

During installation:

| Setting | What to Choose |
|---------|----------------|
| Installation Directory | Default (C:\Program Files\PostgreSQL\16) |
| Components | ✅ PostgreSQL Server, ✅ pgAdmin 4, ✅ Command Line Tools |
| Data Directory | Default |
| **Password** | **Choose and REMEMBER this!** (e.g., `postgres123`) |
| Port | Default: `5432` |
| Locale | Default |

> ⚠️ **IMPORTANT**: Remember your password! You'll need it later.

#### Step 3: Verify Installation

Open **pgAdmin 4** (search in Start Menu):

1. Click "Servers" in the left panel
2. Click "PostgreSQL 16"
3. Enter your password when prompted
4. If you see "Databases", PostgreSQL is working! ✅

---

### 17.3 Database Schema Design

We'll create three tables:

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│     users       │      │    questions    │      │     scores      │
├─────────────────┤      ├─────────────────┤      ├─────────────────┤
│ id (PK)         │      │ id (PK)         │      │ id (PK)         │
│ name            │      │ question        │      │ user_id (FK)    │
│ email (unique)  │      │ options (JSON)  │      │ total_score     │
│ password_hash   │      │ correct_index   │      │ correct_count   │
│ created_at      │      │ time_limit      │      │ completed_at    │
└─────────────────┘      │ points          │      └─────────────────┘
                         └─────────────────┘
```

**What are PK and FK?**

| Term | Meaning | Example |
|------|---------|---------|
| **PK** (Primary Key) | Unique identifier for each row | User ID = 1, 2, 3... |
| **FK** (Foreign Key) | Links to another table's PK | `scores.user_id` → `users.id` |

---

### 17.4 Flask-SQLAlchemy Setup

**SQLAlchemy** is a Python library that lets you work with databases using Python code instead of raw SQL.

#### Step 1: Install Required Packages

```bash
pip install flask flask-cors flask-sqlalchemy psycopg2-binary bcrypt python-dotenv
```

| Package | Purpose |
|---------|---------|
| `flask` | Web framework |
| `flask-cors` | Allow frontend to connect |
| `flask-sqlalchemy` | Database ORM (Object Relational Mapper) |
| `psycopg2-binary` | PostgreSQL driver for Python |
| `bcrypt` | Secure password hashing |
| `python-dotenv` | Load environment variables |

#### Step 2: Create Database in pgAdmin

1. Open **pgAdmin 4**
2. Right-click "Databases" → "Create" → "Database"
3. Name: `quiz_app`
4. Click "Save"

#### Step 3: Project Structure

```
quiz-app/
├── frontend/                 ← Your HTML/CSS/JS files
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── app.js
│       └── api.js            ← Updated for backend
│
└── backend/                  ← Python backend
    ├── .env                  ← Database credentials (NEVER commit!)
    ├── requirements.txt      ← Python dependencies
    ├── server.py             ← Main Flask application
    └── models.py             ← Database models
```

#### Step 4: Create .env File

Create `backend/.env`:

```env
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/quiz_app
SECRET_KEY=your-super-secret-key-change-this
```

| Variable | Meaning |
|----------|---------|
| `postgres` | Username (default) |
| `postgres123` | Your password from installation |
| `localhost:5432` | Where PostgreSQL runs |
| `quiz_app` | Database name |

> ⚠️ **NEVER commit .env to GitHub!** Add it to `.gitignore`.

---

### 17.5 Secure Authentication with bcrypt

**Why hash passwords?**

| Storing Plain Text | Storing Hash |
|-------------------|--------------|
| `password123` | `$2b$12$LQv3c1yqBW...` |
| Anyone can read it | Impossible to reverse |
| If hacked, users exposed | If hacked, passwords safe |
| NEVER do this | ✅ Always do this |

**How bcrypt works:**

```python
import bcrypt

# Creating a hash (when user registers)
password = "mypassword123"
password_bytes = password.encode('utf-8')       # Convert to bytes
salt = bcrypt.gensalt()                          # Generate random salt
password_hash = bcrypt.hashpw(password_bytes, salt)  # Create hash

# Verifying (when user logs in)
input_password = "mypassword123"
input_bytes = input_password.encode('utf-8')
is_valid = bcrypt.checkpw(input_bytes, password_hash)  # True or False
```

---

### 17.6 Complete Backend Code

Create `backend/models.py`:

```python
# models.py - Database models using SQLAlchemy

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    """Represents a quiz user account"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship: One user can have many scores
    scores = db.relationship('Score', backref='user', lazy=True)
    
    def to_dict(self):
        """Convert to dictionary (for JSON response)"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'created_at': self.created_at.isoformat()
        }


class Question(db.Model):
    """Represents a quiz question"""
    __tablename__ = 'questions'
    
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    options = db.Column(db.JSON, nullable=False)  # List stored as JSON
    correct_index = db.Column(db.Integer, nullable=False)
    time_limit = db.Column(db.Integer, default=30)
    points = db.Column(db.Integer, default=100)
    
    def to_dict(self, include_answer=False):
        """Convert to dictionary"""
        data = {
            'id': self.id,
            'question': self.question,
            'options': self.options,
            'timeLimit': self.time_limit,
            'points': self.points
        }
        if include_answer:
            data['correctIndex'] = self.correct_index
        return data


class Score(db.Model):
    """Represents a completed quiz attempt"""
    __tablename__ = 'scores'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total_score = db.Column(db.Integer, nullable=False)
    correct_count = db.Column(db.Integer, nullable=False)
    total_questions = db.Column(db.Integer, nullable=False)
    completed_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convert to dictionary with user name"""
        return {
            'id': self.id,
            'userName': self.user.name,
            'totalScore': self.total_score,
            'correctCount': self.correct_count,
            'totalQuestions': self.total_questions,
            'completedAt': self.completed_at.isoformat()
        }
```

**Understanding the Models:**

| Code | What It Does |
|------|--------------|
| `db.Column(db.String(100))` | Text field, max 100 characters |
| `primary_key=True` | This is the unique ID |
| `unique=True` | No duplicates allowed (emails) |
| `nullable=False` | This field is required |
| `db.ForeignKey('users.id')` | Links to users table |
| `db.relationship()` | Defines connection between tables |

---

Create `backend/server.py`:

```python
# server.py - Flask API with PostgreSQL

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from models import db, User, Question, Score
import bcrypt
import os

# Load environment variables from .env
load_dotenv()

# Create Flask app
app = Flask(__name__)
CORS(app)  # Allow frontend to connect

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# Initialize database
db.init_app(app)

# Create tables on first run
with app.app_context():
    db.create_all()
    
    # Seed questions if empty
    if Question.query.count() == 0:
        seed_questions = [
            Question(
                question="What does HTML stand for?",
                options=["Hyper Text Markup Language", "High Tech Modern Language", 
                         "Hyper Transfer Markup Language", "Home Tool Markup Language"],
                correct_index=0,
                time_limit=30,
                points=100
            ),
            Question(
                question="Which CSS property controls text size?",
                options=["text-style", "font-size", "text-size", "font-style"],
                correct_index=1,
                time_limit=20,
                points=100
            ),
            Question(
                question="What does 'DOM' stand for?",
                options=["Document Object Model", "Data Object Management",
                         "Digital Ordinance Model", "Document Orientation Mode"],
                correct_index=0,
                time_limit=25,
                points=100
            ),
            Question(
                question="Which JavaScript method adds an element to the end of an array?",
                options=["append()", "push()", "add()", "insert()"],
                correct_index=1,
                time_limit=25,
                points=100
            ),
            Question(
                question="What symbol is used for single-line comments in JavaScript?",
                options=["#", "//", "/*", "--"],
                correct_index=1,
                time_limit=20,
                points=100
            )
        ]
        db.session.add_all(seed_questions)
        db.session.commit()
        print("✅ Seeded 5 questions into database")


# ============== API ROUTES ==============

@app.route('/api/health', methods=['GET'])
def health_check():
    """Check if API is running"""
    return jsonify({'status': 'healthy', 'database': 'connected'})


@app.route('/api/register', methods=['POST'])
def register():
    """Create a new user account"""
    data = request.get_json()
    
    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    
    # Validation
    if not name or not email or not password:
        return jsonify({'error': 'All fields are required'}), 400
    
    if len(password) < 6:
        return jsonify({'error': 'Password must be at least 6 characters'}), 400
    
    # Check if email exists
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    # Hash password
    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    # Create user
    user = User(
        name=name,
        email=email,
        password_hash=password_hash.decode('utf-8')
    )
    db.session.add(user)
    db.session.commit()
    
    return jsonify(user.to_dict()), 201


@app.route('/api/login', methods=['POST'])
def login():
    """Authenticate user"""
    data = request.get_json()
    
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    
    # Find user
    user = User.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({'error': 'Invalid email or password'}), 401
    
    # Verify password
    if not bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    return jsonify(user.to_dict())


@app.route('/api/questions', methods=['GET'])
def get_questions():
    """Get all questions (without answers)"""
    questions = Question.query.all()
    return jsonify([q.to_dict(include_answer=False) for q in questions])


@app.route('/api/submit', methods=['POST'])
def submit_quiz():
    """Submit quiz answers and calculate score"""
    data = request.get_json()
    
    user_id = data.get('userId')
    answers = data.get('answers', [])
    times = data.get('timeSpent', [])
    
    # Get user
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Get all questions
    questions = Question.query.all()
    
    # Calculate score
    total_score = 0
    correct_count = 0
    results = []
    
    for i, question in enumerate(questions):
        user_answer = answers[i] if i < len(answers) else -1
        time_spent = times[i] if i < len(times) else question.time_limit
        
        is_correct = user_answer == question.correct_index
        
        if is_correct:
            correct_count += 1
            time_remaining = question.time_limit - time_spent
            time_multiplier = 1 + (time_remaining / question.time_limit)
            question_score = round(question.points * time_multiplier)
        else:
            question_score = 0
        
        total_score += question_score
        
        results.append({
            'questionId': question.id,
            'question': question.question,
            'userAnswer': question.options[user_answer] if 0 <= user_answer < len(question.options) else 'No answer',
            'correctAnswer': question.options[question.correct_index],
            'isCorrect': is_correct,
            'timeSpent': round(time_spent, 1),
            'score': question_score
        })
    
    # Save score to database
    score = Score(
        user_id=user_id,
        total_score=total_score,
        correct_count=correct_count,
        total_questions=len(questions)
    )
    db.session.add(score)
    db.session.commit()
    
    return jsonify({
        'totalScore': total_score,
        'correctCount': correct_count,
        'wrongCount': len(questions) - correct_count,
        'percentage': round((correct_count / len(questions)) * 100) if questions else 0,
        'questionResults': results
    })


@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    """Get top 10 scores"""
    top_scores = Score.query.order_by(Score.total_score.desc()).limit(10).all()
    return jsonify([s.to_dict() for s in top_scores])


@app.route('/api/user/<int:user_id>/scores', methods=['GET'])
def get_user_scores(user_id):
    """Get all scores for a specific user"""
    scores = Score.query.filter_by(user_id=user_id).order_by(Score.completed_at.desc()).all()
    return jsonify([s.to_dict() for s in scores])


# Run server
if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

---

### 17.7 Testing Locally

#### Step 1: Start the Backend

```bash
cd backend
python server.py
```

You should see:
```
✅ Seeded 5 questions into database
 * Running on http://127.0.0.1:5000
```

#### Step 2: Test with Browser

Open http://localhost:5000/api/health

You should see:
```json
{"database": "connected", "status": "healthy"}
```

#### Step 3: Test Leaderboard

Open http://localhost:5000/api/leaderboard

Initially returns: `[]` (empty array - no scores yet!)

---

### 17.8 Updated Frontend (api.js)

Update your `frontend/js/api.js` to connect to the backend:

```javascript
// api.js - Connect frontend to Flask backend

// Use environment-appropriate URL
const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api'
    : 'https://your-app-name.onrender.com/api';  // Change after deploy!

// Store user session
let currentUser = null;

// Register new user
async function registerUser(name, email, password) {
    try {
        const response = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
        }
        
        currentUser = data;
        localStorage.setItem('currentUser', JSON.stringify(data));
        return { success: true, user: data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Login user
async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }
        
        currentUser = data;
        localStorage.setItem('currentUser', JSON.stringify(data));
        return { success: true, user: data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Fetch questions
async function fetchQuestions() {
    try {
        const response = await fetch(`${API_BASE}/questions`);
        if (!response.ok) throw new Error('Failed to fetch questions');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// Submit quiz
async function submitQuiz(answers, timeSpent) {
    try {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) throw new Error('Not logged in');
        
        const response = await fetch(`${API_BASE}/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user.id,
                answers,
                timeSpent
            })
        });
        
        if (!response.ok) throw new Error('Failed to submit quiz');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Get leaderboard
async function fetchLeaderboard() {
    try {
        const response = await fetch(`${API_BASE}/leaderboard`);
        if (!response.ok) throw new Error('Failed to fetch leaderboard');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// Check if user is logged in (on page load)
function checkAuthStatus() {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
        currentUser = JSON.parse(saved);
        return currentUser;
    }
    return null;
}

// Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
}
```

---

### 17.9 Deploying Backend to Render

**Render** offers free PostgreSQL hosting - perfect for our quiz app!

#### Step 1: Prepare for Deployment

Create `backend/requirements.txt`:

```txt
flask==3.0.0
flask-cors==4.0.0
flask-sqlalchemy==3.1.1
psycopg2-binary==2.9.9
bcrypt==4.1.2
python-dotenv==1.0.0
gunicorn==21.2.0
```

Create `backend/Procfile` (no file extension):

```
web: gunicorn server:app
```

#### Step 2: Push to GitHub

1. Create a new repository on GitHub
2. Push your `backend` folder:

```bash
cd backend
git init
git add .
git commit -m "Initial backend"
git remote add origin https://github.com/YOUR-USERNAME/quiz-backend.git
git push -u origin main
```

#### Step 3: Create Render Account

1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub

#### Step 4: Create PostgreSQL Database

1. Dashboard → "New" → "PostgreSQL"
2. Name: `quiz-db`
3. Region: Choose closest to you
4. Plan: "Free"
5. Click "Create Database"
6. Wait for creation (~2 minutes)
7. Copy the **Internal Database URL** (starts with `postgres://...`)

#### Step 5: Deploy Web Service

1. Dashboard → "New" → "Web Service"
2. Connect your GitHub repository
3. Settings:

| Setting | Value |
|---------|-------|
| Name | `quiz-api` |
| Region | Same as database |
| Branch | `main` |
| Runtime | Python 3 |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `gunicorn server:app` |
| Plan | Free |

4. Add Environment Variables:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | (paste Internal Database URL) |
| `SECRET_KEY` | (generate a random string) |

5. Click "Create Web Service"

#### Step 6: Test Deployed API

After deployment (~5 minutes), visit:
```
https://quiz-api.onrender.com/api/health
```

You should see: `{"database": "connected", "status": "healthy"}`

---

### 17.10 Deploying Frontend to Netlify

#### Step 1: Prepare Frontend

Update `frontend/js/api.js` with your Render URL:

```javascript
const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api'
    : 'https://quiz-api.onrender.com/api';  // ← Your Render URL
```

#### Step 2: Deploy to Netlify

1. Go to https://netlify.com
2. Sign up / Log in
3. Drag and drop your `frontend` folder onto the page

OR use GitHub:

1. Push `frontend` folder to GitHub
2. Netlify → "Add new site" → "Import an existing project"
3. Connect GitHub repository
4. Settings:
   - Branch: `main`
   - Publish directory: `frontend` (or `.` if frontend is root)
5. Click "Deploy"

#### Step 3: Access Your Live App

Your app is now live at:
```
https://your-site-name.netlify.app
```

---

### 17.11 Connecting Frontend ↔ Backend

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER'S BROWSER                                │
│                                                                      │
│    https://your-quiz.netlify.app (FRONTEND)                         │
│    ├── index.html                                                    │
│    ├── css/style.css                                                 │
│    └── js/                                                           │
│        ├── app.js                                                    │
│        └── api.js ──┐                                                │
│                      │ fetch() requests                              │
└─────────────────────│────────────────────────────────────────────────┘
                      │
                      │  HTTPS (secure connection)
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        RENDER.COM (BACKEND)                          │
│                                                                      │
│    https://quiz-api.onrender.com                                    │
│    ├── Flask Server                                                  │
│    │   └── /api/register, /api/login, /api/submit, etc.            │
│    │                                                                 │
│    └── PostgreSQL Database ─────────────────────────────────────────│
│        ├── users table                                               │
│        ├── questions table                                           │
│        └── scores table (LEADERBOARD!)                               │
└─────────────────────────────────────────────────────────────────────┘
```

**How data flows:**

1. User opens `your-quiz.netlify.app`
2. JavaScript loads, calls `fetch('https://quiz-api.onrender.com/api/questions')`
3. Render server receives request, queries PostgreSQL
4. PostgreSQL returns data → Flask → JSON response → Browser
5. User takes quiz, answers submitted via `POST /api/submit`
6. Score saved to PostgreSQL → Appears on leaderboard for ALL users!

---

### 17.12 Complete Code Reference

#### File Structure (Final)

```
quiz-app/
├── frontend/                      ← Deploy to Netlify
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── app.js                 ← Main quiz logic
│       ├── api.js                 ← Backend communication
│       └── charts.js              ← Chart.js integration
│
└── backend/                       ← Deploy to Render
    ├── .env                       ← Local only, NOT on GitHub
    ├── .gitignore                 ← Ignore .env
    ├── requirements.txt           ← Python dependencies
    ├── Procfile                   ← Render start command
    ├── models.py                  ← Database models
    └── server.py                  ← Flask application
```

#### .gitignore for Backend

```
.env
__pycache__/
*.pyc
venv/
```

---

### 17.13 Troubleshooting Common Issues

| Problem | Solution |
|---------|----------|
| CORS error in browser | Make sure `flask-cors` is installed and `CORS(app)` is called |
| "Connection refused" | Backend not running or wrong URL in api.js |
| Empty leaderboard | No scores submitted yet - take the quiz! |
| "Internal Server Error" | Check Render logs for Python errors |
| Database not connecting | Verify DATABASE_URL in Render environment |
| Free tier sleeping | Render free tier sleeps after 15min inactivity. First request takes ~30s to wake up. |

---

### 17.14 What You've Accomplished

✅ **Real Database** - PostgreSQL stores all data permanently
✅ **Secure Auth** - Passwords hashed with bcrypt
✅ **Multi-User** - Anyone can register and compete
✅ **Live Leaderboard** - Scores shared across all users
✅ **Deployed** - Live on the internet for anyone to access
✅ **Industry Skills** - Flask, PostgreSQL, Render, Netlify

**Congratulations! You've built a full-stack web application!** 🎉

---

## Conclusion

You now have everything needed to build a complete quiz application:

✅ **Decision-making process** - Know when to use HTML, CSS, or JS
✅ **Complete HTML structure** - All screens and elements
✅ **CSS styling** - Modern, responsive design
✅ **Quiz logic** - Questions, answers, navigation
✅ **Timer system** - Countdown with visual feedback
✅ **Score calculation** - Speed-based like Mentimeter
✅ **Charts** - Pie and bar charts for results
✅ **Authentication** - Login and signup system
✅ **Deployment** - How to put it online
✅ **Creativity points** - Where to add your personal touch
✅ **Python backend** - Optional server-side features

**The key to learning is BUILDING, not just reading.**

Start with the basics, add features one at a time, and test constantly. 

Good luck! 🚀
