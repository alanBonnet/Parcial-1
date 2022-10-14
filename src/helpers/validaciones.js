const validations = {}

validations.isNotAuthorized = (req, res, next) => {
    if(!(req.params.idUser == req.user._id || req.user.role === 'user_admin')){
        return res.status(401).json({
            message: "No está autorizado para esta petición"
        })
    }//TODO:Verifico si está autorizado el usuario por role o si es propietario de la tarea
    next()
}
validations.isEmail = (req, res, next) => {
    const {email}=req.body;
    const myRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if(!(myRegex.test(email))){
        return res.status(400).json({
            message: "Email inválido"
        });
    }
    next();
} 

module.exports = validations;