import NavMenu from '../components/NavMenu';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import { toast } from 'react-toastify';

import Loading from '../components/Loading';
import {  useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { store, reset} from '../resources/filter/filter.slice';
import { useEffect } from 'react';

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
        const data = {
            name: formData.filter,
            type: formData.type,
            token: user.data.token
        }

        if(formData.filter.length < 3) {
            toast.warning('Type at least 3 characteres');
        }else if(formData.type.length <= 3) {
            toast.warning('Choose a type of filter');
        } else {
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
            <div>
                <InputGroup className="col-xs-4 col-sm-4">
                    <input className='form-control'
                        placeholder='Type a filter name' 
                        onChange={onChange}
                        value={filter}
                        type="text"
                        name="filter"
                        id="filter"
                    />
                    <InputGroup.Text
                        onClick={addFilter}
                        style={{cursor:'pointer'}}
                    >
                        Include
                    </InputGroup.Text>
                </InputGroup>
                <select 
                    name="type" 
                    id="type"
                    className='form-control'
                    onChange={onChange}
                    value={type}
                >
                    <option value="">Choose a type</option>
                    <option value="source">Source</option>
                    <option value="category">Category</option>
                    <option value="author">Author</option>
                </select>
            </div>
        </>
    )
}

export default NewFilter;