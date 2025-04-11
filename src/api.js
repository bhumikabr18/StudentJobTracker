import axios from "axios";

const API = axios.create({
  baseURL: "https://studentjobtracker-rysf.onrender.com", // Render backend URL
});

export default API;
