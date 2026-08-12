const books = [
  { code: "BB-53", title: "Desarrollo de aplicaciones con Android", author: "Manuel Torres", course: "moviles", type: "basica", topics: "android aplicaciones móviles desarrollo" },
  { code: "BB-04", title: "Arquitectura limpia: guía para especialistas en la estructura y el diseño de software", author: "Robert C. Martin", course: "moviles", type: "basica", topics: "arquitectura limpia software clean architecture" },
  { code: "BB-10", title: "Ingeniería de software", author: "Guillermo Pantaleo", course: "moviles", type: "basica", topics: "ingeniería desarrollo software" },
  { code: "BB-06", title: "UML 2.5: iniciación, ejemplos y ejercicios corregidos", author: "Laurent Debrauwer y Fien Van der Heyde", course: "moviles", type: "basica", topics: "uml modelado diseño" },
  { code: "BB-13", title: "UML y patrones", author: "Craig Larman", course: "moviles", type: "basica", topics: "uml patrones orientación objetos" },
  { code: "BB-18", title: "Código limpio", author: "Robert C. Martin", course: "moviles", type: "complementaria", topics: "clean code programación calidad" },
  { code: "BB-02", title: "El limpiador de código: código de conducta para programadores profesionales", author: "Robert C. Martin", course: "moviles", type: "complementaria", topics: "programación profesional buenas prácticas" },
  { code: "BB-12", title: "Patrones de diseño", author: "Erich Gamma", course: "moviles", type: "complementaria", topics: "patrones diseño software" },
  { code: "BB-15", title: "Calidad en el desarrollo de software", author: "Guillermo Pantaleo", course: "moviles", type: "complementaria", topics: "calidad pruebas software" },
  { code: "BB-61", title: "Análisis y diseño de sistemas", author: "Kenneth E. Kendall", course: "moviles", type: "complementaria", topics: "análisis diseño sistemas" },

  { code: "BB-27", title: "Administración hardware de un sistema informático", author: "Arturo Francisco Ramos Pérez", course: "servicios", type: "basica", topics: "hardware mantenimiento computadoras" },
  { code: "BB-28", title: "Administración software de un sistema informático", author: "Arturo Francisco Ramos Pérez", course: "servicios", type: "basica", topics: "software administración sistemas" },
  { code: "BB-58", title: "Mantenimiento y reparación de computadoras", author: "Cultural", course: "servicios", type: "basica", topics: "mantenimiento reparación hardware" },
  { code: "BB-41", title: "Instala, administra, securiza y virtualiza entornos Linux", author: "Antonio Ramos Varón", course: "servicios", type: "basica", topics: "linux servidores seguridad virtualización" },
  { code: "BB-65", title: "Sistemas informáticos", author: "Isabel M.ª Jiménez Cumbreras", course: "servicios", type: "basica", topics: "sistemas informática infraestructura" },
  { code: "BB-30", title: "CCNA Exploration", author: "Héctor Delgado", course: "servicios", type: "complementaria", topics: "redes cisco conectividad" },
  { code: "BB-52", title: "Hacking & Cracking", author: "Luis Angulo Aguirre", course: "servicios", type: "complementaria", topics: "seguridad hacking ciberseguridad" },
  { code: "BB-91", title: "Creación de un sitio web con PHP y MySQL", author: "David Roldán", course: "servicios", type: "complementaria", topics: "hosting web php mysql producción" },
  { code: "BB-89", title: "Desarrollo y programación en entornos web", author: "Gutiérrez y López", course: "servicios", type: "complementaria", topics: "web desarrollo servidores" },

  { code: "BB-70", title: "Fundamentos de bases de datos", author: "Abraham Silberschatz", course: "datos", type: "basica", topics: "fundamentos sql relacional" },
  { code: "BB-71", title: "Sistemas de bases de datos: un enfoque práctico para diseño, implementación y gestión", author: "Thomas Connolly y Carolyn Begg", course: "datos", type: "basica", topics: "diseño implementación gestión bases de datos" },
  { code: "BB-69", title: "Bases de datos relacionales y modelado de datos", author: "José Manuel Piñeiro Gómez", course: "datos", type: "basica", topics: "modelo relacional normalización" },
  { code: "BB-75", title: "Desarrollo de bases de datos: casos prácticos desde el análisis a la implementación", author: "Dolores Cuadra Fernández", course: "datos", type: "basica", topics: "análisis implementación sql" },
  { code: "BB-76", title: "Diseño y programación de bases de datos", author: "Ángel Cobo", course: "datos", type: "basica", topics: "diseño programación sql" },
  { code: "BB-82", title: "Programación de bases de datos relacionales", author: "Javier Martínez López y Amalia Gallegos Ruiz", course: "datos", type: "basica", topics: "sql programación relacional" },
  { code: "BB-68", title: "Bases de datos", author: "Antonio Postigo Palacios", course: "datos", type: "complementaria", topics: "bases de datos fundamentos" },
  { code: "BB-72", title: "Gestión de bases de datos", author: "Iván López Montalbán", course: "datos", type: "complementaria", topics: "administración gestión sql" },
  { code: "BB-78", title: "Introducción a las bases de datos: el modelo relacional", author: "Silvia Acid Carrillo", course: "datos", type: "complementaria", topics: "modelo relacional introducción" },
  { code: "BB-49", title: "Big Data con Python: recolección, almacenamiento y proceso", author: "Rafael Caballero y Enrique Martín", course: "datos", type: "complementaria", topics: "big data python almacenamiento analítica" },
  { code: "BB-79", title: "Analítica de datos: la guía definitiva de análisis de Big Data para empresas", author: "Herbert Jones", course: "datos", type: "complementaria", topics: "analítica big data data warehouse" }
];

