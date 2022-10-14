//Creado de la fn que valida si el role de usuario es admin
const isAdmin = (req, res, next) => {
    if(req.user.role !== 'user_admin'){
        return res.status(401).json({
            message: 'No autorizado - No eres administrador'
        })
    }

    next();
}

module.exports = isAdmin;