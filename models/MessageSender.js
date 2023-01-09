const mongoose = require('mongoose');

const scheduledMessageSchema = new mongoose.Schema({
  recipient: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  scheduled_time: {
    type: String,
    required: true,
  },
});

const ScheduledMessage = mongoose.model('ScheduledMessage', scheduledMessageSchema);

module.exports = ScheduledMessage

