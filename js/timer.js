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
