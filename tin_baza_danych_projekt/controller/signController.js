const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi')
            .extend(require('@hapi/joi-date'));
const Sign = require('../model/sign');
const Cours = require('../model/cours');
const Instructor = require('../model/instructor');
const User = require('../model/user');

router.get("/ankieta", (req, res, next) => {
    Cours.list()
    .then( ([coursList, metadata]) => {
      //wywołane w momencie poprawnego wykonania instrukcji sql i zwrócenia wyniku
      res.render('sign/ankieta', {formAction: "add-ankieta", coursList: coursList});
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

router.get("/lista-zapisow", (req, res, next) => {
    //const instructorList = Instructor.list();
    
    
    Sign.SignList()
      .then( ([signList, metadata]) => {

        let lista = signList;

        function convert(str) {
          var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
          return [date.getFullYear(), mnth, day].join("-");
        }

      for(let x = 0; x<lista.length; x++){
          lista[x].data = convert(lista[x].data);
      }
        //wywołane w momencie poprawnego wykonania instrukcji sql i zwrócenia wyniku
        res.render('sign/lista-zapisow', {lista: lista});
      })
      .catch(err => {
        //błąd komunikacji z bazą danych
        console.log(err);
      });
});

router.get("/dodaj-zapis", (req, res, next) => {

User.list()
    .then( ([userList, metadata]) => {
        Cours.list()
        .then( ([coursList, metadata]) => {
            Instructor.list()
            .then( ([instructorList, metadata]) => {
                res.render('sign/dodaj-zapis', { pageTitle: "Nowy zapis", formAction: "add", instructorList: instructorList, coursList: coursList, userList: userList, sign: {} });
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
     
    })
    .catch(err => {
      console.log(err);
    });
  
});
router.get("/usun-zapis", (req, res, next) => {
  const url = 'http://localhost:3000/users' + req.url;
  const current_url = new URL(url);
  const search_params = current_url.searchParams;
  const id  = search_params.get('id_zapis');

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  Sign.getSign(id)
  .then(([sign, methadata]) => {
    console.log(sign[0]);

      sign[0].data = convert(sign[0].data);

      res.render("sign/usun-zapis",{formAction: "usun", sign: sign});
  })
  .catch(err => {
    console.log(err);
  });
});

router.post("/usun", (req, res, next) => {
    const id  = req.body.id_zapis;

    Sign.delete(id)
    .then(() => {
        res.redirect("../sign/lista-zapisow");
    })
    .catch(err => {
      console.log(err);
    });
});


router.get("/showEditForm", (req, res, next) => {
    //FIXME
});

router.post("/add", (req, res, next) => { 
  const now = Date.now();
  
  const schema = Joi.object().keys({
    klient : Joi.string().required(),
    kurs : Joi.string().required(),
    data : Joi.date().min(now).required(),
    godzina : Joi.string().required()
});

  
  const {error} = schema.validate(req.body);
  if(error && error.details){
    return res.status(400).json({ status: 400, errors: error.message });
  }else{
    var klient = req.body.klient;
    var klientId = klient.split(" ");
    var kurs = req.body.kurs;
    var kursId = kurs.split(" ");

    const newSign = new Sign( req.body.data, req.body.godzina, klientId[0], kursId[0]);

    Sign.add(newSign)
    .then(() => {
        res.redirect("../sign/lista-zapisow");
    })
    .catch(err => {
      console.log(err);
    });
  }
});

router.post("/add-ankieta", (req, res, next) => { 
  const now = Date.now();
  
  const schema = Joi.object().keys({
    id_kurs : Joi.string().min(1).required(),
    data : Joi.date().min(now).required(),
    godzina : Joi.string().required(),
    wielokrotnyWybor : Joi.required(),
    wielokrotnyWybor2 : Joi.required()
});
  
  const {error} = schema.validate(req.body);
  if(error && error.details){
    return res.status(400).json({ status: 400, errors: error.message });
  }else{
    const kurs = req.body.id_kurs;
    const newSign = new Sign(req.body.data, req.body.godzina,1,kurs);

    Sign.add(newSign)
    .then(() => {
        res.render('sign/potwierdzenie-kursu');
    })
    .catch(err => {
      console.log(err);
    });
  }
});


router.get("/edytuj-zapis", (req, res, next) => {
    //res.render('users/edytuj-klienta', { pageTitle: "Edytuj użytkownika", formAction: "edit", user: {} });
    const url = 'http://localhost:3000/sign' + req.url;
    const current_url = new URL(url);
    const search_params = current_url.searchParams;
    const id  = search_params.get('id_zapis');

    function convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }

    Sign.get(id)
    .then(([sign1, methadata]) => {
      const sign = new Sign(sign1[0].data, sign1[0].godzina, sign1[0].Klient_Id_Klient, sign1[0].Kurs_Id_kurs, sign1[0].Id_zapis);
      sign.data = convert(sign.data);
   
    User.list()
    .then( ([userList, metadata]) => {
        Cours.list()
        .then( ([coursList, metadata]) => {
          res.render('sign/edytuj-zapis', {sign: sign, coursList: coursList, userList: userList});
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
    })
    .catch(err => {
      console.log(err);
    });

});

router.post("/edit", (req, res, next) => {
  const now = Date.now();
  
  const schema = Joi.object().keys({
    klient : Joi.string().required(),
    kurs : Joi.string().required(),
    data : Joi.date().min(now).required(),
    godzina : Joi.string().required(),
    Id :  Joi.string().required()
});

  
  const {error} = schema.validate(req.body);
  if(error && error.details){
    return res.status(400).json({ status: 400, errors: error.message });
  }else{
   var klient = req.body.klient.split(' '); 
   var kurs = req.body.kurs.split(' '); 
   console.log("id" + req.body.Id);
   const sign = new Sign(req.body.data, req.body.godzina, klient[0], kurs[0], req.body.Id);

   Sign.edit(sign)
   .then(() => {
      res.redirect("../sign/lista-zapisow");
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
    Sign.delete();
});


module.exports.route = router; 