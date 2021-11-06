import express from 'express';
import 'express-async-errors'
import {json} from 'body-parser'
import cookieSession from 'cookie-session';


import { errorHandler, NotFoundError } from '@mohittickdev/common';

const app = express()
app.set('trust proxy', true) // Trust the proxy for secure connection (ingress-nginx) in our case;
app.use(json())
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'   // Only HTTPS connections allowed
}))

// Not Found route ( all for any request method)
app.all('*', async(req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)

export default app;