const formulario = document.getElementById('formulario')
const inputNombre = document.getElementById('nombre')
const inputApellido = document.getElementById('apellido')
const titulo = document.getElementById('titulo')
const divProductos = document.getElementById('divProductos')

formulario.onsubmit = (e) => {
    e.preventDefault()
    const infoUsuario = {
        nombre: inputNombre.value,
        apellido: inputApellido.value
    }
    localStorage.setItem('infoUsuario', JSON.stringify(infoUsuario))
    console.log(infoUsuario)
    formulario.remove()
    titulo.innerText = `Bienvenido ${infoUsuario.nombre} ${infoUsuario.apellido}`
}
//click sobre el boton ingresar
formulario.onsubmit = (e) => {

}
//mirar si en storage existe infoUsuario
const infoUsuario = JSON.parse(localStorage.getItem('infoUsuario'))
if (infoUsuario) {
    formulario.remove()
    titulo.innerText = `Bienvenido ${infoUsuario.nombre} ${infoUsuario.apellido}`
}
console.log(infoUsuario);
//clase
class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.stock = stock
    

    }

}
const productos = [
    new Producto(1, 'muzzarela', 200, 100),
    new Producto(2, 'pepperoni', 360, 100),
    new Producto(3, 'fugazzeta', 500, 100),
    new Producto(4, 'margarita', 560, 100),
    new Producto(5, 'anchoas', 200, 100),
    new Producto(6, 'jamon y morrones', 360, 100),
    new Producto(7, 'picante', 500, 100),
    new Producto(8, 'empanadas', 560, 100)
]
//console.log(productos);
productos.forEach(prod => {
    divProductos.innerHTML = divProductos.innerHTML + ` <div class="card cardProducto">
    <div class="card-body">
<h5 class="card-title">${prod.nombre}</h5>
<p class="card-text">${prod.precio}</p>
<button id=${prod.id} class="btn btn-primary">AGREGAR</button>
</div>
</div>`
})
console.log(productos);

const carritos = []
//const botonesAgregar = document.getElementsByClassName('btn-primary')
//console.log(botonesAgregar);
const botonesAgregar = document.querySelectorAll('.btn-primary')
const arrayBotones = Array.from(botonesAgregar)
arrayBotones.forEach(boton => {
    boton.onclick = () => {
        const producto = productos.find(prod => prod.id === parseInt(boton.id))
        const prodCarrito = {
            id:producto.id,
            nombre:producto.nombre,
            precio: producto.precio,
            cantidad: 1,
        }
        
        //forma2
        const indexProd = carritos.findIndex(prod => prod.id === prodCarrito.id)
        if (indexProd === -1) {
            carritos.push(prodCarrito)
        } else {
            carritos[indexProd].cantidad++
        }

        console.log(carritos)
}
})

//btn finalizar compra
const botonFinalizar = document.querySelector('#finalizar')
const thead=document.querySelector('#thead')
const tbody=document.querySelector('#tbody')
const parrafoTotal = document.querySelector('#total')

botonFinalizar.onclick = ()=>{
    divProductos.remove()
    botonFinalizar.remove()
    thead.innerHTML = `
    <th scope="col">PRODUCTOS</th>
    <th scope="col">Cantidad</th>
    <th scope="col">Total</th>`
    let totalCompra = 0

    carritos.forEach(prod=>{
        totalCompra+= prod.cantidad*prod.precio

        tbody.innerHTML+=`
        <tr>
        <td>${prod.nombre}</td>
        <td>${prod.cantidad}</td>
        <td>${prod.cantidad*prod.precio}</td>
        </tr>
        `
    })
    console.log(totalCompra)

    parrafoTotal.innerText = `El total de tu compra es${totalCompra}`
}
    
