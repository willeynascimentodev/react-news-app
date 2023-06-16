import NavMenu from "../components/NavMenu";
import FilterPreferences from '../components/FilterPreferences';
import Loading from '../components/Loading';
import {  useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAll, reset} from '../resources/filter/filter.slice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function FeedPreferences() {
    const { user } = useSelector((state) => state.login);
    
    const navigate = useNavigate()

    const dispatch = useDispatch();

    const {isLoading, isSuccess, isLoadingFilter, message, isError, filters } = useSelector(
		(state) => state.filter
	);

    useEffect(() => {
        return () => {
            if(isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess, isLoading])

    useEffect(() => {
        dispatch(getAll(user.data.token))
    }, [dispatch])
    
    if(isLoading) {
        return <Loading/>
    } 

    if(isLoadingFilter) {
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
                <div className='row mt-3'>
                    {
                        isSuccess  ? (
                            <>
                                <FilterPreferences type="Categories" items={filters.data.categories}/>
                                <FilterPreferences type="Sources" items={filters.data.sources}/>
                                <FilterPreferences type="Authors" items={filters.data.authors}/>
                            </>
                        ) : ([])
                    }
                </div>
            </div>
        </>
    )
}

export default FeedPreferences;