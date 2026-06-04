// viewModel/navbar.js
document.addEventListener('DOMContentLoaded', () => {
    // Si ya existe un nav (por error), lo quitamos
    const navExistente = document.querySelector('nav');
    if (navExistente) navExistente.remove();

    const navHTML = `
    <nav class="navbar navbar-custom shadow-sm">
        <div class="container-fluid px-lg-5"> 
            <div class="row w-100 align-items-center g-0">
                <div class="col-auto d-flex align-items-center">
                    <a class="navbar-brand me-4" href="index.html">Bajo el Membrillo</a>
                </div>
                <div class="col px-md-4">
                    <div class="search-group">
                        <i class="bi bi-search"></i>
                        <input type="text" class="form-control" placeholder="Buscar...">
                    </div>
                </div>
                <div class="col-auto d-flex align-items-center gap-4">
                    <div class="dropdown" id="menu-usuario" style="display: none;">
                        <a href="#" class="nav-link-custom dropdown-toggle" data-bs-toggle="dropdown">
                            <i class="bi bi-person-circle"></i>
                            <span id="texto-usuario">Usuario</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" onclick="cerrarSesion()">Cerrar sesión</a></li>
                        </ul>
                    </div>
                    <a href="iniciar_sesion.html" id="btn-login" class="nav-link-custom">
                        <i class="bi bi-person-circle"></i>
                        <span>Iniciar sesión</span>
                    </a>
                    <a href="carrito.html" class="nav-link-custom position-relative">
                        <i class="bi bi-bag"></i>
                        <span id="contador-carrito" class="cart-badge badge rounded-pill bg-dark">0</span>
                    </a>
                </div>
            </div>
        </div>
    </nav>`;
    
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.dispatchEvent(new Event('navbarCargado'));
});