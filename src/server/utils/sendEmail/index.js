var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')

var config = require('../../../../config/index.js');

// var jade = require('jade')
// var Hogan = require('hogan.js')
var fs = require('fs')

// get file
// var template = fs.readFileSync('../../views/mail/template_mail_forgot_password.hjs')

// console.log('Template email');
// console.log(template);

// compile template
// var compiledTemplate = Hogan.compile(template)

function handleSayHello(user_data_send, callback) {
    // var fn = jade.compile('')

    var transporter = nodemailer.createTransport(smtpTransport({
        service : 'Gmail', // Gmail 
        auth: {
                user: config.auth.mailing.user,   //https://www.google.com/settings/security/lesssecureapps
                pass: config.auth.mailing.pass
            }
        })
    )

    var template_html_get_data_account = `<html>
                        <table width="600" border="0">
                           <tr>
                                <td>
                                    <h3>Tabi: Nuevo usuario quiere contactarte</h3>
                                </td>
                           </tr>
                           <tr>
                                <td>
                                    <table width="100%">
                                        <tr>
                                           <td>
                                                <div>
                                                    <p>nombre: ${user_data_send.nombre}</p>
                                                </div>
                                                <div>
                                                    <p>email: ${user_data_send.email}</p>
                                                </div>
                                                <div>
                                                    <p>mensaje: ${user_data_send.message}</p>
                                                </div> 
                                           </td>
                                        </tr>
                                    </table>
                                </td>
                           </tr>
                        </table>
                    </html>`

    var mailOptions = {
        from: 'Tabi  <joelengt@gmail.com>', // sender address
        to: config.auth.mailing.receptor + ', ' +'joel.gonzales2110@gmail.com', // list of receivers
        subject: 'Tabi: Nuevo Contacto', // Subject line
        text: 'Tabi: Nuevo Contacto',
        html: template_html_get_data_account
        // html: compiledTemplate.render({
        //     name : user_data_send,
        // })
        // render templte
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            
            console.log('error_Mensaje')

            console.log(error)
            // res.send("mensaje no envio: " , error )
            return callback(error.message)
        }

        console.log('Message SEND: ' + info.response)
        // res.send('mensaje enviado :D')
        //res.render('send_ok-comprar', { name: req.body.nombre, email : req.body.email})
        callback(error, { status: 'ok', message: 'Mensaje enviado', info: info.response })
    })
}

module.exports = handleSayHello
