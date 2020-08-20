$(window).on("load", function() {

    //variables
    var valeurs = creerRandomValeurs();
    var valeurSelectionnee1;
    var valeurSelectionnee2;
    var caseSelectionnee1;
    var caseSelectionnee2;
    var compteurPaireTrouvees = 0;
    var casesTrouves = [];

    //initialisation du jeu
    creerPlateau();
    creerCartes();
    recupererMeilleursScores();

    //Clic sur "nouvelle partie", saisie du nom
    $("#nouvellePartieBtn").click(function(){
        $("#meilleursScores").hide();
        $("#perdu").hide();
        $("#gagne").hide();
        $("#saisieNom").fadeIn();
    });

    //clic sur "commencer partie"
    $("#commencerPartieBtn").click(function(){
        $("#saisieNom").hide();
        $("#plateau").fadeIn();
        $("#barreProgression").fadeIn();
        progres(120, 120, $('#barreProgression')); //affichage d'une barre de temps pour 2 minutes (120 secondes)

    });

    //clic sur "recommencer", rechargement du jeu
    $(".recommencerPartieBtn").click(function(){
        location.reload();
    });

    //saisie du nom
    $("#saisieNomTextbox").keyup(function(){
        $("#nomJoueur").val(this.value)
    });


    //lors du clic sur une carte sur le plateau
    $("#plateau td").click(function(){
        //On vérifie que la carte ne fait pas partie des cartes déjà trouvées
        if(!casesTrouves.includes($(this).find("canvas").attr("id"))){
            //si deux cartes sont selectionnées et qu'elles sont différentes
            if(valeurSelectionnee1 != undefined && valeurSelectionnee2 != undefined && valeurSelectionnee1 != valeurSelectionnee2){
                //si la première carte cliquée n'a pas déjà été sélectionnée
                if(!casesTrouves.includes(caseSelectionnee1)){
                    $("#"+caseSelectionnee1).hide();
                }
                //si la deuxième carte cliquée n'a pas déjà été sélectionnée
                if(!casesTrouves.includes(caseSelectionnee2)){
                    $("#"+caseSelectionnee2).hide();
                }
                //on réinitialise les valeur selectionnées et on leur enleve la classe "erreur" qui les entoure de rouge
                valeurSelectionnee1 = undefined;
                valeurSelectionnee2 = undefined;
                $("#"+caseSelectionnee1).removeClass("erreur");
                $("#"+caseSelectionnee2).removeClass("erreur");

            }

            //si la carte première valeur n'est pas définie on lui attribue la valeur de la carte cliquée
            if(valeurSelectionnee1 === undefined){
                //on attribue la première case selectionnée
                caseSelectionnee1 = $(this).find("canvas").attr("id");
                //on attribue la première valeur selectionnée
                valeurSelectionnee1 = $("#valeur"+caseSelectionnee1).attr("value");
                $("#"+caseSelectionnee1).show(); //affichage de la carte sur le plateau de jeu
            }
            else{
                //on vérifie que l'utilisateur n'a pas cliqué deux fois sur la même carte via son identifiant
                if(caseSelectionnee1 != $(this).find("canvas").attr("id")){
                    //on attribue la seconde case selectionnée
                    caseSelectionnee2 = $(this).find("canvas").attr("id");
                    //on attribue la seconde valeur selectionnée
                    valeurSelectionnee2 = $("#valeur"+caseSelectionnee2).attr("value");

                    $("#"+caseSelectionnee2).show();//affichage de la carte sur le plateau de jeu

                    //si les deux cartes sont les mêmes
                    if(valeurSelectionnee1 == valeurSelectionnee2){
                        //on incrémente le compteur de paires trouvées
                        compteurPaireTrouvees++;

                        //on ajoute les cases à la liste des cases trouvées
                        casesTrouves.push(caseSelectionnee1);
                        casesTrouves.push(caseSelectionnee2);

                        //on réinitialise les valeur selectionnées
                        valeurSelectionnee1 = undefined;
                        valeurSelectionnee2 = undefined;

                        //si les 14 paires ont été trouvées la partie est gagnée
                        if(compteurPaireTrouvees==14){
                            //on fait appel à la fonction de sauvegarde de score
                            sauvegarderScore();

                            //on cache le plateau et barre de temps restant
                            $("#plateau").hide();
                            $("#barreProgression").hide();

                            //on affiche la fenetre qui signifie au joueur qu'il a gagné la partie
                            $("#gagne").fadeIn();
                        }
                    }
                    else{
                        //si les deux cartes sont différentes on ajoute la classe "erreur" pour entourer les cartes de rouge
                        $("#"+caseSelectionnee1).addClass("erreur");
                        $("#"+caseSelectionnee2).addClass("erreur");
                    }
                }
            }
        }
    });

     //fonction pour découper les cartes dans l'image les contenant
     function dessinCartes(element, number){
        var img = document.getElementById("scream"); //image à utiliser
        var c = document.getElementById("element"+element); //element pour l'affichage dans le plateau
        var ctx = c.getContext("2d");
        ctx.drawImage(img, 0, number*100, 100, 100,0 ,0, 100,100); //découpage de l'image via Canvas
    }

    //création du plateau de jeu
    function creerPlateau(){
        var contenu = "<table>";
        var compteur = 0;

        //on boucle sur 4 lignes * 7 colonnes pour créer un plateau de 28 cartes
        for(var lignes=0; lignes<4; lignes++){
            contenu += "<tr>";
            for(var colonnes = 0; colonnes <7; colonnes++){
                contenu += "<td>"
                contenu += "<input type='hidden' id='valeurelement"+compteur+"' value='"+valeurs[compteur]+"'/>";
                contenu += "<canvas width='100' height='100' class='invisible' id='element"+compteur+"'></canvas>";
                contenu += "</td>";
                compteur++;
            }
            contenu += "</tr>";
        }
        contenu += "</table>";

        $("#plateau").html(contenu);
    }

    function creerCartes(){
        //creation de 28 cartes (plateau de 28)
        for(var compteur=0; compteur<28; compteur++){
            dessinCartes(compteur, valeurs[compteur]);
        }
    }

    function creerRandomValeurs(){
        var valeurs = [];

        //on crée un tableau avec 18 valeurs possibles
        for(var i =0; i<18; i++){
            valeurs[i] = i;

        }

        //on mélange le tableau de manière aléatoire
        valeurs = melanger(valeurs);

        //on enlève 4 valeurs du tableau pour garder uniquement  14 valeurs (plateau de 28 cases)
        valeurs = valeurs.splice(-14)

        //on double le tableau pour arriver à 28 valeurs
        valeurs = valeurs.concat(valeurs);

        //on melange une dernière fois le tableau pour avoir un ordre de carte aléatoire
        valeurs = melanger(valeurs);

        return valeurs;
    }

    //mélange aléatoire du tableau des cartes
    function melanger(array) {
        var m = array.length, t, i;

        // Tant qu'il reste des éléments à mélager
        while (m) {

            //on prend un element aléatoire dans le tableau
            i = Math.floor(Math.random() * m--);

            //on l'intervertit avec l'élément courant
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }

    //Gestion de l'affichage du temps restant
    function progres(tempsRestant, tempsTotal, $element) {
        var barreProgressionWidth = tempsRestant * $element.width() / tempsTotal;
        $element.find('div').animate({ width: barreProgressionWidth }, 500);
        if(tempsRestant > 0) { //si il reste du temps, on enleve une seconde chaque seconde
            setTimeout(function() {
                progres(tempsRestant - 1, tempsTotal, $element);
                $("#temps").val(tempsTotal-tempsRestant);
            }, 1000);
        }
        else{ //sinon, la partie est perdue
            if($("#barreProgression").is(":visible")){
                $("#plateau").hide();
                $("#barreProgression").hide();
                $("#perdu").fadeIn();
            }
        }
    };

    //Envoi du score à sauvegarder au back via une requête ajax
    function sauvegarderScore(){
        $.ajax({
            url : 'http://localhost:8087/Back',
            type : 'GET',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType : 'json',
            data : 'action=ajouterScore&nom='+encodeURIComponent($("#nomJoueur").val())+'&temps='+$("#temps").val()
        });
    }

    //Récupération des meilleurs scores via une requête ajax
    function recupererMeilleursScores(){
        $.ajax({
            url : 'http://localhost:8087/Back',
            type : 'GET',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType : 'json',
            data : 'action=recupererMeilleursScores',
            success : function(resultat, statut){
                //variable récupérant le HTML de la liste des scores à afficher
                var listeHtml = "";
                //récupération des scores
                resultat.forEach(score => {
                    listeHtml += "<tr>";
                    if(score.nom==""){ //si le joueur n'a pas entré de nom
                        listeHtml += "<th>Joueur Anonyme</th>";
                    }
                    else{
                        listeHtml += "<th>"+score.nom+"</th>";
                    }
                    listeHtml += "<td>"+score.temps+" s.</td>";
                    listeHtml += "</tr>";
                });
                $("#meilleursScoresListe").html(listeHtml);
            },

            error : function(resultat, statut, erreur){
                console.error(erreur);
            }
        });
    }

});
