import NavMenu from "../components/NavMenu";
import { getAll, reset} from '../resources/filter/filter.slice';
import {  useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Loading from "../components/Loading";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getSearch, resetArticles} from '../resources/article/article.slice';
import Pagination from '../components/Pagination'
import Article from "../components/Article";
import SearchBar from "../components/SearchBar";
import FilterItem from "../components/FilterItem";
import IncludeFilter from "../components/IncludeFilter";

function Search () {
    const { user } = useSelector((state) => state.login);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {isLoadingArticle, isSuccessArticle, message, articles } = useSelector(
		(state) => state.article
	);

    const [formData, setFormData] = useState({
        filter: '',
        type: '',
        keyword: '',
        date: '2023-05-26'
    });

    const { filter, type, keyword, date } = formData

    const [articlesState, setArticlesState] = useState([]);
    const [articlesTotal, setArticlesTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [author, setAuthor] = useState([]);
    const [category, setCategory] = useState([]);
    const [source, setSource] = useState([]);

    const params = {
        date: date,
        page: page,
        token: user.data.token,
        author: author,
        category: category,
        source: source,
        keyword: keyword
    }

    useEffect(() => {
        
        return () => {
            if(isSuccessArticle) {
                dispatch(resetArticles())
                setArticlesState(articles.data || []);
                setArticlesTotal(articles.total || 0);
            }
        }
    }, [dispatch, isSuccessArticle, isLoadingArticle])

    useEffect(() => {
        dispatch(getSearch(params));
    }, [dispatch])

    function submitForm(e) {
        e.preventDefault();
        dispatch(getSearch(params));
    }

    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    function addFilter(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));

        if(filter.length > 3 && type.length > 3) {
            switch(type) {
                case 'category': 
                    pushFilter(category, filter);
                        break;
                case 'source': 
                    pushFilter(source, filter);
                        break;
                case 'author': 
                pushFilter(author, filter);
                        break;
            }
        } else {
            toast.warning('Please, Fill the fields');
        }
    }

    function pushFilter(type, filter){
        if (type.length < 10) {
            type.push(
                {
                    name: filter,
                    id: 0
                }
            );
        } else {
            toast.warning('Limit reached for this type of filter');
        }
    }
    
    if(isLoadingArticle) {
        return <Loading />
    } 

    if(message && message == 'Your session is over')  {
        toast.error('Your session is over sign in again');
        navigate('/sign-in');
    } 

    
    
    return <>
        <div className="container">
            {
            }
            <NavMenu/>
            <h2 className="text-center">Search</h2>
            <h3 className="mb-2text-center">Here you can create a more customized filter.</h3>
            <SearchBar
                className="col-sm-8 col-md-8 col-lg-8"
                style={{display: "block", margin:"auto", textAlign:"center"}}
                articles={articles}
                setArticlesState={setArticlesState}
                isSuccessArticle={isSuccessArticle} 
                resetArticles={resetArticles}
                getArticles={getSearch}
                onChange={onChange}
                category={category}
                source={source}
                author={author}
                dispatch={dispatch}
                keyword={keyword}
                date={date}
                filter={filter}
                type={type}
                addFilter={addFilter}
                submitForm={submitForm}
            />
            <Pagination 
                style={{display: "block", margin:"auto", textAlign:"center"}}
                params={params} 
                dispatch={dispatch} 
                getArticles={getSearch} 
                setPageParent={setPage} 
                n={articlesTotal ? Math.ceil(articlesTotal /30) : 0}
                articles={articles}
                setArticlesState={setArticlesState}
                isSuccessArticle={isSuccessArticle}
                resetArticles={resetArticles}
                
            />
            <div className="col-sm-12 col-md-8 col-lg-8 mx-auto d-block mt-5">
                
                { articlesState.map((article) => (
                    <Article className="mt-2" key={article.idInPage} article={article}/>
                )) }
            </div>
        </div>
        
    </>
}

export default Search;