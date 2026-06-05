productosGlobales = [];

async function cargarProductos() {

    const respuestas = await Promise.all([

        fetch("../data/libros.json"),
        fetch("../data/musica.json"),
        fetch("../data/objetos.json")

    ]);

    const datos = await Promise.all(
        respuestas.map(r => r.json())
    );

    productosGlobales = [

        ...datos[0].map(
            x => ({
                ...x,
                categoria: "Libros"
            })
        ),

        ...datos[1].map(
            x => ({
                ...x,
                categoria: "Música"
            })
        ),

        ...datos[2].map(
            x => ({
                ...x,
                categoria: "Objetos"
            })
        )

    ];
}

function mostrarResultados(texto) {

    const panel =
        document.getElementById(
            "resultados-busqueda"
        );

    if (!panel) return;

    if (!texto.trim()) {

        panel.innerHTML = "";

        panel.style.display =
            "none";

        return;

    }

    const resultados =
        productosGlobales
            .filter(p =>

                p.titulo
                    ?.toLowerCase()
                    .includes(
                        texto.toLowerCase()
                    )

            )
            .slice(0, 8);

    panel.innerHTML =
        resultados
            .map(p => `


    <div
        class="resultado-item"
        onclick="irAProducto('${p.categoria}','${p.titulo}')">
        <img
        src="${p.imagen}"
        >

        <div>

        <h6>${p.titulo}</h6>

        <p>${p.categoria}</p>

        </div>

    </div>

`)

            .join("");

    panel.style.display =
        resultados.length
            ? "block"
            : "none";
}

document.addEventListener(
    "DOMContentLoaded",

    async () => {

        await cargarProductos();

        const buscador =
            document.getElementById(
                "buscador-global"
            );

        if (!buscador) return;

        buscador.addEventListener(
            "keyup",

            (e) => {

                mostrarResultados(
                    e.target.value
                );

            });

    });

function irAProducto(categoria, titulo) {
    localStorage.setItem(
        "busquedaGlobal",
        titulo
    );

    switch (categoria) {

        case "Libros":
            window.location.href = "libros.html";
            break;

        case "Música":
            window.location.href = "musica.html";
            break;

        case "Objetos":
            window.location.href = "objetos.html";
            break;
    }
}