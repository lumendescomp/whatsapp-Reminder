require('dotenv').config();
const cron = require('cron');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const ScheduleMessage = require('./models/MessageSender');

function startRoutine() {
  const job = new cron.CronJob({
    cronTime: '*/1 * * * *',
    onTick: () => {
      // Query the database for scheduled messages that are due to be sent
      let date = new Date(Date.now() - 3 * 60 * 60 * 1000);
      let isoString = Date(date.toISOString().slice(0, 17) + '00.000+00:00');
      
      ScheduleMessage.find({
        scheduled_time: isoString,        
      }, (err, messages) => {
        if (err) {
          console.log(`Error: ${err}`);
          return;
        }

        messages.forEach((message) => {
          client.messages
            .create({
              from: `whatsapp:+14155238886`,
              to: `whatsapp:${message.recipient}`,
              body: message.message,
            })
            .then((sentMessage) => {
              console.log(`Message sent to ${sentMessage.to}: ${sentMessage.body}`);
            }).catch((error) => {
              console.log(`Error sending message: ${error}`);
            });              
        });
      });
    },
    start: false,
    timeZone: 'America/Sao_Paulo',
  });

  job.start();
}

module.exports = {
  startRoutine,
};
