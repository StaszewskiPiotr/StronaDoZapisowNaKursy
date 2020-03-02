let inputImie = document.querySelector('#input-imie');
let inputNazwisko = document.querySelector('#input-nazwisko');
let inputEmail = document.querySelector('#input-email');
let inputHaslo = document.querySelector('#input-password');
let inputHasloAgain = document.querySelector('#input-password-again');
let inputDataUrodzeniaKli = document.querySelector('#data-urodzenia-input');
let inputDataUrodzeniaCli = document.querySelector('#data-urodzenia-input-kl');
let text1 = document.querySelector('.text-helper1');
let text2 = document.querySelector('.text-helper2');
let text3 = document.querySelector('.text-helper3');
let text4 = document.querySelector('.text-helper4');
let text5 = document.querySelector('.text-helper5');
let text6 = document.querySelector('.text-helper6');
let acc_button = document.querySelector("#accept-button");
const className = 'field-error';
const regImieNazwisko = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]+$/; //testujące wyrażenie regularne
const regEmail = /^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/;
xx = new Boolean(false);


//acc_button.addEventListener("click", function(){
function checkform(){
	var Bday = new Date(inputDataUrodzeniaKli.value);
	var wiek = (Date.now()-Bday)/31557600000;

		
    if (wiek < 16){
		inputDataUrodzeniaKli.classList.add(className); //dodaję klasę do pola
		text6.innerHTML = 'Wymagane ukończenie 16 lat';
    }else if(!inputDataUrodzeniaKli.value){
		inputDataUrodzeniaKli.classList.add(className);
		text6.innerHTML = 'Wiek musi zostać podany';
	}else{
        inputDataUrodzeniaKli.classList.remove(className); //usuwam klasę
    }

	
	if(inputImie.value.length > 0 && !regImieNazwisko.test(inputImie.value)) {
		inputImie.classList.add(className); //dodaję klasę do pola
		text1.innerHTML = 'Imię powinno składać się tylko z liter';	
        inputImie.select(); //zaznaczamy treść pola
    } else if (inputImie.value.length == 0){
		inputImie.classList.add(className);
		text1.innerHTML = 'Pole imię musi zostać wypełnione';
	}else if (inputImie.value.length > 70){
		inputImie.classList.add(className);
		text1.innerHTML = 'Imię jest za długie';
	}else{
        inputImie.classList.remove(className); //usuwam klasę
    }

	if (inputNazwisko.value.length > 0 && !regImieNazwisko.test(inputNazwisko.value)) {
		inputNazwisko.classList.add(className); //dodaję klasę do pola
		text2.innerHTML = 'Nazwisko powinno składać się tylko z liter';
		inputNazwisko.select(); //zaznaczamy treść pola
    } else if(inputNazwisko.value.length == 0 ) {
		inputNazwisko.classList.add(className); //dodaję klasę do pola
		text2.innerHTML = 'Pole nazwisko musi zostać wypełnione';
	}else if(inputNazwisko.value.length > 70 ) {
		inputNazwisko.classList.add(className); //dodaję klasę do pola
		text2.innerHTML = 'Nazwisko jest za długie';
	}else{
        inputNazwisko.classList.remove(className); //usuwam klasę
    }
	

    if (!regEmail.test(inputEmail.value) && inputEmail.value.length > 0) {
		inputEmail.classList.add(className); //dodaję klasę do pola
		text3.innerHTML = 'Błędny email!';
		inputEmail.select(); //zaznaczamy treść pola
    } else if(inputEmail.value.length == 0){
		inputEmail.classList.add(className); //dodaję klasę do pola
		text3.innerHTML = 'Pole email musi zostać wypełnione';
	}else{
        inputEmail.classList.remove(className); //usuwam klasę
    }
	
	if (inputHaslo.value.length<8 && inputHaslo.value.length>0) {
		inputHaslo.classList.add(className); //dodaję klasę do pola
		text4.innerHTML = 'Za krótkie hasło; min. 8 znaków';
		inputHaslo.select(); //zaznaczamy treść pola
    } else if(inputHaslo.value.length == 0){
		inputHaslo.classList.add(className); //dodaję klasę do pola
		text4.innerHTML = 'Pole hasło musi zostać wypełnione';
	}else{
        inputHaslo.classList.remove(className); //usuwam klasę
    }
	
	if (inputHasloAgain.value.length > 0 && inputHasloAgain.value != inputHaslo.value) {
		inputHasloAgain.classList.add(className); //dodaję klasę do pola
		text5.innerHTML = 'Hasło nie jest takie samo';
		inputHasloAgain.select(); //zaznaczamy treść pola
    }else if(inputHasloAgain.value.length == 0){
		inputHasloAgain.classList.add(className); //dodaję klasę do pola
		text5.innerHTML = 'Pole powtórz hasło musi zostać wypełnione';
	}else{
        inputHasloAgain.classList.remove(className); //usuwam klasę
    }
	
	
	if(liczenieKlas()){
		return true;
	}else{
		return false;
	}
}	
//});

