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
            user: 'joel.gonzales2110@gmail.com',
            pass: 'neypujbvyhvugxyw',
            receptor: 'enrique.6782@gmail.com'

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
