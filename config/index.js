var config = {
    server: {
        port: 5000,
        path_system: {
            ubuntu: '/home/baudelaire/Desktop/astrumApp',
            server: '/root/astrum',
            mac:    '/Users/joelengt/Desktop/coder/astrum'
        },
        db: {
            mongodb:{
                //local: 'mongodb://localhost/astrum',                               // mac joel
                local: 'mongodb://astrum:astrum@ds145395.mlab.com:45395/astrum'      // servidor
            },
            postgresql: {
                local: 'postgres://postgres:kuroyukihime2110@localhost:4002/app_db',   // mac joel
                //local: 'postgres://postgres:postgres@localhost:5432/app_db',         // servidor
            },
            mysql: {
                local: 'mysql://root:mysql@localhost:3306/app_db',      // mac joel
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
