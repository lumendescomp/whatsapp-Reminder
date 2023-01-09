const ScheduleMessage = require('../models/MessageSender');

const insertMessage = async (req, res) => {
  const { recipient, message, scheduledTime } = req.body;
  console.log(recipient, message, scheduledTime)

  await ScheduleMessage.create({recipient, message, scheduled_time: new Date(scheduledTime)})
}

module.exports = {
  insertMessage
}

