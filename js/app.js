
// function loginadmin(){
//     let nombreadmin = prompt ("Ingrese su nombre de administrador")
//     if (nombreadmin == "Ivoski"){
//         alert("¡Hola, Ivoski!");
//         sacarturno()
//     }else{
//         alert("You not Ivoski, Get out here!");
//     }

// }

// function sacarturno(){
//     for (let i = 1; i <= 5; i++) {
//         let ingresarNombre = prompt ("Ingresar Nombre para sacar un turno");
//         alert("Turno N°"+i+"Nombre: "+ingresarNombre);
//     }
// }

// loginadmin();

// class Producto {
//     constructor(nombre, precio) {
//         this.nombre  = nombre;
//         this.precio  = parseFloat(precio);
//         this.stock = true;
//     }
//     sumaIva() {
//         return(this.precio * 1.21);
//     }
// }

// const productos = [];
// productos.push(new Producto("Shampoo", 370));
// productos.push(new Producto("Polvo para textura", 400));
// productos.push(new Producto("Tintura", 700));

// for (const producto of productos){
//     console.log("------------")
//     console.log(producto.nombre)
//     console.log(producto.precio)
// }


// EVENTOS Y DOM
let carrito = JSON.parse(localStorage.getItem("carrito")) || []

const contenedorProductos = document.querySelector(`#contenedor-productos`)
const contenedorCarrito = document.querySelector(`#carrito-contenedor`)
const contadorCarrito = document.querySelector(`#contadorCarrito`)
const contadorPrecioTotal = document.querySelector(`#precioTotal`)


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        renderCarrito()
    }
})

const SP =  [
    { id: 5, nombre: "Navaja para afeitar", tipo: "Afeitado", desc: "Navaja para un afeitado masculino", precio: 2499, img: '../img/nvj.jpg' },
    { id: 6, nombre: "Espuma para afeitar", tipo: "Afeitado", desc: "Espuma para un afeitado suave", precio: 890, img: '../img/esp.jpg' },
]

const pedirProductos =  () => {
    return new Promise ( (resolve, reject)  => {
        setTimeout (() =>{
            resolve(SP)
        }), 2500
    })

}

let productos = []

const renderProductos = (Arr) => {
    stockProductos.forEach((producto) => {

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
            agregarAlCarrito(producto.id)
        })
    
        div.append(button)
    
        contenedorProductos.append(div)
    })
}

pedirProductos ()
    .then ((res)    =>{
        productos = res 
        renderProductos (productos)
    })


// Agregar productos al carrito 
const agregarAlCarrito = (id) => {
    const producto = stockProductos.find( (item) => item.id === id )
    carrito.push(producto)
    
    Swal.fire({
        icon:'success',
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

    carrito.forEach((producto) =>{
        total += producto.precio
    })

    contadorPrecioTotal.innerText = total
}

// Set item
const saveLocal = () => {
localStorage.setItem("carrito",JSON.stringify(carrito));
};


// vaciar carrito (Realizado con Sweet Alert)

const btnVaciar = document.querySelector(`#vaciarCarrito`)

btnVaciar.addEventListener('click', () => {
    Swal.fire ({
        title: '¿Está seguro?',
        text: 'Esta accion no es reversible',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Estoy seguro',
        cancelButtonText: 'Dejame Pensarlo'
    }).then((result)     => {       

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
