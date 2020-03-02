const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi')
            .extend(require('@hapi/joi-date'));
const Instructor = require('../model/instructor');
const Cours = require('../model/cours');

// router.get("/ankieta", (req, res, next) => {
//     // const coursList = Cours.list();
//     // res.render('users/ankieta', {coursList: coursList});
// });

router.get("/lista-wykladowcow", (req, res, next) => {
    


    Instructor.list()
      .then( ([instructorList, metadata]) => {
        //wywołane w momencie poprawnego wykonania instrukcji sql i zwrócenia wyniku


        let lista = instructorList;


        function convert(str) {
          var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
          return [date.getFullYear(), mnth, day].join("-");
        }

      for(let x = 0; x<lista.length; x++){
          lista[x].data_urodzenia = convert(lista[x].data_urodzenia);
      }


        res.render('instructor/lista-wykladowcow', {lista: lista});
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

router.get("/dodaj-wykladowce", (req, res, next) => {
    res.render('instructor/dodaj-wykladowce', { pageTitle: "Nowy wykładowca", formAction: "add", instructor: {} });
});

router.get("/usun-wykladowce", (req, res, next) => {
    const url = 'http://localhost:3000/instructor' + req.url;
    const current_url = new URL(url);
    const search_params = current_url.searchParams;
    const id  = search_params.get('id_wykladowca');
    
    function convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }

    Instructor.get(id)
  .then(([instructor, methadata]) => {
    instructor[0].data_urodzenia = convert(instructor[0].data_urodzenia);
      res.render("instructor/usun-wykladowce",{formAction: "usun", instructor: instructor});
  })
  .catch(err => {
    console.log(err);
  });
});

router.post("/usun", (req, res, next) => {
  
  const id  = req.body.Id;
  //const user = User.get(id);
  //res.render('users/usun-klienta', { pageTitle: "Usuń użytkownika", formAction: "delete", user: {user}});

  Instructor.delete(id)
  .then(() => {
      res.redirect("../instructor/lista-wykladowcow");
  })
  .catch(err => {
    console.log(err);
  });
});

router.get("/edytuj-wykladowce", (req, res, next) => {
    //res.render('users/edytuj-klienta', { pageTitle: "Edytuj użytkownika", formAction: "edit", user: {} });
    const url = 'http://localhost:3000/instructor' + req.url;
    const current_url = new URL(url);
    const search_params = current_url.searchParams;
    const id  = search_params.get('id_wykladowca');

    Instructor.get(id)
    .then(([instructor2, methadata]) => {
  //var str = instructor.dateOfBirth;
  const instructor = new Instructor(instructor2[0].imie, instructor2[0].nazwisko, instructor2[0].data_urodzenia, instructor2[0].plec, instructor2[0].email, instructor2[0].Id_wykladowca);

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

      console.log(instructor);

      instructor.dateOfBirth = convert(instructor.dateOfBirth);
      // //var res = str.split('-',3);
      // var dataUrodzenia = str.split('-').reverse().join('-');
      // //var res = myString.split('-', 3);
      // //var dataUrodzenia = res[2]+'-'+res[1]+'-'+res[0];
      //  //res.send(dataUrodzenia);
       //instructor.dateOfBirth = dataUrodzenia;
      res.render('instructor/edytuj-wykladowce', {instructor: instructor});
    })
    .catch(err => {
      console.log(err);
    });




  
    
});

router.get("/panel-admin", (req, res, next) => {
    res.render('users/panel-admin');
});

router.get("/showNewForm", (req, res, next) => {
   
});

router.get("/showEditForm", (req, res, next) => {
    //FIXME
});

router.post("/add", (req, res, next) => { 

  const now = Date.now();
  const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18)); 


  const schema = Joi.object().keys({
    imie : Joi.string().pattern(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{1,70}$/).required(),
    nazwisko : Joi.string().pattern(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{1,70}$/).required(),
    plec : Joi.string().required(),
    email : Joi.string().pattern(/^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/).required(),
    dataUrodzenia : Joi.date().max(cutoffDate).required(),
});

  
  const {error} = schema.validate(req.body);
  if(error && error.details){
    return res.status(400).json({ status: 400, errors: error.message });
  }else{
    const newInstructor = new Instructor(req.body.imie, req.body.nazwisko, req.body.dataUrodzenia, req.body.plec, req.body.email);

    Instructor.add(newInstructor)
    .then(() => {
        res.redirect("../instructor/lista-wykladowcow");
    })
    .catch(err => {
      console.log(err);
    });
  }
});

router.post("/edit", (req, res, next) => {
  const now = Date.now();
  const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18)); 


  const schema = Joi.object().keys({
    imie : Joi.string().pattern(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{1,70}$/).required(),
    nazwisko : Joi.string().pattern(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{1,70}$/).required(),
    plec : Joi.string().required(),
    email : Joi.string().pattern(/^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/).required(),
    dataUrodzenia : Joi.date().max(cutoffDate).required(),
});

  
  const {error} = schema.validate(req.body);
  if(error && error.details){
    return res.status(400).json({ status: 400, errors: error.message });
  }else{
   const instructor = new Instructor(req.body.imie, req.body.nazwisko, req.body.dataUrodzenia, req.body.plec, req.body.email, req.body.IdWykladowca);

   Instructor.edit(instructor)
    .then(() => {
      res.redirect("../instructor/lista-wykladowcow");
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
    Instructor.delete();
});


module.exports.route = router; 