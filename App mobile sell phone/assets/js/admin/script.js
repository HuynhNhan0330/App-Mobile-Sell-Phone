$(document).on('click', '.admin-content #sidebar ul li a', function() {
    $('.admin-content #sidebar ul li a').removeClass('active');
    $(this).addClass('active')
})

$('form').submit(function(event) {
    event.preventDefault();
    console.log("Run");
});

// Customer
function showCustomers(){
    $.ajax({
        url:"../admin/controller/customer/viewAllCustomer.php",
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
                $('form').trigger('reset');
                showCustomers();
            }
        });
    }
}

function customerView(id){
    $.ajax({
        url:"../admin/controller/customer/viewCustomer.php",
        method:"post",
        data:{record:id},
        success:function(data){
            $('.allContent-section').html(data);
        }
    });
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



