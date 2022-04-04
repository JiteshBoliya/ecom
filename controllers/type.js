const Type = require('../model/type')
exports.get_type=async (req, res)=>{
    const type=Type.find({},function(err, data){
        if (err) res.status(400).send({error:error.message})
        res.status(200).send(data)
    })
}
exports.set_type=async (req, res)=>{
    const type=new Type({
        ...req.body,
        owner:req.user._id
    })
    try {
        await type.save()
        res.status(201).send(type)        
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}