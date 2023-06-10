<?php
include "/controller/customer_controller.php";
?>

<?php
$customer = new Customer;
$list_customer = $customer->show_customers();
?>

<h2>Tất cả khách hàng</h2>
<table class="table ">
    <thead>
        <tr>
            <th class="text-center">Mã</th>
            <th class="text-center">Tên </th>
            <th class="text-center">Email</th>
            <th class="text-center">Địa chỉ</th>
            <th class="text-center">Số điện thoại</th>
            <th class="text-center">Tài khoản</th>
            <th class="text-center">Mật khẩu</th>
            <th class="text-center">Ngày đăng kí</th>
        </tr>
    </thead>
    <?php
    
    if ($list_customer->num_rows > 0) {
        while ($row = $list_customer->fetch_assoc()) {
            ?>
            <tr>
                <td>
                    <?= $row["id"] ?>
                </td>
                <td>
                    <?= $row["name"] ?>
                </td>
                <td>
                    <?= $row["email"] ?>
                </td>
                <td>
                    <?= $row["phone"] ?>
                </td>
            </tr>
            <?php
        }
    }
    ?>
</table>