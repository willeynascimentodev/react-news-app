import FilterItem from './FilterItem';


function FilterPreferences({type, items}) {

    return (
        <>
            <div className=" col-xs-4 col-sm-6 col-lg-4 col-md-4 mb-2">
                <span className='pb-5'>
                    {type}:
                </span><br/>
                { items.map((filter) => (
                    <FilterItem key={filter.id} filter={filter}/>
                ))}
            </div>
        </>
    )
}

export default FilterPreferences;