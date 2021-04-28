const Message = require('../../../models/Message'); 

const getAll = (req, res) => {
    Message.find({"user": "Ward"}, (err, docs) => {
        if(!err){
            res.json({
                "status":"Succes Get",
                "data":{ 
                    "message": docs
                }
            });
        }
    });
};
const getId = (req, res) => {
    Message.find({"_id": ":id"}, (err, docs) => {
        if(!err){
            res.json({
                "status":"Succes Get",
                "data":{ 
                    "message": "Getting message with ID" //req.params
                }
            });
        }
    });
};
const getUser = (req, res) => {
    Message.find({"user": "Ward"}, (err, doc) => {
        if(!err){
            res.json({
                "status":"Succes Get",
                "data":{ 
                    "message": doc //req.params
                }
            });
        }
    });
};
const create = (req, res) => {
    let message = new Message();
    message.text = req.body.text;
    message.user = req.body.user;
    message.save((err, doc) => {
        if(!err){
            res.json({
                "status":"Succes Post",
                "data": {
                    "message": doc
                }
            });
        }
    })
};

module.exports.getAll = getAll;
module.exports.getId = getId;
module.exports.create = create;
module.exports.getUser = getUser;