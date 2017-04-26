var config = {
    server: {
        env: 'production',
        port: 4000,
        path_system: {
            // server: '/root/tabi'
            server:    '.'
        },
        db: {
            mongodb: {
                local: 'mongodb://localhost/tabi2',
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
            public_key: 'pk_live_dVxLucL29Kytrtx1',
            private_key: 'sk_live_WdQ8c1XH8y1jG8L4'
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
