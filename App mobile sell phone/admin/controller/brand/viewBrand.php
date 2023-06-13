<?php
include_once "../../class/brand.php";
include_once "../../helper/format.php";
?>

<?php
$brand = new brand;
$list_brand = $brand->showBrands();
$format = new Format;
?>

<div>
<h2 class="text-center">Tất cả thương hiệu</h2>

<button type="button" class="btn btn-success" onclick="showAddbrand()" style="height:40px; margin-bottom: 10px">
Thêm thương hiệu
</button>
                    <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col" class="text-center">Mã</th>
                        <th scope="col" class="text-center">Tên</th>
                        <th scope="col" class="text-center" colspan="3">Thao tác</th>
                    </tr>
                </thead>
                <?php
                
                if ($list_brand->num_rows > 0) {
                    while ($row = $list_brand->fetch_assoc()) {
                        ?>
                        <tr>
                            <td scope="col">
                                <?= $row["brand_id"] ?>
                            </td>
                            <td>
                                <?= $format->textShorten($row["brand_name"], 30)?>
                            </td>
                            <td><button class="btn btn-success" style="height:40px" onclick="variationEditForm('<?=$row['brand_id']?>')">Xem</button></td>
                            <td><button class="btn btn-primary" style="height:40px" onclick="variationEditForm('<?=$row['brand_id']?>')">Sửa</button></td>
                            <td><button class="btn btn-danger" style="height:40px"  onclick="brandDelete('<?=$row['brand_id']?>')">Xoá</button></td>
                        </tr>
                        <?php
                    }
                }
                ?>
            </table>
            </div>