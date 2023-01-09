const form = document.getElementById('schedule-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const recipient = form.elements['recipient'].value;
  const message = form.elements['message'].value;
  const scheduledTime = form.elements['scheduled-time'].value;

  if (!recipient || !message || !scheduledTime) {
    alert('Please fill out all fields');
    return;
  }

    const regex = /^\+\d{12}$/;
    console.log(regex.test(recipient))
    if(!regex.test(recipient)){
      alert('Do not use an extra "9" before your phone number');
    }

  fetch('/schedule', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      recipient,
      message,
      scheduledTime,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
    
    // form.reset();
  });