const labels = {
  moviles: "Aplicaciones móviles",
  servicios: "Servicios de TI",
  datos: "Bases de datos"
};

const state = { search: "", course: "all", type: "all" };
const grid = document.querySelector("#book-grid");
const search = document.querySelector("#search");
const typeFilter = document.querySelector("#type-filter");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");

const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function cardTemplate(book) {
  const typeLabel = book.type === "basica" ? "Básica" : "Complementaria";
  return `
    <article class="book-card">
      <div class="book-card-header">
        <span class="code">${book.code}</span>
        <span class="type-badge ${book.type}">${typeLabel}</span>
      </div>
      <h3>${book.title}</h3>
      <p class="author">${book.author} · s. f.</p>
      <div class="book-footer">
        <span class="course-tag">${labels[book.course]}</span>
        <span class="course-dot ${book.course}" aria-hidden="true"></span>
      </div>
    </article>`;
}

function render() {
  const term = normalize(state.search.trim());
  const filtered = books.filter((book) => {
    const haystack = normalize(`${book.code} ${book.title} ${book.author} ${book.topics}`);
    return (!term || haystack.includes(term)) &&
      (state.course === "all" || book.course === state.course) &&
      (state.type === "all" || book.type === state.type);
  });

  grid.innerHTML = filtered.map(cardTemplate).join("");
  resultCount.textContent = filtered.length;
  document.querySelector("#hero-total").textContent = String(books.length).padStart(2, "0");
  emptyState.hidden = filtered.length !== 0;
  grid.hidden = filtered.length === 0;
}

function setCourse(course) {
  state.course = course;
  document.querySelectorAll("[data-course]").forEach((button) => {
    const active = button.dataset.course === course;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  render();
}

function clearFilters() {
  state.search = "";
  state.type = "all";
  search.value = "";
  typeFilter.value = "all";
  setCourse("all");
}

search.addEventListener("input", (event) => { state.search = event.target.value; render(); });
typeFilter.addEventListener("change", (event) => { state.type = event.target.value; render(); });
document.querySelectorAll("[data-course]").forEach((button) => button.addEventListener("click", () => setCourse(button.dataset.course)));
document.querySelectorAll("[data-jump-filter]").forEach((button) => button.addEventListener("click", () => {
  setCourse(button.dataset.jumpFilter);
  document.querySelector("#catalogo").scrollIntoView({ behavior: "smooth" });
}));
document.querySelector("#clear-filters").addEventListener("click", clearFilters);
document.querySelector("#empty-clear").addEventListener("click", clearFilters);
document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    search.focus();
  }
  if (event.key === "Escape" && document.activeElement === search) {
    search.value = "";
    state.search = "";
    render();
  }
});

render();
