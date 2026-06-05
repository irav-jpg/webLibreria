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

        html += `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm border-0 rounded-4">
                    <div class="card-body">
                        <h5 class="fw-bold">${item.titulo || 'Sin nombre'}</h5>
                        <p class="text-muted small">Precio: $${precio}</p>
                        <p class="small">Cantidad: ${cantidad}</p>
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