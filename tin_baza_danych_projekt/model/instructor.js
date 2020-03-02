const db = require('../db/mysql');
//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const instructorExtent = [];

class Instructor {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(firstName, lastName, dateOfBirth, sex, email, id) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.sex = sex;
        this.email = email;
    }

    //dodawanie obiektu do bazy
    static add(instructor) {
        return db.execute('INSERT INTO Wykladowca(imie, nazwisko, data_urodzenia, plec, email) values(?, ?, ?, ?, ?)',[instructor.firstName, instructor.lastName, instructor.dateOfBirth, instructor.sex, instructor.email]);
    }

    static get(id) {
        return db.execute('select * from Wykladowca WHERE Id_wykladowca = ?',[id]);
    }
    
    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return db.execute('select * from Wykladowca');
    }
    //edycja obiektu
    static edit(instructor) {
        return db.execute(
            'UPDATE Wykladowca SET imie = ?, nazwisko = ?, data_urodzenia = ?, plec = ?, email = ? WHERE Id_wykladowca = ?',
            [instructor.firstName, instructor.lastName, instructor.dateOfBirth, instructor.sex, instructor.email, instructor.id]
          );
    }
    //usuwanie obiektu po id
    static delete(id) {
        return db.execute('DELETE FROM Wykladowca WHERE Id_wykladowca = ?', [id]);
    } 
    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        //FIXME
    }
    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    
}


module.exports = Instructor;