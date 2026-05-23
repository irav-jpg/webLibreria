/* =========================
   VARIABLES GLOBALES
========================= */

let objetosOriginales = [];


/* =========================
   CARGAR OBJETOS
========================= */

async function cargarObjetos() {

    try {

        const respuesta =
            await fetch('../data/objetos.json');

        const objetos =
            await respuesta.json();

        objetosOriginales = objetos;

        renderizarObjetos(objetos);

    } catch(error){

        console.error(
            "Error cargando objetos:",
            error
        );

    }

}


/* =========================
   RENDERIZAR OBJETOS
========================= */

function renderizarObjetos(lista){

    const contenedor =
        document.getElementById(
            "contenedor-objetos-grid"
        );

    let html = "";

    lista.forEach(objeto => {

        html += `
        
            <div class="card-item shadow-sm">

                <div class="card-media">

                    <img
                        src="${objeto.imagen}"
                        alt="${objeto.titulo}"
                    >

                    <div class="card-description-overlay">

                        <p>
                            ${objeto.descripcion}
                        </p>

                    </div>

                </div>

                <div class="card-info">

                    <h6>
                        ${objeto.titulo}
                    </h6>

                    <p class="small mb-1">

                        ${objeto.categoria}

                    </p>

                    <p class="fw-bold text-magenta">

                        $${objeto.precio}

                    </p>

                </div>

            </div>

        `;

    });

    contenedor.innerHTML = html;

}


/* =========================
   FILTRAR OBJETOS
========================= */

function aplicarFiltros(){

    const categoria =
        document.getElementById(
            "filtro-categoria"
        ).value
        ||
        document.getElementById(
            "filtro-categoria-mobile"
        ).value;

    const precio =
        Number(
            document.getElementById(
                "filtro-precio"
            ).value
        );

    const busqueda =
        document
        .getElementById(
            "buscador-objetos"
        )
        .value
        .toLowerCase();

    let filtrados =
        objetosOriginales.filter(objeto => {

        return (

            (categoria === ""
            ||
            objeto.categoria === categoria)

            &&

            (objeto.precio <= precio)

            &&

            (

                objeto.titulo
                .toLowerCase()
                .includes(busqueda)

                ||

                objeto.categoria
                .toLowerCase()
                .includes(busqueda)

            )

        );

    });

    renderizarObjetos(filtrados);

}


/* =========================
   EVENTOS ESCRITORIO
========================= */

document
.getElementById("filtro-categoria")
.addEventListener("change", function(){

    document.getElementById(
        "filtro-categoria-mobile"
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


/* =========================
   EVENTOS MOBILE
========================= */

document
.getElementById("filtro-categoria-mobile")
.addEventListener("change", function(){

    document.getElementById(
        "filtro-categoria"
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


/* =========================
   BUSCADOR
========================= */

document
.getElementById("buscador-objetos")
.addEventListener(
    "input",
    aplicarFiltros
);


/* =========================
   INICIAR
========================= */

document.addEventListener(
    "DOMContentLoaded",
    cargarObjetos
);