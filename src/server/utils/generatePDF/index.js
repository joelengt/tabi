var pdf = require('phantom-html2pdf');
var config = require('../../../../config/index.js')
var fs = require('fs');

function generatePDF(user, pack_details, venta, callback) {

    console.log('Dentro del callback');

    console.log('datos obtenidos');

    console.log('>user');
    console.log(user);

    console.log('>pack_details');
    console.log(pack_details);

    console.log('>venta');
    console.log(venta);

    // evaluando los detalles
    var table_left = '';
    var table_right = '';
    var telephones_left = '';
    var telephones_right = ''

    var today = new Date()

    var today_day = today.getDate()
    var today_month = today.getMonth() + 1
    var today_year = today.getFullYear()

    var today_pretty = `${today_year}-${today_month}-${today_day}`;

    // table beneficies left
    for(let u in pack_details.card.left) {
      table_left += `<tr>
                          <td>
                              <p style="font-size:8px; margin: 2px;">${ u }</p>
                          </td>
                          <td>
                              <p style="font-size:8px; margin: 2px;">${ pack_details.card.left[`${u}`] }</p>
                          </td>
                      </tr>`
    }

    // table beneficies right
    for(let a in pack_details.card.right) {
      table_right += `<tr>
                          <td>
                              <p style="font-size:8px; margin: 2px;">${ a }</p>
                          </td>
                          <td>
                              <p style="font-size:8px; margin: 2px;">${ pack_details.card.right[`${a}`] }</p>
                          </td>
                      </tr>`
    }

    // list telephones left
    for(let tel in pack_details.telephones.left) {
      telephones_left += `<p style="margin:1px; font-size: 10px;">${ tel } ${ pack_details.telephones.left[`${tel}`] }</p>`
    }

    // list telephones right
    for(let tel in pack_details.telephones.right) {
      telephones_right += `<p style="margin:1px; font-size: 10px;">${ tel } ${ pack_details.telephones.right[`${tel}`] }</p>`
    }

    /* Evaluate term and conditions */
    function kindTermsConditions(title) {
      let template
      switch(title) {
        case 'STUDENT':
          template = `<p style="text-align: left;">Condiciones Generales de Contratacion disponibles en <a href="https://assistabi.com/CondicionesPlanStudentTabiAssist.pdf">https://assistabi.com/CondicionesPlanStudentTabiAssist.pdf</a></p>`
          break;

        default:
          template = `<p style="text-align: left;">Condiciones Generales de Contratacion disponibles en <a href="https://assistabi.com/CondicionesGeneralesTabiAssist.pdf">https://assistabi.com/CondicionesGeneralesTabiAssist.pdf</a></p>`

      }

      return template
    }

    var template =  `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
                        <html xmlns="http://www.w3.org/1999/xhtml" lang="es">
                          <head>
                            <meta charset="utf-8"/>
                            <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">-->
                            <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
                            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                            <meta name="robots" content="noodp,noydir"/>
                            <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1"/>
                            <meta name="description" content="Assist Tabi - Viaja, Disfruta, Explora Disfruta de tu viaje"/>
                            <title>Tabi</title>
                            <style>.text-content{font-family: Arial !important; color: black !important; } .small-text{font-family: Arial !important; font-size: 9px !important; color: #989898 !important; } .text-meses{font-weight: bold !important; color: #989898 !important; } .afp{max-width: 200px; }</style>
                            <style>b {font-size: 10px; } p {font-size: 10px; text-align: justify;}</style>
                          </head>
                          <body style="margin: 0;">
                            <table bgcolor="f5f5f5" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-family: Arial, sans-serif; margin: 0 auto; background: #f5f5f5; color: black">
                              <tr>
                                <td align="center" valign="top">
                                  <table align="center" cellpadding="0" cellspacing="0" width="100%" bgcolor="white" style="padding: 0px 40px" class="home">
                                    <tr>
                                      <td align="center">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                          <tr>
                                            <td style="text-align: left; padding-top: 30px;" width="50%"><a href="http://www.integra.com.pe/" target="_blank" style="display: inline-block;"><img src="https://assistabi.com/images/logo.png" alt="AFP Integra" width="400" class="afp"/></a></td>
                                            <td style="text-align: left; padding-top: 30px;" width="50%">
                                              <p style="margin: 0;"><b style="color: #017098;">VOUCHER ${ venta.numero_pedido }</b></p>
                                              <p style="margin: 0;">ticket: ${ venta.ticket }</p>
                                              <p style="margin: 0;">Vigencia/Validity ${ user.cotizator.salida } al/to ${ user.cotizator.regreso }</p>
                                              <p style="margin: 0;">Cobertura/Service ${ user.cotizator.tipo_viaje }</p>
                                              <p style="margin: 0;">Fecha de emisión/Date of Issue ${ today_pretty }</p>
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
                                    <tr> </tr>
                                    <tr>
                                      <td>
                                        <table width="100%">
                                          <tr>
                                            <td valign="top" style="vertical-align=" padding-top:="" width="50%"><b style="margin: 0; border-bottom: 1px solid #017098;">Pasajero/Passenger: ${ Number(user.cotizator.pasajero) + Number(user.cotizator.adulto_mayor) }</b>
                                              <p style="margin: 0; padding-top: 10px"><b>Nombre/Name:</b> ${ user.account.names }, ${ user.account.last_names }</p>
                                              <p style="margin: 0;"><b>Documento/ID Number (${ user.account.tipo_doc }) :</b> ${ user.account.doc_number }</p>
                                              <p style="margin: 0;"><b>Nacimiento/Birthdate:</b> ${ user.account.fecha_nacimiento }</p>
                                              <p style="margin: 0;"><b>Teléfono/Phone:</b> ${ user.account.phone }</p>
                                              <p style="margin: 0;"><b>Email:</b> ${ user.account.email }</p>
                                            </td>
                                            <td valign="top" style="vertical-align=" padding-top:="" width="50%"><b style="margin: 0; border-bottom: 1px solid #017098;">Contacto de emergencia/Emergency Contact</b>
                                              <p style="margin: 0; padding-top: 10px"><b>Nombre/Name:</b> ${ user.account.contact_emergencia.nombres }, ${ user.account.contact_emergencia.apellidos }</p>
                                              <p style="margin: 0;"><b>Teléfono/Phone:</b> ${ user.account.contact_emergencia.telefono }</p>
                                              <p style="margin: 0;"><b>Email:</b> ${ user.account.contact_emergencia.email }</p>
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
                                      <td>
                                        <p style="margin: 0; font-size: 10px;">Tabi Assist cuenta con los siguientes números de acceso para comunicarse con una central de asistencia. Para obtener asistencia es requisito indispensable llamarnos previamente (en caso de estar imposibilitado/a debe hacerlo dentro de las 24hs de ocurrido el evento)</p>
                                      <td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <table width="100%" style="padding-top: 5px;padding-bottom: 5px;">
                                          <tr>
                                           <td valign="top" width="50%">
                                            ${ telephones_left }
                                           </td>
                                           <td valign="top" width="50%">
                                            ${ telephones_right }
                                           </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <table width="100%">
                                          <tr>
                                            <td align="center">
                                                <h2 style="font-size: 10px; margin: 0; color: #017098;">${ pack_details.title }</h2>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center">
                                                <b style="display: block; margin: 0;">Tarjeta de Asistencia</b>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <table width="100%" style="padding-top: 5px;padding-bottom: 5px;">
                                          <tr>
                                            <td valign="top" width="50%">
                                              <table width="100%">
                                                <tr style="background: #017098;">
                                                    <td>
                                                        <p style="color: white; padding: .1rem; background: #017098;font-size:10px; margin: 1px;">Beneficios</p>
                                                    </td>
                                                    <td>
                                                        <p style="color: white; padding: .1rem; background: #017098;font-size:10px; margin: 1px;">Cobertura</p>
                                                    </td>
                                                </tr>
                                                ${ table_left }
                                              </table>
                                            </td>
                                            <td valign="top" width="50%">
                                              <table width="100%">
                                                <tr style="background: #017098;">
                                                    <td>
                                                        <p style="color: white; padding: .1rem; background: #017098;font-size:10px; margin: 1px;">Beneficios</p>
                                                    </td>
                                                    <td>
                                                        <p style="color: white; padding: .1rem; background: #017098;font-size:10px; margin: 1px;">Cobertura</p>
                                                    </td>
                                                </tr>
                                                ${ table_right }
                                              </table>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p style="font-size: 10px">Las llamadas deben efectuarse desde teléfonos fijos. En caso de que le facturen la llamada, solicite y guarde un comprobante, le reembolsaremos el costo de la misma. También puede comunicarse con nosotros vía email:
                                        <b style="font-size: 10px"><a href="#">hola@assistabi.com</a></b> o a través del <b style="font-size: 10px">Whatsapp: ${ pack_details.whatsapp }</b></p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="center">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom: 120px;">
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
                                              <p style="text-align: center; color: #017098; font-size: 12px; margin: 0; margin-bottom: 22px;" class="monto">RECOMENDACIONES DE USO DE ASISTENCIA AL VIAJERO</p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td><b style="margin: 0; border-bottom: 1px solid #017098; color: #017098;">ANTES DEL VIAJE</b></td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p style="margin: 5px auto; margin-top: 5px;">VERIFICACION</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p style="margin: 0;">Verifique que todos los datos consignados en su voucher Tabi Assist sean correctos. Controle especialmente los teléfonos indicados como contacto de emergencia, las fechas de vigencia y el tipo de cobertura adquirido. SI hay errores en los datos, comuníquese al correo <a href="#">hola@assistabi.com</a></p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p style="margin: 5px auto; margin-top: 10px;">CANCELACIÓN</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p style="margin: 0; margin-bottom: 10px;">Si el producto adquirido por Ud. incluye Seguro de Cancelación y debe cancelar su viaje (ver condiciones generales para limitaciones y exclusiones) comuníquese antes de las 48hs al correo <a href="#">hola@assistabi.com</a></p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td><b style="margin: 0; border-bottom: 1px solid #017098; color: #017098;">DURANTE EL VIAJE</b></td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p style="margin: 5px auto; margin-top: 5px;">COMUNICARSE CON LA CENTRAL DE ASISTENCIA</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p style="margin: 0;">En la página 1 del presente voucher encontrará un listado completo de números de acceso de la central de asistencia de Tabi Assist. Consulte en el listado el número de la central más próxima. SI no hubiese un número de acceso en el país en que Ud. se encuentra, comuníquese por el sistema COBRO REVERTIDO (COLLECT CALL en inglés). Si el país en donde Ud. se encuentra no admite el sistema de comunicación COBRO REVERTIDO, efectúe la llamada a su cargo y a su regreso presente el comprobante a Tabi Assist para su reembolso. Las centrales de asistencia atienden las 24hs. Antes de llamar para solicitar nuestros servicios, tenga a mano la siguiente información: Su voucher, tarjeta o credencial. Número de teléfono de donde se encuentra (incluyendo código de país y código de ciudad). Los datos del lugar en que se encuentra (domicilio, hotel, etc.)</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p style="margin: 5px auto;">SI LA NATURALEZA DE SU INCONVENIENTE LE PERMITE COMUNICARSE CON Tabi Assist Comuníquese con la central de asistencia y siga las instrucciones del operador</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p style="margin: 5px auto;">SI EL PROBLEMA DE SALUD ES GRAVE O LA NECESIDAD DE ASISTENCIA ES MUY URGENTE Y NO ESTA EN CONDICIONES DE COMUNICARSE CON Tabi Assist. Es fundamental que Ud. reciba asistencia médica inmediata en el lugar en que se encuentre. Luego, indefectiblemente dentro de las 24hs siguientes, Ud. o cualquier persona que lo acompañe deberá comunicarse con Tabi Assist y proporcionar toda la información referida al evento sufrido y la asistencia recibida. Tabi Assist se pondrá en contacto con el centro asistencial para controlar todas las fases de la prestación del servicio.</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p style="margin-bottom: 3px;">EN CASO DE DEMORA O EXTRAVIO DE EQUIPAJE</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p style="margin: 0;">Apenas constate la falta de su equipaje, diríjase al mostrador de la compañía aérea. Obtenga y complete el formulario PIR (Property Irregularity Report) provisto por la línea aérea. Antes de abandonar el aeropuerto, comuníquese con la central de asistencia de Tabi Assist.</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        ${ kindTermsConditions(pack_details.title) }
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <table width="100%" align="left" style="padding-bottom: 50px;" bgcolor="white">
                                          <tr>
                                            <td valign="top" width="50%" style="font-family: Arial;" class="cell-enlace">
                                              <table width="100%" bgcolor="white">
                                                <tr>
                                                  <td>
                                                    <a style="color: #017098; text-decoration: none; font-size: 10px;" href="https://www.assistabi.com/" target="_blank">www.assistabi.com</a>
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                            <td valign="top" width="50%" class="cell-icons">
                                              <table width="100%" bgcolor="white">
                                                <tr>
                                                  <td width="60%"><p></p></td>
                                                  <td width="10%"><a href="https://twitter.com/TabiAssist" target="_blank"><img width="10" src="https://image.ibb.co/mSmWaa/ICONO_TWITTER.png" class="logo-social"/></a></td>
                                                  <td width="10%"><a href="https://www.facebook.com/TabiAssist/" target="_blank"><img width="10" src="https://image.ibb.co/b9iBaa/ICONO_FACE.png" class="logo-social"/></a></td>
                                                  <td width="10%"><a href="https://www.instagram.com/tabiassist/" target="_blank"><img width="10" src="https://image.ibb.co/g3TNgF/ICONO_YOUTUBE.png" class="logo-social"/></a></td>
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
                        </html>`;

    console.log('Para crear ele html');

    // crear file html;
    fs.writeFile(`./uploads/news/${ user._id }.html`, template , function(error){
        if (error) {
            console.log(error);

        } else {

            console.log('El archivo html fue creado');

            var options = {
                html: `./uploads/news/${ user._id }.html`,
                paperSize: {format: 'A4', orientation: 'portrait', border: '0.1cm', delay: 2000}
            }

            console.log('Antes de convertir los datos y template a pdf');

            pdf.convert(options, function(err, result) {
                if(err) {
                    return callback(err);
                }

                console.log('Entro al pdorceos');

                /* Using a buffer and callback */
                result.toBuffer(function(returnedBuffer) {});

                console.log('listo para stremin');

                /* Using a readable stream */
                var stream = result.toStream();

                console.log('Convertirn en cade');

                /* Using the temp file path */
                var tmpPath = result.getTmpPath();

                console.log('Antes de toFile');
                /* Using the file writer and callback */
                result.toFile(`${ config.server.path_system.server }/uploads/news/${ user._id }.pdf`, function() {
                    console.log('pdf generado');
                    callback(err, result);
                });
            });
        }
    });

}

module.exports = generatePDF
