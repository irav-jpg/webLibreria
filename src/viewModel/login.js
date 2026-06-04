document.getElementById('loginForm').addEventListener('submit', function(event) {
    
    event.preventDefault();

    const emailInput = document.getElementById('emailInput').value;
    const passwordInput = document.getElementById('passwordInput').value;

    fetch('../data/users.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo de usuarios.");
            }
            return response.json();
        })
        .then(data => {
            const usuarioEncontrado = data.usuarios.find(user => 
                user.correo === emailInput && user.contrasena === passwordInput
            );

            if (usuarioEncontrado) {
                if (usuarioEncontrado.rol === 'admin') {
                    alert('¡Bienvenido Administrador!');
                    window.location.href = 'dashboard/dashboard_libros.html'; 
                } else if (usuarioEncontrado.rol === 'cliente') {
                    localStorage.setItem('usuarioNombre', usuarioEncontrado.nombre);
                    alert(`¡Hola de nuevo, ${usuarioEncontrado.nombre}!`);
                    window.location.href = 'index.html'; 
                }
            } else {
                alert('Correo electrónico o contraseña incorrectos. Intenta de nuevo.');
            }
        }) 
        .catch(error => { 
            console.error('Error:', error);
            alert('Hubo un problema al conectar con el sistema de usuarios.');
        });
});