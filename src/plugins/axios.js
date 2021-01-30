"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: process.env.baseURL || process.env.apiUrl || 'http://localhost:8081',
  //timeout: 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    config.headers['Access-Control-Allow-Origin'] = '*'
    config.headers['content-Type'] = 'application/json'
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    console.log(error)
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    let err = null
    if (error.code === 'ECONNABORTED') {
      err = { exceptionType: 'ECONNABORTED', message: `can't connect with server at ${config.baseURL}` }
    } else {
      err = { status: error.response.status, data: error.response.data }
    }
    console.log(err)
    return Promise.reject(err);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
