import request from 'supertest'

const API = 'http://localhost:3000'

describe('Auth', () => {
  it('rejects bad credentials', async () => {
    const res = await request(API).post('/auth/login').send({
      email: 'no@user.tld',
      password: 'invalidpass'
    })
    expect(res.status).toBe(401)
    expect(res.body.success).toBe(false)
    expect(res.body.error.code).toBeDefined()
  })
})
