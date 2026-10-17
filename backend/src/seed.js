import {Transaction, Dispute} from './models.js';


const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy' ];
const statuses = ['success', 'pending', 'failed'];

export async function seedDatabase() {
    const count = await Transaction.count();
    if (count > 0) {
        console.log('Database already seeded.');
        return;
    }

    const transactions = Array.from ({length:200}, (_, i) => ({
        reference: `TXN-${String(i+1).padStart(4, '0')}`,
        customer_name: names[i % names.length],
        amount: 5000 + i * 1250,
        status: statuses[i % statuses.length],
        timestamp: new Date(Date.now() - i * 1000 * 60 * 60 * 24)
    }));

    await Transaction.bulkCreate(transactions);

    await Dispute.bulkCreate([
        {
            transaction_id: 2,
            reason: 'Customer claims they did not authorize this transaction.',
            status: 'open'
        },
        {
            transaction_id: 5,
            reason: 'Customer reports that the product was not delivered.',
            status: 'open'
        },
        {
            transaction_id: 8,
            reason: 'Customer states that the amount charged is incorrect.',
            status: 'resolved',
            created_at: new Date(Date.now() - 86400_000), // 7 days ago
            resolved_at: new Date(Date.now()) // 3 days ago
        }
    ]);   

    console.log('Database seeded successfully.');
}