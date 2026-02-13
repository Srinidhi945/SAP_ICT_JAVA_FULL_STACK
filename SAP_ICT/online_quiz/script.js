/**
 * RIDDLE DATASET
 * Format: { question: string, options: string[], correct: index }
 */
const quizData = [
    {
        question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
        options: ["A Cloud", "An Echo", "A Ghost", "A Telephone"],
        correct: 1
    },
    {
        question: "You measure my life in hours and I serve you by expiring. I’m quick when I’m thin and slow when I’m fat. The wind is my enemy.",
        options: ["A Battery", "An Hourglass", "A Candle", "A Snowman"],
        correct: 2
    },
    {
        question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
        options: ["A Map", "A Globe", "A Painting", "A Desert"],
        correct: 0
    },
    {
        question: "What is seen in the middle of March and April that can’t be seen at the beginning or end of either month?",
        options: ["Rain", "The Letter R", "Spring", "The Moon"],
        correct: 1
    },
    {
        question: "What has keys, but no locks; space, but no room; and you can enter, but never leave?",
        options: ["A Jail", "A Computer", "A Piano", "A Keyboard"],
        correct: 3
    },
    {
        question: "The more of this there is, the less you see. What is it?",
        options: ["Fog", "Silence", "Darkness", "Light"],
        correct: 2
    },
    {
        question: "What can travel all around the world while staying in a corner?",
        options: ["A Stamp", "A Plane", "The Wind", "A Thought"],
        correct: 0
    }
];

// STATE VARIABLES
let currentIdx = 0;
let score = 0;

// DOM ELEMENTS
const questionEl = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const counterEl = document.getElementById("question-counter");
const progressBar = document.getElementById("progress-bar");
const emojiEl = document.querySelector(".quiz-emoji");
const quizBody = document.getElementById("quiz-body");
const resultBody = document.getElementById("result-body");
const scoreDisplay = document.getElementById("score-display");

/**
 * INITIALIZE / RELOAD QUESTION
 */
function loadQuiz() {
    const currentQuiz = quizData[currentIdx];
    
    // 1. Update Emoji based on progress
    if (currentIdx === 0) emojiEl.innerText = "🤔";
    else if (currentIdx > 3 && currentIdx < 6) emojiEl.innerText = "🔥";
    else if (currentIdx === 6) emojiEl.innerText = "😱";

    // 2. Update Question Text
    questionEl.innerText = currentQuiz.question;
    
    // 3. Update Progress UI
    counterEl.innerText = `Riddle ${currentIdx + 1} of ${quizData.length}`;
    const progressPercent = (currentIdx / quizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // 4. Clear and Build Option Buttons
    optionsContainer.innerHTML = "";

    currentQuiz.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.innerText = option;
        
        // Handle Answer Selection
        btn.onclick = () => {
            // Visual feedback on click
            btn.style.background = "#2f3542";
            btn.style.color = "white";
            
            // Short delay so user sees their click before moving on
            setTimeout(() => checkAnswer(index), 250);
        };
        
        optionsContainer.appendChild(btn);
    });
}

/**
 * LOGIC: CHECK ANSWER & MOVE FORWARD
 */
function checkAnswer(selectedIndex) {
    // Score Calculation
    if (selectedIndex === quizData[currentIdx].correct) {
        score++;
    }

    currentIdx++;

    // Check if there are more questions
    if (currentIdx < quizData.length) {
        loadQuiz();
    } else {
        showResults();
    }
}

/**
 * DISPLAY FINAL SCORE
 */
function showResults() {
    quizBody.classList.add("hidden");
    resultBody.classList.remove("hidden");
    
    // Update Final UI
    emojiEl.innerText = score > 4 ? "🏆" : "🥉";
    scoreDisplay.innerText = `${score} / ${quizData.length}`;
    progressBar.style.width = "100%";
    counterEl.innerText = "Riddle Challenge Over!";
}

function showResults() {
    quizBody.classList.add("hidden");
    resultBody.classList.remove("hidden");
    
    // Update Score
    scoreDisplay.innerText = `${score} / ${quizData.length}`;
    emojiEl.innerText = score > 4 ? "🏆" : "🥉";

    // Build the Correct Answers Review
    const reviewSection = document.getElementById("review-section");
    reviewSection.innerHTML = "<h3 style='margin-top:0'>Quick Review:</h3>";

    quizData.forEach((item, index) => {
        const correctText = item.options[item.correct];
        
        const reviewItem = document.createElement("div");
        reviewItem.classList.add("review-item");
        reviewItem.innerHTML = `
            <strong>Q${index + 1}:</strong> ${item.question}<br>
            <span class="correct-answer-text">✔ Correct: ${correctText}</span>
        `;
        reviewSection.appendChild(reviewItem);
    });

    progressBar.style.width = "100%";
    counterEl.innerText = "Challenge Finished!";
}

// Start the app!
loadQuiz();