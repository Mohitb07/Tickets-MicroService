import mongoose from 'mongoose'

interface UserAttrs {
    email: string,
    password: string
}


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema)
// We are gonna use bulidUser to create user
const buildUser = (attrs: UserAttrs) => {
    return new User(attrs)
}

export {User, buildUser}