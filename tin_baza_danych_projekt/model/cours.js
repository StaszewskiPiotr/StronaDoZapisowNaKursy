const db = require('../db/mysql');
//licznik id

class Cours {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(name, description, price, id_instructor, id) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.id_instructor = id_instructor;
    }

    //dodawanie obiektu do bazy
    static add(cours) {
        // cours.id = nextId++;
        // coursExtent.push(cours);
        // return cours;
        return db.execute('insert into Kurs (Nazwa, Opis, Cena, Wykladowca_Id_wykladowca) values (?, ?, ?, ?)', [cours.name, cours.description, cours.price, cours.id_instructor]);
        // return db.execute(
        //     'insert into Klient (imie, nazwisko, plec,email, data_urodzenia) values (?, ?, ?, ?, ?)',
        //     [user.firstName, user.lastName, user.sex, user.email, user.dateOfBirth]
        //   );
    }

    static get(id) {
        return db.execute('select * from Kurs WHERE Id_kurs = ?',[id]);
    }

    
    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return db.execute('select * from Kurs');
    }
    //edycja obiektu
    static edit(cours) {
        // for (let index = 0; index < coursExtent.length; index++) {
        //     if(coursExtent[index].id == cours.id){
        //         coursExtent[index] = cours;
        //     }
        // }

        return db.execute(
            'UPDATE Kurs SET Nazwa = ?, Opis = ?, Cena = ?, Wykladowca_Id_wykladowca = ? WHERE Id_kurs = ?',
            [cours.name, cours.description, cours.price, cours.id_instructor, cours.id]
          );
    }
    //usuwanie obiektu po id
    static delete(id) {
        // const coursList = [];
        // for (let index = 0; index < coursExtent.length; index++) {
        //     if(coursExtent[index].id != id){
        //         coursList.push(coursExtent[index]);
        //     }
        // }
        // coursExtent.splice(0,coursExtent.length);

        // for (let indexx = 0; indexx < coursList.length; indexx++) {
        //         coursExtent.push(coursList[indexx]);         
        // }
        // return coursExtent;
        return db.execute('DELETE FROM Kurs WHERE Id_kurs = ?', [id]);
    } 
    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        //FIXME
    }
    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    // static initData() {
    //     //usuwamy zawartość tablicy
    //     coursExtent.splice(0, coursExtent.length);
    //     //resetujemy licznik id
    //     nextId = 1;
    //     Cours.add(new Cours('Rozmowa kwalifikacyjna', 'Kurs przygotowujący i zaznajamiący z technikami stosowanymi na rozmowach kwalifikacyjnych.',450));
    //     Cours.add(new Cours('Pomoc w stworzeniu CV', 'Pomoc przy stworzeniu CV polegająca m.in. na umiejętnym uwydatnieniu swoich pozytywnych cech i stworzeniu designu dzięki, któremu Twoje CV nie zaginie posród tysięcy innych.',200));
    //     Cours.add(new Cours('Pomoc w znalezieniu pracy', 'Pomoc w znalezieniu najodpowiedniejszej i najlepiej płatnej pracy z możliwych dzięki nawiązaniu współpracy z setkami polskich i zagranicznych firm.',200));
    // }
}

//Cours.initData();

module.exports = Cours;