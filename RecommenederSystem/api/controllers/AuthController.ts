declare var module;
declare var sails;
declare var User;
declare var require;
var Passwords = require('machinepack-passwords');
var jwt = require('jsonwebtoken');

module.exports = {

  Auth:function(req,res){

    let flash_message = true
    let msj = 'Usuario Registrado'

    return res.view('Auth/register',{
      flash_message:flash_message,
      msj:msj,
      layout: 'Auth/loginLayout'
    })

  },

  new_account:function(req,res){

    let flash_message = true
    let msj = 'Usuario Registrado'
    let parametros = req.allParams();

    let new_user = {
      user_name:parametros.user_name,
      user_last_name:parametros.user_last_name,
      user_path_photo:parametros.photo,
      user_phone:parametros.phone,
      user_email:parametros.user_email,
      user_password:parametros.user_password,
      user_token:parametros.token,
      user_username:parametros.user_username,
      user_status_register:1,
      user_date_created:new Date('Y-m-d H:i:s'),
      user_date_updated:new Date('Y-m-d H:i:s'),
      user_has_access:1,
    };

    User.create(new_user)
      .exec(
        (error,userCreated)=> {
            if (error) {
              req.flash = {
                err: error
              }
              return res.view('Auth/register', {
                flash_message:flash_message,
                msj:msj,
                layout: 'Auth/loginLayout'
              });
            }
            else
            {
              res.redirect('/login');
            }
        }
      )
  },
  login : function(req,res){

    var username = req.param('username');
    var password = req.param('password');

    if (username && password) {
      User.findOne({ user_username: username })
        .exec(function (err, foundUser) {
          if (err)
            return res.negotiate(err);
          if (!foundUser) {
            return res.serverError('El usuario no existe');
          }
          else {
            Passwords.checkPassword({
              passwordAttempt: password,
              encryptedPassword: foundUser.user_password,
            })
              .exec({
                error: function (err) {
                  return res.serverError(err);
                },
                incorrect: function () {
                  return res.badRequest("Datos Invalidos")
                },
                success: function () {
                  req.session.authenticated = true;
                  console.log("Estas logeado");

                  // return the credential
                  var token =jwt
                    .sign(
                      {
                        exp:Math.floor(Date.now()/ 1000)+(60*60), // expires in one hour
                        data:{
                          user_id:foundUser.user_id,
                          user_name:foundUser.user_name,
                          user_last_name:foundUser.user_last_name,
                          user_username:foundUser.user_username,
                          user_email:foundUser.user_email
                        }
                      },
                      'secret');  //secret word
                  console.log("token",token);
                  res.redirect('/login/success');

                }
              });
          }
        });
    }
    else {
      sails.log('Usuario eliminado');
      return res.serverError("No envia correo y pass");
    }
  },

  success : function(req,res){
    return res.redirect('/');
  },

  error : function(req,res){

    return res.view('error', {layout : false});
  },
  logout: function(req, res) {
    req.session.destroy(function(err) {
      return res.redirect('/login');;
    });
  }
};