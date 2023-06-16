import NavMenu from '../components/NavMenu';

import { useState } from 'react';
import { toast } from 'react-toastify';

import Loading from '../components/Loading';
import {  useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { store, reset} from '../resources/filter/filter.slice';
import { useEffect } from 'react';
import IncludeFilter from '../components/IncludeFilter';

function NewFilter() {
    const { user } = useSelector((state) => state.login);
    
    const navigate = useNavigate()

    const dispatch = useDispatch();

    const {isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.filter
	);
    
    const [formData, setFormData] = useState({
        filter: '',
        type: ''
    });

    useEffect(() => {
        if(isSuccess) {
            dispatch(reset)
            toast.success('Filter Created.')
        } else if (isError) {
            dispatch(reset)
            toast.error(message)
        }

        dispatch(reset)
    }, [dispatch, isSuccess, isLoading])

    const { filter, type } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    function addFilter() {

        if(formData.filter.length < 3) {
            toast.warning('Type at least 3 characteres');
        }else if(formData.type.length <= 3) {
            toast.warning('Choose a type of filter');
        } else {
            const data = {
                name: formData.filter,
                type: formData.type,
                token: user.data.token
            }
            
            dispatch(store(data));
            setFormData({})
        }
    }

    if(isLoading) {
        return <Loading />
    }
    
    return (
        <>
            <NavMenu />
            <h2 className="text-center">Save Filter</h2>
            <h3 className="text-center mb-3">Enter some predefined filters here</h3>
            <IncludeFilter 
                className='col-sm-8 mx-auto'
                onChange={onChange}
                filter={filter}
                type={type}
                addFilter={addFilter}
            />
        </>
    )
}

export default NewFilter;