import axios from "axios";

export const axiosUser = axios.create({
  baseURL: "https://api.elta360.com/users",
});

export const axiosProject = axios.create({
  baseURL: "https://api.elta360.com/projects",
});

export const axiosImage = axios.create({
  baseURL: "https://api.elta360.com/images",
});

export const axiosAnalytics = axios.create({
  baseURL: "https://api.elta360.com/analytics",
});

//http://localhost:5000/analytics/getAnalyticsReporting
