import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://k305jhbh09.execute-api.ap-southeast-1.amazonaws.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosClient.interceptors.request.use((config) => {
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJrMTgtc3RvcmUiLCJzdWIiOiIyNCIsImV4cCI6MTc3NjQxMzMyNSwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTc3NjQxMjcyNSwiZW1haWwiOiJkb3h1YW50aGFuaEB0ZXN0LmNvbSJ9.ZlhPnlEI9XvVw8Hk82lMN25VLSJWx0NyemffNYNHeHo";
//   const token = localStorage.getItem('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;