import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';

export default function PaginationControlled({n, setPageParent, dispatch, getArticles, params, articles, setArticlesState, isSuccessArticle, resetArticles}) {
  const [page, setPage] = React.useState(params.page);
  const handleChange = (event, value) => {
    setPage(value);
    setPageParent(value);
    dispatch(getArticles(
        {
            date: params.date,
            page: value,
            token: params.token
        }
    ));
  };

  useEffect(() => {
    return () => {
        if(isSuccessArticle) {
            setArticlesState(articles.data || []);
            dispatch(resetArticles())
        }
    }
}, [dispatch, isSuccessArticle, articles])
  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={n} page={page} onChange={handleChange} />
    </Stack>
  );
}