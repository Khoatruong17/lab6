var express = require('express');
var router = express.Router();
var MobileModel = require('../models/MobileModel');
var BrandModel = require('../models/BrandModel');

//URL: localhost:3001/mobile
router.get('/', async (req, res) => {
   var mobiles = await MobileModel.find({}).populate('brand');
   //Path: views/mobile/index.hbs
   res.render('mobile/index', { mobiles });
})

router.get('/add', async (req, res) => {
   var brands = await BrandModel.find({});
   res.render('mobile/add', { brands });
})

router.post('/add', async (req, res) => {
   var mobile = req.body;
   await MobileModel.create(mobile);
   res.redirect('/mobile');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var mobile = await MobileModel.findById(id);
   var brands = await BrandModel.find({});
   res.render('mobile/edit', {mobile, brands}); 
});

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var mobile = req.body;
   try{
      await MobileModel.findByIdAndUpdate(id, mobile);
      console.log('updated successfully')
   }
   catch(err){
      console.log('update error:', err)
   }
   res.redirect('/mobile'); 
})

router.get('/sort/asc', async (req, res) => {
   var mobiles = await MobileModel.find().populate('brand').sort({model:1})
   res.render('mobile/index',{mobiles});
});

router.get('/sort/desc', async (req, res) => {
   var mobiles = await MobileModel.find().populate('brand').sort({model:-1})
   res.render('mobile/index',{mobiles});
});

router.post('/search', async (req, res) => {
   var keywords = req.body.keyword
   var mobiles = await MobileModel.find({ model : new RegExp(keywords , "i") });
   res.render('mobile/index',{mobiles});
})

module.exports = router;