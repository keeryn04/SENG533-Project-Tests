import http from 'k6/http';
import { Rate } from 'k6/metrics';
import { check, sleep } from 'k6';

export const availability = new Rate('availability');

export const options = {
  vus: 5,
  duration: '1m',
};

const BASE_URL = __ENV.STORE_URL;

export default function () {
  // --- Flow 1: Browse catalog ---
  let res1 = http.get(`${BASE_URL}/category?category=2&page=1`);
  let ok1 = check(res1, { 'catalog loads': (r) => r.status === 200 });
  availability.add(ok1);

  // --- Flow 2: View product (image + recommender involved) ---
  let res2 = http.get(`${BASE_URL}/product?id=7`);
  let ok2 = check(res2, { 'product page loads': (r) => r.status === 200 });
  availability.add(ok2);

  // --- Flow 3: Recommendations ---
  let res3 = http.get(`${BASE_URL}/cart`);
  let ok3 = check(res3, { 'recommendations load': (r) => r.status === 200 });
  availability.add(ok3);

  // --- Flow 4: Orders / checkout (critical path) ---
  let res4 = http.get(`${BASE_URL}/order`);
  let ok4 = check(res4, { 'checkout works': (r) => r.status === 200 });
  availability.add(ok4);

  // --- Flow 5: Auth ---
  let res5 = http.get(`${BASE_URL}/login`);
  let ok5 = check(res5, { 'login page loads': (r) => r.status === 200 });
  availability.add(ok5);

  sleep(1);
}