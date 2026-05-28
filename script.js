// Menú hamburguesa
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('open');
    });
}

// Activar enlace activo en scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');
function setActiveLink() {
    let current = '';
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}
window.addEventListener('scroll', setActiveLink);
setActiveLink();

// ========== CI/CD TERMINAL ==========
const cicdCommands = [
    { cmd: "git push origin main", output: "Enumerating objects: 15, done.\nWriting objects: 100% (15/15), 1.23 KiB | 1.23 MiB/s, done." },
    { cmd: "gh workflow run ci.yml", output: "✓ Created workflow_dispatch event for ci.yml\n✓ View your workflow at https://github.com/YPoolBVelez/actions" },
    { cmd: "Running GitHub Actions...", output: "▶️ Build: npm install && npm run build\n✅ Build completed in 45s\n▶️ Test: npm test\n✅ 120 tests passed, 0 failed\n▶️ Security scan: SonarQube\n✅ No critical vulnerabilities" },
    { cmd: "docker build -t myapp:latest .", output: "Successfully built myapp:latest\nPushing to Docker Hub...\n✓ Pushed" },
    { cmd: "kubectl apply -f k8s/deployment.yaml", output: "deployment.apps/myapp created\nservice/myapp created\nRolling update: 1 old replicas, 3 new replicas" }
];
let cicdStep = 0;
const cicdTerm = document.getElementById('cicd-terminal');
function runCicdCommand(i) {
    if (i >= cicdCommands.length) {
        cicdTerm.innerHTML += '<br><span class="prompt">$ </span><span class="command">Pipeline finalizado - reiniciando...</span><br>';
        setTimeout(() => { cicdTerm.innerHTML = ''; cicdStep = 0; runCicdCommand(0); }, 6000);
        return;
    }
    cicdTerm.innerHTML += `<span class="prompt">$ </span><span class="command">${cicdCommands[i].cmd}</span><br>`;
    setTimeout(() => {
        const lines = cicdCommands[i].output.split('\n');
        let idx = 0;
        function write() {
            if (idx < lines.length) {
                cicdTerm.innerHTML += `<span class="output">${lines[idx]}</span><br>`;
                idx++;
                setTimeout(write, 100);
            } else {
                cicdTerm.innerHTML += '<br>';
                // Actualizar etapas visuales
                const stages = ['stage-build', 'stage-test', 'stage-scan', 'stage-package', 'stage-deploy'];
                if (i < stages.length) document.getElementById(stages[i]).classList.add('completed');
                cicdStep++;
                setTimeout(() => runCicdCommand(cicdStep), 800);
            }
        }
        write();
    }, 400);
}
runCicdCommand(0);

// ========== DEVOPS TERMINAL ==========
const devopsCommands = [
    { cmd: "git clone https://github.com/YPoolBVelez/Faropets.git", output: "Clonando...\nReceiving objects: 100% (142/142), 2.34 MiB | 2.5 MiB/s, done." },
    { cmd: "kubectl get pods -n production", output: "NAME                        READY   STATUS    RESTARTS   AGE\nweb-7d8f9c8b4d-abc12        1/1     Running   0          5d\napi-5c6d7e8f9-xyz99         1/1     Running   0          5d" },
    { cmd: "kubectl logs web-7d8f9c8b4d-abc12 --tail=5", output: "2025-01-15T10:23:45 INFO  Starting server\n2025-01-15T10:23:46 INFO  Connected to database" },
    { cmd: "docker build -t myapp:v2 .", output: "Step 1/5 FROM node:18-alpine\nStep 2/5 WORKDIR /app\n...\nSuccessfully built myapp:v2" },
    { cmd: "kubectl get nodes -o wide", output: "NAME       STATUS   ROLES    AGE   VERSION\nmaster     Ready    master   45d   v1.24.0\nworker-1   Ready    <none>   45d   v1.24.0" }
];
let devopsStep = 0;
const devopsTerm = document.getElementById('devops-terminal');
function runDevopsCommand(i) {
    if (i >= devopsCommands.length) {
        devopsTerm.innerHTML += '<br><span class="prompt">$ </span><span class="command">demo reiniciando...</span><br>';
        setTimeout(() => { devopsTerm.innerHTML = ''; devopsStep = 0; runDevopsCommand(0); }, 5000);
        return;
    }
    devopsTerm.innerHTML += `<span class="prompt">$ </span><span class="command">${devopsCommands[i].cmd}</span><br>`;
    setTimeout(() => {
        const lines = devopsCommands[i].output.split('\n');
        let idx = 0;
        function write() {
            if (idx < lines.length) {
                devopsTerm.innerHTML += `<span class="output">${lines[idx]}</span><br>`;
                idx++;
                setTimeout(write, 80);
            } else {
                devopsTerm.innerHTML += '<br>';
                devopsStep++;
                setTimeout(() => runDevopsCommand(devopsStep), 1000);
            }
        }
        write();
    }, 400);
}
runDevopsCommand(0);

