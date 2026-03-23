document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("header-container");
    if (!container) return;

    // 1. Detetar se estamos numa subpasta (ex: /paginas/)
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
            
            // 3. Ajustar os links (href) dinamicamente para não dar 404
            const links = container.querySelectorAll("#menu-links a");
            links.forEach(link => {
                const href = link.getAttribute("href");

                if (href === "index.html" || href === "header.html") {
                    link.href = isSubFolder ? "../index.html" : "index.html";
                } else if (isSubFolder) {
                    // Se já estamos em /paginas/, removemos o "../paginas/" do link
                    link.href = href.replace("../paginas/", "");
                } else {
                    // Se estamos na raiz, removemos o "../"
                    link.href = href.replace("../", "");
                }
            });

            // 4. Inicializar scripts que dependem do header (Ex: Sobre/Menu)
            inicializarLogicaComponentes();
        })
        .catch(err => console.error("Erro no Fetch:", err));
});

function inicializarLogicaComponentes() {
    /* --- LÓGICA DO SOBRE / BATERIA --- */
    const bts = document.querySelectorAll('.nav-btn');
    const subJanela = document.getElementById('sub-janela-bateria');
    
    if (bts && subJanela) {
        bts.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                const infoPreview = btn.getAttribute('data-preview');
                if (infoPreview) {
                    subJanela.innerText = infoPreview;
                    subJanela.style.display = 'block';
                }
            });
            btn.addEventListener('mouseleave', () => {
                subJanela.style.display = 'none';
            });
        });
    }

    /* --- LÓGICA DOS MAPAS --- */
    const earth = document.getElementById("earth");
    if (earth) {
        earth.addEventListener("click", () => {
            earth.style.transform = "scale(2) rotate(720deg)";
            setTimeout(() => { earth.style.transform = "scale(3) translate(-20%, -10%)"; }, 1500);
            setTimeout(() => {
                const mapDiv = document.getElementById("map");
                if (mapDiv) {
                    mapDiv.style.display = "block";
                    if (typeof initMap === "function") initMap();
                }
            }, 2200);
            setTimeout(() => {
                earth.style.opacity = "0";
                const mapDiv = document.getElementById("map");
                if (mapDiv) mapDiv.style.opacity = "1";
            }, 2500);
        });
    }
}

/* Funções Globais (Painel) */
function abrirPainel(tipo) {
    const painel = document.getElementById('painel-principal');
    const conteudo = document.getElementById('conteudo-dinamico');
    if (!painel || !conteudo) return;

    painel.style.display = 'block';
    if (tipo === 'Bateria') {
        conteudo.innerHTML = "<h1>🔋 Detalhes da Energia</h1><p>Gráficos de consumo...</p>";
    } else if (tipo === 'Estatísticas') {
        conteudo.innerHTML = "<h1>📊 Estatísticas de Voo</h1><p>Km percorridos...</p>";
    } else if (tipo === 'Configurações') {
        conteudo.innerHTML = "<h1>⚙️ Definições do Sistema</h1><p>Ajustes de limites...</p>";
    }
}

function fecharPainel() {
    const painel = document.getElementById('painel-principal');
    if (painel) painel.style.display = 'none';
}