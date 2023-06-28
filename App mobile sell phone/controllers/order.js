import { API_URL } from "./const.js";
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

var orderAPI = API_URL + 'order/';

export function getAllOrder() {
    return axios.get(orderAPI)
        .then((data) => {
            console.log("Get all order successful");
            return data;
        }).catch((err) => {
            console.error(err);
        })
}

export function getOrder(id) {
    return axios.get(orderAPI + id)
        .then((data) => {
            console.log("Get order successful");
            return data;
        }).catch((err) => {
            console.error(err);
        })
}

export function createOrder(data) {
    return axios.post(orderAPI, data)
        .then(() => {
            console.log("Create order successful");
            return true;
        }).catch((err) => {
            console.error(err);
            return false;
        })
}

export function deleteOrder(id) {
    return axios.delete(orderAPI + id)
    .then((data) => {
        console.log("Delete order successful");
        return true;
    }).catch((err) => {
        console.error(err);
        return false;
    })
}

export function updateOrder(id, data) {
    return axios.patch(orderAPI + id, data)
        .then(() => {
            console.log("Update order successful");
            return true;
        }).catch((err) => {
            console.error(err);
            return false;
        })
}
