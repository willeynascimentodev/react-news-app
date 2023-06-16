import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import SignIn from '../src/pages/SignIn';
import SignUp from '../src/pages/SignUp';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Feed from './pages/Feed';
import PrivateRoute from './components/PrivateRoute';
import FeedPreferences from './pages/FeedPreferences';
import NewFilter from './pages/NewFilter';
import Search from './pages/Search';

function App() {
  return (
    <>
      <Router>
        <Routes> 
        <Route path='/' element={ <SignIn /> } />
          <Route path='/sign-in' element={ <SignIn /> } />
          <Route path='/sign-up' element={ <SignUp /> } />
          
          <Route path='/feed-preferences' element={<PrivateRoute />} >
            <Route path='/feed-preferences' element={<FeedPreferences />} />
          </Route>
          <Route path='/new-filter' element={<PrivateRoute />} >
            <Route path='/new-filter' element={<NewFilter />} />
          </Route>
          <Route path='/feed' element={<PrivateRoute />} >
            <Route path='/feed' element={<Feed />} />
          </Route>
          <Route path='/search' element={<PrivateRoute />} >
            <Route path='/search' element={<Search />} />
          </Route>
        </Routes> 
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
