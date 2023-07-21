
// Отримуємо посилання на інпути
    var input1 = document.getElementById('header-phone-number');
    var input2 = document.getElementById('free-oudit-phone');


    // Ініціалізуємо бібліотеку intlTelInput
    var input1Obj = window.intlTelInput(input1, {initialCountry: "ua",});
    var input2Obj = window.intlTelInput(input2, {initialCountry: "ua",});

    // Додаємо подію 'countrychange' до кожного інпуту
    input1.addEventListener('input', function() {
  var value = input1.value;
    var numericValue = value.replace(/[^0-9+]/g, ''); // Видаляємо всі символи, крім цифр
    input1.value = numericValue;
  
});
    input1.addEventListener('countrychange', function() {
  var countryCode = input1Obj.getSelectedCountryData().dialCode;
    var phoneNumber = input1Obj.getNumber();
    input1.value = "+" + countryCode + phoneNumber;
});
    input2.addEventListener('input', function() {
  var value = input2.value;
    var numericValue = value.replace(/[^0-9+]/g, ''); // Видаляємо всі символи, крім цифр
    input2.value = numericValue;
});
    input2.addEventListener('countrychange', function() {
  var countryCode = input2Obj.getSelectedCountryData().dialCode;
    var phoneNumber = input2Obj.getNumber();
    input2.value = "+" + countryCode + phoneNumber;
});

