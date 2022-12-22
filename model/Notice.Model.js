const mongoose = require('mongoose')

const NoticeSchema = new mongoose.Schema({
    name:String,
    notice:String,
    date:{type:String,default:null},
    time:{type:String,default:null},
})

const Notice_Model = mongoose.model("notice",NoticeSchema)

module.exports = Notice_Model