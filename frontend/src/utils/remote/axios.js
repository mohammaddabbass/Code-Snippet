import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/v0.1";
axios.defaults.headers = {
  "Content-Type": "application/json",
};

export const request = async ({ method, route, body, headers }) => {
  try {
    const response = await axios.request({
      method,
      headers,
      url: route,
      data: body,
    });

    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
};
