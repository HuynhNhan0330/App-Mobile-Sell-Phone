import { API_URL } from "./const.js";
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

var cartAPI = API_URL + 'cart/';

export function getAllCart() {
    return axios.get(cartAPI)
    .then((data) => {
        console.log("Get all cart successful");
        return data;
    }).catch((err) => {
        console.error(err);
    })
}

export function getCart(id) {
    axios.get(cartAPI + id)
    .then((data) => {
        console.log("Get cart successful");
        return data;
    }).catch((err) => {
        console.error(err);
    })
}

export function createCart(data) {
    return axios.post(cartAPI, data)
        .then(() => {
            console.log("Create cart successful");
            return true;
        }).catch((err) => {
            console.error(err);
            return false;
        })
}

export function deleteCart(id) {
    return axios.delete(cartAPI + id)
        .then(() => {
            console.log("Delete cart successful");
            return true;
        }).catch((err) => {
            console.error(err);
            return false;
        })
}

export function updatedCart(id, data) {
    return axios.patch(cartAPI + id, data)
        .then(() => {
            console.log("Update cart successful");
            return true;
        }).catch((err) => {
            console.error(err);
            return false;
        })
}