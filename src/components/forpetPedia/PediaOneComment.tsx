import styled from '@emotion/styled';
import { Colors } from '../../styles/ui';
import { postApi } from '../../api';
import { ReactComponent as LikeIcon } from '../../assets/Like-icon.svg';

const PediaOneComment = ({ comment }: any) => {
    // 댓글좋아요 Post API
    const clickCommentCnt = async (commentId: number) => {
        await postApi(
            {},
            `/qnaBoard/comment/${commentId}/like`
        )
            .then(({ status, data }) => {
                // console.log("POST 댓글좋아요 누름", status, data);
                if (status === 200) {
                    window.location.reload();
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <Answer>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width:'80px', justifyContent: 'center'}}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={comment.imageUrl}
                        style={{ width: '30px', height: '30px', borderRadius: '20px' }} />
                    <div style={{ fontSize: '12px', color: Colors.green5 }}>{comment.tag}</div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }} className='writer'>{comment.nickName}</div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', marginLeft: '5px', marginRight: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '30px', alignItems: 'center' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '20px', color: Colors.green5, marginRight: '5px' }}>A.</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{comment.comment}</div>
                    </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{ fontSize: '12px', color: Colors.gray1, marginLeft: '30px' }}>{comment.createDate}</div>
                    <div
                        style={{ marginLeft: '20px' }}
                        onClick={() => clickCommentCnt(comment.id)}>
                        <LikeIcon style={{ width: '18px', height: '18px', marginRight: '5px', cursor: 'pointer' }} />
                        {comment.likes}
                    </div>
                </div>
            </div>
        </Answer>
    )
}

export default PediaOneComment;

const Answer = styled.div`
    display: flex;
    flex-direction: row;
    text-align: left;
    margin: 10px 0;
    justify-content: left;
`