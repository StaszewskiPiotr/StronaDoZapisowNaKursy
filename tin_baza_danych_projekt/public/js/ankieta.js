let tabela = document.querySelector("#tabela");
let checkboxes = document.getElementsByClassName("cours-checkbox");
let inputDataKursu = document.querySelector('#data');
let text1 = document.querySelector('.text-helper1');
let text2 = document.querySelector('.text-helper2');
let text3 = document.querySelector('.text-helper3');
let text4 = document.querySelector('.text-helper4');
let checkbox5 = document.querySelector('#warunki-regulaminu');
let checkbox6 = document.querySelector('#wielokrotny-wybor2');
const className = 'field-error';


//acc_button.addEventListener("click", function(){
function checkform(){	
	var r = 0;
	var array = [];

		 for (var i = 0; i < checkboxes.length; i++) {
			 if(checkboxes[i].checked == true){
				 array.push(checkboxes[i]);
				 r++
			 }
		 }

	if(r>1){
		tabela.classList.add(className);
		text1.innerHTML = 'Możesz wybrać tylko jeden kurs';
	}else if(r==0){
		tabela.classList.add(className);
		text1.innerHTML = 'Musisz wybrać kurs';
	}else if(r==1){
		tabela.classList.remove(className);
		text1.innerHTML = '';
	}

	var datakursu = new Date(inputDataKursu.value);
	var dataTeraz = Date.now();
	var dni = (datakursu-dataTeraz)/(86400000);

	if(!inputDataKursu.value){
		inputDataKursu.classList.add(className); //dodaję klasę do pola
		text2.innerHTML = 'Pole data kursu musi zostać wypełnione';	
	}else if(dni < 1){
		inputDataKursu.classList.add(className); //dodaję klasę do pola
		text2.innerHTML = 'Możesz zapisać się najwcześniej na jutrzejszy kurs';
	}else{
		inputDataKursu.classList.remove(className); //usuwam klasę
		text2.innerHTML = '';
	}

	if(checkbox5.checked == false && checkbox6.checked == false){
		checkbox5.classList.add(className);
		checkbox6.classList.add(className);
		text3.innerHTML='Pole musi zostać zaznaczone';
		text4.innerHTML='Pole musi zostać zaznaczone';
	}else if(checkbox5.checked == false && checkbox6.checked == true){
		text3.innerHTML='Pole musi zostać zaznaczone';
		checkbox5.classList.add(className);
		text4.innerHTML='';
	}else if(checkbox5.checked == true && checkbox6.checked == false){
		text4.innerHTML='Pole musi zostać zaznaczone';
		checkbox6.classList.add(className);
		text3.innerHTML='';
	}else if(checkbox5.checked == true && checkbox6.checked == true){
		checkbox5.classList.remove(className);
		checkbox6.classList.remove(className);
		text3.innerHTML='';
		text4.innerHTML='';
	}

	if(liczenieKlas()){
		return true;
	}else{
		return false;
	}
}
//});

inputDataKursu.addEventListener('change', function() {
	var datakursu = new Date(inputDataKursu.value);
	var dataTeraz = Date.now();

	var dni = (datakursu-dataTeraz)/(86400000);
	
	
    if (dni < 1) {
		inputDataKursu.classList.add(className); //dodaję klasę do pola
		text2.innerHTML = 'Możesz zapisać się najwcześniej na jutrzejszy kurs';	
	}else{
        inputDataKursu.classList.remove(className); //usuwam klasę
		text2.innerHTML = '';	
    }
});

function liczenieKlas(){

	var liczba_klas = 0;
	
		if(tabela.classList.contains("field-error") || inputDataKursu.classList.contains("field-error") || checkbox5.classList.contains("field-error") || checkbox6.classList.contains("field-error")){
			liczba_klas++;
			return false;
		}
	return true;
}