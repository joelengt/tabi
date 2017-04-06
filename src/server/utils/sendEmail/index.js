var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')

var config = require('../../../../config/index.js');

var fs = require('fs')

function handleSayHello(template_content, callback) {

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
                                    <h3>${ template_content.title }</h3>
                                </td>
                           </tr>
                           <tr>
                                <td>
                                    ${ template_content.template }
                                </td>
                           </tr>
                        </table>
                    </html>`

    // colocando receptores
    var receptopres = template_content.receptores.join(', ');


    var mailOptions = {
        from: 'Assistabi  <joelengt@gmail.com>', // sender address
        to: receptopres, // list of receivers
        subject: template_content.title, // Subject line
        text: template_content.title,
        html: template_html_get_data_account
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            
            return callback(error.message)
        }

        callback(error, { status: 'ok', message: 'Mensaje enviado', info: info.response })
    })
}

module.exports = handleSayHello
