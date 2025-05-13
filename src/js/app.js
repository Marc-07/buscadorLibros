// ==========================
// VARIABLES Y ELEMENTOS DOM
// ==========================

const titulo = document.querySelector("#titulo");
const autor = document.querySelector("#autor");
const genero = document.querySelector("#genero");
const precioMin = document.querySelector("#precio-min");
const precioMax = document.querySelector("#precio-max");
const resultado = document.querySelector("#resultado"); // Contenedor de resultados

const max = new Date().getFullYear();
const min = max - 10;

// Objeto con los criterios de búsqueda
const datosBusqueda = {
    genero : "",
    titulo : "",
    autor : "",
    precioMin : "",
    precioMax : "",
}

// ==========================
// EVENTOS
// ==========================

document.addEventListener("DOMContentLoaded", () => {
    mostrarLibros(libros); // Muestra todos los libros al cargar la página
});

genero.addEventListener("change", (e) => {
    datosBusqueda.genero = e.target.value;
    filtrarLibro();
});

titulo.addEventListener("blur", (e) => {
    datosBusqueda.titulo = e.target.value;
    filtrarLibro();
});

autor.addEventListener("blur", (e) => {
    datosBusqueda.autor = e.target.value;
    filtrarLibro();
});

precioMin.addEventListener("change", (e) => {
    datosBusqueda.precioMin = e.target.value;
    filtrarLibro();
});

precioMax.addEventListener("change", (e) => {
    datosBusqueda.precioMax = e.target.value;
    filtrarLibro();
});

// ==========================
// FUNCIONES PRINCIPALES
// ==========================

// Muestra los libros en pantalla
const mostrarLibros = (libros) => {
    limpiarHTML(); // Elimina resultados anteriores

    libros.forEach(libro => {
        const { titulo, autor, genero, precio } = libro;

        const libroHTML = document.createElement("p");
        libroHTML.classList.add("text-lg", "text-gray-800", "border-b", "border-gray-300", "pb-3", "mb-4");

        libroHTML.textContent = `${titulo} ${autor}  Género: ${genero} Precio: $${precio}`;
        resultado.appendChild(libroHTML);
    });
};

// Limpia los resultados anteriores del contenedor
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// Muestra mensaje cuando no hay resultados
function noResultado () {
    limpiarHTML(); 

    const noResultado = document.createElement("div");
    noResultado.textContent = "No se encontraron resultados";
    noResultado.classList.add("bg-red-500", "text-white", "p-2", "rounded", "mt-4");
    resultado.appendChild(noResultado);
}

// ==========================
// FUNCIONES DE FILTRADO
// ==========================

function filtrarLibro() {
    const resultado = libros
        .filter(filtrarGenero)
        .filter(filtrarTitulo)
        .filter(filtrarAutor)
        .filter(filtrarPrecioMin)
        .filter(filtrarPrecioMax);

    if (resultado.length) {
        mostrarLibros(resultado);
    } else {
        noResultado();
    }
}

function filtrarGenero(libro) {
    const { genero } = datosBusqueda;
    if (genero) {
        return libro.genero === genero;
    }
    return libro;
}

function filtrarTitulo(libro) {
    const { titulo } = datosBusqueda;
    if (titulo) {
        return libro.titulo === titulo;
    }
    return libro;
}

function filtrarAutor(libro) {
    const { autor } = datosBusqueda;
    if (autor) {
        return libro.autor === autor;
    }
    return libro;
}

function filtrarPrecioMin(libro) {
    const { precioMin } = datosBusqueda;
    if (precioMin) {
        return libro.precio >= precioMin;
    }
    return libro;
}

function filtrarPrecioMax(libro) {
    const { precioMax } = datosBusqueda;
    if (precioMax) {
        return libro.precio <= precioMax;
    }
    return libro;
}
