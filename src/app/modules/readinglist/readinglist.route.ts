import express from 'express';
import { ReadinglistController } from './readinglist.controller';

const router = express.Router();

router.post('/add-readinglist', ReadinglistController.addToReadinglist);
router.get('/:id', ReadinglistController.getAllReadinglist);
router.patch(
  '/:id',

  ReadinglistController.updateReadinglist,
);
router.delete('/:id', ReadinglistController.deleteReadinglist);

export const ReadinglistRoutes = router;
