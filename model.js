const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
const createNewSchema = (assignment_id)=>{
    const Schema = new Schema({
        student_id: {
            type: String,
            required: true,
        },
        front:{
            type:String,
            required:true,
        },
        turned:{
            type:String,
            required: true
        }
    })
    return mongoose.model(assignment_id, Schema)
}*/
const dataSchema = new Schema({
    student_id: {
        type: String,
        required: true,
    },
    full_name:{
        type: String,
        required: true
    },
    front:{
        type:String,
        required:true,
    },
    turned:{
        type:String,
        required: true
    }
})
const createDocument = async(assignment_id, student_id,full_name, front, turned)=>{
   // const documentName = createNewSchema(assignment_id)
    //const documentName = assignment_id
  
    //let check = mongoose.model(assignment_id)
    //console.log("ram",check)
    const dataModel = mongoose.model(assignment_id, dataSchema);
    
/* dataModel.exists(async(err, result) =>{ 
        if (err){ 
            console.log(err) 
        }else{ 
            if(result!=null){
                try{
                    const newRecord = new dataModel({
                    student_id,
                    front,
                    turned
                    })
                    await newRecord.save()
                    return("ok");
                }catch(err){
                // console.log(err)
                    return("not ok");
                }
            }
        } 
    }); */
    try{
        const newRecord = new dataModel({
        student_id,
        full_name,
        front,
        turned
        })
        await newRecord.save()
        return("ok");
    }catch(err){
       console.log("save ",err)
        return("not ok");
    }
    //console.log("ram",dataModel)
    console.log("ok")
}
const getAll = async(id)=>{
    const assignment_id = id.toString()
    const dataModel = mongoose.model(assignment_id, dataSchema);
    const res = await dataModel.find({})
    return res
}

module.exports = {
    createDocument,
    getAll
}