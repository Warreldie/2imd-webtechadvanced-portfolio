const express = require("express");
const router = express.Router();
const messagesController = require("../../../controllers/api/v1/messages");

/* /api/v1/messages */
router.get("/", messagesController.getAll);

/* /api/v1/messages */
router.post("/", messagesController.create);

/* /api/v1/messages 
router.get("/", messagesController.getUser);
*/
module.exports = router;