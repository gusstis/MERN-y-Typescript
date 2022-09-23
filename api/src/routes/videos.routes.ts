import {Router} from 'express';
const router = Router();

router.get('/videos', (req, res) => res.json('getting videos...'));


export default router