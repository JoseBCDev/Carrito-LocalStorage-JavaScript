const carrito = document.querySelector('#carrito');


const listaCarrito = document.querySelector('#lista-carrito tbody');


const vaciarCarrito = document.querySelector('#vaciar-carrito');



const listaCursos = document.querySelector('#lista-cursos');


let articulosCarrito = [];

cargarEventListener();

function cargarEventListener() {
    //AGREGAR CURSO
    listaCursos.addEventListener('click', agregarCurso);

    //ELIMINAR CURSO
    carrito.addEventListener('click', eliminarCurso);


    //VACIAR CURSO
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    });
}

//FUNCIONES

function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);

    }

}

function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        idCurso = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== idCurso);
    }
    carritoHTML();
}

function leerDatosCurso(curso) {
    //CREAR OBJETO
    const infoCurso = {
        imagen: curso.querySelector('.imagen-curso').src,
        titulo: curso.querySelector('.info-card h4').textContent,
        precio: curso.querySelector('.info-card .precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //RETORNA EL OBJETO ACTUALIZADO
            } else {
                return curso; //RETORNA EL OBJETO NO DUPLICADO
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //GUARDAR LA INFORMACION EN EL ARREGLO SI NINGUNO SE REPITE
        articulosCarrito = [...articulosCarrito, infoCurso];
    }



    carritoHTML();

}

//MOSTRAR LAS COMPRAS EN EL CARRITO

function carritoHTML() {

    //LIMPIAR HTML
    limpiarHTML();

    //CREAR EL HTML EN EL TBODY
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        const {
            titulo,
            precio,
            cantidad,
            imagen,
            id
        } = curso;
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        
        `;
        //AGREGANDO AL TBODY
        listaCarrito.appendChild(row);
    });



}


function limpiarHTML() {
    //1ERA FORMA DE ELIMINAR PERO MAS LENTA
    //listaCarrito.innerHTML = '';

    //2DA FORMA MAS RAPIDO DE ELIMINAR HTML
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}