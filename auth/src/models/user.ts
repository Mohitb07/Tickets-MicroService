import mongoose from 'mongoose'
import { Password } from '../services/password';

interface UserAttrs {
    email: string,
    password: string
}

// An interface that describes the properties
// that a User model has

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties 
// that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
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

userSchema.pre('save', async function(done){
    const user = this;
    if(user.isModified('password')){
        const hashed = await Password.toHash(this.get('password'))
        user.set('password', hashed)
    }
    done()
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)


export {User}