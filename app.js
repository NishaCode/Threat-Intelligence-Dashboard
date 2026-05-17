// Initialize Lucide Icons
lucide.createIcons();

// --- Configuration & Theming ---
Chart.defaults.color = '#a0aabf';
Chart.defaults.font.family = "'Inter', sans-serif";

const colors = {
    red: '#ff4b4b',
    orange: '#ff9900',
    purple: '#b254ff',
    cyan: '#00f0ff',
    green: '#00ff88',
    bgGlass: 'rgba(18, 20, 31, 0.6)'
};

// --- Mock Data ---
const ransomwareData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
        label: 'Ransomware Incidents',
        data: [120, 145, 130, 170, 165, 190, 210, 205, 230, 260, 250, 290],
        borderColor: colors.purple,
        backgroundColor: 'rgba(178, 84, 255, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: colors.purple,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colors.purple,
        pointRadius: 3,
        pointHoverRadius: 5
    }]
};

const mitreData = {
    labels: [
        'Initial Access', 
        'Execution', 
        'Persistence', 
        'Privilege Escalation', 
        'Defense Evasion', 
        'Credential Access'
    ],
    datasets: [{
        label: 'Tactic Frequency',
        data: [85, 65, 70, 45, 90, 55],
        backgroundColor: 'rgba(0, 240, 255, 0.2)',
        borderColor: colors.cyan,
        pointBackgroundColor: colors.cyan,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colors.cyan,
        borderWidth: 2
    }]
};

const recentIoCs = [
    { type: 'Phishing', indicator: 'secure-login-paypal.com', severity: 'High', time: '10m ago' },
    { type: 'Malware', indicator: 'a7b8...9f01', severity: 'High', time: '15m ago' },
    { type: 'IP', indicator: '192.168.45.112', severity: 'Medium', time: '22m ago' },
    { type: 'Phishing', indicator: 'apple-id-verify-alert.net', severity: 'High', time: '1h ago' },
    { type: 'Malware', indicator: 'e2c4...7a9b', severity: 'Medium', time: '2h ago' }
];

const geoData = [
    { country: 'Russia', flag: '🇷🇺', percentage: 85 },
    { country: 'China', flag: '🇨🇳', percentage: 72 },
    { country: 'Brazil', flag: '🇧🇷', percentage: 45 },
    { country: 'India', flag: '🇮🇳', percentage: 38 },
    { country: 'North Korea', flag: '🇰🇵', percentage: 30 }
];

// --- Rendering Functions ---

let rChart, mChart;

function initCharts() {
    // Ransomware Chart
    const rCtx = document.getElementById('ransomwareChart').getContext('2d');
    rChart = new Chart(rCtx, {
        type: 'line',
        data: ransomwareData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(10, 11, 16, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#a0aabf',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 10
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    beginAtZero: true
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });

    // MITRE ATT&CK Chart
    const mCtx = document.getElementById('mitreChart').getContext('2d');
    mChart = new Chart(mCtx, {
        type: 'radar',
        data: mitreData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(10, 11, 16, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#a0aabf',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1
                }
            },
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    pointLabels: {
                        color: '#a0aabf',
                        font: { size: 11, family: "'Inter', sans-serif" }
                    },
                    ticks: { display: false, min: 0, max: 100 }
                }
            }
        }
    });
}

function renderTables() {
    // Populate IoC Table
    const tbody = document.getElementById('ioc-table-body');
    tbody.innerHTML = '';
    recentIoCs.forEach(ioc => {
        const tagClass = ioc.severity === 'High' ? 'tag-high' : 'tag-med';
        
        let iconHtml = '';
        if (ioc.type === 'Phishing') iconHtml = '<i data-lucide="link" style="width: 14px; color: var(--accent-red); margin-right: 6px; vertical-align: middle;"></i>';
        if (ioc.type === 'Malware') iconHtml = '<i data-lucide="file-code" style="width: 14px; color: var(--accent-purple); margin-right: 6px; vertical-align: middle;"></i>';
        if (ioc.type === 'IP') iconHtml = '<i data-lucide="globe" style="width: 14px; color: var(--accent-orange); margin-right: 6px; vertical-align: middle;"></i>';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${iconHtml}${ioc.type}</td>
            <td class="font-mono">${ioc.indicator}</td>
            <td><span class="tag ${tagClass}">${ioc.severity}</span></td>
            <td>${ioc.time}</td>
        `;
        tbody.appendChild(tr);
    });
    
    // Re-init lucide icons for newly added elements
    lucide.createIcons();

    // Populate Geo List
    const geoList = document.getElementById('geo-list');
    geoList.innerHTML = '';
    geoData.forEach(geo => {
        const div = document.createElement('div');
        div.className = 'geo-item';
        div.innerHTML = `
            <div class="geo-info">
                <span class="flag">${geo.flag}</span>
                <span class="geo-country">${geo.country}</span>
            </div>
            <div class="geo-bar-container" title="${geo.percentage}%">
                <div class="geo-bar" style="width: ${geo.percentage}%;"></div>
            </div>
        `;
        geoList.appendChild(div);
    });
}

// --- Interactivity ---

// Simulate refresh data
document.getElementById('refreshBtn').addEventListener('click', function(e) {
    const btn = e.currentTarget;
    btn.classList.add('spinning');
    
    // Animate stats numbers randomly
    const statElements = ['phishing-count', 'ip-count', 'hash-count', 'alert-count'];
    statElements.forEach(id => {
        const el = document.getElementById(id);
        const currentVal = parseInt(el.innerText.replace(/,/g, ''));
        const newVal = currentVal + Math.floor(Math.random() * 20) - 5; // slight variance
        el.innerText = newVal.toLocaleString();
    });

    // Update charts slightly
    rChart.data.datasets[0].data = rChart.data.datasets[0].data.map(val => val + Math.floor(Math.random() * 10) - 5);
    rChart.update();
    
    mChart.data.datasets[0].data = mChart.data.datasets[0].data.map(val => Math.min(100, Math.max(0, val + Math.floor(Math.random() * 10) - 5)));
    mChart.update();

    setTimeout(() => {
        btn.classList.remove('spinning');
    }, 1000);
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    renderTables();
});
