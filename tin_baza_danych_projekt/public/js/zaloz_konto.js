let inputImie = document.querySelector('#input-imie');
let inputNazwisko = document.querySelector('#input-nazwisko');
let inputEmail = document.querySelector('#input-email');
let inputHaslo = document.querySelector('#input-password');
let inputHasloAgain = document.querySelector('#input-password-again');
let inputDataUrodzeniaKli = document.querySelector('#data-urodzenia-input');
let inputDataUrodzeniaCli = document.querySelector('#data-urodzenia-input-kl');
let acc_button = document.querySelector("#accept-button");
const className = 'field-error';
const regImieNazwisko = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]+$/; //testujące wyrażenie regularne


inputImie.addEventListener('change', function() {

    if(inputImie.value.length > 0 && !regImieNazwisko.test(inputImie.value)) {
		inputImie.classList.add(className); //dodaję klasę do pola
        alert("Imię powinno składać się tylko z liter");
        inputImie.select(); //zaznaczamy treść pola
    } else {
        inputImie.classList.remove(className); //usuwam klasę
    }
	
});

inputNazwisko.addEventListener('change', function() {

    if (inputNazwisko.value.length > 0 && !regImieNazwisko.test(inputNazwisko.value)) {
		inputNazwisko.classList.add(className); //dodaję klasę do pola
		alert("Nazwisko powinno składać się tylko z liter");
		inputNazwisko.select(); //zaznaczamy treść pola
    } else {
        inputNazwisko.classList.remove(className); //usuwam klasę
    }
	
	
});

inputEmail.addEventListener('change', function() {

    const reg = /^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/;

    if (!reg.test(inputEmail.value) && inputEmail.value.length > 0) {
		inputEmail.classList.add(className); //dodaję klasę do pola
		alert("Błędny email!");
		inputEmail.select(); //zaznaczamy treść pola
    } else {
        inputEmail.classList.remove(className); //usuwam klasę
    }
	
	
});

inputHaslo.addEventListener('change', function() {

    if (inputHaslo.value.length<8 && inputHaslo.value.length>0) {
		inputHaslo.classList.add(className); //dodaję klasę do pola
		alert("Za krótkie hasło; min. 8 znaków");
		inputHaslo.select(); //zaznaczamy treść pola
    } else {
        inputHaslo.classList.remove(className); //usuwam klasę
    }
});

inputHasloAgain.addEventListener('change', function() {
	
    if (inputHasloAgain.value.length > 0 && inputHasloAgain.value != inputHaslo.value) {
		inputHasloAgain.classList.add(className); //dodaję klasę do pola
		alert("Hasło nie jest takie samo");
		inputHasloAgain.select(); //zaznaczamy treść pola
    } else {
        inputHasloAgain.classList.remove(className); //usuwam klasę
    }
});

inputDataUrodzeniaKli.addEventListener('change', function() {
	
	var Bday = new Date(inputDataUrodzeniaKli.value);
	var wiek = (Date.now()-Bday)/31557600000;

		
    if (wiek < 16) {
		inputDataUrodzeniaKli.classList.add(className); //dodaję klasę do pola
		alert("Wymagane ukończenie 16 lat");
    } else {
        inputDataUrodzeniaKli.classList.remove(className); //usuwam klasę
    }
});

inputDataUrodzeniaCli.addEventListener('change', function() {
	
	var Bda = new Date(inputDataUrodzeniaCli.value);
	var wiek1 = (Date.now()-Bda)/31557600000;

		
    if (wiek1 < 16) {
		inputDataUrodzeniaCli.classList.add(className); //dodaję klasę do pola
		alert("Wymagane ukończenie 16 lat");
    } else {
        inputDataUrodzeniaCli.classList.remove(className); //usuwam klasę
    }
});

acc_button.addEventListener("click", function(){ 
	alert("Hello World!"); 
});
