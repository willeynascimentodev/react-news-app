import InputGroup from 'react-bootstrap/InputGroup';

function IncludeFilter({onChange, filter, type, addFilter}){
    
    return (
        <>
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
                    <InputGroup.Text>
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
                    </InputGroup.Text>
                    <InputGroup.Text
                        onClick={addFilter}
                        style={{cursor:'pointer'}}
                    >
                        Include
                    </InputGroup.Text>
                </InputGroup>
            </div>
        </>
    )
}

export default IncludeFilter;