async function cargarDatos(ruta) {

  try {

    const response = await fetch(ruta);

    return await response.json();

  } catch (error) {

    console.error(error);

    return [];
  }
}

function crearCarrusel(idContenedor, datos) {

  const contenedor = document.getElementById(idContenedor);

  let currentIndex = 0;

  const visibles = 3;

  let html = `

    <div class="netflix-wrapper">

      <button class="btn-slider prev">
        ◀
      </button>

      <div class="netflix-container">

        <div class="netflix-track">
  `;

  datos.forEach((item) => {

    html += `

      <div class="netflix-card">

        <div class="card text-center p-3">

          <img
            src="${item.imagen}"
            class="img-fluid rounded mb-3"
            alt="${item.titulo}"
          >

          <h5 class="card-title">
            ${item.titulo}
          </h5>

          ${
            item.autor
              ? `<p class="text-muted">${item.autor}</p>`
              : ''
          }

          ${
            item.artista
              ? `<p class="text-muted">${item.artista}</p>`
              : ''
          }

          <p class="card-precio">
            $${item.costo} MXN
          </p>

        </div>

      </div>
    `;
  });

  html += `

        </div>

      </div>

      <button class="btn-slider next">
        ▶
      </button>

    </div>
  `;

  contenedor.innerHTML = html;

  const track = contenedor.querySelector('.netflix-track');

  const nextBtn = contenedor.querySelector('.next');

  const prevBtn = contenedor.querySelector('.prev');

  const total = datos.length;

  function actualizarCarrusel() {

    const porcentaje = 100 / visibles;

    track.style.transform =
      \`translateX(-\${currentIndex * porcentaje}%)\`;
  }

  nextBtn.addEventListener('click', () => {

    if (currentIndex < total - visibles) {

      currentIndex++;

      actualizarCarrusel();
    }
  });

  prevBtn.addEventListener('click', () => {

    if (currentIndex > 0) {

      currentIndex--;

      actualizarCarrusel();
    }
  });
}

async function iniciar() {

  const libros = await cargarDatos('../data/libros.json');

  const musica = await cargarDatos('../data/musica.json');

  const objetos = await cargarDatos('../data/objetos.json');

  crearCarrusel('libros-container', libros);

  crearCarrusel('musica-container', musica);

  crearCarrusel('objetos-container', objetos);
}

iniciar();