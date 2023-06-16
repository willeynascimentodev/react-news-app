import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { login, register } from '../resources/login/login.slice';
import { useDispatch } from 'react-redux';

function LoginForm({isRegister}) {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({});

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            email: formData.formGroupEmail,
            password: formData.formGroupPassword
        }
        if(!isRegister) {
            dispatch(login(data));
        } else {
            dispatch(register(data));
        }
    }

    return (
        <Form onSubmit={onSubmit} className="card mt-5 p-3 col-lg-8 col-sm-12 col-md-6 mx-auto bg-lighgray">
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required minLength={6} type="password" placeholder="Password" name="password" onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupSubmit">
                {
                    isRegister ? 
                        <Form.Control type="submit" value="Sign Up" /> : 
                            <Form.Control type="submit" value="Sign In" />
                }
            </Form.Group>
        </Form>
    );
}

export default LoginForm;