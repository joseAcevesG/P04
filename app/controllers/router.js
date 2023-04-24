const express = require('express');
const router = express.Router();
const ProductRouter = require('../routes/products');
const adminProductRouter = require('../routes/admin_products');

router.use('/products', ProductRouter);
router.use('/admin/products', validateAdmin, adminProductRouter);

// router.get('/', (req,res) => {
//     res.send('Practica 3');
// });

function validateAdmin(req, res, next){
    let adminToken = req.get('x-auth');
    if(adminToken == undefined || adminToken != "admin"){
        res.status(403).send("No cuenta con privilegios de Admin");
    }
        
    next();
    return
}

module.exports = router;