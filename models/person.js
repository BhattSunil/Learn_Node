const mongoose = require('mongoose')

//Describe the person schema


const personSchema= new mongoose.Schema({
  name: {
    type:String,
    required : true
  },
  age:{
    type:Number
  },
  work:{
    type:String,
    enum:['chef','waiter','manager'],
    required :true
  },
mobile:{
  type:String,
  required:true,
  unique:true

},
email:{
  type:String,
  required:true,
  unique:true
},
address:{
  type:String
},
salary:{
  type:Number,
  require:true
}
})

//Create  Person Model

const person = mongoose.model('person',personSchema)
module.exports =person;