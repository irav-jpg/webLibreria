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
        renderizar(musica.slice(0, 10), 'contenedor-musica');
        renderizar(libros.slice(0, 10), 'contenedor-libros');
        renderizar(objetos.slice(0, 10), 'contenedor-objetos');
        console.log("Carga finalizada con éxito.");

        // Activamos la marquesina
        activarEfectoMarquee();

    } catch (error) {
        console.error("Error en la carga de carruseles:", error);
        alert("Error al cargar los productos. Asegúrate de usar 'Live Server' en VS Code.");
    }
}

/**
 * Función para generar el HTML de las tarjetas e inyectarlas al DOM.
 * Solo genera tarjetas puras para que el bucle continuo no se desfase.
 */
function renderizar(lista, idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    // Abrimos la pista interna que se va a mover de forma horizontal
    let htmlTemporal = `<div class="marquee-track-custom">`;

    lista.forEach(item => {
        const creador = item.autor || item.marca || "Varios";
        
        htmlTemporal += `
            <div class="card-item shadow-sm"
            onclick='mostrarDetalles(${JSON.stringify(item)})'>

                <div class="card-media">
                    <img src="${item.imagen}" alt="${item.titulo}" onerror="this.src='https://via.placeholder.com/200x200?text=Error'">
                    
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

    htmlTemporal += `</div>`; // Cerramos la pista interna .marquee-track-custom sin añadir botones extra

    contenedor.innerHTML = htmlTemporal;
}

/**
 * Función encargada de dar el efecto de marquesina infinita automatizada
 */
function activarEfectoMarquee() {
    const carruseles = document.querySelectorAll(".carousel-netflix");

    carruseles.forEach(carrusel => {
        const track = carrusel.querySelector(".marquee-track-custom");
        if (!track) return;

        // 1. Duplicamos las tarjetas internas para crear la ilusión de bucle infinito
        track.innerHTML += track.innerHTML;

        let position = 0;
        let animationId;

        function animate() {
            position -= 0.8; // Velocidad de desplazamiento ajustable

            const mitadAncho = track.scrollWidth / 2;

            // Si ya se desplazó todo el bloque original completo, reinicia a cero limpiamente
            if (Math.abs(position) >= mitadAncho) {
                position = 0;
            }

            track.style.transform = `translateX(${position}px)`;
            animationId = requestAnimationFrame(animate);
        }

        // Encendemos la animación
        animate();

        // 3. Eventos para pausar la animación al pasar el mouse encima
        carrusel.addEventListener("mouseenter", () => {
            cancelAnimationFrame(animationId);
        });

        carrusel.addEventListener("mouseleave", () => {
            animate();
        });
    });
}

/**
 * Función para mostrar la descripción al "picarle" a la tarjeta.
 */
function mostrarDetalles(item) {
    const creador = item.autor || item.marca || "Varios";
    
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