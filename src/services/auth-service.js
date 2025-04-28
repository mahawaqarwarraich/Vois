import axios from "axios";

const API_URL = "http://localhost:8000/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        console.log("the final response received after login", response)
        if (response.data.token) {
          console.log("finally dekho", response.data)
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, confirmPassword) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      confirmPassword,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
