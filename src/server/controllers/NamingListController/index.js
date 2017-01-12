class NamingListController {
    list(req, res) {
        console.log('ok');
        res.status(200).json({
            status: 'ok list'
        })
    }

    getInfo(req, res) {
        res.status(200).json({
            status: 'ok',
            message: 'Hello, come here'
        })
    }
}

module.exports = NamingListController;