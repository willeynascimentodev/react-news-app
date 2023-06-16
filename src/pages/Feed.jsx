import NavMenu from "../components/NavMenu";
import { getAll, reset} from '../resources/filter/filter.slice';
import {  useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Loading from "../components/Loading";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getArticles, resetArticles} from '../resources/article/article.slice';

function Feed () {
    const { user } = useSelector((state) => state.login);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {articles, isLoadingArticle, isSuccessArticle, messageArticle, isErrorArticle, filtersArticle } = useSelector(
		(state) => state.article
	);

    const [date, setDate] = useState('2023-06-01')
    const [page, setPage] = useState(1)
    const [keyword, setKeyWord] = useState('')

    useEffect(() => {
        return () => {
            if(isSuccessArticle) {
                dispatch(resetArticles())
            }
        }
    }, [dispatch, isSuccessArticle, isLoadingArticle])

    const params = {
        date: date,
        page, page,
        token: user.data.token
    }

    console.log(articles);
    useEffect(() => {

        dispatch(getArticles(params));

    }, [dispatch])
    


    if(isLoadingArticle) {
        return <Loading />
    }

    if(messageArticle == 'Your session is over')  {
        toast.error('Your session is over sign in again');
        navigate('/sign-in');
    } 
    
    return <>
        <NavMenu/>
        <div className="container">
            <h2 className="text-center">Feed</h2>
            <h3 className="text-center">You will see news based on the filter that you defined.</h3>
        </div>
    </>
}

export default Feed;