var inputDataUrodzeniaKli = document.querySelector('#data-urodzenia-input-2');


inputDataUrodzeniaKli.addEventListener('change', function() {
	var val = inputDataUrodzeniaKli.value;
	var className = 'field-error';
	
	var Bday = new Date(val);
	var wiek = (Date.now()-Bday)/31557600000;

		
    if (wiek < 16) {
		inputDataUrodzeniaKli.classList.add(className); //dodaję klasę do pola
		alert("Wymagane ukończenie 16 lat");
    } else {
        inputDataUrodzeniaKli.classList.remove(className); //usuwam klasę
    }
});
