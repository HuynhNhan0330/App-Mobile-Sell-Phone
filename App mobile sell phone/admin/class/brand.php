<?php
include "../../helper/database.php";
?>
<?php
class brand {
    private $ins;

    public function __construct() {
        $this->ins = new Database();
    }

    public function showBrands() {
        $query = "SELECT * FROM brand";
        $result = $this->ins->select($query);
        return $result;
    }

    public function deleteBrand($brand_id) {
        $query = "DELETE FROM brand WHERE brand_id = '$brand_id'";
        $result = $this->ins->delete($query);
        return $result;
    }
}
?>