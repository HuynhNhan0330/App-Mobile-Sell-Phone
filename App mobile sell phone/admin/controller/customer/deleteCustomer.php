<?php
    include_once "../../class/customer.php";
    $id=$_POST['record'];
    $customer = new Customer;
    $result = $customer->deleteCustomer($id);
?>