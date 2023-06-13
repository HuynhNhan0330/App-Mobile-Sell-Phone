<?php
include_once "../../class/customer.php";
?>

<?php
$customer = new Customer;

$id=$_POST['record'];
$customer = new Customer;
$current_customer = $customer->findCustomer($id);
$row = $current_customer->fetch_assoc();

?>
<div class="container mt-3">
    <h2 class="text-center">Thông tin chi tiết của khách hàng</h2>
    <div class="mb-4 w-50 m-auto">
        <label>
            Mã khách hàng
        </label>
        <div class="form-control-static">
            <?=$row['id']?>
        </div>
    </div>
    <div class="mb-4 w-50 m-auto">
        <label>
            Tên khách hàng
        </label>
        <div class="form-control-static">
            <?=$row['name']?>
        </div>
    </div>
    <div class="mb-4 w-50 m-auto">
        <label>
            Email
        </label>
        <div class="form-control-static">
            <?=$row['email']?>
        </div>
    </div>
    <div class="mb-4 w-50 m-auto">
        <label>
            Địa chỉ
        </label>
        <div class="form-control-static">
            <?=$row['address']?>
        </div>
    </div>
    <div class="mb-4 w-50 m-auto">
        <label>
            Số điện thoại
        </label>
        <div class="form-control-static">
            <?=$row['phone']?>
        </div>
    </div>
    <div class="mb-4 w-50 m-auto">
        <label>
            CMND/CCCD
        </label>
        <div class="form-control-static">
            <?=$row['identification']?>
        </div>
    </div>
    <div class="mb-4 w-50 m-auto">
        <label for="username">
            Tài khoản
        </label>
        <div class="form-control-static">
            <?=$row['username']?>
        </div>
    </div>
    <div class="mb-4 w-50 m-auto">
        <label>
            Mật khẩu
        </label>
        <div class="form-control-static">
            <?=$row['password']?>
        </div>
    </div>
    <div class="mb-4 w-50 m-auto">
        <label>
            Ngày đăng kí
        </label>
        <div class="form-control-static">
            <?=$row['date_registered']?>
        </div>
    </div>
    <div class="w-50 m-auto">
        <button class="btn btn-secondary" style="height:40px" onclick="showCustomers()">Quay lại</button>
    </div>
</div>