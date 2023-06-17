$(document).on('click', '.admin-content #sidebar ul li a', function() {
    $('.admin-content #sidebar ul li a').removeClass('active');
    $(this).addClass('active')
})

$(document).on('click', '#btnCustomer', function() {
    $.ajax({
        url: '../admin/view/customer/viewAllCustomer.html',
        success: function(data) {
          $('.allContent-section').html(data);
        }
      });
})

import { showDataInTableCategory } from './category.js';

$(document).on('click', '#btnCategory', function() {
  $.ajax({
      url: '../admin/view/category/viewAllCategory.html',
      success: function(data) {
        $('.allContent-section').html(data);
        showDataInTableCategory();
      }
    });
})

import { showDataInTableBrand } from './brand.js';

$(document).on('click', '#btnBrand', function() {
  $.ajax({
      url: '../admin/view/brand/viewAllBrand.html',
      success: function(data) {
        $('.allContent-section').html(data);
        showDataInTableBrand();
      }
    });
})


