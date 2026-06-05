function cerrarSesion() {
    localStorage.removeItem('usuarioNombre');
    localStorage.removeItem('usuarioRol');
    window.location.href = 'index.html';
}

function verificarUsuario() {
    const nombre = localStorage.getItem('usuarioNombre');
    const menuUsuario = document.getElementById('menu-usuario');
    const btnLogin = document.getElementById('btn-login');
    const textoUsuario = document.getElementById('texto-usuario');

    if (!menuUsuario || !btnLogin) return;

    if (nombre) {
        
        menuUsuario.style.display = 'block'; 
        btnLogin.style.display = 'none';    
        if (textoUsuario) textoUsuario.textContent = nombre;
    } else {
        
        menuUsuario.style.display = 'none'; 
        btnLogin.style.display = 'block';   
    }
}

document.addEventListener('DOMContentLoaded', verificarUsuario);