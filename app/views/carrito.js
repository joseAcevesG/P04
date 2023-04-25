let carrito = [];

function crearDivCards(producto){
    return `<div class="card" style="width:350px; margin: 10px;">
    <img class="card-img-top" src="${producto.imageURL}" alt="Card image">
    <div class="card-body">
      <h4 class="card-title">${producto.title}</h4>
      <p class="card-text">${producto.description}</p>
      <!-- Modal trigger button -->
      <button uuid="${producto.uuid}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" onclick="prepararModal(this)">
        Agregar al carrito
      </button>
    </div>
  </div>`
}


function pagination(numero){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/products');
    xhr.send();
    xhr.onload = function () {
        if(xhr.status != 200){
            alert("error");
        } else {
            document.getElementById("CardsAqui").innerHTML="";
            let productos = JSON.parse(xhr.response);
            //(numero -1)*4 + i
            for(let i = 0; i<4; i++){
              document.getElementById("CardsAqui").insertAdjacentHTML('beforeend', crearDivCards(productos[(numero - 1) * 4 + i]));
            }
        }
    }

}
pagination(1);


function prepararModal(uuid){
  // console.log(uuid)
  // console.log(uuid.getAttribute(uuid))
  let id = uuid.getAttribute("uuid")
  document.getElementById("ConfirmAdd").setAttribute("uuid", id);
}

function botonAgregar(uuid){
  let id = uuid.getAttribute("uuid");
  carrito.push({
    "uuid": id,
    "cantidad": document.getElementById("cantidad").value
  });
  sessionStorage.setItem('carrito', JSON.stringify(carrito));
}


function crearDivCarrito(producto, cantidad){
  let nodo = document.createElement("p");
  nodo.innerHTML = `<b>${producto.title}:</b> ${cantidad} x ${producto.pricePerUnit}.00 MXN`
  document.getElementById("TotalDeCompra").insertBefore(nodo, document.getElementById("costoEnvio"));
  // let tc = `<p class="card-text"><b>${producto.title}:</b> ${cantidad} x ${producto.pricePerUnit}.00 MXN</p>`

  return `<div id="${producto.uuid}" class="media border p-3" style="min-height: 200px;">
  <img src="${producto.imageURL}" alt="John Doe" class="ml-3 mt-3" style="width:120px; float: right;">
  <div class="media-body ">
    <h4>${producto.title}  <a name="" id="" class="btn btn-danger" href="#" role="button" onclick="borrarDiv(this)"><i class="fa-solid fa-trash"></i></a></h4>
  </div>
  <br>
  <form style="width: 30%;" >
    <div class="input-group">
      <span class="input-group-text" style="width: 35%; min-width: 60;">Cantidad: </span>
      <input style="background-color: white;" type="text" class="form-control" placeholder="${cantidad}" disabled>
      
      <button type="button" name="" id="" class="btn btn-primary"><i class="fa-solid fa-pen-to-square" style="color: #ffffff;"></i></button>
      
    </div>
    
  
    <div class="input-group">
      <span class="input-group-text" style="width: 35%;">Precio: </span>
      <input style="background-color: white;" type="text" class="form-control" placeholder="${producto.pricePerUnit*cantidad}" disabled>
      <span class="input-group-text">MXN:</span>
    </div>
  </form>
  
</div>`
}


function agarrarProductos(){
  let total = 0;
  let cola = JSON.parse(sessionStorage.getItem("carrito"));
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/products');
  xhr.send();
  xhr.onload = function () {
    if(xhr.status != 200){
      alert("error");
    } else {
      document.getElementById("productosCarrito").innerHTML="";
      let productos = JSON.parse(xhr.response);
      for(let i = 0; i<cola.length; i++){
        let producto = productos.find(item2 => item2.uuid == cola[i].uuid);
        
        total += producto.pricePerUnit * cola[i].cantidad;
        document.getElementById("productosCarrito").insertAdjacentHTML('beforeend', crearDivCarrito(producto, cola[i].cantidad));
        
      }
      document.getElementById("totalPagar").innerHTML="Total: " + (total+60) + ".00";
    }
  }
}





agarrarProductos();

function borrarDiv(div){
  // console.log(div.parentNode.parentNode.parentNode);
  let chingon = div.parentNode.parentNode.parentNode;
  chingon.remove();
  let pito = JSON.parse(sessionStorage.getItem("carrito"));
  // pito.findIndex(item => item.uuid = chingon.getAttribute("id"));
  pito.splice(pito.findIndex(item => item.uuid = chingon.getAttribute("id")), 1)
  sessionStorage.setItem("carrito", JSON.stringify(pito));

}


