

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
            swal({
                title: "Заявка успішно відправлена!",
                text: "Ми зв'яжемось з вами найближчим часом!",
                icon: "success",
                timer: 3000,
              });
            this.firstFormPhone.value = '';

        })
        .catch(error => {
            console.log(error);
        });
});


const form = document.getElementById("msform");
const submitButton = form.querySelector('input[type="submit"]');

submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData);

    let messageText = "Заявка з сайту!! \n\n";
    for (const [key, value] of Object.entries(formDataObj)) {
        messageText += `${key}: ${value} \n`;
    }

    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${TOKEN}`,
        },
        body: `chat_id=${CHAT_ID}&text=${messageText}`,
    })
        .then(response => {
            
            form.reset();
            
            swal({
                title: "Заявка успішно відправлена!",
                text: "Ми зв'яжемось з вами найближчим часом!",
                icon: "success",
                timer: 3000,
              });
        })
        .catch(error => {
            alert('Виникла помилка під час відправки даних. Спробуйте ще раз.');
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
            this.ooudit_user_phone.value = '';

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
