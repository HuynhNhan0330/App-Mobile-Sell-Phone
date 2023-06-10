$(document).on('click', '.admin-content #sidebar ul li a', function() {
    $('.admin-content #sidebar ul li a').removeClass('active');
    $(this).addClass('active')
})