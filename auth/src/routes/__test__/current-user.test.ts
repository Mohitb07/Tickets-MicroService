import request from 'supertest'

import app from '../../app'

it('responds with current logged in user\'s details ', async () => {
    const signUpResponse = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
    const cookie = signUpResponse.get('Set-Cookie')

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200)
    
    expect(response.body.currentUser.email).toEqual('test@test.com')
})
