window.onload = demarrer;

function demarrer() {

    //Création des éléments qui seront présents dans le menu
    var menu = {
        Accueil         : ["lien","Accueil","index"],
        EspacePerso     : ["menu-elem","Espace Perso", "perso"],
        Connexion       : ["sub-menu-elem","perso","Connexion", ""],
        MesInformations : ["sub-menu-elem","perso","Mes Informations", ""],
        Historique      : ["sub-menu-elem","perso","Historique", ""],
        Messagerie      : ["sub-menu-elem","perso","Messagerie", ""],
        Destinations    : ["menu-elem","Découvrir","tableau"],
        SubDestinations : ["sub-menu-elem","tableau","Destinations","tableau"],
        VisiteAudio     : ["sub-menu-elem","tableau","Visite Virtuelle (audio)","visiteAudio"],
        VisiteVideo     : ["sub-menu-elem","tableau","Visite Virtuelle (video)","visiteVideo"],
        Contact         : ["lien","Contact", "contact"],
        Admin           : ["lien","Back Office", "backOffice"]
    };

    //Ajout des éléments dans le menu
    for (elem of Object.values(menu)) {
        addElemMenu(elem);
    }

    //On attribue un Event 'click' à chaque élément de mon menu
    var menuElems = $('.lien');

    for (const elem of menuElems) {
        $(elem).click(function() {
            showPage("#" + elem.id + "Section");
        });
    }

    showPage("#indexSection");

    //Création de destinations à ajouter dans le tableau
    var Bresil      = new Destination('../img/bresil.jpeg','Bresil','description TO DO','€1200');
    var Maroc       = new Destination('../img/maroc.jpeg','Maroc','description TO DO','€400');
    var Espagne     = new Destination('../img/spain.png','Espagne','description TO DO','€600');
    var Venezuela   = new Destination('../img/venezuela.jpeg','Venezuela','description TO DO','€1400');

    //Ajout des destinations dans le tableau Destinations
    addDestination(Bresil);
    addDestination(Maroc);
    addDestination(Espagne);
    addDestination(Venezuela);

    //On attribue un listener afin de recupérer l'image de la nouvelle destination
    $('#imgPaysInput').change(function() { 
        var imgUrl = URL.createObjectURL(this.files[0]);
        $('#uploadedImg').attr("src",imgUrl);
    });

    $('#addDestination').click(function() {
        createDestination();
    });

    for (let i = 0; i < 4; i++) {
        $('#indexSection .trips').append('<picture><img src="https://picsum.photos/200?random='+ i +'" alt=""></picture>');
    }

}

//fonction permettant d'ajouter un nouvel élément dans le menu du site
function addElemMenu(nouvelElem) {
    if (nouvelElem[0] == "menu-elem") {
        $('nav').append('<div class="nav-elem" id="'+ nouvelElem[2] +'">'+ nouvelElem[1] +'<ul class="sub-menu"></ul></div>');
    }else if(nouvelElem[0] == "lien"){
        $('nav').append('<div class="nav-elem lien" id="'+ nouvelElem[2] +'">'+ nouvelElem[1] +'</div>');
    }else{
        $('#'+nouvelElem[1]+' .sub-menu').append('<li class="nav-elem lien" id="'+ nouvelElem[3] +'">'+ nouvelElem[2] +'</li>');
    }
}

//fonction permettant d'ajouter une nouvelle destination à la liste de pays
function addDestination(nouvelleDestination) {
    $('#destinations').append('<tr class="destination"></tr>');
    $('#destinations tr:last-child').append('<td class="imgTableau"><img src='+ nouvelleDestination.srcImage +'></td>');
    $('#destinations tr:last-child').append('<td>' + nouvelleDestination.pays + '</td>');
    $('#destinations tr:last-child').append('<td>' + nouvelleDestination.descriptionPromo + '</td>');
    $('#destinations tr:last-child').append('<td>' + nouvelleDestination.prixPromo + '</td>');
    $('#destinations tr:last-child').append('<td><button type="button" class="customButton">Découvrir!</button></td>');
    $('#destinations tr:last-child').append('<td><button type="button" class="customButton" onclick="modifierDestination(this)">Modifier</button></td>');
    $('#destinations tr:last-child td:last-child').append('<button type="button" class="customButton" onclick="deleteDestination(this)">Supprimer</button>');
}

function showPage(pageId) {
    $("section").hide();
    $(pageId).show();
}

function createDestination(){
    var destination = new Destination($('#uploadedImg').attr("src"),$('#nomPays').val(),$('#description').val(),$('#prixOffre').val());
    addDestination(destination);

    //On remet à 0 le formulaire
    $('#uploadedImg').attr("src","");
    $('#imgPaysInput').val("");
    $('#nomPays').val("");
    $('#description').val("");
    $('#prixOffre').val("");
    showPage("#tableauSection")
}

function deleteDestination(elem){
    elem.parentElement.parentElement.remove();
}

function modifierDestination(elem) {
    showPage("#backOfficeSection");
    deleteDestination(elem);
    alert("L'élément va être supprimé du tableau afin de faciliter sa modification. Si vous ne voulez plus le modifier/supprimer cliquez sur le bouton \"Ajouter\" en bas du formulaire");
    const childs = elem.parentElement.parentElement.children;

    $('#uploadedImg').attr("src",childs[0].children[0].src);
    $('#nomPays').val(childs[1].textContent);
    $('#description').val(childs[2].textContent);
    $('#prixOffre').val(childs[3].textContent);
}