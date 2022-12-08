/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from '../config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.get(`${baseUrl}/products`, async (req, res, ctx) => {
    const page = await req.url.searchParams.get('page');

    if (page === '1') {
      return res(ctx.json({
        products: {
          content: [
            {
              id: 1, name: '상품 1', proudctCount: 3, price: 500, description: '좋다',
            },
            {
              id: 2, name: '상품 2', proudctCount: 3, price: 1000, description: '좋다',
            },
            {
              id: 3, name: '상품 3', proudctCount: 3, price: 5000, description: '좋다',
            },
            {
              id: 4, name: '상품 4', proudctCount: 3, price: 500, description: '좋다',
            },
            {
              id: 5, name: '상품 5', proudctCount: 3, price: 1000, description: '좋다',
            },
            {
              id: 6, name: '상품 6', proudctCount: 3, price: 5000, description: '좋다',
            },
            {
              id: 7, name: '상품 7', proudctCount: 3, price: 500, description: '좋다',
            },
            {
              id: 8, name: '상품 8', proudctCount: 3, price: 1000, description: '좋다',
            },
          ],
        },
        totalPageCount: 2,
      }));
    }

    if (page === '2') {
      return res(ctx.json({
        products: {
          content: [
            {
              id: 9, name: '상품 9', proudctCount: 3, price: 500, description: '좋다',
            },
          ],
        },
        totalPageCount: 2,
      }));
    }

    return res(ctx.status(400));
  }),
);

export default server;
