const express = require('express');
const huutokauppaModel = require('../models/huutokauppa')
let router = express.Router();



router.get("/huutokaupat", function (req, res) {

    huutokauppaModel
      .find()
      .then(function (huutokaupat) {
        return res.status(200).json(huutokaupat);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).json({ Message: "Internal server error TÄSSÄ" });
      });
  });

  
router.post("/huutokaupat", function(req, res){
    if(!req.body){
        return res.status(400).json({"Message":"Bad request - check request TYPE "})
    }
   

    let huutokauppa = new huutokauppaModel({
        "huutokauppa_name" : req.body.huutokauppa_name,
        "huutokauppa_date_start": req.body.huutokauppa_date_start,
        "huutokauppa_date_end":req.body.huutokauppa_date_end,
        "huutokauppa_description": req.body.huutokauppa_description,
        "huutokauppa_address":req.body.huutokauppa_address,
        "huutokauppa_email":req.body.huutokauppa_email,
        "huutokauppa_phone":req.body.huutokauppa_phone
    })
    huutokauppa.save()
    .then(function(huutokauppa){
        return res.status(201).json(huutokauppa)
    })
    .catch(function(err){
        console.log(err)
        return res.status(500).json({"Message":"Internal server error fron save huutokauppa"})
    })

})

router.delete("/huutokaupat/:id", function(req, res){
    huutokauppaModel.deleteOne({"_id":req.params.id})
    .then(function(stats){
      console.log(stats)
      return res.status(200).json({"Message":"Success"})
    })
    .catch(function(err){
      return res.status(500).json({"Message":"Internal server error"})
    })
    })
    router.put("/aucevents/:id",function(req,res){
        if(!req.body){
          return res.status(400).json({"Message":"Bad request - body missing"})
        }
      
      
      let huutokauppa = {
        "huutokauppa_name" : req.body.huutokauppa_name,
        "huutokauppa_date_start": req.body.huutokauppa_date_start,
        "huutokauppa_date_end":req.body.huutokauppa_date_end,
        "huutokauppa_description": req.body.huutokauppa_description,
        "huutokauppa_address":req.body.huutokauppa_address,
        "huutokauppa_email":req.body.huutokauppa_email,
        "huutokauppa_phone":req.body.huutokauppa_phone
      }
      huutokauppaModel.replaceOne({"_id":req.params.id}, huutokauppa)
      .then(function(stats){
        console.log(stats)
        return res.status(200).json({"Message":"Success"})
      })
      .catch(function(err){
        console.log(err)
        return req.status(500).json({"Message":"Internal server"})
      })
      
      })

      module.exports = router