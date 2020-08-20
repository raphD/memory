<?php
class AccesBDD
{
    //attributs
    private $_serveur = "mariadb";
    private $_utilisateur = "root";
    private $_mdp = "";
    private $_bdd = "memory";

    //verification de la connexion à la base de données
    private function verificationConnexion($connexion){
        if ($connexion -> connect_errno) {
            echo "Erreur MySQL: " . $connexion -> connect_error;
            return false;
            exit();
        }
    }

    //enregistrement d'un nouveau score
    public function addScore(Score $score){
        //ouverture de la connexion
        $connexion = new mysqli($this->_serveur,$this->_utilisateur,$this->_mdp,$this->_bdd);

        //vérification de la connexion
        $this->verificationConnexion($connexion);

        //création de la requête
        $sql = "INSERT INTO scores (temps,nom) VALUES ('".$score->get_temps()."', '".$score->get_nom()."')";

        //execution de la requête
        if ($connexion->query($sql) === TRUE) {
          return "ok"; //retourne ok l'insertion a fonctionné
        } else {
          return "Erreur: " . $sql . " : " . $connexion->error; //sinon retourne l'erreur SQL
        }
    }

    //récupération des dix meilleurs scores
    public function getTop10Scores(){
        //ouverture de la connexion
        $connexion = new mysqli($this->_serveur,$this->_utilisateur,$this->_mdp,$this->_bdd);

        //vérification de la connexion
        $this->verificationConnexion($connexion);

        //execution de la requete
        $resultat = $connexion -> query("SELECT * FROM scores ORDER BY temps ASC LIMIT 10") ;

        //création d'un tableau des 10 meilleurs scores en bouclant sur le résultat de la requête
        while ($ligne = $resultat->fetch_assoc()) {
            $tmp_score = new Score();
            $tmp_score->set_id($ligne['id']);
            $tmp_score->set_temps($ligne['temps']);
            $tmp_score->set_nom($ligne['nom']);
            $scores[] =  $tmp_score->get_json(); //ajout des objets score au format JSON
        }

        //libération du résultat
        $resultat -> free_result();

        //fermeture de la connexion
        $connexion -> close();

        //retour des scores
        return $scores;
    }

    //accesseurs / modificateurs
    public function get_id(){
		return $this->_id;
	}

	public function set_id($id){
		$this->_id = $id;
	}

	public function get_temps(){
		return $this->_temps;
	}

	public function set_temps($temps){
		$this->_temps = $temps;
	}

	public function get_nom(){
		return $this->_nom;
	}

	public function set_nom($nom){
		$this->_nom = $nom;
	}


}
?>
