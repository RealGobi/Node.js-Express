
import ItemController from '../controller/Item-Controller.js';

const routes = app => {
	app.post('/item', ItemController.createItem);
	app.get('/item', ItemController.getAllItems);	
  app.get('/item/:itemId', ItemController.getItemById);
	app.delete('/item/:itemId', ItemController.deleteItemById);
	app.put('/update-item/:itemId', ItemController.updateItem);
	app.get('/search', ItemController.getItemWithQuery);
};

export default { routes };