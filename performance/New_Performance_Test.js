import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 800,
  duration: '1m',
};

export default function() {
  let res = http.get('https://quickpizza.grafana.com');
  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(1);
}
