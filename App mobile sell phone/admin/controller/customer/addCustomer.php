<?php
include_once "../../class/customer.php";
?>

<?php
$customer = new Customer;

if (isset($_POST['insert_customer'])) {
    
}

?>
<div class="container mt-3">
    <h2 class="text-center">Thêm khách hàng</h2>
    <form action="" enctype='multipart/form-data' method='post'>
        <div class="mb-4 w-50 m-auto">
            <label for="customer_name">
                Tên khách hàng
            </label>
            <input type="text" name="customer_name" id="customer_name"
                    class="form-control"
                    placeholder="Nhập tên khách hàng" autocomplete="off" required="required">
        </div>
        <div class="mb-4 w-50 m-auto">
            <label for="email">
                Email
            </label>
            <input type="text" name="email" id="email"
                    class="form-control"
                    placeholder="Nhập email" autocomplete="off" required="required">
        </div>
        <div class="mb-4 w-50 m-auto">
            <label for="address">
                Địa chỉ
            </label>
            <input type="text" name="address" id="address"
                    class="form-control"
                    placeholder="Nhập địa chỉ" autocomplete="off" required="required">
        </div>
        <div class="mb-4 w-50 m-auto">
            <label for="phone">
                Số điện thoại
            </label>
            <input type="text" name="phone" id="phone"
                    class="form-control"
                    placeholder="Nhập số điện thoại" autocomplete="off" required="required">
        </div>
        <div class="mb-4 w-50 m-auto">
            <label for="username">
                Tài khoản
            </label>
            <input type="text" name="username" id="username"
                    class="form-control"
                    placeholder="Nhập tài khoản" autocomplete="off" required="required">
        </div>
        <div class="mb-4 w-50 m-auto">
            <label for="password">
                Mật khẩu
            </label>
            <input type="text" name="password" id="password"
                    class="form-control"
                    placeholder="Nhập mật khẩu" autocomplete="off" required="required">
        </div>

        <div class="w-50 m-auto">
            <button class="btn btn-secondary" style="height:40px" onclick="showCustomers()">Huỷ</button>
            <button type="submit" name="insert_customer" class="btn btn-success" style="height:40px">Thêm</button>
        </div>
    </form>
</div>