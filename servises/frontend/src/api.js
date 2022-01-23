import axios from "axios";

const APISUFFIX = "http://localhost:5000/api"

axios.defaults.withCredentials = true

export const api ={
    async getUsers(){
        return axios.get(`${APISUFFIX}/api/users`)
    },
    async createUser(data){
        return axios.post(`${APISUFFIX}/api/users/newUser`, data)
    },
    async login(id){
        return axios.post(`${APISUFFIX}/api/users/login/${id}`)
    },
    async logout(){
        return axios.get(`${APISUFFIX}/api/users/logout/`)
    },
    getMe(){
        return axios.get(`${APISUFFIX}/api/users/me/`)
    },
    async getProjects(){
        return axios.get(`${APISUFFIX}/api/projects/`)
    },
    async getUserProjects(id){
        return axios.get(`${APISUFFIX}/api/projects/${id}`)
    },
    async getProject(id){
        return axios.get(`${APISUFFIX}/api/projects/project/${id}`)
    },
    async createProject(id, data){
        return axios.post(`${APISUFFIX}/api/projects/newProject/${id}/`, data)
    },
    async updateProject(id, data){
        return axios.put(`${APISUFFIX}/api/projects/editProject/${id}/`, data)
    },
    async closeProject(id){
        return axios.post(`${APISUFFIX}/api/projects/closeProject/${id}/`)
    },
    async createSubactivity(id, data){
        return axios.post(`${APISUFFIX}/api/subAct/newSub/${id}`, data)
    },
    async createActivity(id, data){
        return axios.post(`${APISUFFIX}/api/entry/newEntry/${id}`, data)
    },
    async updateActivity(id, data){
        return axios.post(`${APISUFFIX}/api/entry/updateEntry/${id}`, data)
    },
    async deleteActivity(id){
        return axios.delete(`${APISUFFIX}/api/entry/deleteEntry/${id}`)
    },
    async getUserRaports(id){
        return axios.get(`${APISUFFIX}/api/raports/getRaports/${id}`)
    },
    async submitRaport(id){
        return axios.post(`${APISUFFIX}/api/raports/submitRaport/${id}`)
    },
    async getEntry(id){
        return axios.get(`${APISUFFIX}/api/entry/getEntry/${id}`)
    }
}