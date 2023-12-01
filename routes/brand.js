var express = require('express');
var router = express.Router();
var BrandModel = require('../models/BrandModel');
var MobileModel = require('../models/MobileModel');

router.get('/', async (req, res) => {
   var brands = await BrandModel.find({});
   res.render('brand/index', { brands });
})

router.get('/add', (req, res) => {
   res.render('brand/add');
})

router.post('/add', async (req, res) => {
   var brand = req.body;
   await BrandModel.create(brand);
   res.redirect('/brand');
})

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   //SQL: SELECT * FROM mobiles WHERE brand = "id"
   var mobiles = await MobileModel.find({ brand : id }).populate('brand');
   res.render('brand/detail', { mobiles })
})

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   try{
      await BrandModel.findByIdAndRemove(id);
      console.log('Delete successfully !');
   }
   catch{
      console.log('Delete failed! Error:'+ err);
   }
   res.redirect('/brand');
})

router.get('/deleteall', async (req, res) => {
   await BrandModel.deleteMany();
   console.log('Delete successfully');
   res.redirect('/brand');
});

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var brand = await BrandModel.findById(id);
   res.render('brand/edit', {brand}); 
});

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var brand = req.body;
   try{
      await BrandModel.findByIdAndUpdate(id, brand);
      console.log('updated successfully')
   }
   catch(err){
      console.log('update error:', err)
   }
   res.redirect('/brand'); 
})
module.exports = router;