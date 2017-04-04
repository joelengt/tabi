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
                local: 'mongodb://localhost/tabi1',
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
            user : 'admin',
            pass : '12345678'
        },
        mailing: {
            user: 'joel.gonzales2110@gmail.com',
            pass: 'neypujbvyhvugxyw',
            receptor: 'joelengt@gmail.com'

        },
        cloudinary : {
            cloud_name: 'cromlu',
            api_key: '532668554832195',
            api_secret: 'PLstoVjJNoBiqPhNDGriHyVWVTc'
        },
        culqi:{
            key_api_dev: '5jaVROAEp51mE7Br8mdQ6dfVbEfhszNXQPB3GsI2Np4=',
            code_comercio_dev: 'vivPfq6XgLtM',
            key_api: 'zGdhpkAMeaG+lKcvj++e2me5b0YkhprNCCQIvLKinvs=',
            code_comercio: 'OgUFtt0jQKid'
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
            premium: 'premium'
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
    }
    
}

module.exports = config
