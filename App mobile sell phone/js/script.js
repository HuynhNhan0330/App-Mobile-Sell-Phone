import { conventVND } from "./const.js";

import { getAllUser, getUser, createUser, deleteUser, updateUser} from "./../controllers/user.js"
import { getAllProduct, getSomeProduct, getProductBrand, getProductSortByPrice, getProduct, getProductFilterByName  } from "./../controllers/product.js"
import { getAllOrder, createOrder, deleteOrder, updateOrder} from "./../controllers/order.js"
import { getAllCart, createCart, deleteCart, updatedCart} from "./../controllers/cart.js"

// localStorage.removeItem("loggedInUser");

let searchForm = document.querySelector('.search-form');

// document.querySelector('#search-btn').onclick = () =>{
//     searchForm.classList.toggle('active');
//     navbar.classList.remove('active');
// }

let navbar = document.querySelector('.header-page .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    // searchForm.classList.remove('active');
}

window.onscroll = () =>{
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
}

let btntotop = document.getElementById("btnToTop");

window.onscroll = function() {scrollFunction()}

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btntotop.style.display = "block";
    } else {
        btntotop.style.display = "none";
    }
}

$("#btnToTop").on("click", function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

// support
function getCurrentURL() {
    let currentURL
    if (window.cordova) {
        currentURL = navigator.splashscreen.getCurrentPageUrl();
    } else {
        currentURL = window.location.href;
    }

    return currentURL.split('/').pop().split('.')[0];
}

function loadExtensionAccount() {
    const listLi = $("#extensionAccount li")
    $("#aCart").css('display', 'none');

    listLi.each(function(index, element) {
        $(element).css('display', 'none');
      });

      const mainCustomer = JSON.parse(localStorage.getItem('loggedInUser'));
  
      console.log(mainCustomer);  

      if (mainCustomer === null) {
        $('#liLogin').css('display', 'block');
        $('#liRegister').css('display', 'block');
    } else {
        $('#liUser').css('display', 'block');
        $('#liSignOut').css('display', 'block');
        $("#aCart").css('display', 'inline');
        $("#nameCustomer").text(mainCustomer['name']);
    }
}

function loadProduct(idDiv, products) {
    let divContent = $(`#${idDiv}`);
    
    let divHTML="";
        products.forEach(product => {
        const priceVND = conventVND(product['price']);
            
        let divProduct = `<div class="col-lg-3 col-sm-6 col-6">
                <div class="item p-3">
                    <div class="item-img">
                        <a href="detailProduct.html?${product['_id']}"><img src=${product['images'][0]} style="width: 150px; height: 170px"
                            title="${product['name']}" alt=""></a>
                    </div>
                                
                    <div class="info">
                        <a class="text-decoration-none info-text" href="#"> ${product['name']}</a>
                        <span class="info-price">
                            <strong>${priceVND}</strong>
                        </span>
                    </div>
                    

                </div>
            </div>
            `

            divHTML += divProduct
        });
    
    divContent.html(divHTML)
}

function getIdProduct() {
    let currentURL
    if (window.cordova) {
        currentURL = navigator.splashscreen.getCurrentPageUrl();
    } else {
        currentURL = window.location.href;
    }

    return currentURL.split('?')[1];
}

// load
$(document).ready(function() {
    let mainHTML = getCurrentURL();
    console.log(mainHTML);
    
    loadExtensionAccount()

    switch(mainHTML) {
        case 'home':
            // loadNewProductInHome();
            loadSpecialProductInHome();
            break;
        case 'products':
            loadProductInPageProducts();
            break;
        case 'detailProduct':
            loadDetailProduct(getIdProduct());
            break;
        case 'cart':
            loadProductInCart();
            break;
        case 'userpage':
            loadDataCustomer();
            loadTableOrder();
            break;
    }
})

// navigation
$(document).on('click', '#liSignOut', function()  {
    localStorage.removeItem("loggedInUser");
    Swal.fire ({
        title: "Thành công",
        text: "Đăng xuất thành công!",
        icon: "success",
        confirmButtonText: "OK"
    }).then((result) => {
        window.location.href = "home.html";
    })
    // $("#aHome").click()
    loadExtensionAccount();
})

// login
$("form").on("submit", function() {
    event.preventDefault();

    var buttonId = $(document.activeElement).attr("id");

    if (buttonId === "btnLogin") {
        const arrayForm = $(this).serializeArray();

        const currentUserLogin = arrayForm[0].value;
        const currentPassword = arrayForm[1].value;

        getAllUser().then((res) => {
            return res.data
        }).then((users) => {    
            let isLogin = false;

            users.forEach(user => {
                if (user['username'] === currentUserLogin || user['email'] === currentUserLogin) {
                    if (user['password'] === currentPassword) {
                        if (user['isAdmin']) {
                            console.log('admin');
                            window.location.href = "./admin/admin.html";
                        }
                        else {
                            localStorage.setItem("loggedInUser", JSON.stringify(user));
                            loadExtensionAccount();
                            if ($("#aHome").click()) {
                                console.log('login');
                            }

                        }

                        isLogin = true;
                    }
                    
                    return;
                }
            });

            if (!isLogin) {
                Swal.fire({
                    title: "Lỗi",
                    text: "Tài khoản hoặc mật khẩu không chính xác",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }

            else {
                Swal.fire ({
                    title: "Thành công",
                    text: "Đăng nhập thành công!",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    window.location.href = "home.html";
                })
            }
        }).catch((err) => {
            console.error(err);
        })
    }
})

// register
$("form").on("submit", function(event) {
    event.preventDefault();

    var buttonId = $(document.activeElement).attr("id");
    
    if (buttonId === "btnRegister") {
        const arrayForm = $(this).serializeArray();
        
        const currentName = arrayForm[0].value;
        const currentUsername = arrayForm[1].value; 
        const currentEmail = arrayForm[2].value; 
        const currentPassword = arrayForm[3].value; 
        const currentRePassword = arrayForm[4].value; 


        if (currentPassword !== currentRePassword) {
            Swal.fire({
                title: "Lỗi",
                text: "Mật khẩu xác nhận không đúng",
                icon: "error",
                confirmButtonText: "OK"
            });

            return;
        }
        
        getAllUser().then((res) => {
            return res.data
        }).then((users) => {
            let isCreate = true;

            users.forEach(user => {
                if (user['username'] === currentUsername) {
                    Swal.fire({
                        title: "Lỗi",
                        text: "Tài khoản đã tồn tại",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                    
                    isCreate = false;

                    return;
                }

                if (user['email'] === currentEmail) {
                    Swal.fire({
                        title: "Lỗi",
                        text: "Email đã tồn tại",
                        icon: "error",
                        confirmButtonText: "OK"
                    });

                    isCreate = false;

                    return;
                }
            });

            if (!isCreate) {
                return;
            }

            var data = {
                name: currentName,
                username: currentUsername,
                email: currentEmail,
                password: currentPassword
            }

            createUser(data).then((result) => {
                if (result) {
                    Swal.fire({
                        title: "Thông báo",
                        text: "Đăng kí thành công",
                        icon: "success",
                        confirmButtonText: "OK"
                    });
                }
            });
        }).catch((err) => {
            console.error(err);
        })
    }
});


// Home
function loadSpecialProductInHome() {
    getSomeProduct(20).then((res) => {
        return res.data;
    }).then((products) => {
        loadProduct("specialProductContent", products);
    }).catch((err) => {
        console.error(err);
    })
}

// Products
function loadProductInPageProducts() {
    getAllProduct().then((res) => {
        return res.data;
    }).then((products) => {
        loadProduct("listProductContent", products);
    }).catch((err) => {
        console.error(err);
    })
}

$(document).on('click', '.filterProduct', function() {
    const href = $(this).attr("href");
    const currentBrand = href.substr(1);
    getProductBrand(currentBrand).then((res) => {
        return res.data
    }).then((products) => {
        loadProduct("listProductContent", products)
    }).catch((err) => {
        console.error(err)
    })
})

$(document).on('click', '.sortProduct', function() {
    const href = $(this).attr("href");
    const currentSort = href.substr(1);
    console.log(currentSort);
    getProductSortByPrice(currentSort).then((res) => {
        return res.data
    }).then((products) => {
        loadProduct("listProductContent", products)
    }).catch((err) => {
        console.error(err)
    })
})

$(document).on('click', '#btnSearchProduct', function() {
    const text = $('#search-box').val();

    getProductFilterByName(text).then((res) => {
        return res.data
    }).then((products) => {
        loadProduct("listProductContent", products)
    }).catch((err) => {
        console.error(err)
    })
})


// Detail product
function loadDetailProduct(id) {
    getProduct(id).then((res) => {
        return res.data
    }).then((product) => {
        $("#nameProduct").text(product['name']);
        $("#imageProduct").attr("src", product['images'][0]);
        $('#priceProduct').text(conventVND(product['price']));
        $('#productDisPrice').text(conventVND(product['price'] - 1000000));
        $('#specificationsProduct').html(
            `
            <ol>
                                    <li>
                                        <strong>Màn hình:</strong>
                                        <span>${product['screen']}</span>
                                    </li>
                                </ol>
                                <ol>
                                    <li>
                                        <strong>Hệ điều hành:</strong>
                                        <span>${product['operating_system']}</span>
                                    </li>
                                </ol>
                                <ol>
                                    <li>
                                        <strong>Camera trước:</strong>
                                        <span>${product['front_camera']}</span>
                                    </li>
                                </ol>
                                <ol>
                                    <li>
                                        <strong>Camera sau:</strong>
                                        <span>${product['rear_camera']}</span>
                                    </li>
                                </ol>
                                <ol>
                                    <li>
                                        <strong>Ram:</strong>
                                        <span>${product['ram']}</span>
                                    </li>
                                </ol>
                                <ol>
                                    <li>
                                        <strong>Bộ nhớ trong(ROM):</strong>
                                        <span>${product['rom']}</span>
                                    </li>
                                </ol>
                                <ol>
                                    <li>
                                        <strong>Chip:</strong>
                                        <span>${product['chip']}</span>
                                    </li>
                                </ol>
                                <ol>
                                    <li>
                                        <strong>Sim:</strong>
                                        <span>${product['sim']}</span>
                                    </li>
                                </ol>
                                <ol>
                                    <li>
                                        <strong>Dung lượng pin:</strong>
                                        <span>${product['pin']}</span>
                                    </li>
                                </ol>
                                <ol>
                                    <li>
                                        <strong>Màu sắc:</strong>
                                        <span>${product['color']}</span>
                                    </li>
                                </ol>
            `
        )

        $('#describeProduct').text(product['describe'])
    }).catch((err) => {
        console.error(err);
    })
}

$(document).on('click', '#btnAddCart', function () {
    const mainCustomer = JSON.parse(localStorage.getItem('loggedInUser'));

    if (mainCustomer === null) {
        Swal.fire({
            title: "Lỗi",
            text: "Bạn chưa đăng nhập",
            icon: "error",
            confirmButtonText: "OK"
        });
    }
    else {
        getAllCart().then((res) => {
            return res.data;
        }).then((carts) => {  
            const currentProductId = getIdProduct();
            const currentCustomerId = mainCustomer['_id']

            let isAddCart = true;

            carts.forEach(cart => {
                if (cart['product_id'] === currentProductId && cart['user_id'] === currentCustomerId) {
                    isAddCart = false;
                    return;
                } 
            });

            if (isAddCart) {
                getProduct(currentProductId).then((res) => {
                    return res.data;   
                }).then((product) => {
                    const data = {
                        product_id: currentProductId,
                        product_name: product['name'],
                        user_id: currentCustomerId,
                        image: product['images'][0],
                        price: product['price']
                    }
                    
                    createCart(data).then((result) => {
                        if (result) {
                            Swal.fire({
                                title: "Thông báo",
                                text: "Thêm vào giỏ hàng thành công",
                                icon: "success",
                                confirmButtonText: "OK"
                            });
                        }
                    })
                }).catch((err) => {
                    console.error(err);
                })
            } else {
                Swal.fire({
                    title: "Thông báo",
                    text: "Sản phẩm đã có trong giỏ hàng",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        }).catch((err) => {
            console.error(err);
        });
    }
})

// cart
function loadProductInCart() {
    const mainCustomer = JSON.parse(localStorage.getItem('loggedInUser'));

    getAllCart().then((res) => {
        return res.data;
    }).then((carts) => {
        let divCart=""

        carts.forEach(cart => {
            if (cart['user_id'] === mainCustomer['_id']) {
                divCart += 
                `
                <div class="box boxCart" id="${cart['_id']}" data-product-id="${cart['product_id']}">
                    <i class="fas fa-times btnDelCart"></i>
                    <img src="${cart['image']}" alt="">
                    <div class="content">
                        <h3>${cart['product_name']}</h3>
                        <form action="">
                            <span>Số lượng :</span>
                            <input type="number" name="" value="${cart['quantity']}" id="">
                        </form>
                        <div class="price">
                            <strong>${conventVND(cart['price'])}</strong>
                        </div>
                    </div>
                </div>
                `
            }
        });

        $("#myCartContext").html(divCart)

    }).catch((err) => {
        console.error(err);
    })
}

$(document).on('input', '.boxCart input[type="number"]', function() {
    const cartId = $(this).closest(".boxCart").attr("id");
    
    if ($(this).val() === "") {
        $(this).val(1)
    }

    const data = {
        quantity: $(this).val()
    }

    updatedCart(cartId, data)
})

$(document).on('click', '.boxCart .btnDelCart', function() {
    const currentBoxCart = $(this).closest(".boxCart")
    Swal.fire({
        title: 'Thông báo',
        text: 'Xác nhận xoá khỏi giỏ hàng',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Không'
      }).then((result) => {
        if (result.isConfirmed) {
            const cartId = currentBoxCart.attr("id");
            deleteCart(cartId).then((result) => {
                if (result) {
                    currentBoxCart.remove();
                } else {
                    Swal.fire({
                        title: "Lỗi",
                        text: "Xoá không thành công",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                }
            })
        }
    })
})

$("form").on("submit", function() {
    event.preventDefault();

    const listBoxCart = $(".boxCart")

      {
        var buttonId = $(document.activeElement).attr("id");

        if (buttonId === "btnConfirmOrder") {
            if (listBoxCart.length === 0) {
                Swal.fire({
                    title: "Thông báo",
                    text: "Vui lòng thêm sản phẩm vào giỏ hàng để thực hiện",
                    icon: "error",
                    confirmButtonText: "OK"
                });

                return;
            }


            const arrayForm = $(this).serializeArray();

            const nameCustomer = arrayForm[0].value;
            const phone = arrayForm[1].value;
            
            listBoxCart.each(function() {
                const cartId = $(this).attr('id');
                const productId = $(this).data('product-id').replace('#', '');
                const quantity = $(this).find('input[type="number"]').val();
                const city = document.getElementById("city");
                const dis = document.getElementById("district");
                const address = arrayForm[4].value + ", " + dis.options[dis.selectedIndex].text + " " + city.options[city.selectedIndex].text;
                const data = {
                    product_id: productId,
                    user_id: JSON.parse(localStorage.getItem('loggedInUser'))['_id'],
                    user_name: nameCustomer,
                    address: address,
                    phone: phone,
                    status: "Chờ xác nhận",
                    quantity: quantity
                }
                
                createOrder(data).then((result) => {
                    if (result) {
                        deleteCart(cartId).then((result) => {
                            if (result) {
                                $(this).remove();
                            }
                        })
                    }
                })
            })
        }
    }
})

// userpage

function loadDataCustomer() {
    const mainCustomer = JSON.parse(localStorage.getItem('loggedInUser'));
    $('#nameCustomer').val(mainCustomer['name']);
    $('#emailCustomer').val(mainCustomer['email']);
}

$("form").on("submit", function() {
    event.preventDefault();

    var buttonId = $(document.activeElement).attr("id");

    if (buttonId === "btnUpdateCustomer") {
        let data = {
            name: $('#nameCustomer').val(),
            email: $('#emailCustomer').val(),
        }

        const newPassword = $('#Password').val();
        const SecurityStamp = $('#SecurityStamp').val();

        if (newPassword != "" && SecurityStamp != "") {
            if (SecurityStamp !== newPassword) {
                Swal.fire({
                    title: "Lỗi",
                    text: "Mật khẩu xác nhận không đúng",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            } else {
                data.password = newPassword
                
            }
        }
        const mainCustomer = JSON.parse(localStorage.getItem('loggedInUser'));

        updateUser(mainCustomer['_id'], data).then((result) => {
            if (result) {
                Swal.fire({
                    title: "Thông báo",
                    text: "Cập nhật thông tin thành công",
                    icon: "success",
                    confirmButtonText: "OK"
                });
            } else {
                Swal.fire({
                    title: "Lỗi",
                    text: "Cập nhật thông tin thất bại",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        }).catch((error) => {
            console.error(error);
        })
    }
})


function loadTableOrder() {
    getAllOrder()
        .then((res) => res.data)
        .then((orders) => {
            let tableHtml = "";

            // Sử dụng Promise.all để chờ tất cả các yêu cầu dữ liệu hoàn thành
            const getProductPromises = orders.map(order => getProduct(order['product_id']).then((res) => res.data));
            return Promise.all(getProductPromises)
                .then(products => {
                    orders.forEach((order, index) => {
                        const product = products[index];

                        tableHtml += "<tr id=" + order['_id'] + ">";
                        tableHtml += "<td>" + product['name'] + "</td>";
                        tableHtml += "<td>" + order['status'] + "</td>";
                        var myStyle = "style= 'display:block;'"
                        
                        if (order['status'] !== 'Chờ xác nhận') {
                            myStyle = "style= 'display:none;'"
                        }
                        
                        tableHtml += '<td><button class="btn btn-danger btnDeleteOrder" '+myStyle+'>Huỷ</button></td>';
                        
                        var myStyle = "style= 'display:none;'"
                        
                        if (order['status'] === 'Đang giao') {
                            myStyle = "style= 'display:block;'"
                        }

                        tableHtml += '<td><button class="btn btn-primary btnReceiveOrder"'+myStyle+'>Nhận</button></td>';
                        tableHtml += "</tr>";
                    });
                    return tableHtml;
                });
        }).then((tableHtml) => {
            let tbody = $('#tableOrderOfCustomer').find('tbody');

            tbody.html(tableHtml);
        })
        .catch((error) => {
            console.error(error);
        });
}

$(document).on('click', '.btnDeleteOrder', function() {
    Swal.fire({
        title: 'Thông báo',
        text: 'Xác nhận xoá khỏi đơn hàng',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Không'
      }).then((result) => {
        if (result.isConfirmed) {
            const row = $(this).closest("tr");
            deleteOrder(row.attr('id')).then((result) => {
                if (result) {
                    Swal.fire({
                        title: "Thông báo",
                        text: "Xoá thành công",
                        icon: "success",
                        confirmButtonText: "OK"
                    });
                    row.remove();   
                } else {
                    Swal.fire({
                        title: "Lỗi",
                        text: "Xoá không thành công",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                }
            })

        }
    })
})

$(document).on('click', '.btnReceiveOrder', function() {
    const row = $(this).closest("tr");
    const data = {
        status: "Đã nhận"
    }

    updateOrder(row.attr('id'), data).then((result) => {
        Swal.fire({
            title: "Thông báo",
            text: "Đã nhận đơn hàng",
            icon: "success",
            confirmButtonText: "OK"
        });

        if (result) {
            loadTableOrder()
        } else {

        }
    })
})
