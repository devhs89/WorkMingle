const AppUser = require('../models/app-user');
const Message = require('../models/message');
const {addMessageToUser} = require('./employer-controller');
const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;

    const senderUser = await AppUser.findOne({ email: sender });
    const receiverUser = await AppUser.findOne({ email: receiver });
    if (!senderUser || !receiverUser) {
        return res.status(404).json({ message: 'Sender or receiver not found' });
      }
    const newMessage = new Message({ sender: senderUser._id, receiver: receiverUser._id, content: content});

    console.log(newMessage);
    
    const savedMessage = await newMessage.save();

    await addMessageToUser(sender, savedMessage._id);
    await addMessageToUser(receiver, savedMessage._id);


    res.json({ message: 'Message sent successfully', data: savedMessage });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


module.exports = { sendMessage };
