// brand

$(document).on('click', '#btnShowAddBrand', function() {
    $.ajax({
        url: '../admin/view/brand/viewBrand.html',
        success: function(data) {
          $('.allContent-section').html(data);
          const brandNameIP = $("#brandName")
          restrictSpecialCharacters(brandNameIP);
          
          const divBrandId = $("#divBrandId");
          const btnInsertBrand = $("#btnInsertBrand");
          const btnUpdateBrand = $("#btnUpdateBrand");

          divBrandId.hide();
          btnInsertBrand.show();
          btnUpdateBrand.hide()
        }
      });
})

$(document).on('click', '#btnViewBrand', function() {
  const $row = $(this).closest("tr");

  const idBrand = $row.find("td:first-child").text();
  const nameBrand = $row.find("td:nth-child(2)").text();

  $.ajax({
      url: '../admin/view/brand/viewBrand.html',
      success: function(data) {
        $('.allContent-section').html(data);
        const brandNameIP = $("#brandName")
        restrictSpecialCharacters(brandNameIP);
          
        const divBrandId = $("#divBrandId");
        const btnInsertBrand = $("#btnInsertBrand");
        const btnUpdateBrand = $("#btnUpdateBrand");
        
        divBrandId.show();
        btnInsertBrand.hide();
        btnUpdateBrand.show();

        const brandIdIP = $('#brandId');
        brandIdIP.val(idBrand);
        brandNameIP.val(nameBrand);
      }
    });
})

$(document).on('click', '#btnDeleteBrand', function() {
  if (confirm("Xác nhận xoá!!!")) {
    const $row = $(this).closest("tr");
    const idBrand = $row.find("td:first-child").text();

    const dataRef = ref(database, "brands");
    const itemRef = child(dataRef, idBrand);
    remove(itemRef)
      .then(() => {
        console.log("Xóa dữ liệu thành công");
      })
      .catch((error) => {
        console.error("Lỗi khi xóa dữ liệu:", error);
      });
  }
})

$(document).on('click', '#btnUpdateBrand', function() {
  const brandIdIP = $('#brandId');
  const brandNameIP = $("#brandName")
  
  const newData = {
    name: brandNameIP.val()
  }

  const dataRef = ref(database, "brands");
  const itemRef = child(dataRef, brandIdIP.val());
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

export function showDataInTableBrand() {
  const $table = $("#tableBrand");
  const $tbody = $table.find("tbody");

  const dataRef = ref(database, "brands");
  onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        let tableHtml = "";

        snapshot.forEach(function(childSnapshot) {
          const key = childSnapshot.key;
          const data = childSnapshot.val();
          
          tableHtml += "<tr>";
          tableHtml += "<td>" + key + "</td>";
          tableHtml += "<td>" + data.name + "</td>";
          tableHtml += '<td><button class="btn btn-primary" id="btnViewBrand" style="height:40px">Xem/Sửa</button></td>';
          tableHtml += '<td><button class="btn btn-danger" id="btnDeleteBrand" style="height:40px">Xoá</button></td>';
          tableHtml += "</tr>";
        });

        $tbody.html(tableHtml);
      } else {
        console.log("Không tìm thấy dữ liệu");
      }
    })
}

$(document).on('click', '#btnInsertBrand', function() {
  const brandNameIP = $('#brandName');
  if (brandNameIP.val()) {
    getMaxBrandID().then((maxBrandID) => {
        var newBrandId = createNextBrandId(maxBrandID);
        const dataRef = ref(database, "brands/" + newBrandId);
        set(dataRef, {
            name: brandNameIP.val()
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
  
          brandNameIP.val("")
      });
    } else {
      alert("Vui lòng điền đủ thông tin!!!");
    }
})

// support
function getMaxBrandID() {
  const dataRef = ref(database, "brands");
  var maxBrandID = "TH0000";
  return get(dataRef).then((snapshot) => {
      if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
              const key = childSnapshot.key;
              const currentIdNumber = Number(key.substring(2));
              const maxCurretIdNumber = Number(maxBrandID.substring(2));
              if (currentIdNumber > maxCurretIdNumber) {
                  const currentIdString = String(currentIdNumber).padStart(4, "0");
                  maxBrandID = "TH" + currentIdString;
              }
            });
          return maxBrandID;
        } else {
          console.log("Không tìm thấy dữ liệu");
          return maxBrandID;
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

function createNextBrandId(maxId) {
  const newIdNumber = Number(maxId.substring(2)) + 1;
  const newIdString = String(newIdNumber).padStart(4, "0");
  return "TH" + newIdString;
}