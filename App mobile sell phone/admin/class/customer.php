<?php
include "../../helper/database.php";
?>
<?php
class customer {
    private $ins;

    public function __construct() {
        $this->ins = new Database();
    }

    public function showCustomers() {
        $query = "SELECT * FROM users WHERE is_admin = 0";
        $result = $this->ins->select($query);
        return $result;
    }

    public function deleteCustomer($id) {
        $query = "DELETE FROM users WHERE id = '$id'";
        $result = $this->ins->delete($query);
        return $result;
    }

    public function insertCustomer() {
        
    }
}

?>