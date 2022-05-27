import { useState, useCallback } from "react";
import styled from '@emotion/styled';
import { Colors } from '../../styles/ui';
import OfflineMapInfo from "./OfflineMapInfo";
import { ReactComponent as BookmarkAct } from "../../assets/offlineMap/bookmark_act.svg"
import { ReactComponent as BookmarkDeact } from "../../assets/offlineMap/bookmark_deact.svg"
import { ReactComponent as StarAvg } from "../../assets/offlineMap/StarAvg.svg"
import BtnClose from "../../assets/offlineMap/btn_close.svg"

interface Props {
    item: any;
  }

const OfflineMapListItem = ({ item }: Props) => {

    const [bookmark, setBookmark] = useState<boolean>(false);
    const [infoView, setInfoView] = useState<boolean>(false);   //TODO: Info 컴포넌트 겹치는 문제 해결

    const toggleBookmark = () => setBookmark(bookmark => !bookmark);

    return(
        <ItemBox>

            {/*장소 이름, 카테고리*/}
            <Section >
                <div className="text" onClick={()=>{setInfoView(true)}} style={{cursor: 'pointer'}}>
                <span style={{fontSize: '17px'}}>{item.name}</span>
                <span style={{fontSize: '11px', marginLeft: '8px', color: '${Colors.gray2}'}}>{item.category}</span>
                <br /><span style={{fontSize: '11px', color: '${Colors.gray2}'}}>{item.address}</span>
                </div>
                <div className='bookmark' style={{cursor: 'pointer'}}>
                {bookmark ? 
                    <BookmarkAct onClick={toggleBookmark}/> 
                    : <BookmarkDeact onClick={toggleBookmark}/> }
                </div>
            </Section>

            {/*장소 리뷰 정보*/}
            <Section onClick={()=>{setInfoView(true)}}>
                <StarAvg />
                <span style={{fontSize: '14px', marginLeft: '8px'}}>{item.star}/5</span>
                <span style={{fontSize: '11px'}}>&nbsp;리뷰 {item.reviewCnt}</span>
            </Section>

            {/*리뷰 정보 팝업*/}
            {infoView 
                && ( <>
                <OfflineMapInfo item={item} />
                <Close onClick={()=>{setInfoView(false)}} style={{cursor: 'pointer'}}> <img src={BtnClose}/> </Close>
                </> )}
        </ItemBox>
    );
};

export default OfflineMapListItem;

const ItemBox = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 16px;    
`;

const Section = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    margin-top: 8px;

    font-family: 'NotoSans';
    font-weight: 500;
    color: ${Colors.black};

    .text {
        float: left;
        width: 90%;
    }

    .bookmark{
        float: right;
        width: 10%;
    }
`;

const Close = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 175px;
    left: 59.1%;
    z-index: 1;

    width: 70px;
    height: 70px;
    background-color: ${Colors.white};
    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.25);
    border-radius: 0px 5px 5px 0px;
`;