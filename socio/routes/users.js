/* The code is creating a router object using the Express framework. It imports several functions from
different files and assigns them to specific routes. */
import express from 'express';
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from '../middleware/auth.js';


const router = express.Router();

/*  reaD  */

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/*  udate  */

router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;