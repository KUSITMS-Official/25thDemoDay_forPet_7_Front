import styled from '@emotion/styled';
import { Colors } from '../styles/ui';
import { setHeader } from "../api";
import { Header } from "../components";
import { ReactComponent as OfflineMap } from '../assets/Home-offlinemap.svg';
import OnlineMapImg from '../assets/Home-onlinemap.png';
import { ReactComponent as MapBackground } from '../assets/Home-background.svg';
import { ReactComponent as RightBubble } from '../assets/Home-RightBubble.svg';
import { ReactComponent as LeftBubble } from '../assets/Home-LeftBubble.svg';
import { ReactComponent as SectionBg } from '../assets/Home-section.svg';


const Home = () => {

    if(localStorage.getItem("token") != ""){
        const ACCESS_TOKEN = localStorage.getItem("token");
        setHeader(ACCESS_TOKEN);
    }

    const logout = () => {
        localStorage.setItem("token", "");
        window.location.reload();
    }

    return (
        <>
        <Header />
        <Wrapper>
            <HomeBanner>
                <p className='subtitle' onClick={logout}
                    style={{ fontSize: '36px', textAlign: 'left', marginLeft: '70px' }}>
                    당신의 반려견을 위한 <br />완벽한 지도
                </p>
            </HomeBanner>
            <div style={{ height: '800px' }}>
                <MapBackground style={{ width: '100vw', position: 'relative' }} />
                <HomeMaps>
                    <div className='home-map'>
                        <OfflineMap style={{ width: '300px', height: '300px' }} />
                        <div>
                            <p className='title'>오프라인 지도</p>
                            <p className='subtitle'>
                                내 근처에서<br />
                                반려견을 위한 공간을 찾아보세요!
                            </p>
                            <p className='intro'>식당&#38;카페, 공원, 병원, 미용, 병원, 보호소, 유치원</p>
                        </div>
                    </div>

                    <div className='home-map'>
                        <img src={OnlineMapImg} style={{ width: '300px', height: '300px' }} />
                        <div>
                            <p className='title'>온라인 지도</p>
                            <p className='subtitle'>
                                반려생활에 꼭 필요한 플랫폼을<br />
                                보기 쉽게 모아봤어요!
                            </p>
                            <p className='intro'>건강하개, 영양있개, 쇼핑하개, 지식쌓개, 특별하개, 봉사하개, 입양하개</p>
                        </div>
                    </div>
                </HomeMaps>
            </div>
            <div>
                <SectionBg style={{ backgroundColor: Colors.white, width: '100vw', paddingTop: '50px', position: 'relative' }} />
                <LowComment>
                    <div className='commuity'>
                        <p style={{ zIndex: 200, fontWeight: 'bold', fontSize: '28px', top: '10px' }}>
                            우리 동네 커뮤니티
                        </p>
                        <p style={{ zIndex: 200, fontSize: '22px', top: '70px' }}>
                            동네 사람들과 같이 산책, 나눔, 강아지 자랑 할 수 있어요!
                        </p>
                        <LeftBubble className='right-bubble' style={{ zIndex: 100 }} />
                    </div>
                    <div className='forpet'>
                        <p style={{ zIndex: 200, fontWeight: 'bold', fontSize: '28px', top: '10px' }}>
                            퍼펫트 백과
                        </p>
                        <p style={{ zIndex: 200, fontSize: '22px', top: '70px' }}>
                            반려인부터 예비 반려인까지 자유롭게 Q&#38;A 를 공유할 수 있어요!
                        </p>
                        <RightBubble className='left-bubble' style={{ zIndex: 100 }} />
                    </div>
                </LowComment>
            </div>
        </Wrapper>
        </>
    );
};

export default Home;

const Wrapper = styled.div`
    overflow-x: hidden;
`;

const HomeBanner = styled.div`
    background-color: ${Colors.white};
    padding: 60px 0;
`;

const HomeMaps = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    
    position: absolute;
    transform: translate(-50%, 0);
    top: 600px;
    left: 55%;
    
    .home-map {
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        width: 30vw;
    }

    .title {
        font-size: 28px;
        font-weight: bold;
        text-align: left;
    }

    .subtitle { 
        font-size: 24px;
        text-align: left;
    }
    
    .intro {
        font-size: 16px;
        color: ${Colors.gray1};
        text-align: left;
    }

`;

const LowComment = styled.div`
    position: absolute;
    top: 1360px;

    .right-bubble {
        position: absolute;
        top: 0;
    }

    .left-bubble {
        position: absolute;
        top: 0;
    }

    .commuity {
        position: absolute;
        left: 36vw;
    }
    
    .forpet {
        position: absolute;
        top: 450px;
        left: 5vw;
    }

    p {
        position: absolute;
        width: 800px;
    }
`