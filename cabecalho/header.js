document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("header-container");
    if (!container) return;

    // 1. Detetar se estamos dentro da pasta /paginas/ para ajustar caminhos
    const isSubFolder = window.location.pathname.includes("/paginas/");
    const basePath = isSubFolder ? "../" : "./";

    // 2. Carregar o HTML do cabeçalho
    fetch(`${basePath}cabecalho/header.html`)
        .then(res => {
            if (!res.ok) throw new Error("Erro ao carregar header.html");
            return res.text();
        })
        .then(html => {
            container.innerHTML = html;
            
            // 3. AJUSTE DINÂMICO DOS LINKS
            const links = container.querySelectorAll("#menu-links a");
            links.forEach(link => {
                const originalHref = link.getAttribute("href");

                if (originalHref === "index.html") {
                    link.href = isSubFolder ? "../index.html" : "index.html";
                } 
                else {
                    const fileName = originalHref.replace("../paginas/", "").replace("paginas/", "");
                    if (isSubFolder) {
                        link.href = fileName;
                    } else {
                        link.href = `paginas/${fileName}`;
                    }
                }
            });

            // 4. Inicializar lógicas de componentes (Mapas e outros)
            inicializarLogicaComponentes();
        })
        .catch(err => console.error("Erro no Header JS:", err));
});

function inicializarLogicaComponentes() {
    /* --- LÓGICA DOS MAPAS --- */
    const earth = document.getElementById("earth");
    if (earth) {
        earth.addEventListener("click", () => {
            earth.style.transition = "transform 2.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s";
            earth.style.transform = "scale(3) rotate(360deg)";

            setTimeout(() => {
                const mapDiv = document.getElementById("map");
                if (mapDiv) {
                    mapDiv.style.display = "block";
                    setTimeout(() => { mapDiv.style.opacity = "1"; }, 50);
                }
            }, 1800);

            setTimeout(() => {
                earth.style.opacity = "0";
                earth.style.pointerEvents = "none";
            }, 2300);
        });
    }
}

/* --- FUNÇÕES GLOBAIS PARA OS PAINÉIS (Bateria, Estatísticas, Configurações) --- */
// Estas funções são chamadas pelo "onclick" dos botões na glass-sidebar

function abrirPainel(tipo) {
    const painel = document.getElementById('painel-principal');
    const conteudo = document.getElementById('conteudo-dinamico');
    
    if (!painel || !conteudo) {
        console.warn("Painel principal não encontrado no HTML.");
        return;
    }

    // Mostra a sub-janela (Painel)
    painel.style.display = 'block';

    // Define o conteúdo baseado no que foi clicado
    if (tipo === 'Bateria') {
        conteudo.innerHTML = `
            <h2>🔋 Status do Sistema de Energia</h2>
            <hr>
            <p><strong>Carga Atual:</strong> 95%</p>
            <p><strong>Tempo de Voo Restante:</strong> 25 minutos</p>
            <p><strong>Saúde da Bateria:</strong> Excelente (Ciclos: 12)</p>
            <p><strong>Temperatura:</strong> 32°C</p>
        `;
    } else if (tipo === 'Estatísticas') {
        conteudo.innerHTML = `
            <h2>📊 Estatísticas de Voo</h2>
            <hr>
            <p><strong>Distância Percorrida:</strong> 12.4 km</p>
            <p><strong>Altitude Máxima:</strong> 120m</p>
            <p><strong>Tempo Total de Operação:</strong> 4h 15min</p>
            <p><strong>Missões Concluídas:</strong> 8</p>
        `;
    } else if (tipo === 'Configurações') {
        conteudo.innerHTML = `
            <h2>⚙️ Configurações do XFly</h2>
            <hr>
            <p><strong>Modo de Voo:</strong> Estabilizado / GPS</p>
            <p><strong>Limite de Altitude:</strong> 120 metros</p>
            <p><strong>Retorno Automático (RTH):</strong> Ativado (20%)</p>
            <p><strong>Calibração do Gimbal:</strong> OK</p>
        `;
    }
}

function fecharPainel() {
    const painel = document.getElementById('painel-principal');
    if (painel) {
        painel.style.display = 'none';
    }
}

/* --- LÓGICA DE TAREFAS --- */
function adicionarTarefa() {
    const input = document.getElementById('nova-tarefa');
    const lista = document.getElementById('lista-tarefas');
    
    if (!input || !lista) return;

    if (input.value.trim() !== "") {
        const li = document.createElement('li');
        li.className = 'tarefa-item';
        li.innerHTML = `
            <span>${input.value}</span>
            <button class="btn-check" onclick="this.parentElement.remove()">✔</button>
        `;
        lista.appendChild(li);
        input.value = "";
    } else {
        alert("Por favor, introduza uma missão para o drone.");
    }
}