// /fetch("./header.html")
//   .then(res => res.text())
//   .then(html => {
//     document.getElementById("header-container").innerHTML = html;
//   });


  /*=====================SOBRE====================================*/
  
const bts = document.querySelectorAll('.nav-btn');
const subJanela = document.getElementById('sub-janela-bateria');
const painel = document.getElementById('painel-principal');
const conteudo = document.getElementById('conteudo-dinamico');

if (bts){
bts.forEach(btn => {
    // Evento de Mouse Over
    btn.addEventListener('mouseenter', () => {
        const infoPreview = btn.getAttribute('data-preview');
        
        // SÓ mostra a sub-janela se o botão tiver o atributo 'data-preview'
        if (infoPreview) {
            subJanela.innerText = infoPreview;
            subJanela.style.display = 'block';
        }
    });

    // Evento de Mouse Out
    btn.addEventListener('mouseleave', () => {
        subJanela.style.display = 'none';
    });
});
}
// Função para o Clique (Firma a janela maior)
function abrirPainel(tipo) {
    painel.style.display = 'block';
    
    if (tipo === 'Bateria') {
        conteudo.innerHTML = "<h1>🔋 Detalhes da Energia</h1><p>Gráficos de consumo e tempo de vida útil...</p>";
    } else if (tipo === 'Estatísticas') {
        conteudo.innerHTML = "<h1>📊 Estatísticas de Voo</h1><p>Km percorridos, altitude máxima e horas de voo.</p>";
    } else if (tipo === 'Configurações') {
        conteudo.innerHTML = "<h1>⚙️ Definições do Sistema</h1><p>Ajustes de limites de altura e calibração.</p>";
    }
}

function fecharPainel() {
    painel.style.display = 'none';
}

/*===========================Mapas====================================*/
const earth = document.getElementById("earth");
const mapDiv = document.getElementById("map");


if (earth){earth.addEventListener("click", () => {

  // 1. girar + zoom
  earth.style.transform = "scale(2) rotate(720deg)";

  // 2. focar Portugal
  setTimeout(() => {
    earth.style.transform = "scale(3) translate(-20%, -10%)";
  }, 1500);

  // 3. iniciar mapa antes da transição
  setTimeout(() => {
    mapDiv.style.display = "block";
    initMap();
  }, 2200);

  // 4. fade suave entre terra → mapa
  setTimeout(() => {
    earth.style.opacity = "0";
    mapDiv.style.opacity = "1";
  }, 2500);
});}

/*
const earth = document.getElementById("earth");
const mapDiv = document.getElementById("map");

earth.addEventListener("click", () => {
  // 1. girar rápido + zoom
  earth.style.transform = "scale(2) rotate(720deg)";

  // 2. focar "Portugal" (simulado com translate)
  setTimeout(() => {
    earth.style.transform = "scale(3) translate(-20%, -10%)";
  }, 1500);

  // 3. desaparecer e mostrar mapa
  setTimeout(() => {
    earth.style.opacity = "0";
  }, 2500);

  setTimeout(() => {
    earth.style.display = "none";
    mapDiv.style.display = "block";
    initMap();
  }, 3000);
});

function initMap() {
  const map = L.map('map').setView([39.5, -8], 6);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);
}
*/