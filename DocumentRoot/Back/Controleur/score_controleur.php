<?php
include("Entite/Score.php");
include("Modele/AccesBDD.php");

//récupération de l'action a effectuer
$action = $_REQUEST['action'];
ScoreControleur::$action($_REQUEST);

class ScoreControleur{

    //ajout d'un nouveau score
    public static function ajouterScore(){
        //creation d'un objet score avec les informations envoyées par le front
        $score = new Score();
        $score->set_temps($_REQUEST['temps']);
        $score->set_nom($_REQUEST['nom']);

        //enregistrement dans la base de données
        $accesBdd = new AccesBDD();
        echo $accesBdd->addScore($score);
    }

    //récupération des 10 meilleurs scores
    public static function recupererMeilleursScores(){
        $accesBdd = new AccesBDD();
        echo json_encode($accesBdd->getTop10Scores());
    }
}
?>
