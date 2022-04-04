const User=require('../model/user')
exports.get_user= async function(req, res){
    try {
        res.status(200).send(req.user)
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}
exports.login_user=async function(req, res){
    try {
        const user= await User.findByCredentials(req.body.email,req.body.password)
        const token= await user.genrateAuthToken()
        res.status(200).send({user,token})
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}
exports.register_user=async function(req, res){
    const user=new User(req.body)
    try {
        await user.save()
        const token= await user.genrateAuthToken()
        res.status(201).send({user})        
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}