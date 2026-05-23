/* =========================
   VARIABLES GLOBALES
========================= */

let albumesOriginales = [];


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

        renderizarAlbumes(albumes);

    } catch(error){

        console.error(
            "Error cargando álbumes:",
            error
        );

    }

}


/* =========================
   RENDERIZAR ÁLBUMES
========================= */

function renderizarAlbumes(lista){

    const contenedor =
        document.getElementById(
            "contenedor-albumes-grid"
        );

    let html = "";

    lista.forEach(album => {

        html += `
        
            <div class="card-item shadow-sm">

                <div class="card-media">

                    <img
                        src="${album.imagen}"
                        alt="${album.titulo}"
                    >

                    <div class="card-description-overlay">

                        <p>
                            ${album.descripcion}
                        </p>

                    </div>

                </div>

                <div class="card-info">

                    <h6>
                        ${album.titulo}
                    </h6>

                    <p class="text-muted small mb-1">
                        ${album.autor}
                    </p>

                    <p class="small mb-1">
                        ${album.genero}
                    </p>

                    <p class="fw-bold text-magenta">
                        $${album.precio}
                    </p>

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

    const genero =
        document.getElementById(
            "filtro-genero"
        ).value
        ||
        document.getElementById(
            "filtro-genero-mobile"
        ).value;

    const precio =
        Number(
            document.getElementById(
                "filtro-precio"
            ).value
        );

    const anio =
        Number(
            document.getElementById(
                "filtro-anio"
            ).value
        );

    const busqueda =
        document
        .getElementById(
            "buscador-albumes"
        )
        .value
        .toLowerCase();

    let filtrados =
        albumesOriginales.filter(album => {

        return (

            (genero === ""
            ||
            album.genero === genero)

            &&

            (album.precio <= precio)

            &&

            (album.anio <= anio)

            &&

            (
                album.titulo
                .toLowerCase()
                .includes(busqueda)
            )

        );

    });

    renderizarAlbumes(filtrados);

}


/* =========================
   EVENTOS ESCRITORIO
========================= */

document
.getElementById("filtro-genero")
.addEventListener("change", function(){

    document.getElementById(
        "filtro-genero-mobile"
    ).value = this.value;

    aplicarFiltros();

});


document
.getElementById("filtro-precio")
.addEventListener("input", function(){

    document.getElementById(
        "precio-valor"
    ).textContent = this.value;

    document.getElementById(
        "filtro-precio-mobile"
    ).value = this.value;

    document.getElementById(
        "precio-valor-mobile"
    ).textContent = this.value;

    aplicarFiltros();

});


document
.getElementById("filtro-anio")
.addEventListener("input", function(){

    document.getElementById(
        "anio-valor"
    ).textContent = this.value;

    document.getElementById(
        "filtro-anio-mobile"
    ).value = this.value;

    document.getElementById(
        "anio-valor-mobile"
    ).textContent = this.value;

    aplicarFiltros();

});


/* =========================
   EVENTOS MOBILE
========================= */

document
.getElementById("filtro-genero-mobile")
.addEventListener("change", function(){

    document.getElementById(
        "filtro-genero"
    ).value = this.value;

    aplicarFiltros();

});


document
.getElementById("filtro-precio-mobile")
.addEventListener("input", function(){

    document.getElementById(
        "precio-valor-mobile"
    ).textContent = this.value;

    document.getElementById(
        "filtro-precio"
    ).value = this.value;

    document.getElementById(
        "precio-valor"
    ).textContent = this.value;

    aplicarFiltros();

});


document
.getElementById("filtro-anio-mobile")
.addEventListener("input", function(){

    document.getElementById(
        "anio-valor-mobile"
    ).textContent = this.value;

    document.getElementById(
        "filtro-anio"
    ).value = this.value;

    document.getElementById(
        "anio-valor"
    ).textContent = this.value;

    aplicarFiltros();

});


/* =========================
   BUSCADOR
========================= */

document
.getElementById("buscador-albumes")
.addEventListener(
    "input",
    aplicarFiltros
);


/* =========================
   INICIAR
========================= */

document.addEventListener(
    "DOMContentLoaded",
    cargarAlbumes
);