inputDataUrodzeniaKli.addEventListener('change', function(){
	
	var Bday = new Date(inputDataUrodzeniaKli.value);
	var wiek = (Date.now()-Bday)/31557600000;

		
    if (wiek < 16) {
		inputDataUrodzeniaKli.classList.add(className); //dodaję klasę do pola
		text6.innerHTML = 'Wymagane ukończenie 16 lat';
    } else {
        inputDataUrodzeniaKli.classList.remove(className); //usuwam klasę
		text6.innerHTML = '';
    }
	
});


inputImie.addEventListener('change', function(e) {
	
    if(inputImie.value.length > 0 && !regImieNazwisko.test(inputImie.value)) {
					
		inputImie.classList.add(className); //dodaję klasę do pola
		text1.innerHTML = 'Imię powinno składać się tylko z liter';
		text1.style.color = red;		
		inputImie.select(); //zaznaczamy treść pola
	}else if(inputImie.value.length > 70){
		inputImie.classList.add(className); //dodaję klasę do pola
		text1.innerHTML = 'Imię jest za długie';	
		inputImie.select(); //zaznaczamy treść pola
	}else {
		inputImie.classList.remove(className); //usuwam klasę
		text1.innerHTML = '';
	}
	
});

inputNazwisko.addEventListener('change', function() {

    if (inputNazwisko.value.length > 0 && !regImieNazwisko.test(inputNazwisko.value)) {
		inputNazwisko.classList.add(className); //dodaję klasę do pola
		text2.innerHTML = 'Nazwisko powinno składać się tylko z liter';
		text2.style.color = red;	
		inputNazwisko.select(); //zaznaczamy treść pola
    }else if(inputNazwisko.value.length > 70 ) {
		inputNazwisko.classList.add(className); //dodaję klasę do pola
		text2.innerHTML = 'Nazwisko jest za długie';
	}else {
        inputNazwisko.classList.remove(className); //usuwam klasę
		text2.innerHTML = '';
    }
	
	
});

inputEmail.addEventListener('change', function() {

    const reg = /^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/;

    if (!reg.test(inputEmail.value) && inputEmail.value.length > 0) {
		inputEmail.classList.add(className); //dodaję klasę do pola
		text3.innerHTML = 'Błędny email!';
		text3.style.color = red;
		inputEmail.select(); //zaznaczamy treść pola
    } else {
        inputEmail.classList.remove(className); //usuwam klasę
		text3.innerHTML = '';
    }
	
	
});

inputHaslo.addEventListener('change', function() {

    if (inputHaslo.value.length<8 && inputHaslo.value.length>0) {
		inputHaslo.classList.add(className); //dodaję klasę do pola
		text4.innerHTML = 'Za krótkie hasło; min. 8 znaków';
		text4.style.color = red;
		inputHaslo.select(); //zaznaczamy treść pola
    } else {
        inputHaslo.classList.remove(className); //usuwam klasę
		text4.innerHTML = '';
    }
});

inputHasloAgain.addEventListener('change', function() {
	
    if (inputHasloAgain.value.length > 0 && inputHasloAgain.value != inputHaslo.value) {
		inputHasloAgain.classList.add(className); //dodaję klasę do pola
		text5.innerHTML = 'Hasło nie jest takie samo';
		text5.style.color = red;
		inputHasloAgain.select(); //zaznaczamy treść pola
    } else {
        inputHasloAgain.classList.remove(className); //usuwam klasę
		text5.innerHTML = '';
    }

});



function liczenieKlas(){

	var liczba_klas = 0;

	
		if(inputImie.classList.contains("field-error") || inputNazwisko.classList.contains("field-error") || inputEmail.classList.contains("field-error") || inputHaslo.classList.contains("field-error") || inputHasloAgain.classList.contains("field-error") || inputDataUrodzeniaKli.classList.contains("field-error")){
			liczba_klas++;
			return false;
		}	
	return true;
	
}