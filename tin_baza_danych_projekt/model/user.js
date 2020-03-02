const db = require('../db/mysql');
//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const userExtent = [];

class User {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(firstName, lastName, sex, email, dateOfBirth, id) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.sex = sex;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
    }

    //dodawanie obiektu do bazy
    static add(user) {
        // user.id = nextId++;
        // userExtent.push(user);
        // return user;
        return db.execute(
            'insert into Klient (imie, nazwisko, plec,email, data_urodzenia) values (?, ?, ?, ?, ?)',
            [user.firstName, user.lastName, user.sex, user.email, user.dateOfBirth]
          );
    }
    static get(id) {
        //return userExtent[id-1];
        return db.execute('select * from Klient WHERE Id_Klient = ?',[id]);
    }
    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        //return userExtent;
        return db.execute('select Id_Klient, imie, nazwisko, plec, email, data_urodzenia from Klient');
    }
    //edycja obiektu
    static edit(user) {
        // for (let index = 0; index < userExtent.length; index++) {
        //     if(userExtent[index].id == user.id){
        //         userExtent[index] = user;
        //     }
        // }
        return db.execute(
            'UPDATE Klient SET imie = ?, nazwisko = ?, plec = ?, email = ?, data_urodzenia = ? WHERE Id_Klient = ?',
            [user.firstName, user.lastName, user.sex, user.email, user.dateOfBirth, user.id]
          );
    }
    //usuwanie obiektu po id
    static delete(id) {
        // const userList = [];
        // for (let index = 0; index < userExtent.length; index++) {
        //     if(userExtent[index].id != id){
        //         userList.push(userExtent[index]);
        //     }
        // }
        // userExtent.splice(0,userExtent.length);

        // for (let indexx = 0; indexx < userList.length; indexx++) {
        //         userExtent.push(userList[indexx]);         
        // }
        // return userExtent;
        return db.execute('DELETE FROM Klient WHERE Id_Klient = ?', [id]);
    } 
    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        //FIXME
    }
    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
//     static initData() {
//         //usuwamy zawartość tablicy
//         userExtent.splice(0, userExtent.length);
//         //resetujemy licznik id
//         nextId = 1;
//         User.add(new User('Jan', 'Kowalski','Mężczyzna', 'jan.kowalski@gmail.com','12-12-1998'));
//         User.add(new User('Anna', 'Wiśniewska','Kobieta', 'anna.wis@gmail.com','12-10-1996'));
//         User.add(new User('Andrzej', 'Nowak','Mężczyzna', 'andrzej95@gmail.com','12-12-1995'));
//     }
 }

//User.initData();

module.exports = User;