class generadorDescuentoController {
    list(req, res) {
        res.status(200).json({
            status: 'users list'
        })
    }
    get(req, res) {
        res.status(200).json({
            status: 'user item'
        })
    }
    create(req, res) {
        res.status(200).json({
            status: 'user create'
        })
    }
    delete(req, res) {
        res.status(200).json({
            status: 'user delete'
        })
    }
}

module.exports = generadorDescuentoController;