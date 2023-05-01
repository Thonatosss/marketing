


const TOKEN = "6132227911:AAG-nRjY0h7mhKHyJ1zVkHbRm2po-pPA9eA";
const CHAT_ID = "-1001841828213";
const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

document.getElementById('first-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let message = `Заявка з сайту!\n`;
    message += `Номер телефону:${this.firstFormPhone.value}\n`;
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: `${message}`
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
           
            this.firstFormPhone.value = '';

        })
        .catch(error => {
            console.error('There was a problem sending the Telegram message:', error);
        });
});
