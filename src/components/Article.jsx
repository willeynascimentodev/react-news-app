import { Link } from 'react-router-dom';

function Article({article}) {
    return (
        <>
            <div className="card p-3 mt-2">
                <h1 style={{ fontSize:"20px" }}>{article.title}</h1>
                <p className="mt-2">
                    <span style={{display:"block"}} >
                        Category : {article.category}
                    </span>
                    <span style={{display:"block"}} >
                        Source : {article.source}
                    </span>
                    <span style={{display:"block"}} >
                        Date : {article.date}
                    </span>
                </p>
                <Link 
                    className='mt-3 btn btn-secondary form-control' 
                    to={article.link}
                    target="blank"
                >   
                    Read More
                </Link>
            </div>
        </>
    )
}

export default Article