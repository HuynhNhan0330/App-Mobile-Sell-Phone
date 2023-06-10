<?php
include "../helper/database.php";
?>
<?php
class customer {
    private $ins;

    public function __construct() {
        $this->ins = new Database();
    }

    public function show_customers() {
        $query = "SELECT * FROM users where is_admin = 0";
        $result = $this->db->select($query);
        return $result
    }
}

?>