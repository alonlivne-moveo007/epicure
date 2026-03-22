/* eslint-disable */
import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = process.env.HOST ?? 'localhost';
  // Align with `apps/backend` default (`main.ts`: PORT || 3002).
  const port = process.env.PORT ?? '3002';
  axios.defaults.baseURL = `http://${host}:${port}`;
};
