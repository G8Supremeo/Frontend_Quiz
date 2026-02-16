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