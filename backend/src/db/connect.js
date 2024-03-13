import mongoose from 'mongoose';

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO);
		console.log('connect mongodb');
	} catch (error) {
		console.log('disconnect mongodb');
	}
};

export default connect;
