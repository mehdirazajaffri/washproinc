import { Component } from "react";
import axios from "axios";

export default class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.pagesEndPoint = "http:localhost:8000/";
  }

  api(url, method, data) {
    return fetch(this.pagesEndPoint + url, {
      method: method,
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(
        result => {
          return result;
        },
        error => {
          return error;
        }
      );
  }

  verifyToken(token) {
    let res = this.api(
      "api-token-verify/",
      "POST",
      JSON.stringify({ token: token })
    );
    return res;
  }

  login(user) {
    console.log(user);
    let res = this.api("api-token-auth/", "POST", JSON.stringify(user));
    return res;
  }

  doLogin(user) {
    return axios
      .post(`http://localhost:8000/api-token-auth/`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }
}
