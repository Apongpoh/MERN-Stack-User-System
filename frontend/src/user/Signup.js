import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Layout from '../core/Layout';
import { API } from '../config';

const Signup = () => {
    const [values, setValues] = useState({
        username: '',
        hashed_password: '',
        hashed_password_confirm: '',
        pin: '',
        pin_confirm: '',
        error: '',
        success: false
    });

    const { username, hashed_password, hashed_password_confirm, pin, pin_confirm, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const signup = async (user) => {
        try {
            await axios.post(`${API}/signup`, user);
        } catch (err) {
            setValues({
                ...values,
                error: err.response.data.msg,
                success: false
            });
        }
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        signup({ username, hashed_password, hashed_password_confirm, pin, pin_confirm });
        setValues({
            ...values,
            username: '',
            hashed_password: '',
            hashed_password_confirm: '',
            pin: '',
            pin_confirm: '',
            error: '',
            success: true
        });
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Username</label>
                <input onChange={handleChange('username')} type="text" className="form-control" value={username} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('hashed_password')} type="password" className="form-control" value={hashed_password} />
            </div>

            <div className="form-group">
                <label className="text-muted">Confirm Password</label>
                <input onChange={handleChange('hashed_password_confirm')} type="password" className="form-control" value={hashed_password_confirm} />
            </div>

            <div className="form-group">
                <label className="text-muted">Pin</label>
                <input onChange={handleChange('pin')} type="password" className="form-control" value={pin} />
            </div>

            <div className="form-group">
                <label className="text-muted">Pin confirm</label>
                <input onChange={handleChange('pin_confirm')} type="password" className="form-control" value={pin_confirm} />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return (
        <Layout title="Signup page" description="Signup Node React e-Commerce App" className="container col-md-8 offset-2">
            {showError()}
            {showSuccess()}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;