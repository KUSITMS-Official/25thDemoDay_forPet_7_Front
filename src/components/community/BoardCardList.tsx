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
    thumbs_up_cnt: number,
    image_url_list: any,
    comment_cnt: number,
    createdDate: string
}

const BoardCardList = ({ board, search }: propsType) => {
    const navigate = useNavigate();
    const [boardList, setBoardList] = useState<BoardItf[]>();


    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);

    const handlePrevPage = (prevPage: number) => {
        setPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = (nextPage: number) => {
        setPage((nextPage) => nextPage + 1);
    };

    useEffect(() => {
        // 커뮤니티 글 불러오기 게시판 - share, boast
        const getBoardList = async () => {
            await getApi(
                {},
                `/community/list?page=${page-1}&size=${12}&category=${board}`
            )
                .then(({ status, data }) => {
                    // console.log(status, data);
                    if (status === 200) {
                        if (data.body.data) {
                            setBoardList(data.body.data);
                        }
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
                `/community/search/page=${page - 1}/size=${12}/keywork=${search}`
            )
                .then(({ status, data }) => {
                    // console.log(status, data);
                    if (status === 200) {
                        setBoardList(data.body.data.data);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
            getSearchList();
        }
    }, [search])

    const clickHandler = (postId: number) => {
        navigate(`/post/${postId}`);  // 글 상세창으로 이동
    }

    return (
        <Wrapper>
            <ListWrapper>
                <CardView>
                    {
                        boardList ? (
                            boardList.map((b, i) => (
                                <BoardCardOne
                                    key={b.post_id}
                                    onClick={() => clickHandler(b.post_id)}
                                >
                                    <img src={b.image_url_list[0]} />
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left', marginTop: '5px' }}>
                                        <img src={b.writer.user_profile_image}
                                            style={{ width: '40px', height: '40px', borderRadius: '40px' }}
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', marginLeft: '10px' }}>
                                            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{b.title}</div>
                                            <div style={{ fontSize: '14px', color: Colors.gray1 }}>{b.writer.user_nickname}</div>
                                        </div>
                                    </div>

                                    {/* <div>좋아요수 {b.thumbsUpCnt}</div>
                                <div>댓글수</div> */}
                                </BoardCardOne>
                            )) 
                        ) :
                        (
                            <div>Loading...</div>
                        )
                    }
                </CardView>
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

export default BoardCardList;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 80px;
    justify-content: center;
    align-items: center;
`

const ListWrapper = styled.div`
    margin: 20px auto;
    border-radius: 15px;
`

const CardView = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0 auto;
`

const BoardCardOne = styled.div`
    background-color: ${Colors.white};
    border: none;
    width: 220px;
    padding: 20px;
    margin: 20px;

    img {
        width: 220px;
        height: 220px;
    }


`