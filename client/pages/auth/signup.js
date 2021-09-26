import {useState, useEffect} from 'react';
import axios from 'axios'

export default () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [emailValidOrNot, setEmailValidOrNot] = useState('')
    const [passwordValidOrNot, setPasswordValidOrNot] = useState('')

    
    async function submitHandler(event){
        event.preventDefault()
        try{
            const response = await axios.post('/api/users/signup', {
                email,password
            })

            console.log(response.data)
            setEmail("")
            setPassword("")
        }catch(err){
            setErrors(err.response.data.errors)          
        }
    }
    return (
        <form noValidate onSubmit={submitHandler} className="container">
            <h1>Sign Up</h1>
        <div class="form-group">
            <label for="validationServer01" class="form-label">Email</label>
        <input placeholder="Email" type="email" class={`form-control ${emailValidOrNot}`} id="validationServer01" value={email} onChange={e => setEmail(e.target.value)} required/>
            <div class="valid-feedback">
                {errors.map(err => err.field === "email" && err.message)}
            </div>
        </div>

        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" class={`form-control ${passwordValidOrNot}`}  id="exampleInputPassword1" placeholder="Password"/>
           
            <div id="validationServer03Feedback" class="invalid-feedback">
                {errors.map(err => err.field === "password" && err.message)}
            </div>
        </div>
        <div>
            <button type="submit" class="btn btn-primary">Submit</button>
         </div>   
      </form>
    )

}