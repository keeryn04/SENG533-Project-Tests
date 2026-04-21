import http from 'k6/http';
import { Rate } from 'k6/metrics';
import { check, sleep } from 'k6';

export const availability = new Rate('availability');

export const options = {
  vus: 20,
  iterations: 2300,
};

const BASE_URL = __ENV.STORE_URL;

export default function () {
  let flows = [
    () => http.get(`${BASE_URL}/category?category=2&page=1`),
    () => http.get(`${BASE_URL}/product?id=7`),
    () => http.get(`${BASE_URL}/cart`),
    () => http.get(`${BASE_URL}/order`),
    () => http.get(`${BASE_URL}/login`),
  ];

  let i = Math.floor(Math.random() * flows.length);
  let res = flows[i]();

  let ok = check(res, { 'request succeeds': (r) => r.status === 200 });
  availability.add(ok);

  sleep(1);
}