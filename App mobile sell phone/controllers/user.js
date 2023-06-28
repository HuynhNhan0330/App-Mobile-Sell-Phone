import { API_URL } from "./const.js";
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

var userAPI = API_URL + 'user/';


export function getAllUser() {
    return axios.get(userAPI)
        .then((res) => {
            console.log("API get all user successful");
            return res;
        }).catch((err) => {
            console.error(err);
        })
}

export function getUser(id) {
    return axios.get(userAPI + id)
        .then((data) => {
            console.log("Get user successful");
            return data;
        }).catch((err) => {
            console.error(err);
        })
}

export function createUser(data) {
    return axios.post(userAPI, data)
        .then(() => {
            console.log("Create user successful");
            return true;
        }).catch((err) => {
            console.error(err);
            return false;
        })
}

export function deleteUser(id) {
    return axios.delete(userAPI + id)
    .then(() => {
        console.log("Delete user successful");
        return true;
    }).catch((err) => {
        console.error(err);
        return false;
    })
}

export function updateUser(id, data) {
    return axios.patch(userAPI + id, data)
        .then(() => {
            console.log("Update user successful");
            return true;
        }).catch((err) => {
            console.error(err);
            return false;
        })
}
