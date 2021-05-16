
import mongoose from 'mongoose';

const { Schema } = mongoose;

const itemSchema = Schema({
	itemName: {
		type: String,
		unique: true,
		allowNull: false,
		required: true,
		lowercase: true,
		minlength: [2, 'Item name must be longer then 6 character'],
		maxlength: [20, 'Item name must NOT be this long!(20 character max)']
	},
	itemCategory: {
		type: String,
		allowNull: false,
		required: true
	},
	itemPrice: {
		type: Number,
		allowNull: false,
		required: true
	},
	itemDescription: {
		type: String,
	}

});

const ItemModel = mongoose.model('item', itemSchema);

export default ItemModel;