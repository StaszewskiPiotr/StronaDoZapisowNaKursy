const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi')
            .extend(require('@hapi/joi-date'));
const User = require('../model/user');
const Cours = require('../model/cours');

router.get("/admin-logowanie", (req, res, next) => {
    res.render('users/admin-logowanie');
});

router.get("/zaloz-konto", (req, res, next) => {
    res.render('users/zaloz-konto', { pageTitle: "Nowy użytkownik", formAction: "add-konto", user: {} });
});

router.get("/panel-admin", (req, res, next) => {
    res.render('users/panel-admin');
});

router.get("/index", (req, res, next) => {
    res.redirect('/');
});

router.get("/lista-klientow", (req, res, next) => {
    // const userList = User.list();
    // res.render('users/lista-klientow', {userList: userList});
    User.list()
      .then( ([userList, metadata]) => {
        //wywołane w momencie poprawnego wykonania instrukcji sql i zwrócenia wyniku

        let lista = userList;


        function convert(str) {
          var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
          return [date.getFullYear(), mnth, day].join("-");
        }

      for(let x = 0; x<lista.length; x++){
          lista[x].data_urodzenia = convert(lista[x].data_urodzenia);
      }


        res.render('users/lista-klientow', {lista: lista});
      })
      .catch(err => {
        //błąd komunikacji z bazą danych
        console.log(err);
      });
});

router.get("/lista-kursow", (req, res, next) => {
    // const coursList = Cours.list();
    // res.render('users/lista-kursow', {coursList: coursList});
    Cours.list()
    .then( ([coursList, metadata]) => {
      //wywołane w momencie poprawnego wykonania instrukcji sql i zwrócenia wyniku
      res.render('users/lista-kursow', {coursList: coursList});
    })
    .catch(err => {
      //błąd komunikacji z bazą danych
      console.log(err);
    });
});

router.get("/dodaj-klienta", (req, res, next) => {
    res.render('users/dodaj-klienta', { pageTitle: "Nowy użytkownik", formAction: "add", user: {} });
});

router.get("/edytuj-klienta", (req, res, next) => {
    //res.render('users/edytuj-klienta', { pageTitle: "Edytuj użytkownika", formAction: "edit", user: {} });
    const url = 'http://localhost:3000/users' + req.url;
    const current_url = new URL(url);
    const search_params = current_url.searchParams;
    const id  = search_params.get('id_klient');
    //const user = User.get(id);
    //var str = user.dateOfBirth;
    //var res = str.split('-',3);
   // var dataUrodzenia = str.split('-').reverse().join('-');
    //var res = myString.split('-', 3);
    //var dataUrodzenia = res[2]+'-'+res[1]+'-'+res[0];
     //res.send(dataUrodzenia);
    //user.dateOfBirth = dataUrodzenia;
    //res.render('users/edytuj-klienta', {user: user});
    //console.log("id: " + id);
    
    User.get(id)
      .then( ([klient, metadata]) => {
        //console.log(user.imie);
        const user = new User(klient[0].imie, klient[0].nazwisko, klient[0].plec, klient[0].email, klient[0].data_urodzenia, klient[0].Id_Klient);

        function convert(str) {
          var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
          return [date.getFullYear(), mnth, day].join("-");
        }


          user.dateOfBirth = convert( user.dateOfBirth);
      



        res.render('users/edytuj-klienta', {formAction: "edit", user: user});
      })
      .catch(err => {
        console.log(err);
      });
});

router.get("/usun-klienta", (req, res, next) => {
  const url = 'http://localhost:3000/users' + req.url;
  const current_url = new URL(url);
  const search_params = current_url.searchParams;
  const id  = search_params.get('id_klient');

  User.get(id)
  .then(([osoba, methadata]) => {
      res.render("users/usun-klienta",{formAction: "usun", osoba: osoba});
  })
  .catch(err => {
    console.log(err);
  });
});


router.post("/usun", (req, res, next) => {

    User.delete(req.body.Id)
    .then(() => {
        res.redirect("../users/lista-klientow");
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/users/dodaj-klienta", (req, res, next) => {
    res.redirect("../users/dodaj-klienta");
});

router.post("/add", (req, res, next) => { 

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  
  const now = Date.now();
  const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 16)); 


  const schema = Joi.object().keys({
    imie : Joi.string().pattern(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{1,70}$/).required(),
    nazwisko : Joi.string().pattern(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{1,70}$/).required(),
    plec : Joi.string().required(),
    email : Joi.string().pattern(/^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/).required(),
    data_urodzenia : Joi.date().max(cutoffDate).required()
});

  
  const {error} = schema.validate(req.body);
  if(error && error.details){
    return res.status(400).json({ status: 400, errors: error.message });
  }else{
    const newUser = new User(req.body.imie, req.body.nazwisko, req.body.plec, req.body.email, convert(req.body.data_urodzenia));
    // User.add(newUser);
    // res.redirect("../users/lista-klientow");
    User.add(newUser)
    .then(() => {
       res.redirect("../users/lista-klientow");
    })
    .catch(err => {
      console.log(err);
    });
  }

});
router.post("/add-konto", (req, res, next) => { 
  const now = Date.now();
  const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 16)); 

  const schema = Joi.object().keys({
    imie : Joi.string().pattern(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{1,70}$/).required(),
    nazwisko : Joi.string().pattern(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{1,70}$/).required(),
    plec : Joi.string().required(),
    email : Joi.string().pattern(/^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/).required(),
    password : Joi.string().min(8).required(),
    passwordAgain : Joi.any().valid(Joi.ref('password')).required(),
    data_urodzenia : Joi.date().max(cutoffDate).required()
});

  
  const {error} = schema.validate(req.body);
  if(error && error.details){
    return res.status(400).json({ status: 400, errors: error.message });
  }else{
    const newUser = new User(req.body.imie, req.body.nazwisko, req.body.plec, req.body.email, req.body.data_urodzenia);

    User.add(newUser)
    .then(() => {
        res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
  }
});

router.post("/edit", (req, res, next) => {

  const now = Date.now();
  const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 16)); 


  const schema = Joi.object().keys({
    imie : Joi.string().pattern(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{1,70}$/).required(),
    nazwisko : Joi.string().pattern(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{1,70}$/).required(),
    plec : Joi.string().required(),
    email : Joi.string().pattern(/^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/).required(),
    dataUrodzenia : Joi.date().max(cutoffDate).required(),
    Id : Joi.string().required()
});

  
  const {error} = schema.validate(req.body);
  if(error && error.details){
    return res.status(400).json({ status: 400, errors: error.message });
  }else{
   const user = new User(req.body.imie, req.body.nazwisko, req.body.plec, req.body.email, req.body.dataUrodzenia, req.body.Id);

   User.edit(user)
    .then(() => {
        res.redirect("../users/lista-klientow");
    })
    .catch(err => {
      console.log(err);
    }); 
  }
});

router.get("/showDetails", (req, res, next) => {
    //FIXME
});

router.get("/delete", (req, res, next) => {
   // User.delete(req.body.custId);
    User.delete(req.body.custId)
    .then(() => {
        
    })
    .catch(err => {
      console.log(err);
    });    
});


module.exports.route = router; 