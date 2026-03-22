import axios from 'axios';

/** Collections exposed by the Nest BFF; each proxies to Strapi `/api/<name>`. */
const COLLECTIONS = ['dishes', 'restaurants', 'chefs', 'tags'] as const;

describe('Backend API (Strapi proxy)', () => {
  it.each(COLLECTIONS)(
    'GET /api/%s returns ApiResponse or upstream error when Strapi is unavailable',
    async (collection) => {
      const res = await axios.get(`/api/${collection}`, {
        validateStatus: () => true,
      });

      expect([200, 502]).toContain(res.status);
      if (res.status === 200) {
        expect(res.data).toHaveProperty('data');
      }
    },
  );

  it('GET /api/dishes/:id returns 404 when missing, or 502 if Strapi is unreachable', async () => {
    const res = await axios.get(
      '/api/dishes/00000000-0000-0000-0000-000000000001',
      { validateStatus: () => true },
    );
    expect([404, 502]).toContain(res.status);
  });
});
