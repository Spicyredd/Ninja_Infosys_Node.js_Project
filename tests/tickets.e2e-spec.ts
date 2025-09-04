import request from 'supertest'

const API = 'http://localhost:3000'

async function login(email: string, password: string) {
  const res = await request(API).post('/auth/login').send({ email, password })
  expect(res.status).toBe(200)
  return res.body.data.access_token as string
}

describe('Tickets flow', () => {
  let citizenToken: string

  beforeAll(async () => {
    // Seed users beforehand. Replace with seeded creds.
    citizenToken = await login('rbeeju20@gmail.com', 'password0')
  })

  it('creates a ticket', async () => {
    const res = await request(API)
      .post('/tickets')
      .set('Authorization', `Bearer ${citizenToken}`)
      .send({
        title: 'Streetlight not working',
        description: 'Three lights out near the community hall.',
        categoryId: 1,
        wardId: 3
      })
    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data.title).toContain('Streetlight')
    expect(res.body.data.status).toBe('NEW')
  })

  it('lists own tickets with pagination', async () => {
    const res = await request(API)
      .get('/tickets?page=1&pageSize=10')
      .set('Authorization', `Bearer ${citizenToken}`)
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.meta).toBeDefined()
  })
})
