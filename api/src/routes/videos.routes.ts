import {Router} from 'express';
const router = Router();

import {getVideos, getVideo, createVideo, updateVideo, deleteVideo} from './videos.controller';
//import * as videoCtrl  from './videos.controller'; no funcionó

router.get('/videos', getVideos );

router.get('/videos/:id', getVideo);

router.post('/videos', createVideo);

router.delete('/videos/:id', deleteVideo);

router.put('/videos/:id', updateVideo);

export default router