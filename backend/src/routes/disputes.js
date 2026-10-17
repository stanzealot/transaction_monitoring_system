import {Router} from 'express';
import {Transaction, Dispute} from '../models.js';

const router = Router();

const VALID_STATUSES = ['open', 'resolved'];

router.post('/', async (req, res) => {
    try {
        const {transaction_id, reason} = req.body;

        if (!Number.isInteger(transaction_id)){
            return res.status(400).json({message: 'transaction_id must be an integer.'});
        } 
        
        if(typeof reason !== 'string' || reason.trim() === ''){
            return res.status(400).json({message: 'reason must be a non-empty string.'});
        }
        if(reason.trim().length > 500){
            return res.status(400).json({message: 'reason must not exceed 500 characters.'});
        }

        const transaction = await Transaction.findByPk(transaction_id);
        if (!transaction){
            return res.status(404).json({message: 'Transaction not found.'});
        }

        const existingOpen = await Dispute.findOne({where: {transaction_id, status: 'open'}});
        if (existingOpen){
            return res.status(400).json({message: 'An open dispute already exists for this transaction.'});
        }

        const dispute = await Dispute.create({transaction_id, reason, status: 'open'});
        res.status(201).json(dispute);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
});

router.get('/', async (req, res) => {
    try {
        const {status} = req.query;

        const where = {};
        if (status){
            if (!VALID_STATUSES.includes(status)){
                return res.status(400).json({message:   `Invalid status filter. Valid statuses are: ${VALID_STATUSES.join(', ')}`});
            }
            where.status = status;
        }
        if(transaction_id){
            where.transaction_id = parseInt(transaction_id, 10);
        }

        const disputes = await Dispute.findAll({where});
        res.json(disputes);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
});


router.patch('/:id/resolve', async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        if(Number.isNaN(id)){
            return res.status(400).json({message: 'Invalid dispute ID.'});
        }

        const dispute = await Dispute.findByPk(id);
        if(!dispute){
            return res.status(404).json({message: 'Dispute not found.'});
        }

        if(dispute.status === 'resolved'){
            return res.status(400).json({message: 'Dispute is already resolved.'});
        }

        dispute.status = 'resolved';
        dispute.resolved_at = new Date();
        await dispute.save();

        res.json(dispute);  
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
});

export default router;