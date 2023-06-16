import { destroy } from '../resources/filter/filter.slice';
import {  useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function FilterItem({filter}) {
    const dispatch = useDispatch();
    
    const { user } = useSelector((state) => state.login);

    const [render, setRender] = useState(true);
    
    function deleteItem() {
        const data = {
            id: filter.id,
            token: user.data.token
        } 
        if(filter.id != 0) {
            dispatch(destroy(data));
        } 
        setRender(false);
    }

    if (render === false) return null;
    return (
        <>
            <div className='filter-option'>
                <span className='text-filter-option'>{ filter.name } </span>
                <span className='btn-delete-filter' onClick={deleteItem}>
                    x
                </span>
            </div>
        </>
    );
}

export default FilterItem;