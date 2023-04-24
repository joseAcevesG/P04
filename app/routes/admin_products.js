const express = require('express');
const { validateAdmin } = require('../controllers/router');
const router = express.Router();
const dataHandler = require('../controllers/data_handler');

router.route('/').post((req, res) => {
    let user = req.body;
    dataHandler.createUser(user);

    if(user == undefined)
        res.status(403).type('text/plain').send("Acceso no autorizado, no se cuenta con privilegios de administrador" );
  
    res.set('Content-Type','text/plain; charset=uft-8');
    res.send(`User ${user.nombre} was created!`);
});

router.route('/:id').put((req, res) =>{
    let id = req.params.id;
    let info = req.body;

    validateAdmin();

    try{
        dataHandler.updateProducts(id, info);
        req.status(200).type('text/plain').send("Producto actualizado correctamente");
    }
    catch(e) {
      res.status(404).type('text/plain').send("No product with ID " + id)
    }

}).delete((req, res) => {
    let id = req.params.id;

    validateAdmin();
    res.type('text/plain; charset=uft-8');

    try{
        dataHandler.deleteProducts(id);
        req.status(200).type('text/plain').send("Producto eliminado correctamente");
    }
    catch(e) {
        res.status(404).type('text/plain').send("No product with ID " + id)
    }

});


module.exports = router;