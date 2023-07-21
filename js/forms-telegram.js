

const TOKEN = "6132227911:AAG-nRjY0h7mhKHyJ1zVkHbRm2po-pPA9eA";
const CHAT_ID = "-1001841828213";
const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

document.getElementById('first-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let message = `Заявка з сайту!\n`;
    message += `Ім'я: ${this.firstFormName.value}\nНомер телефону:${this.firstFormPhone.value}`;
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
            swal({
                title: "Заявка успішно відправлена!",
                text: "Ми зв'яжемось з вами найближчим часом!",
                icon: "success",
                timer: 3000,
            });
            this.firstFormPhone.value = '';
            this.firstFormName.value = '';

        })
        .catch(error => {
            console.log(error);
        });
});




document.getElementById('ouditForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let message = `Заявка з сайту!\n`;
    message += `Ім'я:${this.oudit_user_name.value}\n`;
    message += `Номер телефону:${this.oudit_user_phone.value}\n`
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
            swal({
                title: "Заявка успішно відправлена!",
                text: "Ми зв'яжемось з вами найближчим часом!",
                icon: "success",
                timer: 3000,
            });
            this.oudit_user_name.value = '';
            this.oudit_user_phone.value = '';

        })
        .catch(error => {
            console.log(error);;
        });
});
document.getElementById('modal_form').addEventListener('submit', function (e) {
    e.preventDefault();
    let message = `Заявка з сайту!\n`;
    message += `Ім'я:${this.modal_form_userName.value}\n`;
    message += `Номер телефону:${this.modal_form_userPhone.value}\n`
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
            swal({
                title: "Заявка успішно відправлена!",
                text: "Ми зв'яжемось з вами найближчим часом!",
                icon: "success",
                timer: 3000,
            });
            this.modal_form_userName.value = '';
            this.modal_form_userPhone.value = '';

        })
        .catch(error => {
            console.log(error);;
        });
});
