// let searchForm = document.querySelector('.search-form');
// let searchBtn = document.querySelector('#search-btn');

// $('#search-btn')

// document.querySelector('#search-btn').onclick = () =>{
//     searchForm.classList.toggle('active');
// }



$(document).ready( function () {
    $(document).on('click', '#search-btn', function() {
        $('.search-form').toggleClass('active');
    })
}) 