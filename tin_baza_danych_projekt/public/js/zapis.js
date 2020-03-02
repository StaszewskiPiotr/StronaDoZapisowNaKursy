let inputKlient = document.querySelector('#input-klient');
let inputKurs = document.querySelector('#input-kurs');
let inputDataKursu = document.querySelector('#data');
let text1 = document.querySelector('.text-helper1');
let text3 = document.querySelector('.text-helper3');
let text4 = document.querySelector('.text-helper4');
const className = 'field-error';


//acc_button.addEventListener("click", function(){\
function checkform(){
	
	if(inputKlient.value == ""){
		inputKlient.classList.add(className);
		text1.innerHTML='Musisz wybrać klienta';
	}else{
		inputKlient.classList.remove(className);
		text1.innerHTML='';
	}
	
	if(inputKurs.value == ""){
		inputKurs.classList.add(className);
		text3.innerHTML='Musisz wybrać kurs';
	}else{
		inputKurs.classList.remove(className);
		text3.innerHTML='';
	}
	
	
	let datakursu = new Date(inputDataKursu.value);
	let dataTeraz = Date.now();
	
	
    if (datakursu < dataTeraz) {
		inputDataKursu.classList.add(className); //dodaję klasę do pola
		text4.innerHTML = 'Możesz zapisać się najwcześniej na jutrzejszy kurs';	
	}else if(!inputDataKursu.value){
		inputDataKursu.classList.add(className); //dodaję klasę do pola
		text4.innerHTML = 'Data musi zostać podana';
	}else{
        inputDataKursu.classList.remove(className); //usuwam klasę
		text4.innerHTML = '';	
    }

	if(liczenieKlas()){
		return true;
	}else{
		return false;
	}
}	
//});

inputKlient.addEventListener('change', function() {
	if(inputKlient.value == ""){
		inputKlient.classList.add(className);
		text1.innerHTML='Musisz wybrać klienta';
	}else{
		inputKlient.classList.remove(className);
		text1.innerHTML='';
	}
});

inputKurs.addEventListener('change', function() {
	if(inputKurs.value == ""){
		inputKurs.classList.add(className);
		text3.innerHTML='Musisz wybrać kurs';
	}else{
		inputKurs.classList.remove(className);
		text3.innerHTML='';
	}
});

inputDataKursu.addEventListener('change', function() {
	let datakursu = new Date(inputDataKursu.value);
	let dataTeraz = Date.now();
	
    if (datakursu < dataTeraz) {
		inputDataKursu.classList.add(className); //dodaję klasę do pola
		text4.innerHTML = 'Możesz zapisać się najwcześniej na jutrzejszy kurs';	
	}else{
        inputDataKursu.classList.remove(className); //usuwam klasę
		text4.innerHTML = '';	
    }
});

function liczenieKlas(){

	var liczba_klas = 0;

		if(inputKlient.classList.contains("field-error") || inputKurs.classList.contains("field-error") || inputDataKursu.classList.contains("field-error")){
			liczba_klas++;
			return false;
		}	
			return true;
}