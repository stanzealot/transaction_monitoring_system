import {Router} from 'express';
import {Op} from 'sequelize';
import {Transaction, Dispute} from '../models.js';

const router = Router();

const VALID_STATUSES = ['success', 'pending', 'failed'];

router.get('/', async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
        const {status, search} = req.query;

        const where = {}
        if (status){
            if (!VALID_STATUSES.includes(status)){
                return res.status(400).json({message:   `Invalid status filter. Valid statuses are: ${VALID_STATUSES.join(', ')}`});
            }
            where.status = status;
        }

        if (search){
            where[Op.or] = [
                {reference: {[Op.like]: `%${search}%`}},
                {customer_name: {[Op.like]: `%${search}%`}}
            ]
        }

        const {rows,count} = await Transaction.findAndCountAll({
            where,
            order: [['timestamp', 'DESC']],
            limit,
            offset: (page - 1) * limit,
            distinct: true
        });
        res.json({
            data: rows,
            page,
            limit,
            total: count,
            
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
    
});

export default router;
        