const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const User = require('../model/user');
const Cours = require('../model/cours');
const Instructor = require('../model/instructor');

router.get("/users/ankieta", (req, res, next) => {
    // const coursList = Cours.list();
    // res.render('users/ankieta', {coursList: coursList});

    Cours.list()
    .then( ([coursList, metadata]) => {
      //wywołane w momencie poprawnego wykonania instrukcji sql i zwrócenia wyniku
      res.render('users/ankieta', {coursList: coursList});
    })
    .catch(err => {
      //błąd komunikacji z bazą danych
      console.log(err);
    });
});

router.get("/index", (req, res, next) => {
    res.redirect('/');
});

router.get("/admin-logowanie", (req, res, next) => {
    res.render('users/admin-logowanie');
});

router.get("/panel-admin", (req, res, next) => {
    res.render('users/panel-admin');
});

router.get("/lista-kursow", (req, res, next) => {
    // const coursList = Cours.list();
    // res.render('cours/lista-kursow', {coursList: coursList});

    Cours.list()
      .then( ([coursList, metadata]) => {
        //wywołane w momencie poprawnego wykonania instrukcji sql i zwrócenia wyniku
        res.render('cours/lista-kursow', {coursList: coursList});
      })
      .catch(err => {
        //błąd komunikacji z bazą danych
        console.log(err);
      });
});

router.get("/dodaj-kurs", (req, res, next) => {

    Instructor.list()
    .then( ([instructorList, metadata]) => {
      //wywołane w momencie poprawnego wykonania instrukcji sql i zwrócenia wyniku
      res.render('cours/dodaj-kurs', { pageTitle: "Nowy kurs", formAction: "add", instructorList: instructorList, cours: {} });
    })
    .catch(err => {
      //błąd komunikacji z bazą danych
      console.log(err);
    });

});

router.get("/usun-kurs", (req, res, next) => {
    //res.render('cours/usun-kurs', { pageTitle: "Usuń kurs", formAction: "delete", cours: {} });
    const url = 'http://localhost:3000/cours' + req.url;
    const current_url = new URL(url);
    const search_params = current_url.searchParams;
    const id  = search_params.get('id_kurs');
    //const user = User.get(id);
    //res.render('users/usun-klienta', { pageTitle: "Usuń użytkownika", formAction: "delete", user: {user}});
    // Cours.delete(id);
    // res.redirect("../cours/lista-kursow");

    Cours.get(id)
    .then(([kurs, methadata]) => {
        res.render("cours/usun-kurs",{formAction: "usun", kurs: kurs});
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/usun", (req, res, next) => {

  Cours.delete(req.body.Id)
  .then(() => {
      res.redirect("../cours/lista-kursow");
  })
  .catch(err => {
    console.log(err);
  });
});

router.get("/edytuj-kurs", (req, res, next) => {
    //res.render('users/edytuj-klienta', { pageTitle: "Edytuj użytkownika", formAction: "edit", user: {} });
    const url = 'http://localhost:3000/cours' + req.url;
    const current_url = new URL(url);
    const search_params = current_url.searchParams;
    const id  = search_params.get('id_kurs');
    // const cours = Cours.get(id);
    // res.render('cours/edytuj-kurs', {cours: cours});
    Cours.get(id)
      .then( ([kurs, metadata]) => {
        //wywołane w momencie poprawnego wykonania instrukcji sql i zwrócenia wyniku
            Instructor.list()
              .then( ([instructorList, metadata]) => {
                //wywołane w momencie poprawnego wykonania instrukcji sql i zwrócenia wyniku
                const cours = new Cours(kurs[0].Nazwa, kurs[0].Opis, kurs[0].Cena, kurs[0].Wykladowca_Id_wykladowca, kurs[0].Id_kurs);
                  console.log("wykladowca: " + kurs[0].Wykladowca_Id_wykladowca);
                        Instructor.get(kurs[0].Wykladowca_Id_wykladowca)
                          .then( ([instructorDefault, metadata]) => {
                            const instructorDefault2 = new Instructor(instructorDefault[0].imie, instructorDefault[0].nazwisko, instructorDefault[0].data_urodzenia, instructorDefault[0].plec, instructorDefault[0].email, instructorDefault[0].ID_wykladowca);
                            res.render('cours/edytuj-kurs', {instructorList: instructorList, cours: cours, instructorDefault2: instructorDefault2});
                          })
                          .catch(err => {
                            //błąd komunikacji z bazą danych
                            console.log(err);
                          });

            })
            .catch(err => {
              //błąd komunikacji z bazą danych
              console.log(err);
            });
      })
      .catch(err => {
        //błąd komunikacji z bazą danych
        console.log(err);
      });
});



router.post("/add", (req, res, next) => { 

  const schema = Joi.object().keys({
      kurs : Joi.string().min(1).max(45).required(),
      opis : Joi.string().pattern(/^(?!(Opisz kurs)$).{1,500}$/).required(),
      cena : Joi.string().pattern(/^\d+(.\d{1,2})?$/).required(),
      wykladowca : Joi.required()
  });

    
    const {value, error} = schema.validate(req.body);
    if(error && error.details){
      console.log(error);
    }else{
    let str = req.body.wykladowca;
    var id = str.split(" ");
    const newCours = new Cours(req.body.kurs, req.body.opis, req.body.cena, id[0]);

    Cours.add(newCours)
    .then(() => {
        res.redirect("../cours/lista-kursow");
    })
    .catch(err => {
      console.log(err);
    });
    }

});

router.post("/edit", (req, res, next) => {

  const schema = Joi.object().keys({
    kurs : Joi.string().min(1).max(45).required(),
    opis : Joi.string().pattern(/^(?!(Opisz kurs)$).{1,500}$/).required(),
    cena : Joi.string().pattern(/^\d+(.\d{1,2})?$/).required(),
    wykladowca : Joi.required(),
    IdKurs : Joi.string().required()
});

  
  const {error} = schema.validate(req.body);
  if(error && error.details){
    return res.status(400).json({ status: 400, errors: error.message });
  }else{
  let wykladowca = req.body.wykladowca;
  let id = wykladowca.split(" ");
  let idkurs = req.body.IdKurs;

   const cours = new Cours(req.body.kurs, req.body.opis, req.body.cena, id[0], idkurs);
   Cours.edit(cours)
    .then(() => {
        res.redirect("../cours/lista-kursow");
    })
    .catch(err => {
      console.log(err);
    }); 
  }
});




module.exports.route = router; 