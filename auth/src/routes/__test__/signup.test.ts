import request from 'supertest';
import app from '../../app';

// EITHER RETURN OR AWAIT THE request

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
})

it('returns a 400 on invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "fjasldfja;s",
            password: 'fjalsdffsad'
        })
        .expect(400)
})

it('returns a 400 on invalid password', async() => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            pasword: "p"
        })
        .expect(400)
})

it('returns a 400 on missing email and password fields', async() => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email:"test@test.com"
        })

    await request(app)
        .post('/api/users/signup')
        .send({
            password:"fasdfasdf"
        })
})

it('disallow duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '123456'
        })
        .expect(201)
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '123456'
        })
        .expect(400)
})

it('sets a cookie after successful signup', async() => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '131312ljadf'
        })
        .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined()
})