// ========== MONITORING TERMINAL ==========
const monitoringCommands = [
    { cmd: "prometheus --config.file=prometheus.yml", output: "Starting Prometheus Server\nServer is ready on :9090" },
    { cmd: "curl http://localhost:9090/api/v1/query?query=container_cpu_usage_seconds_total", output: '{"status":"success","data":{"result":[{"metric":{"pod":"web-abc12"},"value":[1705392000,"0.45"]}]}}' },
    { cmd: "rate(http_requests_total[5m])", output: "{pod=\"api-xyz99\",code=\"200\"} 12.5 req/s\n{pod=\"web-abc12\",code=\"500\"} 0.2 req/s" },
    { cmd: "loki: query {namespace=\"production\"} |= \"error\"", output: '2025-01-15T10:25:00Z {pod=\"web-abc12\"} \"Error connecting to DB\"' }
];
let monitoringStep = 0;
const monitoringTerm = document.getElementById('monitoring-terminal');
function runMonitoringCommand(i) {
    if (i >= monitoringCommands.length) {
        monitoringTerm.innerHTML += '<br><span class="prompt">$ </span><span class="command">demo reiniciando...</span><br>';
        setTimeout(() => { monitoringTerm.innerHTML = ''; monitoringStep = 0; runMonitoringCommand(0); }, 5000);
        return;
    }
    monitoringTerm.innerHTML += `<span class="prompt">$ </span><span class="command">${monitoringCommands[i].cmd}</span><br>`;
    setTimeout(() => {
        const lines = monitoringCommands[i].output.split('\n');
        let idx = 0;
        function write() {
            if (idx < lines.length) {
                monitoringTerm.innerHTML += `<span class="output">${lines[idx]}</span><br>`;
                idx++;
                setTimeout(write, 70);
            } else {
                monitoringTerm.innerHTML += '<br>';
                monitoringStep++;
                setTimeout(() => runMonitoringCommand(monitoringStep), 1000);
            }
        }
        write();
    }, 350);
}
runMonitoringCommand(0);

// ========== DASHBOARD (métricas dinámicas) ==========
let cpuData = Array(30).fill(0).map(() => Math.random() * 40 + 30);
let memData = Array(30).fill(0).map(() => Math.random() * 30 + 50);
let reqData = Array(30).fill(0).map(() => Math.random() * 500 + 800);
let errData = Array(30).fill(0).map(() => Math.random() * 1);

function drawSparkline(canvasId, data, minY, maxY) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    ctx.beginPath();
    const step = w / (data.length - 1);
    for (let i = 0; i < data.length; i++) {
        const y = h - ((data[i] - minY) / (maxY - minY)) * h;
        if (i === 0) ctx.moveTo(0, y);
        else ctx.lineTo(i * step, y);
    }
    ctx.strokeStyle = '#1abc9c';
    ctx.lineWidth = 1.5;
    ctx.stroke();
}

