import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config();
const { PORT, DEV_DB_URL } = process.env;

const connectToPort = async(app) => {
	try {
		await app.listen(PORT, ()=> {
			console.log('✔️ Server running on Port: ' + PORT);
		});
	} catch (error) {
		console.error(error.message + '❌');
	}
};

const connectToDb = async () => {
	try {
		await mongoose.connect(DEV_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
		console.log('✔️ Connected to database');
	} catch (error) {
		console.error(error.message + '❌');
		process.exit();
	}
};

export default { connectToPort, connectToDb };