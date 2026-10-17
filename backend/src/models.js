import {DataTypes, Model} from 'sequelize';
import {sequelize} from './db.js';


export const Transaction = sequelize.define(
    'Transaction', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        reference: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['success','pending', 'failed' ]]
            }
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
       tableName: 'transactions',
         timestamps: false
    }
);


export const Dispute = sequelize.define(
    'Dispute', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        transaction_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {notEmpty: true}
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'open',
            validate: {
                isIn: [['open', 'resolved']]
            }
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        resolved_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
       tableName: 'disputes',
         timestamps: false
    }
);

Transaction.hasMany(Dispute, { foreignKey: 'transaction_id', as: 'disputes' });
Dispute.belongsTo(Transaction, { foreignKey: 'transaction_id', as: 'transaction' });

