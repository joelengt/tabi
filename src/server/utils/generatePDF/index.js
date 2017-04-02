var pdf = require('phantom-html2pdf');

function generatePDF(user, callback) {

    var options = {
        // "html" : "./uploads/news/index.html",
        "html" : `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1- strict.dtd">
                    <html xmlns="http://www.w3.org/1999/xhtml" lang="es">
                        <head>
                            <meta charset="utf-8">
                            <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> -->
                            <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">

                            <meta name="robots" content="noodp,noydir" /> 
                            <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1"/>
                            <meta name="description" content="Assist Tabi - Viaja, Disfruta, Explora Disfruta de tu viaje"/>

                            <title>Tabi</title>
                            <style>
                                .text-content{
                                    font-family: Arial !important;
                                    color: black !important;
                                }
                                .small-text{
                                    font-family: Arial !important;
                                    font-size: 9px !important;
                                    color: #989898 !important;
                                }
                                .text-meses{
                                    font-weight: bold !important;
                                    color: #989898 !important;
                                }
                                .afp{
                                    max-width: 200px;
                                }
                            </style>
                            <style>
                                b {
                                    font-size: 10px;
                                }
                                p {
                                    font-size: 10px;
                                }
                            </style>

                        </head>
                        <body style="margin: 0;">
                            <table bgcolor="f5f5f5" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-family: Arial, sans-serif; margin: 0 auto; background: #f5f5f5; color: black">
                                <tr>
                                    <td align="center" valign="top">
                                        <table class="home" align="center" cellpadding="0" cellspacing="0" width="100%" bgcolor="white" align="center" style="padding: 0px 40px">
                                            <tr>
                                                <td align="center">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td style="text-align: left; padding-top: 30px;" width="50%">
                                                                <a href="http://www.integra.com.pe/" target="_blank" style="display: inline-block;">
                                                                    <img class="afp" src="http://assistabi.com/images/logo.png" alt="AFP Integra" width="400"/>
                                                                </a>
                                                            </td>
                                                            <td style="text-align: left; padding-top: 30px;" width="50%">
                                                                <p style="margin: 0;"><b style="color: #017098;">VOUCHER No AR-EU-10025156</b></p>
                                                                <p style="margin: 0;">Código de póliza/Policy Code tusegurodeviaje.net-43000124</p>
                                                                <p style="margin: 0;">Vigencia/Validity 15/03/2017 al/to 14/03/2018</p>
                                                                <p style="margin: 0;">Cobertura/Service Plan Work & Travel TSV</p>
                                                                <p style="margin: 0;">Fecha de emisión/Date of Issue 07/03/2017</p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                              <td align="center">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-top: 20px;padding-bottom: 20px;">
                                                  <tr>
                                                    <td style="border-bottom: 1px solid #D6D6D6;"><span></span></td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                            <tr>
                                                <td>
                                                    <table width="100%">
                                                        <tr>
                                                            <td style="padding-top: 10px;padding-bottom: 10px;" width="50%">
                                                                <b style="margin: 0; border-bottom: 1px solid #017098;color: #017098;">Pasajero/Passenger: 1</b>
                                                                <p style="margin: 0; padding-top: 10px"><b>Nombre/Name:</b> Barea Johann, Florencia</p>
                                                                <p style="margin: 0;"><b>Documento/ID Number:</b> 35008278</p>
                                                                <p style="margin: 0;"><b>Nacimiento/Birthdate:</b> 10/04/1990</p>
                                                            </td>
                                                            <td style="padding-top: 10px;padding-bottom: 10px;" width="50%">
                                                                <b style="margin: 0; border-bottom: 1px solid #017098; color: #017098;">Contacto de emergencia/Emergency Contact</b>
                                                                <p style="margin: 0; padding-top: 10px""><b>Nombre/Name:</b> Johann, Dora Isabel</p>
                                                                <p style="margin: 0;"><b>Teléfono/Phone:</b> 540374315487548</p>
                                                                <p style="margin: 0;"><b>Email:</b> clientes@tusegurodeviaje.net</p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table width="100%" style="padding-top: 20px;padding-bottom: 20px;">
                                                        <tr>
                                                            <td>
                                                                <b style="margin: 0; border-bottom: 1px solid #017098; color: #017098;">Detalle de Cobertura</b>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="50%">
                                                                <table width="100%">
                                                                    <tr>
                                                                        <td>
                                                                            <p style="margin: 5px;">Asistencia médica en caso de accidente</p>
                                                                        </td>
                                                                        <td>
                                                                            <p style="margin: 5px;">USD 50.000</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p style="margin: 5px;">Asistencia médica en caso de accidente</p>
                                                                        </td>
                                                                        <td>
                                                                            <p style="margin: 5px;">USD 50.000</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p style="margin: 5px;">Asistencia médica en caso de accidente</p>
                                                                        </td>
                                                                        <td>
                                                                            <p style="margin: 5px;">USD 50.000</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p style="margin: 5px;">Asistencia médica en caso de accidente</p>
                                                                        </td>
                                                                        <td>
                                                                            <p style="margin: 5px;">USD 50.000</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p style="margin: 5px;">Asistencia médica en caso de accidente</p>
                                                                        </td>
                                                                        <td>
                                                                            <p style="margin: 5px;">USD 50.000</p>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td width="50%">
                                                                <table width="100%">
                                                                    <tr>
                                                                        <td>
                                                                            <p style="margin: 5px;">Asistencia médica en caso de accidente</p>
                                                                        </td>
                                                                        <td>
                                                                            <p style="margin: 5px;">USD 50.000</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p style="margin: 5px;">Asistencia médica en caso de accidente</p>
                                                                        </td>
                                                                        <td>
                                                                            <p style="margin: 5px;">USD 50.000</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p style="margin: 5px;">Asistencia médica en caso de accidente</p>
                                                                        </td>
                                                                        <td>
                                                                            <p style="margin: 5px;">USD 50.000</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p style="margin: 5px;">Asistencia médica en caso de accidente</p>
                                                                        </td>
                                                                        <td>
                                                                            <p style="margin: 5px;">USD 50.000</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p style="margin: 5px;">Asistencia médica en caso de accidente</p>
                                                                        </td>
                                                                        <td>
                                                                            <p style="margin: 5px;">USD 50.000</p>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                              <td align="center">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom: 40px;">
                                                  <tr>
                                                    <td style="border-bottom: 1px solid #D6D6D6;"><span></span></td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td align="center">
                                                <table border="0" cellpadding="0" cellspacing="0">
                                                  <tr>
                                                    <td align="center" style="font-weight:bold; font-family: Arial;">
                                                        <p class="monto" style="text-align: center; color: #017098; font-size: 12px; margin: 0; margin-bottom: 22px;">RECOMENDACIONES DE USO DE ASISTENCIA AL VIAJERO</p>
                                                    </td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table width="100%" align="left">
                                                        <tr>
                                                            <td>
                                                                <b style="margin: 0; border-bottom: 1px solid #017098; color: #017098;">ANTES DEL VIAJE</b>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <p style="margin-bottom: 3px;margin-top: 5px;">VERIFICACION</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <p style="margin: 0;">Verifique que todos los datos consignados en su voucher Assistravel sean correctos. Controle especialmente los teléfonos indicados como contacto de emergencia, las fechas de vigencia y el tipo de cobertura adquirido. SI hay errores en los datos, comuníquese con la central de asistencia de Assistravel (teléfonos en página 1)</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <p style="margin-bottom: 3px;margin-top: 25px;">CANCELACIÓN</p>
                                                            </td>
                                                        </tr>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <p style="margin: 0; margin-bottom: 140px;">Si el producto adquirido por Ud. incluye Seguro de Cancelación y debe cancelar su viaje (ver condiciones generales para limitaciones y exclusiones) comuníquese dentro de las 24hs con nuestra central de asistencia.</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b style="margin: 0; border-bottom: 1px solid #017098; color: #017098;">DURANTE EL VIAJE</b>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <p style="margin: 5px auto; margin-top: 5px;">COMUNICARSE CON LA CENTRAL DE ASISTENCIA</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <p style="margin: 0;">En la página 1 del presente voucher encontrará un listado completo de los números de acceso de la central de asistencia Assistravel.. Consulte en el listado el número de la central más próxima. SI no hubiese un número de acceso en el país en que Ud. se encuentra, comuníquese por el sistema COBRO REVERTIDO (COLLECT CALL en inglés). Si el país en donde Ud. se encuentra no admite el sistema de comunicación COBRO REVERTIDO, efectúe la llamada a su cargo y a su regreso presente el comprobante a Assistravel para su reembolso. Las centrales de asistencia atienden las 24hs. Antes de llamar para solicitar nuestros servicios, tenga a mano la siguiente información:. Su voucher, tarjeta o credencial. Número de teléfono de donde se encuentra (incluyendo código de país y código de ciudad). Los datos del lugar en que se encuentra (domicilio, hotel, etc.)</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <p style="margin: 5px auto;">SI LA NATURALEZA DE SU INCONVENIENTE LE PERMITE COMUNICARSE CON ASSISTRAVEL Comuníquese con la central de asistencia y siga las instrucciones del operador</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <p style="margin: 5px auto;">SI EL PROBLEMA DE SALUD ES GRAVE O LA NECESIDAD DE ASISTENCIA ES MUY URGENTE Y NO ESTA EN CONDICIONES DE COMUNICARSE CON ASSISTRAVEL. Es fundamental que Ud. reciba asistencia médica inmediata en el lugar en que se encuentre.. Luego, indefectiblemente dentro de las 24hs siguientes, Ud. o cualquier persona que lo acompañe deberá comunicarse con Assistravel y proporcionar toda la información referida al evento sufrido y la asistencia recibida.</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <p>Assistravel se pondrá en contacto con el centro asistencial para controlar todas las fases de la prestación del servicio.</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <p style="margin-bottom: 3px;">EN CASO DE DEMORA O EXTRAVIO DE EQUIPAJE</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <p style="margin: 0;">Apenas constate la falta de su equipaje, diríjase al mostrador de la compañía aérea. Obtenga y complete el formulario PIR (Property Irregularity Report) provisto por la línea aérea.Antes de abandonar el aeropuerto, comuníquese con la central de asistencia.</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <p>Condiciones Generales de Contratacion disponibles en <a style="color: #017098;" href="https://assistabi.com/terminos_condiciones.pdf">https://assistabi.com/terminos_condiciones.pdf</a></p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table width="100%" align="left" style="padding-bottom: 10px;">
                                                        <tr>
                                                            <td class="cell-enlace" width="30%" style="font-family: Arial;">
                                                                <a style="color: #017098; text-decoration: none; font-size: 10px;" href="http://www.assistabi.com/" target="_blank">www.assistabi.com</a>
                                                            </td>
                                                            <td class="cell-icons" width="70%">
                                                                <table>
                                                                    <tr>
                                                                        <td width="20%">
                                                                            <a href="https://twitter.com/assistabi" target="_blank">
                                                                                <img width="10" class="logo-social" src="https://image.ibb.co/mSmWaa/ICONO_TWITTER.png"/>
                                                                            </a>
                                                                        </td>
                                                                        <td width="20%">
                                                                            <a href="https://www.facebook.com/assistabi" target="_blank">
                                                                                <img width="10" class="logo-social" src="https://image.ibb.co/b9iBaa/ICONO_FACE.png"/>
                                                                            </a>
                                                                        </td>
                                                                        <td width="20%">
                                                                            <a href="https://www.youtube.com/user/assistabi" target="_blank">
                                                                                <img width="10" class="logo-social" src="https://image.ibb.co/g3TNgF/ICONO_YOUTUBE.png"/>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                    </td>
                                </tr>
                            </table>
                        </body>
                    </html>`,
        // "css" : "Path to additional CSS file",
        "js" : "./uploads/news/index.js",
        // "runnings" : "Path to runnings file. Check further below for explanation.",
        "paperSize" : {format: 'A4', orientation: 'portrait', border: '0.1cm', delay: 2000},
        // "deleteOnAction" : true/false (Deletes the created temp file once you access it via toBuffer() or toFile()),
      // "runningsArgs": Object (You can pass an object to the runnings file when you have wrapped it with a function)
    }

    pdf.convert(options, function(err, result) {
        if(err) {
            return callback(err);
        }

        /* Using a buffer and callback */
        result.toBuffer(function(returnedBuffer) {});
     
        /* Using a readable stream */
        var stream = result.toStream();
     
        /* Using the temp file path */
        var tmpPath = result.getTmpPath();
     
        /* Using the file writer and callback */
        result.toFile(`./uploads/news/${ user._id }.pdf`, function() {
            console.log('pdf generado');
            callback(err, result);
        });
    });
   
}

module.exports = generatePDF