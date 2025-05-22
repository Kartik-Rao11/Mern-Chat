const Message = require('../models/Message');

const getMessages = async (req, res) => {
  const { from, to } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { from, to },
        { from: to, to: from },
      ],
    }).sort('timestamp');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getMessages };