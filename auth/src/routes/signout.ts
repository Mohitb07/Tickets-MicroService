import express from 'express'

const router = express.Router()

router.post('/api/user/signout', (req, res) => {
    res.send('hi')
})

export { router as signoutRouter}