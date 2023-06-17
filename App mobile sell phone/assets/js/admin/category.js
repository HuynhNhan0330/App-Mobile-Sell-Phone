// category

$(document).on('click', '#btnShowAddCategory', function() {
    $.ajax({
        url: '../admin/view/category/viewCategory.html',
        success: function(data) {
          $('.allContent-section').html(data);
          const categoryNameIP = $("#categoryName")
          restrictSpecialCharacters(categoryNameIP);
          
          const divCategoryId = $("#divCategoryId");
          const btnInsertCategory = $("#btnInsertCategory");
          const btnUpdateCategory = $("#btnUpdateCategory");

          divCategoryId.hide();
          btnInsertCategory.show();
          btnUpdateCategory.hide()
        }
      });
})

$(document).on('click', '#btnViewCategory', function() {
  const $row = $(this).closest("tr");

  const idCategory = $row.find("td:first-child").text();
  const nameCategory = $row.find("td:nth-child(2)").text();

  $.ajax({
      url: '../admin/view/category/viewCategory.html',
      success: function(data) {
        $('.allContent-section').html(data);
        const categoryNameIP = $("#categoryName")
        restrictSpecialCharacters(categoryNameIP);
          
        const divCategoryId = $("#divCategoryId");
        const btnInsertCategory = $("#btnInsertCategory");
        const btnUpdateCategory = $("#btnUpdateCategory");
        
        divCategoryId.show();
        btnInsertCategory.hide();
        btnUpdateCategory.show();

        const categoryIdIP = $('#categoryId');
        categoryIdIP.val(idCategory);
        categoryNameIP.val(nameCategory);
      }
    });
})

$(document).on('click', '#btnDeleteCategory', function() {
  if (confirm("Xác nhận xoá!!!")) {
    const $row = $(this).closest("tr");
    const idCategory = $row.find("td:first-child").text();

    const dataRef = ref(database, "categories");
    const itemRef = child(dataRef, idCategory);
    remove(itemRef)
      .then(() => {
        console.log("Xóa dữ liệu thành công");
      })
      .catch((error) => {
        console.error("Lỗi khi xóa dữ liệu:", error);
      });
  }
})

$(document).on('click', '#btnUpdateCategory', function() {
  const categoryIdIP = $('#categoryId');
  const categoryNameIP = $("#categoryName")
  
  const newData = {
    name: categoryNameIP.val()
  }

  const dataRef = ref(database, "categories");
  const itemRef = child(dataRef, categoryIdIP.val());
  set(itemRef, newData)
    .then(() => {
      console.log("Cập nhật dữ liệu thành công");
    })
    .catch((error) => {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
    });
})

// firebase realtime database

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, set, get, onValue, child, remove } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { firebaseConfig, restrictSpecialCharacters } from './helper.js';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function showDataInTableCategory() {
  const $table = $("#tableCategory");
  const $tbody = $table.find("tbody");

  const dataRef = ref(database, "categories");
  onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        let tableHtml = "";

        snapshot.forEach(function(childSnapshot) {
          const key = childSnapshot.key;
          const data = childSnapshot.val();
          
          tableHtml += "<tr>";
          tableHtml += "<td>" + key + "</td>";
          tableHtml += "<td>" + data.name + "</td>";
          tableHtml += '<td><button class="btn btn-primary" id="btnViewCategory" style="height:40px">Xem/Sửa</button></td>';
          tableHtml += '<td><button class="btn btn-danger" id="btnDeleteCategory" style="height:40px">Xoá</button></td>';
          tableHtml += "</tr>";
        });

        $tbody.html(tableHtml);
      } else {
        console.log("Không tìm thấy dữ liệu");
      }
    })
}

$(document).on('click', '#btnInsertCategory', function() {
  const categoryNameIP = $('#categoryName');
  if (categoryNameIP.val()) {
      getMaxCategoryID().then((maxCategoryID) => {
        var newCategoryId = createNextCategoryId(maxCategoryID);
        const dataRef = ref(database, "categories/" + newCategoryId);
        set(dataRef, {
            name: categoryNameIP.val()
        })
          .then(() => {
            console.log("Dữ liệu đã được lưu vào Firebase Realtime Database.");
          })
          .catch((error) => {
            console.error(
              "Lỗi khi lưu dữ liệu vào Firebase Realtime Database:",
              error
            );
          });
  
        categoryNameIP.val("")
      });
    } else {
      alert("Vui lòng điền đủ thông tin!!!");
    }
})

// support
function getMaxCategoryID() {
  const dataRef = ref(database, "categories");
  var maxCategoryID = "LSP0000";
  return get(dataRef).then((snapshot) => {
      if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
              const key = childSnapshot.key;
              const currentIdNumber = Number(key.substring(3));
              const maxCurretIdNumber = Number(maxCategoryID.substring(3));
              if (currentIdNumber > maxCurretIdNumber) {
                  const currentIdString = String(currentIdNumber).padStart(4, "0");
                  maxCategoryID = "LSP" + currentIdString;
              }
            });
          return maxCategoryID;
        } else {
          console.log("Không tìm thấy dữ liệu");
          return maxCategoryID;
      }
  })
  .catch((error) => {
      console.error(
        "Lỗi khi truy vấn dữ liệu vào Firebase Realtime Database:",
        error
      );
      return null;
    });
}

function createNextCategoryId(maxId) {
  const newIdNumber = Number(maxId.substring(3)) + 1;
  const newIdString = String(newIdNumber).padStart(4, "0");
  return "LSP" + newIdString;
}