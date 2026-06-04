/* =========================
   VARIABLES GLOBALES
========================= */
let albumesOriginales = [];
// Inicializamos el carrito leyendo el localStorage
//let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

/* =========================
   CARGAR ÁLBUMES
========================= */
async function cargarAlbumes() {
    try {

        const respuesta =
            await fetch('../data/musica.json');

        const albumes =
            await respuesta.json();

        albumesOriginales = albumes;

        const busquedaGlobal =
            localStorage.getItem(
                "busquedaGlobal"
            );

        if (busquedaGlobal) {

            document.getElementById(
                "buscador-albumes"
            ).value = busquedaGlobal;

            aplicarFiltros();

            localStorage.removeItem(
                "busquedaGlobal"
            );

        } else {

            renderizarAlbumes(albumes);

        }

        actualizarContadorCarrito();

    } catch(error){

        console.error(
            "Error cargando albumes:",
            error
        );

    }

}

/* =========================
   LÓGICA DEL CARRITO
========================= */


/* =========================
   RENDERIZAR ÁLBUMES
========================= */
function renderizarAlbumes(lista){
    const contenedor = document.getElementById("contenedor-albumes-grid");
    if (!contenedor) return;

    let html = "";
    lista.forEach(album => {
        html += `
            <div class="card-item shadow-sm">
                <div class="card-media">
                    <img src="${album.imagen}" alt="${album.titulo}">
                    <div class="card-description-overlay">
                        <p>${album.descripcion}</p>
                    </div>
                </div>
                <div class="card-info">
                    <h6>${album.titulo}</h6>
                    <p class="text-muted small mb-1">${album.autor}</p>
                    <p class="small mb-1">${album.genero}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <p class="fw-bold text-magenta m-0">$${album.precio}</p>
                        <button class="btn btn-sm btn-agregar px-3" 
                                onclick="agregarAlCarrito('${album.id}', '${album.titulo}', ${album.precio})">
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
   FILTRAR ÁLBUMES
========================= */
function aplicarFiltros(){
    const genero = document.getElementById("filtro-genero").value || document.getElementById("filtro-genero-mobile").value;
    const precio = Number(document.getElementById("filtro-precio").value);
    const anio = Number(document.getElementById("filtro-anio").value);
    const busqueda = document.getElementById("buscador-albumes").value.toLowerCase();

    let filtrados = albumesOriginales.filter(album => {
        return (genero === "" || album.genero === genero) &&
               (album.precio <= precio) &&
               (album.anio <= anio) &&
               (album.titulo.toLowerCase().includes(busqueda));
    });
    renderizarAlbumes(filtrados);
}

/* =========================
   EVENTOS
========================= */
document.getElementById("filtro-genero").addEventListener("change", function(){ document.getElementById("filtro-genero-mobile").value = this.value; aplicarFiltros(); });
document.getElementById("filtro-precio").addEventListener("input", function(){ document.getElementById("precio-valor").textContent = this.value; document.getElementById("filtro-precio-mobile").value = this.value; document.getElementById("precio-valor-mobile").textContent = this.value; aplicarFiltros(); });
document.getElementById("filtro-anio").addEventListener("input", function(){ document.getElementById("anio-valor").textContent = this.value; document.getElementById("filtro-anio-mobile").value = this.value; document.getElementById("anio-valor-mobile").textContent = this.value; aplicarFiltros(); });

document.getElementById("filtro-genero-mobile").addEventListener("change", function(){ document.getElementById("filtro-genero").value = this.value; aplicarFiltros(); });
document.getElementById("filtro-precio-mobile").addEventListener("input", function(){ document.getElementById("precio-valor-mobile").textContent = this.value; document.getElementById("filtro-precio").value = this.value; document.getElementById("precio-valor").textContent = this.value; aplicarFiltros(); });
document.getElementById("filtro-anio-mobile").addEventListener("input", function(){ document.getElementById("anio-valor-mobile").textContent = this.value; document.getElementById("filtro-anio").value = this.value; document.getElementById("anio-valor").textContent = this.value; aplicarFiltros(); });

document.getElementById("buscador-albumes").addEventListener("input", aplicarFiltros);

/* =========================
   INICIAR
========================= */
document.addEventListener(
     "DOMContentLoaded",
    cargarAlbumes
);

/* =========================
   BUSCADOR NAVBAR
========================= */

const buscadorNavbar = document.getElementById("buscador-navbar");

if (buscadorNavbar) {

    buscadorNavbar.addEventListener("input", function () {

        document.getElementById(
            "buscador-albumes"
        ).value = this.value;

        aplicarFiltros();

    });

}