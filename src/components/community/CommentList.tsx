import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Colors } from '../../styles/ui';
import { getApi } from '../../api';
import { useParams, useNavigate } from "react-router-dom";

interface Comment {
    parentId: any,
    commentId: number,
    content: string,
    username: string, 
    userId: number,
    profileImage: string,
    createDate: string,
    children: any
}

const CommentList = () => {
    const params = useParams();
    let postId = params.id;
    const navigate = useNavigate();

    const [comments, setComments] = useState<Comment[]>();

    useEffect(() => {
        const getComments = async () => {
            await getApi(
                {},
                `/community/${postId}/comment`
            )
                .then(({ status, data }) => {
                    // console.log(status, data);
                    if (status === 200) {
                        setComments(data.body.data.comments);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        getComments();
    }, [])

    const clickProfile = (userId: number) => {
        navigate(`/mypage/${userId}`);
    }

    const Comment = ({ comment, pp }: any) => {
        return (
            <div className={pp}
                style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                <img src={comment.profileImage}
                    style={{ width: '30px', height: '30px', borderRadius: '20px', cursor: 'pointer' }}
                    onClick={() => clickProfile(comment.userId)} />
                <div>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{comment.username}</div>
                    <div>{comment.content}</div>
                    <div style={{ display: 'flex', flexDirection: 'row', color: Colors.gray2, fontSize: '14px' }}>
                        <div>{comment.createDate}</div>
                        <div style={{ margin: '0 8px' }}>답글쓰기</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {
                comments &&
                comments.map((comment, i) => (
                    <Wrapper>
                        <Comment comment={comment} key={i} pp='parent' className='parent' />
                        {
                            comment.children &&
                            comment.children.map((child: any, i: number) => (
                                <Comment comment={child} key={i} pp='child' className='child' />
                            ))
                        }
                        <></>
                    </Wrapper>
                ))
            }
        </>
    )
}

export default CommentList;

const Wrapper = styled.div`
    .child {
        margin-left: 50px;
    }
`

