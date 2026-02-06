// ========== POEMAS ==========
const poemas = [
  `Como la Princesa Luna,  
aprendiste a amar en calma,  
y tu corazón brilla  
sin pedir permiso al alma.`,

  `Como Kitty,  
tu ternura cabe en mi pecho,  
y de pronto todo está bien,  
cerca del corazón me echo.`,

  `En tu mundo, el amor es magia,  
la amistad es promesa y alegría,  
y tú te vuelves mi refugio,  
el lugar donde siempre quería.`,

  `Si dices "vas con la otra",  
yo sonrío y no me agota,  
porque yo estaré con la otra forma  
de quererte que siempre reconforta.`,

  `Batman no lucha solo,  
lo hace porque ella da paz,  
Gatúbela vuelve la oscuridad  
un dulce hogar donde siempre estás.`,

  `Eda suena a primavera,  
a verdad que me ordena,  
luz que nunca espera,  
y razón que me serena.`,

  `Eda,  
tu risa me enreda,  
tu mirada rompe murallas,  
eres la pausa más queda.`
];

// ========== CLAVES LOCALSTORAGE ==========
const KEY_DATE = "poema_del_dia_fecha_v2";
const KEY_POEM = "poema_del_dia_texto_v2";
const KEY_DATE_IMG = "imagen_del_dia_fecha";
const KEY_IMG = "imagen_del_dia_src";

// ========== FECHA ==========
function getToday() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / (1000 * 60 * 60 * 24));
}

// ========== POEMA DEL DÍA ==========
function obtenerPoemaDelDia() {
  const hoy = getToday();
  const fechaGuardada = localStorage.getItem(KEY_DATE);
  const poemaGuardado = localStorage.getItem(KEY_POEM);

  if (fechaGuardada === hoy && poemaGuardado) {
    return poemaGuardado;
  }

  const indice = getDayOfYear() % poemas.length;
  const poemaDelDia = poemas[indice];

  localStorage.setItem(KEY_DATE, hoy);
  localStorage.setItem(KEY_POEM, poemaDelDia);

  return poemaDelDia;
}

// ========== IMÁGENES ==========
const imagenes = [
  "img/batman.png",
  "img/k.png",
  "img/luna.png",
  "img/mlp.png"
];

function obtenerImagenDelDia() {
  const hoy = getToday();
  const fechaGuardada = localStorage.getItem(KEY_DATE_IMG);
  const imgGuardada = localStorage.getItem(KEY_IMG);

  if (fechaGuardada === hoy && imgGuardada) {
    return imgGuardada;
  }

  const imgRandom = imagenes[Math.floor(Math.random() * imagenes.length)];
  localStorage.setItem(KEY_DATE_IMG, hoy);
  localStorage.setItem(KEY_IMG, imgRandom);

  return imgRandom;
}

// ========== PRINCIPAL ==========
document.addEventListener("DOMContentLoaded", () => {
  const flap = document.getElementById("flap");
  const letter = document.getElementById("letter");
  const openBtn = document.getElementById("openBtn");
  const fechaEl = document.getElementById("fecha");
  const poemaEl = document.getElementById("poema");
  const notaEl = document.getElementById("nota");
  const musica = document.getElementById("musica");
  const titleEl = document.querySelector(".title");
  const imagenEl = document.getElementById("imagenDia");

  let isOpen = false;

  // Cargar contenido
  if (fechaEl) fechaEl.textContent = getToday();
  if (poemaEl) poemaEl.textContent = obtenerPoemaDelDia();
  if (notaEl) notaEl.textContent = "vuelve mañana <3";
  if (imagenEl) imagenEl.src = obtenerImagenDelDia();

  // Música
  async function reproducirMusica() {
    if (!musica) return;
    musica.volume = 0.4;
    try {
      await musica.play();
    } catch (e) {
      console.log("🎵 Música bloqueada por el navegador");
    }
  }

  function detenerMusica() {
    if (!musica) return;
    musica.pause();
    musica.currentTime = 0;
  }

  // Abrir carta
  function abrirCarta(e) {
    e.preventDefault();
    e.stopPropagation();

    if (isOpen) return;

    flap.classList.add("open");
    letter.classList.add("open");
    openBtn.classList.add("hidden");
    if (titleEl) titleEl.classList.add("hidden");

    isOpen = true;
    reproducirMusica();

    const batContainer = document.getElementById("batContainer");
    if (batContainer) {
      batContainer.classList.remove("hidden");
      batContainer.classList.add("show");

      setTimeout(() => {
        batContainer.classList.remove("show");
        batContainer.classList.add("hidden");
      }, 2000);
    }
  }

  // Cerrar carta
  function cerrarCarta(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!isOpen) return;

    flap.classList.remove("open");
    letter.classList.remove("open");
    openBtn.classList.remove("hidden");
    if (titleEl) titleEl.classList.remove("hidden");

    detenerMusica();
    isOpen = false;
  }

  // Eventos (SOLO CLICK)
  if (openBtn) openBtn.addEventListener("click", abrirCarta);
  if (letter) letter.addEventListener("click", cerrarCarta);
});
