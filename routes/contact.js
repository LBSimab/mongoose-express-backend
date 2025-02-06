// Contacts Routes
//CRUD Routes --> /api contacts 

const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
const contact = require("../models/contact");



//post method /api/contact

router.post("/contact",async(req,res)=>{

    try {
        const newContact = new Contact(req.body);

        await newContact.save()
        .then((savedContact)=>{

             console.log(savedContact)
             res.status(201).json({msg:"contact is saved"});

        })
        .catch((error)=>{
            console.log(error);


            if(error.code===11000 && error.keyPattern.emailadress ){
                res.status(500).json({msg:"This Email Already Exists"});

            }else{ res.status(500).json({msg:"unable to create contact"});
        };
           
             
        })


    } catch (error) {
        console.log('error');
        res.status(500).json({msg:"unable to save the contact"});
        
    }



})
//get method /api/contact fetching all contact
router.get("/contact",async(req,res)=>{

    try {
        Contact.find()
        .then((contacts)=>{
            console.log(contacts);
            res.status(200).json({contacts: contacts});

        })
        .catch((error)=>{
            console.log(error);
            res.status(500).json({msg:"unable to get contact"});

        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"unable to get contact"});
    }


})

//method get api/contact search by id single contact
router.get('/contact/:id',async(req,res)=>{
 


try {
    const id =req.params.id;

    Contact.findById(id)
    .then((contact)=>{
        console.log(contact);
        res.status(200).json({contact:contact})


    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({msg:`unable to retrieve the contact with id ${req.params.id}`})

    })

} catch (error) {
    console.log(error);
    res.status(500).json({msg:`unable to retrieve the contact with id ${req.params.id}`})
}


});
//method get api/contact/search for searching with firstname lastname emailadress
router.get('/contact/search',async (req,res) => {

    try {
    const searchTerm = req.query.searchTerm;
    const searchRegex = new RegExp(searchTerm,"i");

     await Contact.find({
        $or:[
            
                {firstname: searchRegex},
               { lastname: searchRegex},
                {emailadress: searchRegex},
               
            
        ]
    })
    .then((contacts)=>{
        console.log(contacts);
        res.status(200).json({contacts:contacts});


    })
    .catch((error)=>{
        console.log(erorr);
        res.status(500).json("unable to find  contact");
    })        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"unable to find  contact"});
        
    }
    
})
//method put for updting shit

router.put("/contact/:id",async(req,res)=>{

    try {
        const id = req.params.id;
        const updatedata = req.body;
        await Contact.findOneAndUpdate({_id:id },updatedata,{new:true})
        .then((updatedata)=>{

            console.log(updatedata);
            res.status(200).json({msg:"contact is updated",contact:updatedata})
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).json({msg:"unable to update the contact"})
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"unable to update the contact"}); 
        
    }
})


//there is two types of deletes out there
//1.soft delete + you just add a flag like deactive and set it to yes or no True or false + soft delete is basicly a put cuz u need to turn the flag on
//2.hard delete + acctualy deletion of the record/document bringback result as true false
router.delete("/contact/:id",async(req,res)=>{
    try {

        const id =req.params.id;
        await Contact.findByIdAndDelete(id)
        .then((deletedContact)=>{
                console.log(deletedContact);
                res.status(200).json({msg:`contact with name ${deletedContact.firstname} deleted`,contact:deletedContact}) 
        })
        .catch((error)=>{
            res.status(500).json({msg:"unable to delete the contact"});
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"unable to delete the contact"});
        
    }
})



module.exports = router;