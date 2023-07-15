const mongoose = require("mongoose");

const Schema = mongoose.Schema({
user:{type:String, index:true},
huutokauppa_name: String,
huutokauppa_date_start: String,
huutokauppa_date_end: String,
huutokauppa_description: String,
huutokauppa_address: String,  
huutokauppa_email:String,
huutokauppa_phone:String
})

module.exports = mongoose.model("Huutokauppa", Schema)