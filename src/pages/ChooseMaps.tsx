import styled from '@emotion/styled';
import { Colors } from '../styles/ui';
import { Link } from "react-router-dom";
import { setHeader } from "../api";
import { Header } from "../components";

import { ReactComponent as OfflineMap } from '../assets/Choose-offlinemap.svg';
import { ReactComponent as OnlineMap } from '../assets/Choose-onlinemap.svg';

const ChooseMaps = () => {

    if(localStorage.getItem("token") != ""){
        const ACCESS_TOKEN = localStorage.getItem("token");
        setHeader(ACCESS_TOKEN);
    }


    return (
        <>
        <Header />
        <ChooseMapsWrapper>

            <div className='map'>
                <Link to="/offlinemap" style={{ textDecoration: 'none' }}>
                    <OfflineMap className='map-img' />
                    <div className='map-text'>오프라인 지도</div>
                </Link>
            </div>

            <div className='map'>
                <Link to="/onlinemap" style={{ textDecoration: 'none' }}>
                    <OnlineMap className='map-img' />
                    <div className='map-text'>온라인 지도</div>
                </Link>
            </div>

        </ChooseMapsWrapper>
        </>
    )
}

export default ChooseMaps;

const ChooseMapsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: auto;
    background-color: ${Colors.green1};

    .map {
        width: 500px;
        height: 500px;
        margin: 100px 40px;
        background-color: ${Colors.white};
        box-shadow: 0px 4px 53px rgba(0, 0, 0, 0.25);
        border-radius: 38px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .map-img {
        width: 300px;
        height: 300px;
    }

    .map-text {
        font-size: 28px;
        margin-top: 20px;
        font-weight: bold;
        color: ${Colors.black};
    }
`

