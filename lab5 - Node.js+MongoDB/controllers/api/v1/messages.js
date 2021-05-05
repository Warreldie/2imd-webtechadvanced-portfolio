const Message = require("../../../models/Message");

const getAll = (req, res) => {
  Message.find((err, docs) => {
    if (!err) {
      res.json(docs);
    }
  });
};
const getId = (req, res) => {
  Message.find({ _id: req.params.id }, (err, doc) => {
    if (!err) {
      res.json({
        status: "Succes Get",
        data: {
          message: doc,
        },
      });
    } else {
      console.log(err);
      res.json({
        error: err,
      });
    }
  });
};
const create = (req, res) => {
  let message = new Message();
  message.text = req.body.text;
  message.user = req.body.user;
  message.save((err, doc) => {
    if (!err) {
      res.json({
        status: "Succes Post",
        data: {
          message: doc,
        },
      });
    }
  });
};
const update = (req, res) => {
  let message = Message.find({ _id: req.params.id }, (err, doc) => {
    if (!err) {
      res.json({
        status: "Succes PUT",
        data: {
          message: "UPDATING a message with id" + req.params.id,
        },
      });
    } else {
      res.json({
        status: "Error",
        message: err,
      });
    }
  });
  let myquery = { _id: req.params.id };
  let newvalues = {
    $set: {
      text: req.body.text,
      user: req.body.user,
    },
  };
  message.updateOne(myquery, newvalues, (err, doc) => {
    if (!err) {
      res.json({
        status: "Succes Save",
        data: {
          message: doc,
        },
      });
    } else {
      res.json({
        status: "Error",
        message: err,
      });
    }
  });
};
const remove = (req, res) => {
  Message.find({ _id: ":id" }, (err, doc) => {
    if (!err) {
      res.json({
        status: "Succes Remove",
        data: {
          message: "DELETE ToDo" + req.params.id,
        },
      });
    }
  });
};
const getUser = (req, res) => {
  Message.find({ user: ":username" }, (err, doc) => {
    if (!err) {
      res.json({
        status: "Succes Get",
        data: {
          message: "GETTING message for username " + req.params.user,
        },
      });
    }
  });
};
module.exports.getAll = getAll;
module.exports.getId = getId;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;
module.exports.getUser = getUser;
