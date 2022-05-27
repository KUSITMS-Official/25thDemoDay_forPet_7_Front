import { useState, useEffect } from "react";
import styled from '@emotion/styled';
import { Colors } from '../../styles/ui';
import { getApi } from '../../api';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as StarAvg } from "../../assets/offlineMap/StarAvg.svg"

interface Props {
    item: any;
}

const OfflineMapInfo = ({ item }: Props) => {
    const [placeId, setPlaceId] = useState<Number>(item.id);
    const [reviewList, setReviewList] = useState<any[]>([]);

    const navigate = useNavigate();

    //리뷰 정보 불러오기
    useEffect(() => {
        const getReview =  async () => {
            await getApi(
                {}, `/offline-map/${placeId}/marker/review`)
                .then(({ status, data }) => {
                    // console.log(`GET 리뷰 내용`, status, data);
                    if (status === 200) {
                        setReviewList(data.body.data);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        getReview();
      }, []);

      const reviewWrite = () => {
        navigate('/reviewWrite', { state: item });
      }

    return(
        <Section>
            {/*업체 정보, 별점, 리뷰 개수*/}
            <Store>
                <div style={{flexDirection: 'row'}}>
                    <span className='storeName'>{item.name}</span>
                    <span className='storeCategory'>{item.category}</span>
                </div>
                <div className='storeReview' style={{flexDirection: 'row', marginTop: '5px'}}>
                    <StarAvg />
                    <span>&nbsp;{item.star}/5</span>
                    <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                    <span>리뷰 {item.reviewCnt}</span>
                </div>
            </Store>

            <Border/>

            {/*사용자 리뷰*/}
            {reviewList.map((reviewItem, index) => (
                <Review>
                    <div>
                    <div className='user' style={{float: 'left', width: '82%'}}>
                        <img src={reviewItem.profileImageUrl} width={27} height={27} style={{ borderRadius: '14px' }}/>
                        <span className='reviewNickName' style={{marginLeft: '6px'}}>{reviewItem.nickName}</span>
                    </div>
                    {index == 0 ? 
                    <div className='reviewBtn' onClick={reviewWrite} style={{float: 'right', width: '18%', cursor: 'pointer'}}> 리뷰 등록</div>
                    : 
                    <></> }
                    </div>
                    
                    <div>
                        {
                        reviewItem.imageUrlList&&
                        reviewItem.imageUrlList.map((imageUrl: string, i: number) => (
                            <img src={imageUrl} style={{ width:'99.5%', marginTop: '12px'}} />
                        ))}
                    </div>
                    
                    <div style={{margin: '8px 5px 0px 5px'}}>
                        <span>{reviewItem.content}</span>
                        <div className='reviewDate'>{reviewItem.createDate}</div>
                    </div>
                    <ReviewBorder />
                </Review>
            ))}
        </Section>
    );
};

export default OfflineMapInfo;

const Section = styled.div`
position: absolute;
    top: 70px;
    left: 32.1%;
    z-index: 2;

    width: 27%;
    height: calc(100vh - 70px);
    background-color: ${Colors.white};
  
    overflow-x: hidden;
    overflow-y: scroll;
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
`;

const Store = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-family: 'NotoSans';
    font-weight: 500;
    color: ${Colors.black};

    .storeName{
        font-size: 25px;
    }

    .storeCategory{
        font-size: 11px;
        color: ${Colors.gray2};
    }

    .storeReview{
        font-size: 14px;
    }
`;

const Border = styled.div`
    width: 100%;
    height: 2px;
    margin-top: 15px;
    background: rgba(79, 109, 71, 0.3); 
`;

const ReviewBorder = styled.div`
    width: 100%;
    height: 0.5px;
    margin-top: 15px;
    background: rgba(79, 109, 71, 0.2); 
`;

const Review = styled.div`
    display: flex;
    flex-direction: column;

    padding: 21px 19px 0px 19px;

    font-family: 'NotoSans';
    font-weight: 400;
    font-size: 14px;
    color: ${Colors.black};

    .reviewBtn{
        display: flex;
        align-items: center;
        justify-content: center;

        width: 69px;
        height: 26px;

        background: ${Colors.green3};
        border-radius: 16.5px;

        font-weight: 700;
        font-size: 11px;
        color: ${Colors.white};
    }
    .user{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .reviewNickName{
        font-weight: 500;
    }
    .reviewDate{
        font-size: 10px;
    color: ${Colors.gray2};
    }
`;