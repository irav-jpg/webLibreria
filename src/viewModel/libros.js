/* =========================
   VARIABLES GLOBALES
========================= */
let librosOriginales = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

/* =========================
   CARGAR LIBROS
========================= */
async function cargarLibros() {
    try {
        const respuesta = await fetch('../data/libros.json');
        const libros = await respuesta.json();
        librosOriginales = libros;
        renderizarLibros(libros);
        actualizarContadorCarrito();
    } catch(error){
        console.error("Error cargando libros:", error);
    }
}

/* =========================
   LÓGICA CARRITO
========================= */


/* =========================
   RENDERIZAR LIBROS (ESTILO AESTHETIC)
========================= */
function renderizarLibros(lista){
    const contenedor = document.getElementById("contenedor-libros-grid");
    if (!contenedor) return;

    let html = "";
    lista.forEach(libro => {
        html += `
            <div class="card-item shadow-sm">
                <div class="card-media">
                    <img src="${libro.imagen}" alt="${libro.titulo}">
                    <div class="card-description-overlay">
                        <p>${libro.descripcion || 'Sin descripción'}</p>
                    </div>
                </div>
                <div class="card-info">
                    <h6 class="fw-bold">${libro.titulo}</h6>
                    <p class="text-muted small mb-1">${libro.autor}</p>
                    <p class="small mb-1">${libro.editorial}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <p class="fw-bold text-magenta m-0">$${libro.precio}</p>
                        <button class="btn btn-sm btn-agregar px-3" 
                                onclick="agregarAlCarrito('${libro.id}', '${libro.titulo}', ${libro.precio})">
                            <i class="bi bi-bag-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    contenedor.innerHTML = html;
}

/* =========================
   FILTRAR LIBROS Y EVENTOS
========================= */
function aplicarFiltros(){
    const categoria = document.getElementById("filtro-categoria").value || document.getElementById("filtro-categoria-mobile").value;
    const editorial = document.getElementById("filtro-editorial").value || document.getElementById("filtro-editorial-mobile").value;
    const idioma = document.getElementById("filtro-idioma").value || document.getElementById("filtro-idioma-mobile").value;
    
    let precio = window.innerWidth < 992 ? Number(document.getElementById("filtro-precio-mobile").value) : Number(document.getElementById("filtro-precio").value);
    const busqueda = document.getElementById("buscador-libros").value.toLowerCase();

    let filtrados = librosOriginales.filter(libro => {
        return (categoria === "" || libro.categoria === categoria) &&
               (editorial === "" || libro.editorial === editorial) &&
               (idioma === "" || libro.idioma === idioma) &&
               (libro.precio <= precio) &&
               (libro.titulo.toLowerCase().includes(busqueda));
    });
    renderizarLibros(filtrados);
}

// [Mantén tus event listeners aquí...]
document.getElementById("filtro-categoria").addEventListener("change", function(){ document.getElementById("filtro-categoria-mobile").value = this.value; aplicarFiltros(); });
document.getElementById("filtro-editorial").addEventListener("change", function(){ document.getElementById("filtro-editorial-mobile").value = this.value; aplicarFiltros(); });
document.getElementById("filtro-idioma").addEventListener("change", function(){ document.getElementById("filtro-idioma-mobile").value = this.value; aplicarFiltros(); });
document.getElementById("filtro-precio").addEventListener("input", function(){ document.getElementById("precio-valor").textContent = this.value; document.getElementById("filtro-precio-mobile").value = this.value; document.getElementById("precio-valor-mobile").textContent = this.value; aplicarFiltros(); });

document.getElementById("filtro-categoria-mobile").addEventListener("change", function(){ document.getElementById("filtro-categoria").value = this.value; aplicarFiltros(); });
document.getElementById("filtro-editorial-mobile").addEventListener("change", function(){ document.getElementById("filtro-editorial").value = this.value; aplicarFiltros(); });
document.getElementById("filtro-idioma-mobile").addEventListener("change", function(){ document.getElementById("filtro-idioma").value = this.value; aplicarFiltros(); });
document.getElementById("filtro-precio-mobile").addEventListener("input", function(){ document.getElementById("precio-valor-mobile").textContent = this.value; document.getElementById("filtro-precio").value = this.value; document.getElementById("precio-valor").textContent = this.value; aplicarFiltros(); });

document.getElementById("buscador-libros").addEventListener("input", aplicarFiltros);

/* =========================
   INICIAR
========================= */
document.addEventListener("DOMContentLoaded", cargarLibros);

/* =========================
   BUSCADOR NAVBAR
========================= */

const buscadorNavbar = document.getElementById("buscador-navbar");

if (buscadorNavbar) {
    buscadorNavbar.addEventListener("input", function () {

        const buscadorLocal =
            document.getElementById("buscador-libros");

        buscadorLocal.value = this.value;

        aplicarFiltros();

    });
}