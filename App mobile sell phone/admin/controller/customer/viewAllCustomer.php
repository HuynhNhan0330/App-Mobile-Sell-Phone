<?php
include_once "../../class/customer.php";
include_once "../../helper/format.php";
?>

<?php
$customer = new Customer;
$list_customer = $customer->showCustomers();

$format = new Format;
?>

<div>
<h2 class="text-center">Tất cả khách hàng</h2>

<button type="button" class="btn btn-success" onclick="showAddCustomer()" style="height:40px; margin-bottom: 10px">
Thêm khách hàng
</button>
                    <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col" class="text-center">Mã</th>
                        <th scope="col" class="text-center">Tên </th>
                        <th scope="col" class="text-center">Email</th>
                        <th scope="col" class="text-center">Số điện thoại</th>
                        <th scope="col" class="text-center">Địa chỉ</th>
                        <th scope="col" class="text-center">CMND/CCCD</th>
                        <th scope="col" class="text-center">Ngày đăng kí</th>
                        <th scope="col" class="text-center" colspan="3">Thao tác</th>
                    </tr>
                </thead>
                <?php
                
                if ($list_customer->num_rows > 0) {
                    while ($row = $list_customer->fetch_assoc()) {
                        ?>
                        <tr>
                            <td scope="col">
                                <?= $row["id"] ?>
                            </td>
                            <td>
                                <?= $format->textShorten($row["name"], 25)?>
                            </td>
                            <td>
                                <?= $format->textShorten($row["email"], 10)?>
                            </td>
                            <td>
                                <?= $format->textShorten($row["phone"], 12)?>
                            </td>
                            <td>
                                <?= $format->textShorten($row["address"], 10)?>
                            </td>
                            <td>
                                <?= $format->textShorten($row["identification"], 12)?>
                            </td>
                            <td>
                                <?php
                                $formattedDate = date("d-m-Y", strtotime($row["date_registered"]));
                                echo $formattedDate;
                                ?>
                            </td>
                            <td><button class="btn btn-success" style="height:40px" onclick="customerView('<?=$row['id']?>')">Xem</button></td>
                            <td><button class="btn btn-primary" style="height:40px" onclick="variationEditForm('<?=$row['id']?>')">Sửa</button></td>
                            <td><button class="btn btn-danger" style="height:40px"  onclick="customerDelete('<?=$row['id']?>')">Xoá</button></td>
                        </tr>
                        <?php
                    }
                }
                ?>
            </table>
            </div>