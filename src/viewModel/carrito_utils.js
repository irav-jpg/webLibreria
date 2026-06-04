function getCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function agregarAlCarrito(id, titulo, precio) {
    let carrito = getCarrito();
    const productoExistente = carrito.find(item => item.id === id);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ id, titulo, precio, cantidad: 1 });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    // Opcional: Feedback visual
    alert(titulo + " añadido al carrito");
}

function actualizarContadorCarrito() {
    const carrito = getCarrito();
    const total = carrito.reduce((sum, item) => sum + (Number(item.cantidad) || 0), 0);
    const badge = document.querySelector('.cart-badge');
    if (badge) badge.textContent = total;
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
});