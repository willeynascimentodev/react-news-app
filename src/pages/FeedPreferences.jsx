import NavMenu from "../components/NavMenu";
import FilterPreferences from '../components/FilterPreferences';
import Loading from '../components/Loading';
import {  useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAll, reset} from '../resources/filter/filter.slice';

function FeedPreferences() {
    const { user } = useSelector((state) => state.login);
    
    const navigate = useNavigate()

    const dispatch = useDispatch();

    const {isLoading, isSuccess, message, filters } = useSelector(
		(state) => state.filter
	);

    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [authors, setAuthors] = useState([]);
        
    useEffect(() => {
        return () => {
            if(isSuccess) {
                dispatch(reset())
                setCategories(filters.data.categories);
                setSources(filters.data.sources);
                setAuthors(filters.data.authors);
            }
        }
    }, [dispatch, isSuccess, isLoading, filters])
    

    useEffect(() => {
        dispatch(getAll(user.data.token))
    }, [dispatch])
    
    if(isLoading) {
        return <Loading/>
    } 

    if(message == 'Your session is over') {
        toast.error('Your session is over sign in again');
        navigate('/sign-in');
    } 

    return (
        <>
        	<NavMenu/>
            <div className="container">
                <h2 className="text-center">Feed Preferences</h2>
                <h3>Personalize your feed choosing default filters</h3>
                <div className='row mt-3 mb-3'>
                    {
                        !isLoading  ? (
                            <>
                                <FilterPreferences type="Categories" items={categories || []}/>
                                <FilterPreferences type="Sources" items={sources || []}/>
                                <FilterPreferences type="Authors" items={authors || []}/>
                            </>
                        ) : ([])
                    }
                </div>
                <div className="mx-auto className='col-sm-6 col-md-3 col-lg-2">
                    <Link className='btn btn-secondary form-control' to='/new-filter'>
                        Create New Filters
                    </Link>
                </div>
                
                
            </div>
        </>
    )
}

export default FeedPreferences;