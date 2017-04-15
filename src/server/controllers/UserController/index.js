class UserController {
    list(req, res) {
        res.status(200).json({
            status: 'users list'
        })
    }
    item(req, res) {
        res.status(200).json({
            status: 'user item'
        })
    }
    create(req, res) {
        res.status(200).json({
            status: 'user create'
        })
    }
    update(req, res) {
        res.status(200).json({
            status: 'user update'
        })
    }
    delete(req, res) {
        res.status(200).json({
            status: 'user delete'
        })
    }
}

module.exports = UserController;