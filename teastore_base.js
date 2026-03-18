import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 20,
  duration: '2m',
};

const BASE_URL = __ENV.STORE_URL;

export default function () {
  // Homepage
  http.get(`${BASE_URL}/`);

  // Browse category
  http.get(`${BASE_URL}/category?category=2`);

  // View product
  http.get(`${BASE_URL}/product?id=5`);

  sleep(1); // think time
}