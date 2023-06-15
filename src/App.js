import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import SignIn from '../src/pages/SignIn'

function App() {
  return (
    <>
      <Router>
        <Routes> 
          <Route path='/sign-in' element={ <SignIn /> } />
        </Routes> 
      </Router>
    </>
  );
}

export default App;
