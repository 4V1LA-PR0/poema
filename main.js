// ========== POEMAS ==========

const poemas = [
  `Como la Princesa Luna,
aprendiste a amar en silencio,
a cuidar sueños ajenos
mientras escondes los tuyos.
La noche te entiende,
porque tu corazón brilla
sin pedirle permiso al sol.
Amarte sería caminar despacio
para no despertar la magia
que vive en ti.`,

  `Como Kitty,
tu ternura parece pequeña,
pero cabe en todo mi pecho.
No haces ruido al llegar,
solo te acomodas,
y de pronto todo está bien.
Hay amores que no se gritan,
se ronronean cerca del corazón.`,

  `En tu mundo, el amor sí es magia.
Como en My Little Pony,
la amistad se vuelve promesa
y el cariño, refugio.
Tú no cambias el mundo con fuerza,
lo haces con luz,
y sin darte cuenta,
te conviertes en el lugar
donde siempre quiero volver.`,

  `Si tú dices “vas con la otra”,
yo sonrío y no me importa.
Porque yo estaré con la otra,pero
la otra forma de quererte
que siempre te reconforta.
No es celos ni dramas,
es solo que me encanta
ver tu risa, tu mirada,
y quedarme cerca
de tu ternura que me encanta..`,

  `Batman no lucha solo por la ciudad,
lo hace porque sabe que ella da paz.
Gatúbela no teme a la oscuridad,
la vuelve dulce, la vuelve hogar de verdad.
Juntos no buscan salvar la nación,
se buscan en secreto, en cada rincón.
Así te pienso, sin miedo ni prisa,
como quien halla amor en la noche que brilla.`,

  `Eda suena a primavera,
a verdad sin condena.
Eda es luz que no espera,
es razón que me ordena.
Cuando digo tu nombre en voz baja,
todo en mí se serena.`,


 `Eda,
si supieras la manera
en que tu risa me enreda,
cómo tu mirada quiebra
las murallas que me quedan.
Eda,
eres la pausa más bella
en esta vida que acelera.`
];

// Claves en localStorage
const KEY_DATE = "poema_del_dia_fecha_v2";
const KEY_POEM = "poema_del_dia_texto_v2";

// ========== FUNCIONES ==========

function getToday() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function obtenerPoemaDelDia() {
  const hoy = getToday();
  const fechaGuardada = localStorage.getItem(KEY_DATE);
  const poemaGuardado = localStorage.getItem(KEY_POEM);


  // Si es día nuevo, elegir poema random
  const poemaRandom = poemas[Math.floor(Math.random() * poemas.length)];
  
  localStorage.setItem(KEY_DATE, hoy);
  localStorage.setItem(KEY_POEM, poemaRandom);
  
  return poemaRandom;
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

  // Abrir carta al hacer click
  openBtn.addEventListener("click", () => {
    if (!isOpen) {
      flap.classList.add("open");
      letter.classList.add("open");
      openBtn.classList.add("hidden");
      closeBtn.classList.remove("hidden");
      if (titleEl) titleEl.classList.add("hidden");
      isOpen = true;

      // Reproducir música (si existe)
      reproducirMusica();
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
        musica.currentTime = 0; // reinicia al inicio
        console.log("⏹️ Música detenida");
      }
    }
  });

  // Función para reproducir música
  const reproducirMusica = async () => {
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
  };
});

// ========== IMÁGENES ==========

const imagenes = [
  "img/batman.png",
  "img/k.png",
  "img/luna.png",
  "img/mlp.png"
];

// Claves en localStorage
const KEY_DATE_IMG = "imagen_del_dia_fecha";
const KEY_IMG = "imagen_del_dia_src";

function obtenerImagenDelDia() {
  const hoy = getToday();
  const fechaGuardada = localStorage.getItem(KEY_DATE_IMG);
  const imgGuardada = localStorage.getItem(KEY_IMG);

  if (fechaGuardada === hoy && imgGuardada) {
    return imgGuardada;
  }

  // Si es día nuevo, elegir imagen random
  const imgRandom = imagenes[Math.floor(Math.random() * imagenes.length)];
  
  localStorage.setItem(KEY_DATE_IMG, hoy);
  localStorage.setItem(KEY_IMG, imgRandom);
  
  return imgRandom;
}
document.addEventListener("DOMContentLoaded", function() {
  const imagenEl = document.getElementById("imagenDia");
  const imagenDelDia = obtenerImagenDelDia();
  if (imagenEl) imagenEl.src = imagenDelDia;
});
