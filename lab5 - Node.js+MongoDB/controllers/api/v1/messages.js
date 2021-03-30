const Message = require("../../../models/Message");

const getAll = (req, res) => {
    Message.find({"user": "Ward"}, (err, doc) => {
        if(!err){
            res.json({
                "status":"Succes Get",
                "data":{ 
                    "message": doc
                }
            });
        }
    });
};
const getId = (req, res) => {
    Message.find({"_id": ":id"}, (err, doc) => {
        if(err){
            res.json({
                "status":"Error Get",
                "data":{ 
                    "message": err
                }
            });
        }
        if(!err){
            res.json({
                "status":"Succes Get",
                "data":{ 
                    "message": "Getting message with ID"
                }
            });
        }
    });
};
const create = (req, res, next) => {
    console.log(req.body);
    let message = new Message;
    message.text = req.body.text;
    message.user = req.body.user;
    message.save((err, doc) => {
        if(err){
            res.json({
                "status": "error",
                "message": "could not save this message"
            })
            return next(err);
        }
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
/*const getUser = (req, res) => {
    Message.find({"user": "Ward"}, (err, doc) => {
        if(!err){
            res.json({
                "status":"Succes Get",
                "data":{ 
                    "message": doc
                }
            });
        }
    });
};
*/
module.exports.getAll = getAll;
module.exports.getId = getId;
module.exports.create = create;
//module.exports.getUser = getUser;