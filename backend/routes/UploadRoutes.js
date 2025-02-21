const express = require("express");
const multer = require("multer");

const uploadController = require("./../controllers/uploadController");
const dbMiddleware = require("../middleware/dbMiddleware");


const storage = multer.memoryStorage();
const upload = multer({ storage }).single("file");

const router = express.Router();

router.route("/:shopName/upload").post(dbMiddleware,upload, uploadController.uploadFile);

router.route("/delete").delete(uploadController.deleteFile);

module.exports = router;
