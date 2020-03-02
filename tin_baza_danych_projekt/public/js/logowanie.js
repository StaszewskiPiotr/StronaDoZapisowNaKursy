function weryfikacja(){
    var textBoxLogin = document.forms['formularz1']['login'];
	var textBoxHaslo = document.forms['formularz1']['password'];

    if (textBoxLogin.value !== 'admin' && textBoxHaslo.value !== 'admin') {
        alert('Powinieneś napisać admin!');
		return false;
    } else if(textBoxLogin.value !== 'admin' && textBoxHaslo.value == 'admin'){
        alert('Powinieneś napisać admin!');
		return false;
    }else if(textBoxHaslo.value !== 'admin' && textBoxLogin.value == 'admin'){
		alert('Powinieneś napisać admin!');
		return false;
	}
	
}