import React, { useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { Colors } from '../../styles/ui';
import { useParams, Link, useNavigate } from "react-router-dom";
import { getApi, postApi, deleteApi, setHeader } from '../../api';
import { Header } from "../../components";
import { ImageModal } from '../../components/community';
import { ReactComponent as LikeIcon} from '../../assets/Like-icon.svg';
import { ReactComponent as BookmarkIcon} from '../../assets/Bookmark-icon.svg';
import { ReactComponent as LikeFullIcon} from '../../assets/Like-icon-full.svg';
import { ReactComponent as BookmarkFullIcon} from '../../assets/Bookmark-icon-full.svg';
import { CommentList } from '../../components/community';


const dump = {
    "writer": {
        "user_id": 0,
        "user_profile_image": "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg",
        "user_nickname": ""
    },
    "title": "",
    "content": "",
    "date": "",
    "likes": 0,
    "bookmarks": 0,
    "category": "",
    "post_id": 1,
    "is_writer": true,
    "image_url_list": [],
    "comment_cnt": 0,
    "is_like": false,
    "is_bookmark": false
};

interface PostDetailData {
    writer: {
        user_id: number;
        user_profile_image: string;
        user_nickname: string;
    };
    title: string,
    content: string,
    category: string,
    post_id: number,
    likes: number,
    bookmarks: number,
    image_url_list: any,
    comment_cnt: number,
    date: string,
    is_writer: boolean,
    is_like: boolean,
    is_bookmark: boolean,
}

const PostDetail = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [postData, setPostData] = useState<PostDetailData>(dump);
    const [postCategory, setPostCategory] = useState<string>();
    const [like, setLike] = useState<boolean>();
    const [bookmark, setBookmark] = useState<boolean>();

    const [modal, setModal] = useState<boolean>(false);
    const [imageSource, setImageSource] = useState<any>();

    const [myComment, setMyComment] = useState<string>('');

    if(localStorage.getItem("token") != ""){
        const ACCESS_TOKEN = localStorage.getItem("token");
        setHeader(ACCESS_TOKEN);
    }

    useEffect(() => {
        // 커뮤니티 글 상세 get API
        const getPost = async () => {
            await getApi(
                {},
                `/community/${params.id}`
            )
                .then(({ status, data }) => {
                    // console.log(status, data.body.data);
                    if (status === 200) {
                        setPostData(data.body.data);
                        setPostCategory(data.body.data.category);
                        setLike(data.body.data.is_like);
                        setBookmark(data.body.data.is_bookmark);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        getPost();

        // 좋아요, 북마크 상태 
        // setLike(postData.is_like);
        // setBookmark(postData.is_bookmark);

    }, [])

    useEffect(() => {
        // 카테고리명 영문 -> 한글
        switch(postData.category) {
            case 'popular':
                setPostCategory('인기');
                break;
            case 'meeting':
                setPostCategory('모임');
                break;
            case 'sharing':
                setPostCategory('나눔');
                break;
            case 'boasting':
                setPostCategory('자랑');
                break;
            default:
                setPostCategory('전체');
        }
    }, [postData])

    const onClickImage = (img: any) => {
        setImageSource(img);
        setModal(!modal);
    }
    
    const onClickImageModal = useCallback(() => {
        setModal(!modal);
    }, [modal]);

    // 좋아요, 북마크 생성/취소 API
    const clickCntHandler = async (what: string) => {
        // 아이콘 색깔 바로 변환
        if (what === 'like') {
            setLike(!like);
        } else {
            setBookmark(!bookmark);
        }

        if (what === 'like') {  // 좋아요일 경우
            if (!postData.is_like) {  // false -> 좋아요 생성
                await postApi(
                    {},
                    `/community/${params.id}/${what}`
                )
                .then(({ status, data }) => {
                    // console.log("POST 누름", status, data);
                    if (status === 200) {
                        window.location.reload();  // 새로 고침하여 좋아요 수 갱신
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
            } else { // true -> 좋아요 취소
                // console.log('좋아요 취소');
                await deleteApi(
                    {},
                    `/community/${params.id}/${what}`
                )
                .then(({ status, data }) => {
                    // console.log("DEL 취소", status, data);
                    if (status === 200) {
                        window.location.reload();  // 새로 고침하여 좋아요 수 갱신
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
            }
        } else {  // bookmark일 경우
            if (!postData.is_bookmark) {  // false -> 좋아요/북마크 생성
                await postApi(
                    {},
                    `/community/${params.id}/${what}`
                )
                .then(({ status, data }) => {
                    // console.log("POST 누름", status, data);
                    if (status === 200) {
                        window.location.reload();  // 새로 고침하여 북마크 수 갱신
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
            } else { // true -> 북마크 취소
                await deleteApi(
                    {},
                    `/community/${params.id}/${what}`
                )
                .then(({ status, data }) => {
                    // console.log("DEL 취소", status, data);
                    if (status === 200) {
                        window.location.reload();  // 새로 고침하여 북마크 수 갱신
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
            }
        }
    }

    const enterComment = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            // 댓글 입력 Post API
            // e.target.value
            await postApi(
                {
                    'comment': myComment
                },
                `/community/${postData.post_id}/comment`
            )
            .then(({ status, data }) => {
                    // console.log("댓글 작성 post api", status);
                if (status === 200) {
                    window.location.reload(); // 새로고침
                }
            })
            .catch((e) => {
                console.log(e);
            });
        }
    }

    const clickProfile = () => {  // 프로필 클릭 시 유저 마이페이지로 이동
        navigate(`/mypage/${postData.writer.user_id}`);
    }

    return (
        <>
        <Header />
        <Wrapper>
            <PostWrapper>
                <Post>
                    <UpperSection>
                        <div className='upper'>
                            <div className='category' style={{fontWeight: 'bold', fontSize: '18px', color: Colors.green5}}>
                                {postCategory}
                            </div>
                            <div style={{ fontWeight: 'bold', fontSize: '28px' }}>{postData.title}</div>
                            <div 
                                onClick={clickProfile}
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left', marginTop: '5px' }}
                                >
                                <img src={postData.writer.user_profile_image}
                                    style={{ width: '40px', height: '40px', borderRadius: '40px' }}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', marginLeft: '10px' }}>
                                    <div style={{ fontSize: '14px' }}>{postData.writer.user_nickname}</div>
                                    <div className='date' style={{fontSize: '12px', color: Colors.gray1}}>{postData.date}</div>
                                </div>
                            </div>
                        </div>
                    </UpperSection>
                    <hr
                        style={{
                            color: `${Colors.gray1}`,
                            height: 1,
                            width: '100%'
                        }}
                    />
                    <div className='content' style={{fontSize: '20px', marginRight: 'auto', textAlign: 'left', padding: '0 10px'}}>{postData.content}</div>
                    <ImageSection>
                    {
                        postData.image_url_list &&
                        postData.image_url_list.map((img: string, i: number) => (
                            <img src={img} key={i}
                                onClick={() => onClickImage(img)}
                            />
                        ))
                    }
                    </ImageSection>
                    <hr
                        style={{
                            color: `${Colors.gray1}`,
                            height: 1,
                            width: '100%'
                        }}
                    />
                    <div className='cnts'>
                        <div className='cnt'
                        onClick={() => clickCntHandler('like')}>
                            {like ? (
                                <LikeFullIcon className='cnt-icon' />
                            ) : (
                                <LikeIcon className='cnt-icon' />
                            )}
                            {postData.likes}
                        </div>
                        <div className='cnt'
                            onClick={() => clickCntHandler('bookmark')}>
                            {bookmark ? (
                                <BookmarkFullIcon className='cnt-icon' />
                            ) : (
                                <BookmarkIcon className='cnt-icon' />
                            )}
                            {postData.bookmarks}
                        </div>
                    </div>
                    <Comments>
                        <div style={{fontSize: '18px', fontWeight: 'bold'}}>댓글 {postData.comment_cnt} &gt;</div>
                        <hr
                            style={{
                                color: `${Colors.gray1}`,
                                height: 1,
                                width: '100%'
                            }}
                        />
                        <CommentList />
                        {/* <MyComment /> */}
                        <textarea
                            placeholder='댓글을 입력하시개'
                            onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>,
                            ): void => setMyComment(e.target.value)}
                            value={myComment}
                            onKeyPress={(e) => enterComment(e)}
                            style={{resize: 'none', width: '100%', fontSize: '16px'}}
                        ></textarea>
                    </Comments>
                </Post>
            </PostWrapper>
            <Link to='/all' style={{textDecoration: 'none'}}>
                <div className='back-list' style={{marginBottom: '20px', fontWeight: 'bold', fontSize: '18px'}}>&lt; {postCategory}글 목록 보기</div>
            </Link>

            {modal && <ImageModal imgSrc={imageSource} onClickImageModal={onClickImageModal} />}
        </Wrapper>
        </>
    );
};

export default PostDetail;

const Wrapper = styled.div`
    margin: 0 80px;

    .back-list {
        text-align: left;
        color: ${Colors.black}
    }
`

const PostWrapper = styled.div`
    background-color: ${Colors.white};
    margin: 20px 0;
    box-shadow: 0px 4px 33px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
`

const Post = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 30px;

    img {
        width: 400px;
        height: 400px;
        margin: 0 10px;
    }

    .cnts {
        display: flex;
        flex-direction: row;
        margin-right: auto;
        cursor: pointer;
    }

    .cnt {
        margin: 0 8px;
        display: flex;
        flex-direction: row;
    }

    .cnt-icon {
        padding: 0 5px;
    }
`

const ImageSection = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    
    overflow-x: scroll;
    overflow-y: hidden;
    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.4);
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 6px;
    }
`

const UpperSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
    width: 100%;
    margin-bottom: 10px;

    .upper {
        display: flex;
        flex-direction: column;
        text-align: left;
    }
`

const Comments = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: auto;
    margin-top: 20px;
    width: 100%;
    text-align: left;
`