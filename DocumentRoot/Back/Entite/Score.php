<?php

class Score 
{
    //attributs
    private $_id;
    private $_temps;
    private $_nom;

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
    
    //retourne l'objet au format json
    public function get_json(){
        return 
        [
            'id'   => $this->get_id(),
            'nom' => $this->get_nom(),
            'temps' => $this->get_temps()
        ];
    }
  
}
?>