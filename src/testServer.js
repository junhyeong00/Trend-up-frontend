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

  rest.get(`${baseUrl}/products/1`, async (req, res, ctx) => res(ctx.json(
    {
      id: 1, name: '상품 1', proudctCount: 3, price: 500, description: '좋다',
    },
  ))),

  rest.get(`${baseUrl}/products/1/options`, async (req, res, ctx) => res(ctx.json(
    {
      options: [
        {
          id: 1,
          name: '기본',
          optionPrice: 0,
          productId: 1,
        },
        {
          id: 2,
          name: '두툼한',
          optionPrice: 1000,
          productId: 1,
        },
      ],
    },
  ))),

  rest.post(`${baseUrl}/session`, async (req, res, ctx) => {
    const { userName, password } = await req.json();
    if (userName === 'test123' && password === 'Password1234!') {
      return res(ctx.json({
        accessToken: 'ACCESS.TOKEN',
        name: '배준형',
      }));
    }

    if (userName === '') {
      return res(
        ctx.status(400),
        ctx.json({
          errorMessage: '아이디를 입력해주세요',
        }),
      );
    }

    if (!password) {
      return res(
        ctx.status(400),
        ctx.json({
          errorMessage: '비밀번호를 입력해주세요',
        }),
      );
    }

    return res(ctx.status(400));
  }),

  rest.post(`${baseUrl}/order`, async (req, res, ctx) => {
    const {
      orderProducts, receiver, phoneNumber,
      zipCode, roadAddress, detailAddress,
      payment, totalPrice, deliveryFee, deliveryRequest,
    } = await req.json();

    if (receiver === '') {
      return res(
        ctx.status(400),
        ctx.json({
          message: '받는 분 성함을 입력해주세요',
        }),
      );
    }

    if (phoneNumber === '') {
      return res(
        ctx.status(400),
        ctx.json({
          message: '받는 분 번호를 입력해주세요',
        }),
      );
    }

    if (roadAddress === '') {
      return res(
        ctx.status(400),
        ctx.json({
          message: '주소를 입력해주세요',
        }),
      );
    }

    return res(
      ctx.json({
        orderId: 1,
      }),
    );
  }),

  rest.get(`${baseUrl}/orders`, async (req, res, ctx) => {
    const startDate = await req.url.searchParams.get('startDate');
    const endDate = await req.url.searchParams.get('endDate');

    if (startDate === '2022년 12월 14일' && endDate === '2022년 12월 17일') {
      return res(ctx.json({
        orders: [
          {
            id: 1,
            payment: 10000,
            createAt: 2022 - 12 - 15,
            orderProducts: [{ productId: 1, productName: '가디건' }],
          },
          {
            id: 2,
            payment: 20000,
            createAt: 2022 - 12 - 16,
            orderProducts: [{ productId: 2, productName: '귤' }],
          },
        ],
        totalPageCount: 2,
      }));
    }

    if (startDate === '2022년 12월 16일' && endDate === '2022년 12월 17일') {
      return res(ctx.json({
        orders: [
          {
            id: 2,
            payment: 20000,
            createAt: 2022 - 12 - 16,
            orderProducts: [{ productId: 2, productName: '귤' }],
          },
        ],
        totalPageCount: 2,
      }));
    }
    if (startDate === null && endDate === null) {
      return res(ctx.json({
        orders: [
          {
            id: 1,
            payment: 10000,
            createAt: 2022 - 12 - 15,
            orderProducts: [{ productId: 1, productName: '가디건' }],
          },
          {
            id: 2,
            payment: 20000,
            createAt: 2022 - 12 - 16,
            orderProducts: [{ productId: 2, productName: '귤' }],
          },
          {
            id: 3,
            payment: 30000,
            createAt: 2022 - 12 - 19,
            orderProducts: [{ productId: 3, productName: '사과' }],
          },
        ],
        totalPageCount: 2,
      }));
    }

    return res(ctx.status(400));
  }),
);

export default server;
