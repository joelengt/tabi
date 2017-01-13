var config = {
    server: {
        env: 'production',
        port: 5002,
        path_system: {
            server: '/root/app'
        },
        db: {
            mongodb:{
                local: 'mongodb://root:mongodb@ds163758.mlab.com:63758/app_db'
            },
            postgresql: {
                local: 'postgres://root:postgresql@localhost:5432/app_db',
            },
            mysql: {
                local: 'mysql://root:mysql@localhost:3306/app_db',
            }
        }
    },
    auth: {
        admin:{
            user : 'admin',
            pass : '12345678'
        },
        
        cloudinary : {
            cloud_name: 'cromlu',
            api_key: '532668554832195',
            api_secret: 'PLstoVjJNoBiqPhNDGriHyVWVTc'
        },
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
