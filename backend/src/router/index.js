import authRoutes from './auth.js';
import messageRoutes from './message.js';
import userRoutes from './user.js';

function route(app) {
	app.use('/api/auth', authRoutes);
	app.use('/api/message', messageRoutes);
	app.use('/api/users', userRoutes);
}

export default route;
