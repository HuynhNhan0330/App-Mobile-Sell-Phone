<?php
include "../../helper/database.php";
?>
<?php
class category {
    private $ins;

    public function __construct() {
        $this->ins = new Database();
    }

    public function showCategorys() {
        $query = "SELECT * FROM category";
        $result = $this->ins->select($query);
        return $result;
    }

    public function deleteCategory($category_id) {
        $query = "DELETE FROM category WHERE category_id = '$category_id'";
        $result = $this->ins->delete($query);
        return $result;
    }
}
?>