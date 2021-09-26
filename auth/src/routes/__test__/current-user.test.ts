import request from 'supertest'
import authHelper from '../../test/authHelper'

import app from '../../app'

it('responds with current logged in user\'s details ', async () => {
    const cookie = await authHelper();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200)
    
    expect(response.body.currentUser.email).toEqual('test@test.com')
})

it('responds with null if not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200)
    
    expect(response.body.currentUser).toEqual(null)
})