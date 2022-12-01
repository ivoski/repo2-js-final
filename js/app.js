


// EVENTOS Y DOM
let carrito = JSON.parse(localStorage.getItem("carrito")) || []

const contenedorCarrito = document.querySelector(`#carrito-contenedor`)
const contadorCarrito = document.querySelector(`#contadorCarrito`)
const contadorPrecioTotal = document.querySelector(`#precioTotal`)


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        renderCarrito()
    }
})




let productos = []



// Agregar productos al carrito 
const agregarAlCarrito = (id, data) => {
    const producto = data.find((item) => item.id === id)
    carrito.push(producto)

    Swal.fire({
        icon: 'success',
        title: 'El producto fue agregado exitosamente',
        toast: true,
        timer: 1000,
        showConfirmButton: false,
        position: 'bottom-left'
    })

    saveLocal()
    console.log(carrito)
    renderCarrito()
}




const renderCarrito = () => {
    renderListadoCarrito()
    renderCantidadCarrito()
    renderTotalCarrito()
}

const renderListadoCarrito = () => {
    contenedorCarrito.innerHTML = ''

    carrito.forEach((producto) => {

        const div = document.createElement('div')
        console.log(producto)
        div.className = "productoEnCarrito"
        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            
        `

        contenedorCarrito.append(div)
    })
}

//Contador total de carrito

const renderCantidadCarrito = () => {
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))
    contadorCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}

const renderTotalCarrito = () => {
    let total = 0

    carrito.forEach((producto) => {
        total += producto.precio
    })

    contadorPrecioTotal.innerText = total
}

// Set item
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};


// vaciar carrito (Realizado con Sweet Alert)

const btnVaciar = document.querySelector(`#vaciarCarrito`)

btnVaciar.addEventListener('click', () => {
    Swal.fire({
        title: '¿Está seguro?',
        text: 'Esta accion no es reversible',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Estoy seguro',
        cancelButtonText: 'Dejame Pensarlo'
    }).then((result) => {

        if (result.isConfirmed) {
            Swal.fire({
                title: 'Correctamente Eliminado',
                icon: 'success',
                confirmButtonText: 'Volver a Comprar',
                timer: 1500
            })

            carrito.length = 0
            renderCarrito()

        }
    }
    )
})


// Fetch

const contenedorProductos = document.querySelector(`#contenedor-productos`)
fetch('../js/stock.json')
    .then(response => response.json())
    .then((data) => {
        console.log(data)
        data.forEach((producto) => {

            const div = document.createElement('div')
            div.className = 'producto'

            div.innerHTML = `
                <img src=${producto.img} alt="">
                <h3>${producto.nombre}</h3>
                <p>${producto.desc}</p>
                <p class="precioProducto">Precio: $${producto.precio}</p>
                `
            const button = document.createElement('button')
            button.className = "boton-agregar"
            button.innerHTML = `Agregar <i class="fas fa-shopping-cart"></i>`

            button.addEventListener('click', () => {
                agregarAlCarrito(producto.id, data)
            })

            div.append(button)


            contenedorProductos.append(div)
        })
    });

// Realice las promesas antes de la clase de Fetch, por lo que tengo entendido el Fetch contiene una promesa por eso la deje comentada.