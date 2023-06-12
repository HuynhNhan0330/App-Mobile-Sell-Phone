$(document).on('click', '.admin-content #sidebar ul li a', function() {
    $('.admin-content #sidebar ul li a').removeClass('active');
    $(this).addClass('active')
})

// Customer
function showCustomers(){
    $.ajax({
        url:"../admin/controller/customer/viewCustomer.php",
        method:"post",
        data:{record:1},
        success:function(data){
            $('.allContent-section').html(data);
        }
    });
}

function showAddCustomer(){
    $.ajax({
        url:"../admin/controller/customer/addCustomer.php",
        method:"post",
        data:{record:1},
        success:function(data){
            $('.allContent-section').html(data);
        }
    });
}

function customerDelete(id){
    var isDelete = confirm("Xác nhận xoá");
    if (isDelete) {
        $.ajax({
            url:"../admin/controller/customer/deleteCustomer.php",
            method:"post",
            data:{record:id},
            success:function(data){
                alert(data);
                // $('form').trigger('reset');
                showCustomers();
            }
        });
    }
}

// Category
function showCategory(){
    $.ajax({
        url:"../admin/controller/category/viewCategory.php",
        method:"post",
        data:{record:1},
        success:function(data){
            $('.allContent-section').html(data);
        }
    });
}

// Brand
function showBrand(){
    console.log("Show Brand");
    $.ajax({
        url:"../admin/controller/brand/viewBrand.php",
        method:"post",
        data:{record:1},
        success:function(data){
            $('.allContent-section').html(data);
        }
    });
}



$('form').submit(function(event) {
    console.log("Run");
    event.preventDefault();
});
