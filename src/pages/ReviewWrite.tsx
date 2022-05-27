import { useLocation } from "react-router-dom";
import styled from '@emotion/styled';
import { Colors } from '../styles/ui';
import { setHeader } from "../api";
import { Header } from "../components";

import { ReactComponent as StarAvg } from "../assets/offlineMap/StarAvg.svg"

interface Props {
    state: {
        address: string,
        category: string,
        id: number,
        latitude: number,
        longitude: number,
        name: string,
        reviewCnt: number,
        star: number
    };
}

const ReviewWrite = () => {

    if(localStorage.getItem("token") != ""){
        const ACCESS_TOKEN = localStorage.getItem("token");
        setHeader(ACCESS_TOKEN);
    }

    const location = useLocation() as Props;
    
    return (
        <>
        <Header />
        <div style={{height: 'calc(100vh - 70px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
            <Section>
            <Store>
                <div style={{float: 'left', width: '90%'}}>
                    <span className='storeName' style={{float: 'left'}}>{location.state.name}</span>
                    <span className='storeCategory' style={{float: 'left'}}>{location.state.category}</span>
                </div>
                <div className='storeReview' style={{float: 'right', width: '10%'}}>
                    <StarAvg style={{float: 'left'}}/>
                    <span style={{float: 'left'}}>&nbsp;{location.state.star}/5</span>
                    <span style={{float: 'left'}}>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                    <span style={{float: 'left'}}>리뷰 {location.state.reviewCnt}</span>
                </div>
            </Store>
        

            
            </Section>
        </div>
        </>
    );
};

export default ReviewWrite;

const Section = styled.div`
    display: flex;
    flex-direction: column;

    width: 75vw;
    height: calc(96vh - 112px);

    padding: 42px 144px 0px 144px;

    background: ${Colors.white};
`;

const Store = styled.div`
    display: flex;
    flex-direction: row;
    
    font-family: 'NotoSans';
    font-weight: 500;
    color: ${Colors.black};

    .storeName{
        font-size: 25px;
    }

    .storeCategory{
        margin-left: 8px;
        font-size: 11px;
        color: ${Colors.gray2};
    }

    .storeReview{
        font-size: 14px;
    }
`;