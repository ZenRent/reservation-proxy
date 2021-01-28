const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

const galleryProxy = createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
});
const reservationProxy = createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
});
const reviewsProxy = createProxyMiddleware({
  target: 'http://localhost:3003',
  changeOrigin: true,
});
const morePlacesProxy = createProxyMiddleware({
  target: 'http://localhost:3004',
  changeOrigin: true,
});

app.use('/', express.static(path.join(__dirname, '../public')));

app.use('/api/galleries', galleryProxy);
// app.use('/reservation', reservationProxy); // WHY DOES THIS WORK?
app.use('/api/listings', reservationProxy);
app.use('/reviews', reviewsProxy);
app.use('/api/more', morePlacesProxy);

const port = 3000;
const host = 'localhost';

app.listen(port, host, () => console.log(`Proxy server is listening at ${host}:${port}`));
