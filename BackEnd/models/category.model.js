const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    category_name:
    {
        type: String,
        required: true,
        unique: true
    },
    category_type:
    {
        type: String,
        enum: ['Income', 'Expenses'],
        default: 'Income'
    },
    description: { type: String }
}, {
    timestamps: true ,
     collection: 'categorie'
});

module.exports = mongoose.model('Category', CategorySchema);
