/**
 * Función principal para cargar todos los carruseles de la página Bok.
 * Utiliza fetch para obtener los datos de los archivos JSON en la carpeta data.
 */
async function cargarCarruseles() {
    console.log("Iniciando carga de datos desde JSON...");

    try {
        // Cargar los tres archivos JSON de forma paralela para mayor velocidad
        const [resMusica, resLibros, resObjetos] = await Promise.all([
            fetch('../data/musica.json'),
            fetch('../data/libros.json'),
            fetch('../data/objetos.json')
        ]);

        // Verificar que las respuestas sean correctas (Status 200)
        if (!resMusica.ok || !resLibros.ok || !resObjetos.ok) {
            throw new Error("No se pudo encontrar uno o más archivos JSON. Verifica las rutas.");
        }

        const musica = await resMusica.json();
        const libros = await resLibros.json();
        const objetos = await resObjetos.json();

        // Renderizar cada categoría en su respectivo contenedor
        renderizar(musica, 'contenedor-musica');
        renderizar(libros, 'contenedor-libros');
        renderizar(objetos, 'contenedor-objetos');

        console.log("Carga finalizada con éxito.");

    } catch (error) {
        console.error("Error en la carga de carruseles:", error);
        alert("Error al cargar los productos. Asegúrate de usar 'Live Server' en VS Code.");
    }
}

/**
 * Función para generar el HTML de las tarjetas e inyectarlas al DOM.
 */
function renderizar(lista, idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    let htmlTemporal = "";

    lista.forEach(item => {
        const creador = item.autor || item.marca || "Varios";
        
        htmlTemporal += `
            <div class="card-item shadow-sm">
                <!-- Contenedor de la imagen y la descripción extendida -->
                <div class="card-media">
                    <img src="${item.imagen}" alt="${item.titulo}" onerror="this.src='https://via.placeholder.com/200x200?text=Error'">
                    
                    <!-- Esta es la extensión del objeto con la descripción -->
                    <div class="card-description-overlay">
                        <p>${item.descripcion || "Sin descripción disponible."}</p>
                    </div>
                </div>

                <div class="card-info">
                    <h6>${item.titulo}</h6>
                    <p class="text-muted small mb-1">${creador} (${item.anio})</p>
                    <p class="fw-bold text-magenta mb-0">$${Number(item.precio).toFixed(2)}</p>
                </div>
            </div>
        `;
    });
    contenedor.innerHTML = htmlTemporal;
}

/**
 * Función para mostrar la descripción al "picarle" a la tarjeta.
 * Se activa mediante el evento onclick definido en renderizar.
 */
function mostrarDetalles(item) {
    const creador = item.autor || item.marca || "Varios";
    
    // Mostramos la descripción y detalles completos en una ventana emergente
    alert(
        `📖 DETALLES DEL PRODUCTO\n\n` +
        `Título: ${item.titulo}\n` +
        `Por: ${creador} (${item.anio})\n\n` +
        `DESCRIPCIÓN:\n${item.descripcion || "Sin descripción disponible."}\n\n` +
        `Precio: $${Number(item.precio).toFixed(2)}`
    );
}

// Escuchar cuando el HTML esté listo para ejecutar la lógica
document.addEventListener('DOMContentLoaded', cargarCarruseles);