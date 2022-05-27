import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import styled from '@emotion/styled';
import { Colors } from '../../styles/ui';
import { PediaOneComment } from '../../components/forpetPedia';
import { getApi, postApi, setHeader } from "../../api";
import { Header } from "../../components";

import { ReactComponent as LikeIcon } from '../../assets/Like-icon.svg';
import { ReactComponent as BookmarkIcon } from '../../assets/Bookmark-icon.svg';
import { ReactComponent as CommentIcon } from '../../assets/Comment-icon.svg';

const dumpdata = {
    "qnaBoardId": 0,
    "toggle": false,  // 북마크 여부
    "tag": "반려인",
    "nickName": "",
    "title": "",
    "content": "",
    "createDate": "",
    "likes": 0,
    "bookmark": 0,
    "comments": 0,
    "imageUrlList": [
        
    ]
}

// const dumpComment = [
//     {
//         "imageUrl": "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg",
//         "nickName": "",
//         "tag": "",
//         "comment": "",
//         "createDate": "",
//         "likes": 0,
//         "id": 0
//     }
// ]

interface Comment {
    imageUrl: any,
    nickName: string,
    tag: string,
    comment: string,
    createDate: string,
    likes: number,
    id: number,
}

const PediaDetail = () => {
    const [question, setQuestion] = useState<any>(dumpdata);  // 질문
    const [comments, setComments] = useState<Comment[]>();  // 댓글
    const [myAnswer, setMyAnswer] = useState<string>();  // 내가 쓴 댓글
    
    const params = useParams();
    let postId = params.id;

    if(localStorage.getItem("token") != ""){
        const ACCESS_TOKEN = localStorage.getItem("token");
        setHeader(ACCESS_TOKEN);
    }

    useEffect(() => {
        // 글 불러오기
        const getQuestion = async () => {
            await getApi(
                {}, `/qnaBoard/${postId}`
            )
                .then(({ status, data }) => {
                    // console.log(`GET 글 내용`, status, data);
                    if (status === 200) {
                        setQuestion(data.body.data);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }

        // 댓글 불러오기
        const getComments = async () => {
            await getApi(
                {}, `/qnaBoard/${postId}/comment`
            )
                .then(({ status, data }) => {
                    // console.log('댓글불러옴', data);
                    if (status === 200) {
                        // console.log(`GET 댓글내용`, status, data);
                        if (data.data) {
                            setComments(data.data);
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        getQuestion();
        getComments();
    }, []);

    // 댓글 입력
    const writeAnswer = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {  // 연필 클릭 시 답변 입력 - postapi
        console.log(myAnswer);
        if (e.key === 'Enter') {
            await postApi(
                {
                    'comment': myAnswer
                },
                `/qnaBoard/${postId}/comment`
            )
                .then(({ status, data }) => {
                    // console.log('댓글입력:', status, data);
                    if (status === 200) {
                        window.location.reload(); // 새로고침
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }

    // 좋아요, 북마크 Post API
    const clickCnt = async (cnt: string) => {
        await postApi(
            {},
            `/qnaBoard/${postId}/${cnt}`
        )
            .then(({ status, data }) => {
                // console.log("POST 좋아요/북마크 누름", status, data);
                if (status === 200) {
                    if (cnt === 'like') {
                        setQuestion({ ...question, likes: data.body.data });
                    } else {
                        // setQuestion({ ...question, bookmark: data.body.data.cnt });
                    }
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <>
        <Header />
        <Wrapper>
            <Question>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className='q-upper'>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {
                                question.profileImage &&
                                <img src={question.profileImage}
                                    style={{ width: '30px', height: '30px', borderRadius: '20px' }}/>
                                
                            }
                            
                            <div style={{ fontSize: '12px', color: Colors.green5 }}>{question.tag}</div>
                            <div style={{ fontSize: '14px', fontWeight: 'bold' }} className='writer'>{question.nickName}</div>
                        </div>
                    </div>
                    <div
                        style={{ textAlign: 'left' }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '20px' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '28px', color: Colors.green5, marginRight: '5px' }}>Q.</div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '24px', }}>{question.title}</div>
                                <div style={{ fontSize: '20px', marginTop: '10px' }}>{question.content}</div>

                            </div>
                            
                        </div>
                    </div>
                </div>
                <div style={{textAlign: 'left', margin: '10px 30px'}}>
                    {
                        question.imageUrlList &&
                        question.imageUrlList.map((img: string, i: number) => (
                            <img key={i} src={img} style={{ width: '300px', height: '300px', margin: '10px' }}></img>
                        ))
                    }
                </div>

                <div className='cnts'>
                    <div style={{ fontSize: '12px', color: Colors.gray1, marginLeft: '5px' }}>{question.createDate}</div>
                    <div className='cnt'
                        onClick={() => clickCnt('like')}>
                        <LikeIcon className='icon' />
                        {question.likes}
                    </div>
                    <div className='cnt'
                        onClick={() => clickCnt('bookmark')}>
                        <BookmarkIcon className='icon' />
                        {question.bookmark}
                    </div>
                    <div className='cnt'>
                        <CommentIcon className='icon' />
                        {question.comments}
                    </div>
                </div>
            </Question>
            <hr
                style={{
                    color: `${Colors.gray2}`,
                    height: 1,
                    width: '100%'
                }}
            />
            {
                comments &&
                comments.map((c: any, i: number) => (
                    <PediaOneComment
                        key={i}
                        comment={c}
                    />
                ))
            }
            <hr
                style={{
                    color: `${Colors.gray1}`,
                    height: 1,
                    width: '100%'
                }}
            />
            <textarea
                placeholder='댓글을 입력하시개'
                onChange={(
                    e: React.ChangeEvent<HTMLTextAreaElement>,
                ): void => setMyAnswer(e.target.value)}
                value={myAnswer}
                onKeyPress={(e) => writeAnswer(e)}
            ></textarea>
        </Wrapper>
        </>
    )
}

export default PediaDetail;

const Wrapper = styled.div`
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    margin: 20px 80px;
    padding: 20px;
    background-color: ${Colors.white};
    box-shadow: 0px 4px 33px rgba(0, 0, 0, 0.1);
    border-radius: 15px;

    textarea {
        resize: none;
        width: 100%;
        border: none;
        font-size: 16px;
    }

    .writer-sec {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    
    .writer-sec-name {
        display: flex;
        flex-direction: column;
    }

    .writer {
        font-weight: bold;
    }
`
const Question = styled.div`

    .q-upper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .cnts {
        display: flex;
        flex-direction: row;
        float: right;
    }

    .cnt {
        margin: 0 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .icon {
        width: 20px;
        height: 20px;
        margin: 0 5px;
        cursor: pointer;
    }

`