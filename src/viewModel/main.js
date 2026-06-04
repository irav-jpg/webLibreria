/* =========================
CARGAR CARRUSELES
========================= */

async function cargarCarruseles() {

    try {

        const [resMusica, resLibros, resObjetos] =
            await Promise.all([

                fetch("../data/musica.json"),
                fetch("../data/libros.json"),
                fetch("../data/objetos.json")

            ]);

        const musica = await resMusica.json();

        const libros = await resLibros.json();

        const objetos = await resObjetos.json();

        renderizar(
            musica.slice(0,10),
            "contenedor-musica"
        );

        renderizar(
            libros.slice(0,10),
            "contenedor-libros"
        );

        renderizar(
            objetos.slice(0,10),
            "contenedor-objetos"
        );

        activarEfectoMarquee();

    }

    catch(error){

        console.error(error);

    }

}


/* =========================
RENDERIZAR TARJETAS
========================= */

function renderizar(lista,idContenedor){

    const contenedor =
        document.getElementById(
            idContenedor
        );

    if(!contenedor)return;

    let html=
        `<div class="marquee-track-custom">`;

    lista.forEach(item=>{

        const creador =
            item.autor ||
            item.marca ||
            "Varios";

        html+=`

        <div
            class="card-item shadow-sm"
        >

            <div
                class="card-media"
            >

                <img
                    src="${item.imagen}"
                    alt="${item.titulo}"
                >

                <div
                    class="card-description-overlay"
                >

                    <p>

                        ${
                            item.descripcion ||
                            "Sin descripción"
                        }

                    </p>

                </div>

            </div>

            <div class="card-info">

                <h6>

                    ${item.titulo}

                </h6>

                <p
                    class="
                    text-muted
                    small
                    mb-1
                    "
                >

                    ${creador}

                </p>

                <p
                    class="
                    fw-bold
                    text-magenta
                    "
                >

                    $${item.precio}

                </p>

            </div>

        </div>

        `;

    });

    html+=`</div>`;

    contenedor.innerHTML =
        html;

}


/* =========================
MARQUESINA
========================= */

function activarEfectoMarquee(){

document
.querySelectorAll(
".carousel-netflix"
)

.forEach(carrusel=>{

const track=
carrusel.querySelector(
".marquee-track-custom"
);

if(!track)return;

track.innerHTML+=
track.innerHTML;

let pos=0;

function mover(){

pos-=0.8;

if(
Math.abs(pos)
>=
track.scrollWidth/2
){

pos=0;

}

track.style.transform=
`translateX(${pos}px)`;

requestAnimationFrame(
mover
);

}

mover();

});

}


/* =========================
MOSTRAR DETALLES
========================= */

function mostrarDetalles(item){

if(!item)return;

const creador=
item.autor||
item.marca||
"Varios";

alert(

`📦 PRODUCTO

${item.titulo}

Por:
${creador}

${item.descripcion||

"Sin descripción"}

Precio:
$${item.precio}

`

);

}


/* =========================
BUSCADOR GLOBAL
========================= */

let productosGlobales=[];

async function cargarBuscadorGlobal(){

try{

const [
m,
l,
o

]=await Promise.all([

fetch(
"../data/musica.json"
),

fetch(
"../data/libros.json"
),

fetch(
"../data/objetos.json"
)

]);

const musica=
await m.json();

const libros=
await l.json();

const objetos=
await o.json();

productosGlobales=[

...libros.map(
x=>(
{
...x,
tipo:"Libro"
}
)
),

...musica.map(
x=>(
{
...x,
tipo:"Música"
}
)
),

...objetos.map(
x=>(
{
...x,
tipo:"Objeto"
}
)
)

];

iniciarBusqueda();

}

catch(e){

console.error(e);

}

}


function iniciarBusqueda(){

const input=
document.getElementById(
"buscador-global"
);

const resultados=
document.getElementById(
"resultados-busqueda"
);

if(
!input||
!resultados
)return;


input.addEventListener(
"input",
()=>{

const texto=
input.value
.trim()
.toLowerCase();

if(!texto){

resultados.innerHTML="";

resultados.style.display=
"none";

return;

}

const encontrados=

productosGlobales

.filter(p=>

(p.titulo||"")
.toLowerCase()
.includes(texto)

||

(p.autor||"")
.toLowerCase()
.includes(texto)

||

(p.marca||"")
.toLowerCase()
.includes(texto)

||

(p.categoria||"")
.toLowerCase()
.includes(texto)

)

.slice(0,10);


resultados.innerHTML="";


encontrados.forEach(item=>{

const div=
document.createElement(
"div"
);

div.className=
"resultado-item";

div.innerHTML=`

<img
src="${item.imagen}"
style="
width:70px;
height:70px;
object-fit:cover;
border-radius:10px;
">

<div>

<h6>

${item.titulo}

</h6>

<small>

${item.tipo}

</small>

<div>

$${item.precio}

</div>

</div>

`;

div.onclick=()=>{

mostrarDetalles(
item
);

resultados.style.display=
"none";

};

resultados.appendChild(
div
);

});

resultados.style.display=

encontrados.length

?

"block"

:

"none";

}

);

document
.addEventListener(
"click",
e=>{

if(
!e.target.closest(
".search-group"
)
){

resultados.style.display=
"none";

}

}

);

}


/* =========================
INICIAR
========================= */

document.addEventListener(
"DOMContentLoaded",
()=>{

cargarCarruseles();

cargarBuscadorGlobal();

}
);