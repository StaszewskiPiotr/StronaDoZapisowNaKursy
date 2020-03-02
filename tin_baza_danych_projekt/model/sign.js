const db = require('../db/mysql');

class Sign {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(data, godzina, Klient_Id_Klient, Kurs_Id_kurs, id) {
        this.id = id;
        this.data = data;
        this.godzina = godzina;
        this.Klient_Id_Klient = Klient_Id_Klient;
        this.Kurs_Id_kurs = Kurs_Id_kurs;
    }

    //dodawanie obiektu do bazy
    static add(sign) {
        return db.execute('insert into Zapis (data, godzina, Klient_ID_Klient, Kurs_Id_kurs) values (?, ?, ?, ?)', [sign.data, sign.godzina, sign.Klient_Id_Klient, sign.Kurs_Id_kurs]);
    }
    static get(id) {
        return db.execute('select * from Zapis WHERE Id_zapis = ?',[id]);
    }
    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return db.execute('select * from Zapis');
    }
    static SignList() {
        return db.execute('select Zapis.Id_zapis, Zapis.data, Zapis.godzina, Klient.imie, Klient.nazwisko, Kurs.Nazwa from Zapis inner join Klient on Klient.Id_Klient = Zapis.Klient_Id_Klient inner join Kurs on Kurs.Id_kurs = Zapis.Kurs_Id_kurs');
    }

    static getSign(id) {
        return db.execute('select Zapis.Id_zapis, Zapis.data, Zapis.godzina, Klient.imie, Klient.nazwisko, Kurs.Nazwa from Zapis inner join Klient on Klient.Id_Klient = Zapis.Klient_Id_Klient inner join Kurs on Kurs.Id_kurs = Zapis.Kurs_Id_kurs WHERE Zapis.Id_zapis = ?',[id]);
    }
    //edycja obiektu
    static edit(sign) {
        return db.execute(
            'UPDATE Zapis SET data = ?, godzina = ?, Klient_Id_Klient = ?, Kurs_Id_kurs = ? WHERE Id_zapis = ?',
            [sign.data, sign.godzina, sign.Klient_Id_Klient, sign.Kurs_Id_kurs, sign.id]
          );
    }
    
    //usuwanie obiektu po id
    static delete(id) {
        return db.execute('DELETE FROM Zapis WHERE Id_zapis = ?', [id]);
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

module.exports = Sign;