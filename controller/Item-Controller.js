
import ItemModel from '../models/Item-Model.js';
import statusCode from '../config/statusCode.js';


const createItem = async (req, res) => {
	const item = new ItemModel({
		itemName: req.body.itemName,
		itemCategory: req.body.itemCategory,
    itemPrice: req.body.itemPrice,
    itemDescription: req.body.itemDescription
	});

  try {
		const dbResponse = await item.save();
		res.status(statusCode.CREATED).send(dbResponse);
	} catch (error) {
		res.status(statusCode.INTERNAL_SERVER_ERROR).send({msg: error.message});
	}
};

const getAllItems = async(req, res) => {
	try {
		const databaseRes = await ItemModel.find();
		res.status(statusCode.OK).send(databaseRes);
	} catch (error) {
		res.status(statusCode.INTERNAL_SERVER_ERROR).send({msg:error.message});
	}
};

const getItemById = async (req, res) => {
	try {
		const databaseRes = await 
    ItemModel.findOne({_id: req.params.itemId});
		res.status(statusCode.OK).send(databaseRes);
	} catch (error) {
		res.status(statusCode.INTERNAL_SERVER_ERROR).send({msg:error.message});
	}
};

const deleteItemById = async (req, res) => {
	try {
		const databaseRes = await ItemModel.findByIdAndDelete(req.params.userId);
		res.status(statusCode.OK).send({
			msg: `Item deleted: ${databaseRes.itemName}`
		});
	} catch (error) {
		res.status(statusCode.INTERNAL_SERVER_ERROR).send({msg:'Error happend!'});
	}
};

const updateItem = async (req, res) => {
	if ( !req.body.itemName ) {
		return res.status(statusCode.BAD_REQUEST).send({msg: 'No input!'});
	}

	const data = {
		itemName: req.body.itemName,
		itemCategory: req.body.itemCategory,
    itemPrice: req.body.itemPrice,
    itemDescription: req.body.itemDescription
	};

	try {
		const databaseRes = await ItemModel.findByIdAndUpdate(req.params.itemId, data, { new: true });
		res.status(statusCode.OK).send(databaseRes);
	} catch (error) {
		res.status(statusCode.INTERNAL_SERVER_ERROR).send({msg:error.message});
	}
};

const getItemWithQuery = async (req, res) => {
	try {
		const databaseRes = await ItemModel.find({itemName: req.body.itemName});
		databaseRes.length !== 0 
			? res.status(statusCode.OK).send(databaseRes)
			: res.status(statusCode.NOT_FOUND).send({msg: `No result. Search: ${req.body.itemName}`});
	} catch (error) {
		res.status(statusCode.INTERNAL_SERVER_ERROR).send({msg:error.message});
	}
};


export default { 
	createItem,
  getAllItems,
  getItemById,
  deleteItemById,
  updateItem,
  getItemWithQuery
};