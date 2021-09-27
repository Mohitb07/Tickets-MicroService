import {useState, useEffect} from 'react';
import axios from 'axios'
import Router from 'next/router'

import useRequest from '../../hooks/useRequest';

export default () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {doRequest, errors} = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,password
        },
        onSuccess: () => Router.push('/')
    })
    
    async function submitHandler(event){
        event.preventDefault()  

        doRequest()
    }
    return (
        <form autoComplete="off" noValidate onSubmit={submitHandler} className="container">
            <h1>Sign Up</h1>
        <div class="form-group">
            <label for="validationServer01" class="form-label">Email</label>
        <input placeholder="Email" type="email" class="form-control" id="validationServer01" value={email} onChange={e => setEmail(e.target.value)} required/>
            {/* <div class="valid-feedback">
                {errors.map(err => err.field === "email" && err.message)}
            </div> */}
        </div>

        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" class="form-control"  id="exampleInputPassword1" placeholder="Password"/>
           
            {/* <div id="validationServer03Feedback" class="invalid-feedback">
                {errors.map(err => err.field === "password" && err.message)}
            </div> */}
        </div>
        {errors}
        <div>
            <button type="submit" class="btn btn-primary">Submit</button>
         </div>   
      </form>
    )

}