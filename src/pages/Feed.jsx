import NavMenu from "../components/NavMenu";
import { getAll, reset} from '../resources/filter/filter.slice';
import {  useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Loading from "../components/Loading";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getArticles, resetArticles} from '../resources/article/article.slice';
import Pagination from '../components/Pagination'
import Article from "../components/Article";

function Feed () {
    const { user } = useSelector((state) => state.login);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {isLoadingArticle, isSuccessArticle, message, articles } = useSelector(
		(state) => state.article
	);

    const [articlesState, setArticlesState] = useState([]);
    const [articlesTotal, setArticlesTotal] = useState(0);

    const [date, setDate] = useState('2023-06-01');
    const [page, setPage] = useState(1);

    const params = {
        date: date,
        page: page,
        token: user.data.token
    }

    useEffect(() => {
        return () => {
            if(isSuccessArticle) {
                dispatch(resetArticles())
                setArticlesState(articles.data || []);
                setArticlesTotal(articles.total || 0);
            }
        }
    }, [dispatch, isSuccessArticle, isLoadingArticle, articles])
    
    useEffect(() => {
        dispatch(getArticles(params));
    }, [dispatch])

    if(isLoadingArticle) {
        return <Loading />
    } 

    if(message && message == 'Your session is over')  {
        toast.error('Your session is over sign in again');
        navigate('/sign-in');
    } 
    
    return <>
        <NavMenu/>
        <div className="container">
            <h2 className="text-center">Feed</h2>
            <h3 className="text-center">You will see news based on the filter that you defined.</h3>
            <Pagination 
                style={{display: "block", margin:"auto", textAlign:"center"}}
                params={params} 
                dispatch={dispatch} 
                getArticles={getArticles} 
                setPageParent={setPage} 
                n={articlesTotal ? Math.ceil(articlesTotal /30) : 0}
                articles={articles}
                setArticlesState={setArticlesState}
                isSuccessArticle={isSuccessArticle}
                resetArticles={resetArticles}
                
            />
            <div className="col-sm-12 col-md-10 col-lg-10 mx-auto d-block mt-5">
                
                { articlesState.map((article) => (
                    <Article className="mt-2" key={article.idInPage} article={article}/>
                )) }
            </div>
        </div>
    </>
}

export default Feed;