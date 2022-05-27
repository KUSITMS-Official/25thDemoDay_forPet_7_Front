import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Colors } from '../../styles/ui';
import { getApi } from '../../api';
import Pagination from "../Pagination";
import { useNavigate } from "react-router-dom";

interface propsType {
    board: string;
    search: string;
}

interface BoardItf {
    writer: {
        user_id: number;
        user_profile_image: string;
        user_nickname: string;
    };
    title: string,
    category: string,
    post_id: number,
    likes: number,
    bookmarks: number,
    image_url_list: any,
    comment_cnt: number,
    createdDate: string
}

const BoardList = ({ board, search }: propsType) => {
    const navigate = useNavigate();
    const [boardList, setBoardList] = useState<BoardItf[]>();

    const [korCategory, setKorCategory] = useState<string>('');

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);

    const handlePrevPage = (prevPage: number) => {
        setPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = (nextPage: number) => {
        setPage((nextPage) => nextPage + 1);
    };

    useEffect(() => {
        // 커뮤니티 글 불러오기 게시판 - all, meet
        const getBoardList = async () => {
            await getApi(
                {},
                `/community/list?page=${page-1}&size=${10}&category=${board}`
            )
                .then(({ status, data }) => {
                    // console.log(status, data);
                    if (status === 200) {
                        setBoardList(data.body.data);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        getBoardList();
    }, [page])

    useEffect(() => {
        // 검색 api
        const getSearchList = async () => {
            await getApi(
                {},
                `/community/search?page=${page - 1}&size=${10}&keyword=${search}`
            )
                .then(({ status, data }) => {
                    // console.log('검색결과', status, data);
                    if (status === 200) {
                        setBoardList(data.body.data);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        if (search) {
            getSearchList();
        }
    }, [search])

    const clickHandler = (postId: number) => {
        navigate(`/post/${postId}`);  // 글 상세창으로 이동
    }

    return (
        <Wrapper>
            <ListWrapper>
                {
                    boardList ? (
                        boardList.map((b, i) => (
                            <BoardListOne
                                key={b.post_id}
                                onClick={() => clickHandler(b.post_id)}
                            >
                                <div className='left-section'>
                                    {
                                        board === 'all' &&
                                        <div className='category'>{b.category === 'popular' ? (
                                            '인기'
                                        ) : (
                                            b.category === 'sharing' ? (
                                                '나눔'
                                            ) : (
                                                b.category === 'meeting' ? (
                                                    '모임'
                                                ) : (
                                                    '자랑'
                                                )
                                            )
                                        )}</div>
                                    }
                                    <div style={{textAlign: 'left'}}>
                                        <div style={{fontSize: '20px'}}>{b.title}</div>
                                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'end'}}>
                                            <div style={{fontSize: '16px', color: Colors.gray2, marginRight: '5px'}}>{b.writer.user_nickname}</div>
                                            <div style={{fontSize: '12px', color: Colors.gray2}}>{b.createdDate}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='right-section'>
                                    {
                                        b.image_url_list && 
                                        <img
                                            style={{width: '80px', height: '60px'}}
                                            src={b.image_url_list[0]}
                                        />
                                    }
                                    <div className='cnt'
                                        style={{backgroundColor: '#F5F5F5'}}>
                                        <div>좋아요</div>
                                        <div>{b.likes}</div>
                                    </div>
                                    <div className='cnt'
                                    style={{backgroundColor: '#E2E2E2'}}>
                                        <div>댓글</div>
                                        <div>{b.comment_cnt}</div>
                                    </div>
                                </div>
                            </BoardListOne>
                        ))
                    ) : (
                        <div style={{backgroundColor: Colors.green1}}>Loading...</div>
                    )
                    
                }
            </ListWrapper>
            <Pagination
                totalPages={totalPages}
                currentPage={page}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
            />
        </Wrapper>
    )
}

export default BoardList;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const ListWrapper = styled.div`
    margin: 20px 80px;
    background-color: ${Colors.white};
    box-shadow: 0px 4px 33px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
`

const BoardListOne = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 20px;
    
    .left-section {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .right-section {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .category {
        background: #4F6D47;
        border-radius: 12px;
        color: ${Colors.white};
        font-weight: bold;
        width: 60px;
        height: 36px;
        margin-right: 10px;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cnt {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 9px;
        width: 70px;
        height: 70px;
        margin: 0 5px;
    }

`