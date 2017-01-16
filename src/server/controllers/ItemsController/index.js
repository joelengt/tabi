

class ItemsController {
    list(req, res) {
        return res.status(200).json({
            status: 'work item ok D'
        })
    }

    getInfo(req, res) {
        return res.status(200).json({
            status: 'work item ok2'
        })
    }
}

module.exports = ItemsController;
