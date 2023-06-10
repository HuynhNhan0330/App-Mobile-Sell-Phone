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
    include_once "../config/dbconnect.php";
    $sql = "SELECT * from users where isAdmin=0";
    $result = $conn->query($sql);
    $count = 1;
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {

            ?>
            <tr>
                <td>
                    <?= $row["first_name"] ?>
                </td>
                <td>
                    <?= $row["email"] ?>
                </td>
                <td>
                    <?= $row["contact_no"] ?>
                </td>
                <td>
                    <?= $row["registered_at"] ?>
                </td>
            </tr>
            <?php
            $count = $count + 1;

        }
    }
    ?>
</table>