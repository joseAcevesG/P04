let carrito = [];

function crearDivCards(producto){
    return `<div class="card" style="width:350px; margin: 10px;">
    <img class="card-img-top" src="${producto.imageURL}" alt="Card image">
    <div class="card-body">
      <h4 class="card-title">${producto.title}</h4>
      <p class="card-text">${producto.description}</p>
      <-- Modal trigger button --
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
        Agregar al carrito
      </button>
    </div>
  </div>`
}

let url = 'http://localhost:3000/'
function pagination(numero){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url+'products');
    xhr.send();
    xhr.onload = function () {
        if(xhr.status != 200){
            alert("error");
        } else {
            let productos = JSON.parse(xhr.response);
            //(numero -1)*4 + i
            for(let i = 0; i<4; i++){
                document.getElementById("CardsAqui").insertAdjacentText('beforeend', crearDivCards(productos[(numero - 1) * 4 + i]));
            }
        }
    }

}