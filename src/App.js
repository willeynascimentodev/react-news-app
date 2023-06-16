import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import SignIn from '../src/pages/SignIn';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Feed from './pages/Feed';
import PrivateRoute from './components/PrivateRoute';
import FeedPreferences from './pages/FeedPreferences';
import NewFilter from './pages/NewFilter';

function App() {
  return (
    <>
      <Router>
        <Routes> 
          <Route path='/sign-in' element={ <SignIn /> } />
          <Route path='/feed-preferences' element={<PrivateRoute />} >
            <Route path='/feed-preferences' element={<FeedPreferences />} />
          </Route>
          <Route path='/new-filter' element={<PrivateRoute />} >
            <Route path='/new-filter' element={<NewFilter />} />
          </Route>
          <Route path='/feed' element={<PrivateRoute />} >
            <Route path='/feed' element={<Feed />} />
          </Route>
        </Routes> 
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
