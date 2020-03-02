const express = require('express');
const router = express.Router();

const Cours = require('../model/cours');

router.get("/users/ankieta", (req, res, next) => {
    const coursList = Cours.list();
    res.render('users/ankieta', {coursList: coursList});
});

router.get("/inne/o-nas", (req, res, next) => {
    res.redirect('../../views/inne/o-nas');
});

router.get("/admin-logowanie", (req, res, next) => {
    res.render('users/admin-logowanie');
});

router.get("/galeria", (req, res, next) => {
    console.log('dziala');
    res.render('../inne/galeria');
});


router.get("/panel-admin", (req, res, next) => {
    res.render('users/panel-admin');
});

router.get("/lista-kursow", (req, res, next) => {
    const coursList = Cours.list();
    res.render('cours/lista-kursow', {coursList: coursList});
});

router.get("/dodaj-kurs", (req, res, next) => {
    res.render('cours/dodaj-kurs', { pageTitle: "Nowy kurs", formAction: "add", cours: {} });
});

router.get("/usun-kurs", (req, res, next) => {
    //res.render('cours/usun-kurs', { pageTitle: "Usuń kurs", formAction: "delete", cours: {} });
    const url = 'http://localhost:3000/cours' + req.url;
    const current_url = new URL(url);
    const search_params = current_url.searchParams;
    const id  = search_params.get('id_kurs');
    //const user = User.get(id);
    //res.render('users/usun-klienta', { pageTitle: "Usuń użytkownika", formAction: "delete", user: {user}});
    Cours.delete(id);
    res.redirect("../cours/lista-kursow");
});

router.get("/edytuj-kurs", (req, res, next) => {
    //res.render('users/edytuj-klienta', { pageTitle: "Edytuj użytkownika", formAction: "edit", user: {} });
    const url = 'http://localhost:3000/cours' + req.url;
    const current_url = new URL(url);
    const search_params = current_url.searchParams;
    const id  = search_params.get('id_kurs');
    const cours = Cours.get(id);
    res.render('cours/edytuj-kurs', {cours: cours});
});

router.get("/showNewForm", (req, res, next) => {
   
});

router.get("/showEditForm", (req, res, next) => {
    //FIXME
});

router.post("/add", (req, res, next) => { 
    const newCours = new Cours(req.body.kurs, req.body.opis, req.body.cena);
    Cours.add(newCours);
    res.redirect("../cours/lista-kursow");
});

router.post("/edit", (req, res, next) => {
   const cours = new Cours(req.body.nazwa, req.body.opis, req.body.cena, req.body.Id);
   Cours.edit(cours);
   res.redirect("../cours/lista-kursow");
});

router.get("/showDetails", (req, res, next) => {
    //FIXME
});

router.get("/delete", (req, res, next) => {
    Cours.delete();
});


module.exports.route = router; 