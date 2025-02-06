const mongoose = require("mongoose");



const contactSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: [true,"firstname is required"],
        minlength: 3,
        maxlength:30,
        trim: true,
        validate: {
            validator:
            function(value){
                const nameRegex = /^[a-zA-z\s]*$/; 
                return nameRegex.test(value);
            },
            message:"firstname must contain only alphabet characters"
        }
    },
    lastname: {
        type: String,
        required: [true,"lastname is required"],
        minlength: 3,
        maxlength:30,
        trim: true,
        validate: {
            validator:function(value){
                const nameRegex = /^[a-zA-z\s]*$/; 
                return nameRegex.test(value);
            },
            message:"lastname must contain only alphabet characters"
        }
    },
    emailadress: {
        type: String,
        required: [true,"email is required"],
        unique:true,
        
       
    },
    age: {
        type: Number,
        required: false,

        
       
    }


});

module.exports = mongoose.model("Contact",contactSchema);

