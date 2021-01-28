const Service = require('./Service');

class Controller {
    async create(req, res) {
        let {
            user_id,
            description,
            status,
            category,
            priority,
            title,
        } = req.body;
        let ticket = await Service.create({
            user_id,
            description,
            status,
            category,
            priority,
            title,
        });
        if (!ticket.error) {
            return res.json(ticket);
        }
        return res.json(ticket);
    }

    async find(req, res) {
        let { code } = req.params;
        let tickets = await Service.find(code);
        if (!tickets.error) {
            return res.json(tickets);
        }
        return res.json(tickets);
    }

    async findAll(req, res) {
        let tickets = await Service.findAll();
        if (!tickets.error) {
            return res.json(tickets);
        }
        return res.json(tickets);
    }

    async delete(req, res) {
        let { id, code } = req.body;

        let deleted = await Service.delete(id, code);

        if (!deleted.error) {
            return res.status(204).json();
        }
        return res.status(400).json(deleted);
    }

    async update(req, res) {
        let { code, description, status, priority, category } = req.body;
        let { id } = req.params;
        let updated = await Service.update(
            id,
            { description, status, priority, category },
            code
        );
        if (typeof updated.error === 'undefined') {
            return res.status(200).json(updated);
        }
        return res.status(400).json(updated);
    }

    async updateStatus(req, res) {
        let { code, status, priority, category } = req.body;
        let { id } = req.params;
        let updated = '';
        if (priority === null && category === null) {
            updated = await Service.update(id, { status }, code);
        } else if (priority === null && category !== null) {
            updated = await Service.update(id, { status, category }, code);
        } else if (priority !== null && category === null) {
            updated = await Service.update(id, { status, priority }, code);
        } else if (priority !== null && category !== null) {
            updated = await Service.update(
                id,
                { status, priority, category },
                code
            );
        }

        if (typeof updated.error === 'undefined') {
            return res.status(200).json(updated);
        }
        return res.status(400).json(updated);
    }
}

module.exports = new Controller();
