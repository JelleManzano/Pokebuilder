const isLoggedIn = (req, res, next) => {
    if(req.session.activeTrainer === undefined){
        res.redirect("/auth")
    } else{
        next()
    }
}

module.exports = {
    isLoggedIn
}