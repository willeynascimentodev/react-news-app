import IncludeFilter from "../components/IncludeFilter";
import FilterItem from "../components/FilterItem";
import { useEffect } from 'react';
function SearchBar({articles, setArticlesState, isSuccessArticle, resetArticles, getArticles, onChange, category, source, author, dispatch, keyword, date, filter, type, addFilter, submitForm}) {

    useEffect(() => {
        return () => {
            if(isSuccessArticle) {
                setArticlesState(articles.data || []);
                dispatch(resetArticles())
            }
        }
    });

    return (
        <>
            <div className="form-row col-sm-8 mx-auto">
                <input 
                    type="text" 
                    name="key" 
                    id="key" 
                    value={keyword} 
                    onChange={onChange}
                    className="form-control col-sm-8 col-md-6 m-2"
                    placeholder="Type a keyword"
                />

                <input 
                    type="date" 
                    name="date" 
                    id="date" 
                    value={date} 
                    onChange={onChange}
                    className="form-control col-sm-8 col-md-6 m-2"
                    placeholder="Type a keyword"
                />

                <IncludeFilter 
                    className='col-sm-8 col-md-6  m-2'
                    onChange={onChange}
                    filter={filter}
                    type={type}
                    addFilter={addFilter}
                />
                  
                { category.map((c) => (
                    <FilterItem filter={c}/>
                )) }

                { source.map((c) => (
                    <FilterItem filter={c}/>
                )) }

                { author.map((c) => (
                    <FilterItem filter={c}/>
                )) }

                <button 
                    className="mt-3 d-block btn btn-secondary"
                    onClick={submitForm}
                >Search</button>
            </div>
        </>
    )
}

export default SearchBar