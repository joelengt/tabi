
var Users = require('../../models/purchares');
var config = require('../../../../config/index.js')

var LocalStrategy = require('passport-local').Strategy

var register = function (res, passport) {

    passport.serializeUser(function(user, done) {
        done(null, user)
    })

    passport.deserializeUser(function(id, done) {
        Users.findById(id, function(err, user) {
            done(err, user)
        })
    })

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
        //session: false
    }, 
    function(req, username, password, done) {
        process.nextTick(function() {
            console.log('entro?');
            Users.findOne({ 'account.username': username }, function (err, user) {
                if(err) {
                    return done(err)
                }
                
                console.log('Content data User!!')
                // console.log(username)

                if(!user) { 
                    console.log('El usuario no esta registrado!!')
                    return done(null, false, {message: 'Unknown user'})
                    
                }
                
                if(user.account.password != password) {
                    console.log('La contraseña es incorrecta!!')
                    return done(null, false), {message: 'Invalid password'}

                }
                
                console.log('EL usuario es correcto, ACCESO :D')
                return done(null, user)
            })
        
        })

    }))
}

module.exports = register
