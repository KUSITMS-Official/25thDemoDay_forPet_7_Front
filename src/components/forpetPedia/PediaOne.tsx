import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Colors } from '../../styles/ui';
import { postApi, getApi } from '../../api';
import { useNavigate } from "react-router-dom";
import { PediaOneComment } from '../../components/forpetPedia';
import { ReactComponent as LikeIcon } from '../../assets/Like-icon.svg';
import { ReactComponent as BookmarkIcon } from '../../assets/Bookmark-icon.svg';
import { ReactComponent as CommentIcon } from '../../assets/Comment-icon.svg';


const PediaOne = (post: any) => {
    const navigate = useNavigate();
    const onePost = post.post;
    const [myAnswer, setMyAnswer] = useState<string>();

    interface Comment {
        imageUrl: string,
        nickName: string,
        tag: string,
        comment: string,
        createDate: string,
        likes: number,
        id: number,
    }

    const commentInitial = [
        {
            "imageUrl": "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg",
            "nickName": "김유동",
            "tag": "예비반려인",
            "comment": "귀여워요",
            "createDate": "2022-05-12T14:13:50.797922",
            "likes": 3,
            "id": 1
        },
        {
            "imageUrl": "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg",
            "nickName": "김유동",
            "tag": "예비반려인",
            "comment": "댓글댓글댓글",
            "createDate": "2022-05-12T14:42:26.300552",
            "likes": 0,
            "id": 3
        },
        {
            "imageUrl": "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg",
            "nickName": "쩜마이",
            "tag": "반려인",
            "comment": "게시글1 댓글작성",
            "createDate": "2022-05-12T15:18:17.055392",
            "likes": 0,
            "id": 4
        },
        {
            "imageUrl": "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg",
            "nickName": "김유동",
            "tag": "예비반려인",
            "comment": "댓글이",
            "createDate": "2022-05-12T23:24:42.126204",
            "likes": 0,
            "id": 5
        }
    ];

    // const [comments, setComments] = useState(commentInitial);  // 댓글 임시 데이터
    const [comments, setComments] = useState<Comment[]>();

    // const [like, setLike] = useState<boolean>();
    // const [bookmark, setBookmark] = useState<boolean>();

    // 댓글 불러오기 GET API
    useEffect(() => {
        const getComments = async () => {
            await getApi(
                {},
                `/qnaBoard/${onePost.qnaBoardId}/comment`
            )
                .then(({ status, data }) => {
                    // console.log(`GET 댓글 불러오기`, status, data.data);
                    if (status === 200) {
                        setComments(data.data);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        getComments();
    }, [])

    // 댓글 입력
    const writeAnswer = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {  // 연필 클릭 시 답변 입력 - postapi
        if (e.key === 'Enter') {
            await postApi(
                {
                    'comment': myAnswer
                },
                `/qnaBoard/${onePost.qnaBoardId}/comment`
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

    // 좋아요, 스크랩 Post API
    const clickLike = async (postId: number, cnt: string) => {
        // console.log('좋아요누름', postId);
        await postApi(
            {},
            `/qnaBoard/${postId}/${cnt}`
        )
            .then(({ status, data }) => {
                if (status === 200) {
                    window.location.reload(); // 새로고침
                    // console.log("POST 좋아요/북마크 누름", status, data);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const postClickHandler = () => {
        navigate(`/pedia/${onePost.qnaBoardId}`);
    };

    // useEffect(() => {
    //     console.log('image', onePost.imageUrlList);
    // }, [])


    return (
        <OnePost>
            <Question style={{cursor: 'pointer'}}>
                <div className='q-upper'>
                    <div className='writer-sec'>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {
                                    onePost.profileImage &&
                                    <img src={onePost.profileImage}
                                        style={{ width: '30px', height: '30px', borderRadius: '20px' }} />
                                }
                                <div style={{ fontSize: '12px', color: Colors.green5 }}>{onePost.tag}</div>
                                <div style={{ fontSize: '14px', fontWeight: 'bold' }} className='writer'>{onePost.nickName}</div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', marginLeft: '5px' }}>
                                <div
                                    style={{ textAlign: 'left' }}
                                    onClick={postClickHandler}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '50px' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '28px', color: Colors.green5, marginRight: '5px' }}>Q.</div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ fontWeight: 'bold', fontSize: '24px', }}>{onePost.title}</div>
                                            <div style={{ fontSize: '20px' }}>{onePost.content}</div>
                                            <div>
                                                {
                                                    onePost.imageUrlList &&
                                                    onePost.imageUrlList.map((img: string, i: number) => (
                                                        <img src={img} key={i} className='image-resize'></img>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='cnts'>
                    <div style={{ fontSize: '12px', color: Colors.gray1, marginLeft: '5pxc' }}>{onePost.createDate}</div>
                    <div className='cnt'
                        onClick={() => clickLike(onePost.qnaBoardId, 'like')}>
                        <LikeIcon className='icon' />
                        {onePost.likes}
                    </div>
                    <div className='cnt'
                        onClick={() => clickLike(onePost.qnaBoardId, 'bookmark')}>
                        <BookmarkIcon className='icon' />
                        {onePost.bookmark}
                    </div>
                    <div className='cnt'>
                        <CommentIcon className='icon' />
                        {onePost.comments}
                    </div>
                </div>
            </Question>
            <hr
                style={{
                    color: `${Colors.gray2}`,
                    height: '1px',
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
                    color: `${Colors.gray2}`,
                    height: '1px',
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

        </OnePost>
    );
}

export default PediaOne;

const OnePost = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
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

    .image-resize {
        width: 100px;
        height: 100px;
    }
`
const Answer = styled.div`
    text-align: left;

    .answer {
        margin-left: 30px;
    }

    .a-good-cnt {
        margin-left: 30px;
    }
`