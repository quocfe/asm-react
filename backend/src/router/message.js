import express from 'express';
import MessageControllers from './../controllers/MessageControllers.js';
import protectRoute from './../middlewares/protectRoute.js';

const router = express.Router();

router.get('/:id', protectRoute, MessageControllers.getMessage);
router.post('/send/:id', protectRoute, MessageControllers.sendMessage);

export default router;
