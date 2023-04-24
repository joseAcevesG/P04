class ShoppingCartException{
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}

class ProductProxy{
    constructor(uuid, cantidadComprar){
        this.uuid = uuid
        this.cantidadComprar = cantidadComprar;
    }
}

class ShoppingCart{
    constructor(){
        this.productos = [];
        this.proxie = [];
    }

    addItem(productUuid, amount){
        if(amount == 0)return;
        if(amount < 0) throw new ShoppingCartException("Monto incorrecto");  
        for(let i=0; i<this.proxie.length; i++){
            if(productUuid == this.proxie[i].uuid){
                this.proxie[i].cantidadComprar += amount;
                return;
            }
            
        }
        let product = new ProductProxy(productUuid, amount);
        this.proxie.push(product);
    }

    updateItem(productUuid, newAmount){
        if(newAmount == 0) this.removeItem(productUuid);
        if(newAmount < 0) throw new ShoppingCartException("Monto incorrecto");  
        for(let i=0; i<this.proxie.length; i++){
            if(productUuid == this.proxie[i].uuid){
                this.proxie[i].cantidadComprar = newAmount;
                return;
            }  
        }
        throw new ShoppingCartException("No se encuentra el producto");
    }

    removeItem(productUuid){
        for(let i=0; i<this.proxie.length; i++){
            if(productUuid == this.proxie[i].uuid){
                this.proxie.splice(i,1);
                return;
            }  
        }
        throw new ShoppingCartException("No se encuentra el producto");
    }

    calculateTotal(){
        let suma = 0;
        for(let i = 0; i < this.proxie.length; i++){
            for(let j = 0; j < this.productos.length; j++){
                if(this.proxie[i].uuid == this.productos[j].uuid){
                    suma += this.proxie[i].cantidadComprar *  this.productos[j].pricePerUnit
                }
            }
        }
        return suma
    }
    
}



