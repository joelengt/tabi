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
                            <meta name="description" content="Plan imparable Sura. El programa que te permite diseñar la solución a tu medida para darle el mejor uso a tu fondo de pensiones."/>

                            <title>Plan imparable Sura</title>
                            <style>
                                .text-content{
                                    font-family: Arial !important;
                                    color: #01349f !important;
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
                                @media only screen and (max-width: 900px) {
                                    table {
                                        width: 100%;
                                    }
                                    .icon-check{
                                        max-width: 65px !important;
                                    }
                                    .icon-point{
                                        width: 18px !important;
                                    }
                                    .small-text{
                                        font-size: 9px !important;
                                        color: #989898 !important;
                                    }
                                    .main-logo {
                                        width: 180px;
                                    }
                                    .logo-social {
                                        width: 30px !important;
                                    }
                                }
                                @media only screen and (max-width: 600px) {
                                    b{
                                        font-size: 16px !important;
                                    }
                                    .monto{
                                        font-size: 32px !important;
                                    }
                                    .section{
                                        display: block !important;
                                        width: 100% !important;
                                        max-width: 100% !important;
                                        direction: ltr !important;
                                    }
                                    .icon-check{
                                        max-width: 50px !important;
                                    }
                                    .home{
                                      padding: 0px 20px !important;
                                    }
                                    .docs{
                                      font-size: 16px !important;
                                    }
                                    .cell-enlace{
                                        width: 70%;
                                    }
                                    .cell-icons{
                                        width: 30%;
                                    }
                                }
                            </style>

                        </head>
                        <body style="margin: 0;">
                            <table bgcolor="f5f5f5" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-family: Arial, sans-serif; margin: 0 auto; background: #f5f5f5; color: #01349f">
                                <tr>
                                    <td align="center" valign="top">
                                        <table class="home" align="center" cellpadding="0" cellspacing="0" width="100%" bgcolor="white" align="center" style="padding: 0px 40px">
                                            <tr>
                                                <td align="center">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td align="right" width="200">
                                                                <span></span>
                                                            </td>
                                                            <td align="right" width="200">
                                                                <span></span>
                                                            </td>
                                                            <td align="right" style="text-align: right; padding-top: 30px;" width="200">
                                                                <a href="http://www.integra.com.pe/" target="_blank" style="display: inline-block;">
                                                                    <img class="afp" src="https://image.ibb.co/fKUTMF/logo.png" alt="AFP Integra" width="200"/>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-top: 10px;padding-bottom: 10px;">
                                                    <h2 id="name" class="text-content" style="font-size: 25px;">Hola, ${ user._id }</h2>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table width="100%" align="left">
                                                        <tr>
                                                            <td align="left">
                                                                <img src="https://image.ibb.co/cX3f1F/ICONO_1.png" width="65" />
                                                            </td>
                                                            <td>
                                                                <b class="text-content" style="font-size: 19px;">Al 20 de febrero del 2017 tienes ahorrado para tu pensión</b>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                              <td align="center">
                                                <table border="0" cellpadding="0" cellspacing="0">
                                                  <tr>
                                                    <td align="center" style="font-weight:bold; font-family: Arial;">
                                                        <h2 class="monto" style="text-align: center; color: #00aac5; font-size: 40px; margin: 0; margin-bottom: 22px;">S/ 13, 380.46</h2>
                                                    </td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td align="center">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                  <tr>
                                                    <td style="border-bottom: 1px solid #D6D6D6;"><span></span></td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table width="100%" align="left">
                                                        <tr>
                                                            <td><img src="https://image.ibb.co/jDHF1F/ICONO_2.png" width="65" alt="Aportes" /></td>
                                                            <td><b class="text-content" style="font-size: 19px;">Aportes realizados en los últimos 12 meses</b></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" valign="top" bgcolor="FFFFFF">
                                                    <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                                        <tr>
                                                            <td align="center" valign="top" style="padding-top: 10px; padding-bottom: 10px;">
                                                                <table>
                                                                    <tr>
                                                                        <td class="text-meses" align="center" valign="top" style="font-family: Arial; font-weight: bold !important; color: #989898 !important;padding-bottom: 10px !important;">Dic 16</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" valign="top">
                                                                            <img src="https://image.ibb.co/e9G01F/CHECK_GREEN.png" alt="check" class="icon-check" width="65">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td align="center" valign="top" style="padding-top: 10px; padding-bottom: 10px;">
                                                                <table>
                                                                    <tr>
                                                                        <td class="text-meses" align="center" valign="top" style="font-family: Arial; font-weight: bold !important; color: #989898 !important;padding-bottom: 10px !important;">Nov 16</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" valign="top">
                                                                            <img src="https://image.ibb.co/e9G01F/CHECK_GREEN.png" alt="check" class="icon-check" width="65">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td align="center" valign="top" style="padding-top: 10px; padding-bottom: 10px;">
                                                                <table>
                                                                    <tr>
                                                                        <td class="text-meses" align="center" valign="top" style="font-family: Arial; font-weight: bold !important; color: #989898 !important;padding-bottom: 10px !important;">Oct 16</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" valign="top">
                                                                            <img src="https://image.ibb.co/e9G01F/CHECK_GREEN.png" alt="check" class="icon-check" width="65">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center" valign="top" style="padding-top: 10px; padding-bottom: 10px;">
                                                                <table>
                                                                    <tr>
                                                                        <td class="text-meses" align="center" valign="top" style="font-family: Arial; font-weight: bold !important; color: #989898 !important;padding-bottom: 10px !important;">Set 16</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" valign="top">
                                                                            <img src="https://image.ibb.co/e9G01F/CHECK_GREEN.png" alt="check" class="icon-check" width="65">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td align="center" valign="top" style="padding-top: 10px; padding-bottom: 10px;">
                                                                <table>
                                                                    <tr>
                                                                        <td class="text-meses" align="center" valign="top" style="font-family: Arial; font-weight: bold !important; color: #989898 !important;padding-bottom: 10px !important;">Ago 16</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" valign="top">
                                                                            <img src="https://image.ibb.co/e9G01F/CHECK_GREEN.png" alt="check" class="icon-check" width="65">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td align="center" valign="top" style="padding-top: 10px; padding-bottom: 10px;">
                                                                <table>
                                                                    <tr>
                                                                        <td class="text-meses" align="center" valign="top" style="font-family: Arial; font-weight: bold !important; color: #989898 !important;padding-bottom: 10px !important;">Jul 16</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" valign="top">
                                                                            <img src="https://image.ibb.co/e9G01F/CHECK_GREEN.png" alt="check" class="icon-check" width="65">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center" valign="top" style="padding-bottom: 10px; padding-top: 10px;">
                                                                <table>
                                                                    <tr>
                                                                        <td class="text-meses" align="center" valign="top" style="font-family: Arial; font-weight: bold !important; color: #989898 !important;padding-bottom: 10px !important;">Jun 16</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" valign="top">
                                                                            <img src="https://image.ibb.co/e9G01F/CHECK_GREEN.png" alt="check" class="icon-check" width="65">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td align="center" valign="top" style="padding-bottom: 10px; padding-top: 10px;">
                                                                <table>
                                                                    <tr>
                                                                        <td class="text-meses" align="center" valign="top" style="font-family: Arial; font-weight: bold !important; color: #989898 !important;padding-bottom: 10px !important;">May 16</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" valign="top">
                                                                            <img src="https://image.ibb.co/e9G01F/CHECK_GREEN.png" alt="check" class="icon-check" width="65">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td align="center" valign="top" style="padding-bottom: 10px; padding-top: 10px;">
                                                                <table>
                                                                    <tr>
                                                                        <td class="text-meses" align="center" valign="top" style="font-family: Arial; font-weight: bold !important; color: #989898 !important;padding-bottom: 10px;">Abr 16</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" valign="top">
                                                                            <img src="https://image.ibb.co/eQTDMF/CHECK_RED.png" alt="check" class="icon-check" width="65">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center" valign="top" style="padding-top: 10px; padding-bottom: 10px;">
                                                                <table>
                                                                    <tr>
                                                                        <td class="text-meses" align="center" valign="top" style="font-family: Arial; font-weight: bold !important; color: #989898 !important;padding-bottom: 10px !important;">Mar 16</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" valign="top">
                                                                            <img src="https://image.ibb.co/e9G01F/CHECK_GREEN.png" alt="check" class="icon-check" width="65">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td align="center" valign="top" style="padding-top: 10px; padding-bottom: 10px;">
                                                                <table>
                                                                    <tr>
                                                                        <td class="text-meses" align="center" valign="top" style="font-family: Arial; font-weight: bold !important; color: #989898 !important;padding-bottom: 10px !important;">Feb 16</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" valign="top">
                                                                            <img src="https://image.ibb.co/e9G01F/CHECK_GREEN.png" alt="check" class="icon-check" width="65">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td align="center" valign="top" style="padding-top: 10px; padding-bottom: 10px;">
                                                                <table>
                                                                    <tr>
                                                                        <td class="text-meses" align="center" valign="top" style="font-family: Arial; font-weight: bold !important; color: #989898 !important;padding-bottom: 10px !important;">Ene 16</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" valign="top">
                                                                            <img src="https://image.ibb.co/e9G01F/CHECK_GREEN.png" alt="check" class="icon-check" width="65">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" valign="top" style="padding-top: 8px; padding-bottom: 8px;">
                                                  <table width="100%">
                                                    <tr>
                                                        <td align="left" class="section" valign="middle" style="color: #989898 !important;"><span class="small-text">*Historial de los aportes en los últimos 12 meses.</span></td>
                                                        <td align="center" class="section" valign="top">
                                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                <tr>
                                                                    <td align="left" valign="middle" style="padding-right: 5px;">
                                                                        <img src="https://image.ibb.co/j42hgF/PUNTO_GREEN.png" alt="point" class="icon-point" width="15">
                                                                    </td>
                                                                    <td align="left" valign="middle" class="small-text" style="color: #989898 !important;">Mes donde has aportado</td>
                                                                    <td align="left" valign="middle" style="padding-right: 5px;">
                                                                        <img src="https://image.ibb.co/ne7F1F/PUNTO_RED.png" alt="point" class="icon-point" width="15">
                                                                    </td>
                                                                    <td align="left" valign="middle" class="small-text" style="color: #989898 !important;">Mes donde no has aportado</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                  </table>  
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" valign="middle">
                                                    <img src="https://image.ibb.co/mh1KTv/LINEA_VER_MAS.jpg" width="100%" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" valign="top">
                                                  <table width="100%" align="left">
                                                      <tr>
                                                          <td>
                                                              <img src="https://image.ibb.co/g19TMF/ICONO_3.png" width="65" />
                                                          </td>
                                                          <td style="font-family: Arial;">
                                                              <p><b class="text-content" style="font-size: 19px;">Tus aportes están invertidos en:</b> <b style="color: #00aac5; font-size: 18px; padding-left: 10px;"> Fondo</b><b style="font-size: 28px; padding-left: 5px;color: #01349f;"> 2*</b></p>
                                                          </td>
                                                      </tr>
                                                  </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" valign="middle" style="padding-bottom: 3px;">
                                                    <img src="https://image.ibb.co/dPWpva/CUADRO_DE_FONDO.jpg" width="100%"/>
                                                </td>
                                            </tr>
                                            <tr>
                                              <td align="center" valign="top" style="padding-top: 6px; padding-bottom: 5px;">
                                                <table width="100%">
                                                  <tr>
                                                    <td align="center" valign="top">
                                                        <p class="small-text" style="text-align: center; color: #989898; font-size: 12px;">La descripción del tipo de fondo es referencial y no constituye una recomendación.</p>
                                                    </td>
                                                    
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td align="center">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                  <tr>
                                                    <td style="border-bottom: 1px solid #D6D6D6;"><span></span></td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                                <td align="left" valign="middle" style=" padding-top: 15px; padding-bottom: 25px;">
                                                    <p class="docs" style="color: #989898; font-weight: bold; font-size: 18px;font-family: Arial;">
                                                        Recuerda que la contraseña para abrir tu Estado de Cuenta adjunto es el número de tu documento de identidad (DNI, Carnet Extranjería o Pasaporte).
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table width="100%" align="left" style="padding-bottom: 10px;">
                                                        <tr>
                                                            <td class="cell-enlace" width="30%" style="font-family: Arial;">
                                                                <a style="color: #01349f; text-decoration: none; font-size: 20px;" href="http://www.integra.com.pe/" target="_blank">integra.com.pe</a>
                                                            </td>
                                                            <td class="cell-icons" width="70%">
                                                                <table>
                                                                    <tr>
                                                                        <td width="20%">
                                                                            <a href="https://twitter.com/suraperu?lang=es" target="_blank">
                                                                                <img class="logo-social" src="https://image.ibb.co/mSmWaa/ICONO_TWITTER.png"/>
                                                                            </a>
                                                                        </td>
                                                                        <td width="20%">
                                                                            <a href="https://www.facebook.com/suraperu" target="_blank">
                                                                                <img class="logo-social" src="https://image.ibb.co/b9iBaa/ICONO_FACE.png"/>
                                                                            </a>
                                                                        </td>
                                                                        <td width="20%">
                                                                            <a href="https://www.youtube.com/user/SURAPeru" target="_blank">
                                                                                <img class="logo-social" src="https://image.ibb.co/g3TNgF/ICONO_YOUTUBE.png"/>
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
        "paperSize" : {format: 'A4', orientation: 'portrait', border: '1cm', delay: 2000},
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