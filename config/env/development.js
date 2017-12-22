var config = {
    server: {
        env: 'development',
        port: 4000,
        path_system: {
            // server: '/root/tabi'
            server:    '.'
        },
        db: {
            mongodb: {
                local: 'mongodb://root:root@ds115411.mlab.com:15411/tabi',
            },
            postgresql: {
                local: 'postgres://root:postgres@localhost:4002/app_db',
            },
            mysql: {
                local: 'mysql://root:mysql@localhost:33060/app_db',
            }
        }
    },
    auth: {
        admin:{
            user : 'enrique_admin',
            pass : 'Enrique.123'
        },
        mailing: {
           user: 'tuvoucher@assistabi.com',
           pass: '16ry4BrT8e',
           receptor: 'hola@assistabi.com'
        },
        cloudinary : {
            cloud_name: 'cromlu',
            api_key: '532668554832195',
            api_secret: 'PLstoVjJNoBiqPhNDGriHyVWVTc'
        },
        culqi:{
            public_key: 'pk_test_FwE0vKV3KZwevsrA',
            private_key: 'sk_test_mCpkD0ccXRLLp87W'
        }
    },
    variables: {
        status: {
            pendiente:     'pendiente',
            en_proceso:    'en_proceso',
            resuelto:      'resuelto',
            no_resuelto:   'no_resuelto',
            cancelado:     'cancelado',
            reprogramado:  'reprogramado',
            reportado:     'reportado',
            no_asignado:   'no_asignado'
        },
        users_access: {
            onwers: 'onwers',
            admins: 'admins',
            officers: 'officers',
            viewer:    'officer-viewer',
            users_campo: 'users-campo'
        },
        typeUser: {
            premium: 'premium',
            normal: 'normal'
        },
        card_status: {
            read: true,
            no_read: false
        },
        notification_type: {
            reporte:       'reporte',
            change_status: 'change_status',
            new_order:     'new_order',
            type_answer: {
                reporte: {
                    aceptada: 'aceptada',
                    rechazada: 'rechazada'
                },
                change_status: {
                    cancelada: 'cancelada',
                    reprogramada: 'reprogramada',
                    actualizada: 'actualizada',
                    resuelta: 'resuelta',
                    progreso: 'progreso'
                },
                new_order: {
                    asignado: 'asignado'
                }
            }
        }
    },
    plans: [
      {
          title: 'INTERNATIONAL',
          pack: [
              {
                  days: '5',
                  tarifa: '25.00'
              },
              {
                  days: '8',
                  tarifa: '28.00'
              },
              {
                  days: '10',
                  tarifa: '30.00'
              },
              {
                  days: '15',
                  tarifa: '35.00'
              },
              {
                  days: '22',
                  tarifa: '45.00'
              },
              {
                  days: '30',
                  tarifa: '55.00'
              },
              {
                  days: '45',
                  tarifa: '90.00'
              },
              {
                  days: '60',
                  tarifa: '105.00'
              },
              {
                  days: '90',
                  tarifa: '120.00'
              }
          ],
          countries: ['Mundial', 'Caribe, Asia', 'USA'],
          card: {
              'left': {
                  'Asistencia Médica por Accidente': 'USD 20,000',
                  'Asistencia Médica por Enfermedad': 'USD 20,000',
                  'Atencion de Enfermedades Pre-Existentes': 'USD 1,000',
                  'Medicamentos Ambulatorios': 'USD 350',
                  'Medicamentos por Hospitalizacion': 'USD 500',
                  'Odontología de Urgencia': 'USD 230',
                  'Embarazo (hasta semana 24)': 'USD 2,000',
                  'Asistencia por Practica de Deporte': 'USD 3,000',
                  'Hospitalización': 'SI',
                  'Repatriación de Restos': 'USD 20,000',
                  'Traslado / Repatriación Sanitaria': 'USD 20,000',
                  'Traslado de Familiar por Hospitalizacion': 'SI'
              },
              'right': {
                  'Acompañamiento de Menores': 'SI',
                  'Gastos de Hotel por Convalecencia': 'USD 350',
                  'Rastreo de Equipaje': 'SI',
                  'Compensación por Pérdida de Equipaje': 'USD 1,000',
                  'Perdidad de Pasaporte': 'USD 75',
                  'Retraso de Vuelo': 'USD 100',
                  'Cancelación de Vuelo': 'USD 500',
                  'Transferencia de Fondos': 'USD 1,000',
                  'Transferencia de Fondos para Fianzas legal': 'USD 15,000',
                  'Asistencia legal en caso de Accidente de Tránsito': 'USD 2,300',
                  'Transmisión de Mensajes Urgentes.': 'SI',
                  'Responsabilidad Civil (daño a terceros)': 'USD 500',
                  'Línea Medica 24 hs.': 'SI',
                  'Límite de edad': '84 años'
              }
          },
          telephones: {
            left: {
              'Argentina': '(+54) 1150328122',
              'Australia': '(+61) 280 113 497',
              'Brasil': '(+55) 113 042 2868',
              'Canadá': '(+1) 800 969 5192',
              'Chile': '(+56) 225 813 553',
              'Colombia': '(+57) 1 381 65 58',
              'Colombia': '(+57) 5 316 1038',
              'Ecuador': '(+593) 225 505 82',
              'Europa': '(+34) 910 80 76 58'
            },
            right: {
              'Hong Kong': '(+852) 8199 0280',
              'Israel': '(+972) 237 401 40',
              'México': '(+52) 558 421 2528',
              'Panamá': '(+507) 83 36 754',
              'Perú': '(+51) 1 641 92 32',
              'Reino Unido': '(+44) 207 1934746',
              'República Dom.': '(+1) 829 249 6982',
              'Venezuela': '(+58) 2123357800',
              'USA / Caribe': '(+1) 302 300 1734'
            }
          },
          whatsapp: '(+1) 954 2744 943 - (+1) 904 8885508',
          conditions: ''
      },
      {
          title: 'EUROPA',
          pack: [
              {
                  days: '5',
                  tarifa: '32.00'
              },
              {
                  days: '8',
                  tarifa: '40.00'
              },
              {
                  days: '10',
                  tarifa: '49.00'
              },
              {
                  days: '15',
                  tarifa: '66.00'
              },
              {
                  days: '22',
                  tarifa: '73.00'
              },
              {
                  days: '30',
                  tarifa: '80.00'
              },
              {
                  days: '45',
                  tarifa: '115.00'
              },
              {
                  days: '60',
                  tarifa: '125.00'
              },
              {
                  days: '90',
                  tarifa: '135.00'
              }
          ],
          countries: ['Mundial', 'Europa'],
          card: {
              'left': {
                  'Asistencia Médica por Accidente': 'EUR 70,000',
                  'Asistencia Médica por Enfermedad': 'EUR 70,000',
                  'Compensacion por Muerte en Transporte Publico': 'EUR 10,000',
                  'Atencion de Enfermedades Pre-Existentes': 'EUR 1,000',
                  'Medicamentos Ambulatorios': 'EUR 350',
                  'Medicamentos por Hospitalización': 'EUR 500',
                  'Odontología de Urgencia': 'EUR 230',
                  'Embarazo (hasta semana 24)': 'EUR 2000',
                  'Asistencia por Practica de Deporte': 'EUR 3,000',
                  'Hospitalizacion': 'SI',
                  'Repatriación de Restos': 'EUR 30,000',
                  'Traslado / Repatriación Sanitaria': 'EUR 30,000',
                  'Traslado de Familiar por Hospitalizacion': 'SI',
              },
              'right': {
                  'Acompañamiento de Menores': 'SI',
                  'Gastos de hotel por Convalecencia': 'EUR 350',
                  'Rastreo de Equipaje': 'SI',
                  'Compensación por Pérdida de Equipaje': 'EUR 1,200',
                  'Perdida de Pasaporte': 'EUR 75',
                  'Retrazo de vuelo': 'EUR 100',
                  'Cancelación de Vuelo': 'EUR 500',
                  'Transferencia de Fondos': 'EUR 1,000',
                  'Transferencia de fondos para Fianza Legal': 'EUR 15,000',
                  'Asistencia Legal en caso de Accidente de Tránsito': 'EUR 2,300',
                  'Transmisión de Mensajes Urgentes': 'SI',
                  'Responsabilidad Civil (daño a terceros)': 'EUR 500',
                  'Línea Medica 24 hs.': 'SI',
                  'Límite de edad': '84 años'
              }
          },
          telephones: {
            left: {
              'Argentina': '(+54) 115 032 8122',
              'Australia': '(+61) 280 113 497',
              'Brasil': '(+55) 113 042 2868',
              'Canadá': '(+1) 800 969 5192',
              'Chile': '(+56) 225 813 553',
              'Colombia': '(+57) 1 381 65 58',
              'Colombia': '(+57) 5 316 1038',
              'Ecuador': '(+593) 225 505 82',
              'Europa': '(+34) 910 80 76 58'
            },
            right: {
              'Hong Kong': '(+852) 8199 0280',
              'Israel': '(+972) 237 401 40',
              'México': '(+52) 558 421 2528',
              'Panamá': '(+507) 83 36 754',
              'Perú': '(+51) 1 641 92 32',
              'Reino Unido': '(+44) 207 1934746',
              'República Dom.': '(+1) 829 249 6982',
              'Venezuela': '(+58) 2123357800',
              'USA / Caribe': '(+1) 302 300 1734'
            }
          },
          whatsapp: '(+1) 954 2744 943 - (+1) 904 8885508',
          'conditions': ''
      },
      {
          title: 'STUDENT',
          pack: [
              {
                  days: '120',
                  tarifa: '149.00'
              },
              {
                  days: '150',
                  tarifa: '169.00'
              },
              {
                  days: '180',
                  tarifa: '179.00'
              },
              {
                  days: '210',
                  tarifa: '239.00'
              },
              {
                  days: '240',
                  tarifa: '259.00'
              },
              {
                  days: '270',
                  tarifa: '319.00'
              },
              {
                  days: '300',
                  tarifa: '349.00'
              },
              {
                  days: '330',
                  tarifa: '399.00'
              },
              {
                  days: '365',
                  tarifa: '419.00'
              }
          ],
          countries: ['Europa', 'Mundial'],
          card: {
              'left': {
                  'Asistencia Médica por Accidente': 'EUR 60,000',
                  'Asistencia Médica por Enfermedad': 'EUR 60,000',
                  'Atencion de Enfermedades Pre-ExistentesUSD': 'USD 300',
                  'Medicamentos Ambulatorios': 'USD 1,000',
                  'Días Complementarios de Internación': '5 días',
                  'Hospitalización': 'SI',
                  'Asistencia en caso de Extravío de Documentos': 'SI',
                  'Gastos de Hotel Familiar Acompañante': 'USD 500',
                  'Gastos de Hotel por Convalecencia': 'USD 300',
                  'Embarazo (hasta semana 24)': 'SI',
                  'Viaje de Regreso por Enfermedad': 'SI',
                  'Repatriación de Restos': 'SI'
              },
              'right': {
                  'Traslado y Repatriación Sanitaria': 'SI',
                  'Odontología de Urgencia': 'USD 350',
                  'Compensación por Pérdida de Equipaje': 'USD 500',
                  'Gastos por Demora de Equipaje': 'USD 100',
                  'Traslado de Familiar en caso de Internación': 'SI',
                  'Asistencia Legal en Caso de Accidente de TránsitoUSD': 'USD 1,000',
                  'Adelanto de Fianzas': 'USD 2,500',
                  'Transferencia de Fondos': 'USD 2,000',
                  'Transmisión de Mensajes Urgentes.': 'SI',
                  'Línea de consulta 24 hs': 'SI',
                  'Límite de edad': '50 años'
              }
          },
          telephones: {
            left: {
              'Argentina Nacional': '0800 444 2774',
              'Argentina': '(+54) 11 21503000',
              'Australia': '(+61) 29 1882134',
              'Brasil': '(+55) 800 5911025',
              'Chile': '(+56) 22 9381224',
              'Colombia': '(+57) 1 3819062',
              'España': '(+34) 800 080022',
              'Estados Unidos': '(+1) 855 8596448',
              'Francia': '(+33) 805 321022',
              'Holanda': '(+31) 20 2170259',
              'Israel': '(+972) 1809 494502'
            },
            right: {
              'Italia': '(+39) 800 142822',
              'México': '(+52) 800 2691349',
              'Perú': '(+51) 1 6419109',
              'Portugal': '(+35) 800 502305',
              'Reino Unido': '(+44) 800 9496900',
              'Rep. Dominicana ': '(+1) 829 9465940',
              'Sudáfrica': '(+27) 87 5501907',
              'Tailandia': '(+66) 60 0035058',
              'Uruguay': '(+598) 25182441',
              'Resto del mundo': '(+598) 25182441',
              'Fax': '(+54) 11 3220 2199'
            }
          },
          whatsapp: '(+54) 911 35869793',
          'conditions': ''
      }
    ]
}

module.exports = config
