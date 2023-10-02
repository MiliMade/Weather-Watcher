import express from "express";
const router = express.Router();
import indexController from "../controllers/index.js"

router.get('/', indexController.getIndex)
router.post('/', indexController.postIndex) 

export default router  