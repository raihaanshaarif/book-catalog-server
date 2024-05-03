import express from 'express';
import { WishlistController } from './wishlist.controller';

const router = express.Router();

router.post('/add-wishlist', WishlistController.addToWishlist);
router.delete('/:id', WishlistController.deleteWishlist);
router.get('/:id', WishlistController.getAllWishlist);

export const WishlistRoutes = router;
