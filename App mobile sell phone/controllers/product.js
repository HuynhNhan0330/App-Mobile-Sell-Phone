import { API_URL } from "./const.js";
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

var productAPI = API_URL + 'product/';

export function getAllProduct() {
    return axios.get(productAPI)
        .then((data) => {
            console.log("Get all product successful");
            return data;
        }).catch((err) => {
            console.error(err);
        })
}

export function getProduct(id) {
    return axios.get(productAPI + 'id/'+ id)
        .then((data) => {
            console.log("Get product successful");
            return data;
        }).catch((err) => {
            console.error(err);
        })
}

export function getSomeProduct(limit) {
    return axios.get(productAPI + 'limit/' + limit)
        .then((data) => {
            console.log("Get product successful");
            return data;
        }).catch((err) => {
            console.error(err);
        })
}

export function getProductBrand(brand) {
    return axios.get(productAPI + 'brand/' + brand)
        .then((data) => {
            console.log("Get product " + brand + " successful");
            return data;
        }).catch((err) => {
            console.error(err);
        })
}

export function getProductSortByPrice(sort) {
    return axios.get(productAPI + 'sort/' + sort)
        .then((data) => {
            console.log("Get product sort by " + sort + " successful");
            return data;
        }).catch((err) => {
            console.error(err);
        })
}

export function getProductFilterByName(text) {
    return axios.get(productAPI + 'search/' + text)
        .then((data) => {
            console.log("Get product name as " + text + " successful");
            return data;
        }).catch((err) => {
            console.error(err);
        })
}

export function createProduct(data) {
    return axios.post(productAPI, data)
        .then(() => {
            console.log("Create product successful");
            return true;
        }).catch((err) => {
            console.error(err);
            return false;
        })
}

export function deleteProduct(id) {
    return axios.delete(productAPI + id)
        .then((data) => {
            console.log("Delete product successful");
            return true;
        }).catch((err) => {
            console.error(err);
            return false;
        })
}

export function updateProduct(id, data) {
    return axios.patch(productAPI + id, data)
        .then(() => {
            console.log("Update product successful");
            return true;
        }).catch((err) => {
            console.error(err);
            return false;
        })
}