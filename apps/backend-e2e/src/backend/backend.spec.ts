import axios from 'axios';

describe('Backend API (Strapi proxy)', () => {
  it('GET /api/dishes returns ApiResponse or upstream error when Strapi is down', async () => {
    const res = await axios.get('/api/dishes', { validateStatus: () => true });

    expect([200, 502]).toContain(res.status);
    if (res.status === 200) {
      expect(res.data).toHaveProperty('data');
    }
  });
});