function updateDashboard() {
    const newCPU = Math.random() * 40 + 30;
    const newMem = Math.random() * 30 + 50;
    const newReq = Math.random() * 500 + 800;
    const newErr = Math.random() * 1;
    document.getElementById('cpuValue').innerText = newCPU.toFixed(1);
    document.getElementById('memValue').innerText = newMem.toFixed(1);
    document.getElementById('reqValue').innerText = Math.round(newReq);
    document.getElementById('errValue').innerText = newErr.toFixed(2);
    cpuData.push(newCPU); cpuData.shift();
    memData.push(newMem); memData.shift();
    reqData.push(newReq); reqData.shift();
    errData.push(newErr); errData.shift();
    drawSparkline('cpuSpark', cpuData, 0, 100);
    drawSparkline('memSpark', memData, 0, 100);
    drawSparkline('reqSpark', reqData, 600, 1500);
    drawSparkline('errSpark', errData, 0, 2);
    const alerts = ["CPU usage > 80% en pod web", "Memoria接近 límite (92%)", "Error rate aumentó a 0.5%", "Alta latencia en API", "Todo normal"];
    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
    document.getElementById('alert-banner').innerHTML = `📈 ${randomAlert}`;
}
setInterval(updateDashboard, 3000);
setTimeout(() => {
    drawSparkline('cpuSpark', cpuData, 0, 100);
    drawSparkline('memSpark', memData, 0, 100);
    drawSparkline('reqSpark', reqData, 600, 1500);
    drawSparkline('errSpark', errData, 0, 2);
}, 100);

// ========== RPA TERMINAL ==========
const rpaScript = [
    { line: "Inicializando robot RPA...", delay: 500 },
    { line: ">>> [UiPath] Abriendo aplicación de facturación", delay: 800 },
    { line: ">>> [Python] Extrayendo datos de Excel (facturas_2025.xlsx)", delay: 1000 },
    { line: ">>> Procesando 45 registros...", delay: 600 },
    { line: ">>> [Selenium] Navegando a portal de proveedores", delay: 1200 },
    { line: ">>> Completando formulario de factura #1245", delay: 700 },
    { line: ">>> Enviando correo de confirmación a accounting@empresa.com", delay: 900 },
    { line: "✅ Automatización completada. Tiempo: 2.3 segundos por factura.", delay: 800 }
];
let rpaIndex = 0;
const rpaOutput = document.getElementById('rpa-output');
function runRPA() {
    if (rpaIndex >= rpaScript.length) {
        setTimeout(() => { rpaOutput.innerHTML = ''; rpaIndex = 0; runRPA(); }, 8000);
        return;
    }
    const item = rpaScript[rpaIndex];
    rpaOutput.innerHTML += `<span class="output">${item.line}</span><br>`;
    rpaIndex++;
    setTimeout(runRPA, item.delay);
}
runRPA();

// ========== CLUSTER KUBERNETES CANVAS ==========
const k8sCanvas = document.getElementById('k8sCanvas');
if (k8sCanvas) {
    let ctx = k8sCanvas.getContext('2d');
    let width = k8sCanvas.clientWidth;
    let height = 250;
    k8sCanvas.width = width;
    k8sCanvas.height = height;
    let pods = Array.from({ length: 10 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8
    }));
    function drawK8s() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < pods.length; i++) {
            for (let j = i + 1; j < pods.length; j++) {
                const dx = pods[i].x - pods[j].x;
                const dy = pods[i].y - pods[j].y;
                const dist = Math.hypot(dx, dy);
                if (dist < 90) {
                    ctx.beginPath();
                    ctx.moveTo(pods[i].x, pods[i].y);
                    ctx.lineTo(pods[j].x, pods[j].y);
                    ctx.strokeStyle = `rgba(26, 188, 156, ${0.4 * (1 - dist / 90)})`;
                    ctx.stroke();
                }
            }
        }
        pods.forEach(p => {
            ctx.fillStyle = '#1abc9c';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.font = '8px monospace';
            ctx.fillText('pod', p.x - 8, p.y - 4);
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 8 || p.x > width - 8) p.vx *= -1;
            if (p.y < 8 || p.y > height - 8) p.vy *= -1;
        });
        requestAnimationFrame(drawK8s);
    }
    drawK8s();
    window.addEventListener('resize', () => {
        k8sCanvas.width = k8sCanvas.clientWidth;
        k8sCanvas.height = 250;
        width = k8sCanvas.width;
        height = k8sCanvas.height;
    });
}

// ========== FOOTER YEAR ==========
document.getElementById('year').textContent = new Date().getFullYear();
