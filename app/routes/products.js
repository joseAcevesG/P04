
const express = require('express');
const { getProductById } = require('../controllers/data_handler');
const router = express.Router();
const dataHandler = require('../controllers/data_handler');



router.route('/').get((req, res) => {
    let query = req.query.filter;

    let products;
    if(query == undefined){
        try{
            products = dataHandler.getProducts();

        } catch(e){
            res.status(400).send("Error");
            return;
        }
        res.status(200).json(products);
        // console.log("BHola")
    }
    
    else{
        //Filtrar prod (find prod)
        products = res.json(data.dataHandler.findProducts(query));
        if(products == undefined) res.status(404).type('text/plain').send("No product matching query");
        else res.status(200).json(products);
    }
});

router.route('/cart').post((req,res) => {
    console.log("Entro aqui");
    let proxies= req.body;
    let products = [];

    proxies = proxies.productproxies;
    
    if(!Array.isArray(proxies)){ 
        res.status(400).send("");
        return;
    }else{
        for(let proxy of proxies){
            let product; //product by id -> usar data handler
            product = getProductById(proxy._productUuid);
            console.log("DEBUG ME " + product);
            if(product != undefined) products.push(product);
            else{
                res.status(404).type('text/plain').send("No product with ID " + proxy.productUUID);
                return;
            } 
        }
        
        res.status(200).json(products);
        return;
    }

});




//AQUI
router.route('/:id').get((req,res) => {
    let uuid = req.params.id;
    let product = dataHandler.getProductById(uuid);

    if(product == undefined) {
        res.status(404).type('text/plain').send("No product with ID " + uuid);
        return;
    }
    else {
        res.status(200).json(product);
        return;
    }

});
//aqui


module.exports = router;