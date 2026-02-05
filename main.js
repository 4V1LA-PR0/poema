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

  `Si dices “vas con la otra”,  
yo sonrío y no me agota,  
porque yo estaré con la otra forma  
de quererte que siempre reconforta.`,

  `Batman no lucha solo,  
lo hace porque ella da paz,  
Gatúbela vuelve la oscuridad  
un dulce hogar que siempre voy a estar.`,

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

// ========== FUNCIONES FECHA ==========
function getToday() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// ========== FUNCIONES POEMA ==========
function obtenerPoemaDelDia() {
  const hoy = getToday();
  const fechaGuardada = localStorage.getItem(KEY_DATE);
  const poemaGuardado = localStorage.getItem(KEY_POEM);

  if (fechaGuardada === hoy && poemaGuardado) {
    return poemaGuardado;
  }

  const diaDelAno = getDayOfYear();
  const indice = diaDelAno % poemas.length;
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

// ========== CÓDIGO PRINCIPAL ==========
document.addEventListener("DOMContentLoaded", function() {
  const flap = document.getElementById("flap");
  const letter = document.getElementById("letter");
  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");
  const fechaEl = document.getElementById("fecha");
  const poemaEl = document.getElementById("poema");
  const notaEl = document.getElementById("nota");
  const musica = document.getElementById("musica");
  const titleEl = document.querySelector(".title"); 
  const imagenEl = document.getElementById("imagenDia");

  let isOpen = false;

  // Cargar poema del día
  const poemaDelDia = obtenerPoemaDelDia();
  const hoy = getToday();
  
  if (fechaEl) fechaEl.textContent = ` ${hoy}`;
  if (poemaEl) poemaEl.textContent = poemaDelDia;
  if (notaEl) notaEl.textContent = "vuelva mañana <3";

  // Cargar imagen del día
  if (imagenEl) {
    const imagenDelDia = obtenerImagenDelDia();
    imagenEl.src = imagenDelDia;
  }

  // Abrir carta al hacer click
  openBtn.addEventListener("click", () => {
    if (!isOpen) {
      flap.classList.add("open");
      letter.classList.add("open");
      openBtn.classList.add("hidden");
      closeBtn.classList.remove("hidden");
      if (titleEl) titleEl.classList.add("hidden");
      isOpen = true;

      // Reproducir música
      if (musica) {
        reproducirMusica();
      }
    }
  });

  // Cerrar carta al hacer click
  closeBtn.addEventListener("click", () => {
    if (isOpen) {
      flap.classList.remove("open");
      letter.classList.remove("open");
      openBtn.classList.remove("hidden");
      closeBtn.classList.add("hidden");
      if (titleEl) titleEl.classList.remove("hidden");
      isOpen = false;

      // Detener música
      if (musica) {
        musica.pause();
        musica.currentTime = 0;
        console.log("⏹️ Música detenida");
      }
    }
  });

  // Función para reproducir música
  async function reproducirMusica() {
    if (!musica) return;
    if (musica.readyState === 0) {
      console.log("No se encontró archivo de música");
      return;
    }
    musica.volume = 0.4;
    try {
      await musica.play();
      console.log("✅ Música iniciada");
    } catch (err) {
      console.log("ℹ️ Música no disponible:", err.message);
    }
  }
});
