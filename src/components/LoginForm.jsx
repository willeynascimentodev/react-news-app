import Form from 'react-bootstrap/Form';

function LoginForm() {
  return (
    <Form className="card mt-5 p-3 col-lg-8 col-sm-12 col-md-6 mx-auto bg-lighgray">
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupSubmit">
        <Form.Control type="submit" value="Sign In" />
      </Form.Group>
    </Form>
  );
}

export default LoginForm;