let inputNazwa = document.querySelector('#input-nazwa');
let inputCena = document.querySelector('#input-cena');
let inputOpis = document.querySelector('#input-opis');
let acc_button = document.querySelector("#accept-button");
let text1 = document.querySelector('.text-helper1');
let text2 = document.querySelector('.text-helper2');
let text3 = document.querySelector('.text-helper3');
const className = 'field-error';
var reg = /^\d+(.\d{1,2})?$/gm


//acc_button.addEventListener("click", function(){
function checkform(){
	if(inputNazwa.value == ''){
		inputNazwa.classList.add(className); //dodaję klasę do pola
		text1.innerHTML='Pole nazwa musi być wypełnione';
	}else if(inputNazwa.value.length > 45){
		inputNazwa.classList.add(className); //dodaję klasę do pola
		text1.innerHTML='Nazwa jest za długa';
	}else{
		inputNazwa.classList.remove(className); 
		text1.innerHTML='';
	}
	
	if(inputOpis.value == 'Opisz kurs' || inputOpis.value == ''){
		inputOpis.classList.add(className); //dodaję klasę do pola
		text2.innerHTML='Pole opis musi być wypełnione';
	}else if(inputOpis.value != 'Opisz kurs' && inputOpis.value != ''){
		inputOpis.classList.remove(className);
		text2.innerHTML='';
	}
	
	if (inputCena.value.length > 0 && !reg.test(inputCena.value)) {
		inputCena.classList.add(className); //dodaję klasę do pola
		text3.innerHTML='Błędna cena';
		inputCena.select(); //zaznaczamy treść pola
    } else if(inputCena.value.length == 0){
        inputCena.classList.add(className); 
		text3.innerHTML='Cena musi zostać podana';
    }else{
		inputCena.classList.remove(className); //usuwam klasę
		text3.innerHTML='';
	}
	
	if(liczenieKlas()){
		return true;
	}else{
		return false;
	}
}	
//});

inputNazwa.addEventListener('change', function() {

	if(inputNazwa.value.length > 45){
		inputNazwa.classList.add(className); //dodaję klasę do pola
		text1.innerHTML='Nazwa jest za długa';
	}else{	
		inputNazwa.classList.remove(className); 
		text1.innerHTML='';
	}
});

inputOpis.addEventListener('change', function() {

	if(inputOpis.value != ''){
		inputOpis.classList.remove(className); 
		text2.innerHTML='';
	}
});


inputCena.addEventListener('change', function() {

    if (inputCena.value.length > 0 && !reg.test(inputCena.value)) {
		inputCena.classList.add(className); //dodaję klasę do pola
		text3.innerHTML='Błędna cena';
		inputCena.select(); //zaznaczamy treść pola
    }else {
		inputCena.classList.remove(className); //usuwam klasę
		text3.innerHTML='';
	}
});


function liczenieKlas(){

	var liczba_klas = 0;

	
		if(inputNazwa.classList.contains("field-error") || inputCena.classList.contains("field-error") || inputOpis.classList.contains("field-error")){
			liczba_klas++;
			return false;
		}	
	return true;
}
