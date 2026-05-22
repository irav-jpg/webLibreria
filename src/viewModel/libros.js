/* =========================
   VARIABLES GLOBALES
========================= */

let librosOriginales = [];


/* =========================
   CARGAR LIBROS
========================= */

async function cargarLibros() {

    try {

        const respuesta = await fetch('../data/libros.json');

        const libros = await respuesta.json();

        librosOriginales = libros;

        renderizarLibros(libros);

    } catch(error){

        console.error("Error cargando libros:", error);

    }

}


/* =========================
   RENDERIZAR LIBROS
========================= */

function renderizarLibros(lista){

    const contenedor = document.getElementById("contenedor-libros-grid");

    let html = "";

    lista.forEach(libro => {

        html += `
        
            <div class="card-item shadow-sm">

                <div class="card-media">

                    <img src="${libro.imagen}" alt="${libro.titulo}">

                    <div class="card-description-overlay">
                        <p>${libro.descripcion}</p>
                    </div>

                </div>

                <div class="card-info">

                    <h6>${libro.titulo}</h6>

                    <p class="text-muted small mb-1">
                        ${libro.autor}
                    </p>

                    <p class="small mb-1">
                        ${libro.editorial}
                    </p>

                    <p class="fw-bold text-magenta">
                        $${libro.precio}
                    </p>

                </div>

            </div>

        `;

    });

    contenedor.innerHTML = html;

}


/* =========================
   FILTRAR LIBROS
========================= */

function aplicarFiltros(){

    const categoria =
        document.getElementById("filtro-categoria").value;

    const editorial =
        document.getElementById("filtro-editorial").value;

    const idioma =
        document.getElementById("filtro-idioma").value;

    const precio =
        Number(document.getElementById("filtro-precio").value);

    const busqueda =
        document
        .getElementById("buscador-libros")
        .value
        .toLowerCase();

    let filtrados = librosOriginales.filter(libro => {

        return (

            (categoria === "" ||
             libro.categoria === categoria)

            &&

            (editorial === "" ||
             libro.editorial === editorial)

            &&

            (idioma === "" ||
             libro.idioma === idioma)

            &&

            (libro.precio <= precio)

            &&
            (
                libro.titulo
                .toLowerCase()
                .includes(busqueda)
            )
        );

    });

    renderizarLibros(filtrados);

}


/* =========================
   EVENTOS
========================= */

document
.getElementById("filtro-categoria")
.addEventListener("change", aplicarFiltros);


document
.getElementById("filtro-editorial")
.addEventListener("change", aplicarFiltros);


document
.getElementById("filtro-idioma")
.addEventListener("change", aplicarFiltros);


document
.getElementById("filtro-precio")
.addEventListener("input", function(){

    document.getElementById("precio-valor")
    .textContent = this.value;

    aplicarFiltros();

});

document
.getElementById("buscador-libros")
.addEventListener(
    "input",
    aplicarFiltros
);


/* =========================
   INICIAR
========================= */

document.addEventListener(
    "DOMContentLoaded",
    cargarLibros
);