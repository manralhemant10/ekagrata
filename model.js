const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    const dataModel = mongoose.model(assignment_id, dataSchema);
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
        return("not ok");
    }
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