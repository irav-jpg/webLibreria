
let objetosOriginales = [];

async function cargarObjetos() {
     try {

        const respuesta =
            await fetch('../data/objetos.json');

        const objetos =
            await respuesta.json();

        objetosOriginales =
            objetos;

        const busquedaGlobal =
            localStorage.getItem(
                "busquedaGlobal"
            );

        if (busquedaGlobal) {

            document.getElementById(
                "buscador-objetos"
            ).value = busquedaGlobal;

            aplicarFiltros();

            localStorage.removeItem(
                "busquedaGlobal"
            );

        } else {

            renderizarObjetos(
                objetos
            );

        }

        actualizarContadorCarrito();

    } catch(error){

        console.error(
            "Error cargando objetos:",
            error
        );

    }
}

function renderizarObjetos(lista){
    const contenedor = document.getElementById("contenedor-objetos-grid");
    if (!contenedor) return;

    let html = "";
    lista.forEach(objeto => {
        html += `
            <div class="card-item shadow-sm">
                <div class="card-media">
                    <img src="${objeto.imagen}" alt="${objeto.titulo}">
                    <div class="card-description-overlay">
                        <p>${objeto.descripcion}</p>
                    </div>
                </div>
                <div class="card-info">
                    <h6 class="fw-bold">${objeto.titulo}</h6>
                    <p class="small mb-1 text-muted">${objeto.categoria}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <p class="fw-bold text-magenta m-0">$${objeto.precio}</p>
                        <button class="btn btn-sm btn-agregar px-3" 
                                onclick="agregarAlCarrito('${objeto.id}', '${objeto.titulo.replace(/'/g, "\\'")}', ${objeto.precio})">
                            <i class="bi bi-bag-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    contenedor.innerHTML = html;
}

function aplicarFiltros(){
    const categoria = document.getElementById("filtro-categoria").value || document.getElementById("filtro-categoria-mobile").value;
    const precio = Number(document.getElementById("filtro-precio").value);
    const busqueda = document.getElementById("buscador-objetos").value.toLowerCase();

    let filtrados = objetosOriginales.filter(objeto => {
        return (categoria === "" || objeto.categoria === categoria) &&
               (objeto.precio <= precio) &&
               (objeto.titulo.toLowerCase().includes(busqueda) || objeto.categoria.toLowerCase().includes(busqueda));
    });
    renderizarObjetos(filtrados);
}

document.getElementById("filtro-categoria").addEventListener("change", function(){ document.getElementById("filtro-categoria-mobile").value = this.value; aplicarFiltros(); });
document.getElementById("filtro-precio").addEventListener("input", function(){ document.getElementById("precio-valor").textContent = this.value; document.getElementById("filtro-precio-mobile").value = this.value; document.getElementById("precio-valor-mobile").textContent = this.value; aplicarFiltros(); });

document.getElementById("filtro-categoria-mobile").addEventListener("change", function(){ document.getElementById("filtro-categoria").value = this.value; aplicarFiltros(); });
document.getElementById("filtro-precio-mobile").addEventListener("input", function(){ document.getElementById("precio-valor-mobile").textContent = this.value; document.getElementById("filtro-precio").value = this.value; document.getElementById("precio-valor").textContent = this.value; aplicarFiltros(); });

document.getElementById("buscador-objetos").addEventListener("input", aplicarFiltros);

document.addEventListener(
    "DOMContentLoaded",
    cargarObjetos
);

const buscadorNavbar = document.getElementById("buscador-navbar");

if (buscadorNavbar) {

    buscadorNavbar.addEventListener("input", function () {

        document.getElementById(
            "buscador-objetos"
        ).value = this.value;

        aplicarFiltros();

    });

}