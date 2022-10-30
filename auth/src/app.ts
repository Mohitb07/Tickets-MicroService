import express from 'express';
import 'express-async-errors'
// import {json} from 'body-parser'
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler, NotFoundError } from '@mohittickdev/common';

const app = express()
app.set('trust proxy', true) // Trust the proxy for secure connection (ingress-nginx) in our case;
app.use(express.json())
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'   // Only HTTPS connections allowed
}))

// Route Middlewares
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

// Not Found route ( all for any request method)
app.all('*', async(req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)

export default app;