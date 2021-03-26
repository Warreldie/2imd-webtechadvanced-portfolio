const express = require("express");
const router = express.Router();

/* /api/v1/messages */
router.get("/", (req, res) => {
    res.json({
        "status":"Succes Get",
        "data":{ 
            "message": "GETTING messages" 
        }
    });
});

/* /api/v1/messages */
router.post("/", (req, res) => {
    res.json({
        "status":"Succes Post",
        "data": {
            "message": "POSTING a new message for user Pikachu"
        }
    });
});

module.exports = router;