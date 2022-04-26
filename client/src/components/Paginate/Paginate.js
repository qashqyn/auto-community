import React, { useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';

import { getNews } from '../../actions/news';
import { getAntitheftPosts } from '../../actions/antitheft';
import { getVideos } from '../../actions/videos';

import './styles.scss';
import { getMarketPosts } from '../../actions/market';

const Paginate = ({tags, page, type, filter}) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        if(page){
            if(type === 'news')
                dispatch(getNews(tags, page));
            else if(type === 'antitheft')
                dispatch(getAntitheftPosts(filter, page));
            else if(type === 'video')
                dispatch(getVideos(tags, page));
            else if(type === 'market')
                dispatch(getMarketPosts(page));
                
        }
    },[dispatch, tags, page, filter, type]);

    return (
        <Pagination className='justify-content-center' id="pagination">
            <Pagination.First disabled={page===1} href={`?page=1`}/>
            <Pagination.Prev disabled={page===1} href={`?page=${page-1}`}/>
            <Pagination.Item active={page===1} href={`?page=1`}>{1}</Pagination.Item>
            {page>4 && (<Pagination.Ellipsis /> )}

            {page>3 && <Pagination.Item href={`?page=${page-2}`}>{page-2}</Pagination.Item>}
            {page>2 && <Pagination.Item href={`?page=${page-1}`}>{page-1}</Pagination.Item>}
            {(page>1 && page<numberOfPages) && <Pagination.Item active href={`?page=${page}`}>{page}</Pagination.Item>}
            {page<numberOfPages-1 && <Pagination.Item href={`?page=${page+1}`}>{page+1}</Pagination.Item>}
            {page<numberOfPages-2 && <Pagination.Item href={`?page=${page+2}`}>{page+2}</Pagination.Item>}


            {page<numberOfPages-3 && (<Pagination.Ellipsis /> )}
            {numberOfPages>1 && (
                <Pagination.Item active={page===numberOfPages} href={`?page=${numberOfPages}`}>{numberOfPages}</Pagination.Item>
            )}
            <Pagination.Next disabled={page===numberOfPages || !numberOfPages} href={`?page=${page+1}`}/>
            <Pagination.Last disabled={page===numberOfPages || !numberOfPages} href={`?page=${numberOfPages}`}/>
        </Pagination>
    );
};

export default Paginate;