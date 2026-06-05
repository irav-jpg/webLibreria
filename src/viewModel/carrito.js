document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedor-carrito');
    const totalElemento = document.getElementById('total-carrito');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (!contenedor) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="text-center w-100">Tu carrito está vacío.</p>';
        return;
    }

    let html = '';
    let total = 0;

    carrito.forEach(item => {
        const precio = Number(item.precio) || 0;
        const cantidad = Number(item.cantidad) || 0;
        total += (precio * cantidad);

        // Se reemplazó el texto estático por un grupo de botones para la cantidad
        html += `
            <div class="col-md-6 col-lg-4 mb-3">
                <div class="card h-100 shadow-sm border-0 rounded-4">
                    <div class="card-body">
                        <h5 class="fw-bold">${item.titulo || 'Sin nombre'}</h5>
                        <p class="text-muted small mb-2">Precio: $${precio}</p>
                        
                        <div class="d-flex align-items-center mb-3">
                            <span class="small me-2">Cantidad:</span>
                            <div class="btn-group btn-group-sm" role="group">
                                <button type="button" class="btn btn-outline-secondary" onclick="cambiarCantidad('${item.id}', -1)">-</button>
                                <button type="button" class="btn btn-outline-secondary" disabled>${cantidad}</button>
                                <button type="button" class="btn btn-outline-secondary" onclick="cambiarCantidad('${item.id}', 1)">+</button>
                            </div>
                        </div>

                        <button class="btn btn-outline-danger btn-sm" onclick="eliminarDelCarrito('${item.id}')">
                            <i class="bi bi-trash"></i> Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    contenedor.innerHTML = html;
    if (totalElemento) totalElemento.textContent = `$${total}`;
});

function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload(); 
}

//Para sumar o restar cantidades
function cambiarCantidad(id, cambio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoIndex = carrito.findIndex(item => item.id === id);

    if (productoIndex !== -1) {
        carrito[productoIndex].cantidad += cambio;

        // Si la cantidad llega a 0 (o menos), eliminamos el producto del carrito automáticamente
        if (carrito[productoIndex].cantidad <= 0) {
            carrito = carrito.filter(item => item.id !== id);
        }

        // Guardamos los cambios y recargamos la página para actualizar la vista
        localStorage.setItem('carrito', JSON.stringify(carrito));
        location.reload(); 
    }
}