import { useState } from 'react';
import styled from '@emotion/styled';
import { Colors } from '../styles/ui';
import { motion, AnimatePresence } from "framer-motion";
import { OnlineMapList } from '../components';
import { setHeader } from "../api";
import { Header } from "../components";

import { ReactComponent as Tree1 } from '../assets/onlineMap/Map-tree1.svg';
import { ReactComponent as Tree2 } from '../assets/onlineMap/Map-tree2.svg';
import { ReactComponent as MapOnlyInitial } from '../assets/onlineMap/Map-only-initial.svg';
import MapHealth from '../assets/onlineMap/Map-health.svg';
import MapYoung from '../assets/onlineMap/Map-young.svg';
import MapShop from '../assets/onlineMap/Map-shop.svg';
import MapSpecial from '../assets/onlineMap/Map-special.svg';
import MapKnowledge from '../assets/onlineMap/Map-knowledge.svg';
import MapAdopt from '../assets/onlineMap/Map-adopt.svg';
import MapVolunteer from '../assets/onlineMap/Map-volunteer.svg';

{/* health, young, shop, special, knowledge, volunteer, adopt */ }

const OnlineMap = () => {
    const [moveUnit, setMoveUnit] = useState(0);
    const [town, setTown] = useState(''); // 반려인 마을, 예비 반려인 마을

    if(localStorage.getItem("token") != ""){
        const ACCESS_TOKEN = localStorage.getItem("token");
        setHeader(ACCESS_TOKEN);
    }


    const clickTown = (t: string) => {
        setTown(t);
        if (t === '봉사하개' || t === '입양하개') {
            setMoveUnit(-100);
        } else {
            setMoveUnit(200);
        }
    }

    const mapVariants = {
        start: ({
            x: 0,
        }),
        end: ({
            x: town ? moveUnit : 0,
        }),
    }

    return (
        <>
        <Header />
        <PageWrapper>
            <MapUpper>
                <div style={{ fontSize: '30px' }}>forPet map</div>
                <div style={{ fontSize: '20px', color: Colors.gray1 }}>| 온라인</div>
                <div>{town}</div>
            </MapUpper>
            {town && <OnlineMapList pick={town}/>}
            <AnimatePresence>
                <div className="map-parents">
                    {!town && <MapOnlyInitial className='map-only-initial' style={{width: '90vw'}} />}
                    {
                        (town === '건강하개') && 
                        <MapMotion
                            variants={mapVariants}
                            src={MapHealth}
                            initial='start'
                            animate='end'
                        />
                    }
                    {
                        (town === '영양있개') && 
                        <MapMotion
                            variants={mapVariants}
                            src={MapYoung}
                            initial='start'
                            animate='end'
                        />
                    }
                    {
                        (town === '지식쌓개') && 
                        <MapMotion
                            variants={mapVariants}
                            src={MapKnowledge}
                            initial='start'
                            animate='end'
                        />
                    }
                    {
                        (town === '쇼핑하개') && 
                        <MapMotion
                            variants={mapVariants}
                            src={MapShop}
                            initial='start'
                            animate='end'
                        />
                    }
                    {
                        (town === '특별하개') && 
                        <MapMotion
                            variants={mapVariants}
                            src={MapSpecial}
                            initial='start'
                            animate='end'
                        />
                    }
                    {
                        (town === '입양하개') && 
                        <MapMotion
                            variants={mapVariants}
                            src={MapVolunteer}
                            initial='start'
                            animate='end'
                        />
                    }
                    {
                        (town === '봉사하개') && 
                        <MapMotion
                            variants={mapVariants}
                            src={MapAdopt}
                            initial='start'
                            animate='end'
                        />
                    }
                    <NameTag id='health'
                        whileHover={{ scale: 1.2 }}
                        animate={{ x: town ? moveUnit : 0}}
                        onClick={() => clickTown('건강하개')}
                        style={{top: '72%', left: '20%', cursor: 'pointer'}}>
                        건강하개
                    </NameTag>
                    <NameTag id='young'
                        whileHover={{ scale: 1.2 }}
                        animate={{ x: town ? moveUnit : 0}}
                        onClick={() => clickTown('영양있개')}
                        style={{top: '40%', left: '38%', cursor: 'pointer'}}>
                        영양있개
                    </NameTag>
                    <NameTag id='special'
                        whileHover={{ scale: 1.2 }}
                        animate={{ x: town ? moveUnit : 0}}
                        onClick={() => clickTown('특별하개')}
                        style={{top: '85%', left: '53%', cursor: 'pointer'}}>
                        특별하개
                    </NameTag>
                    <NameTag id='shop'
                        whileHover={{ scale: 1.2 }}
                        animate={{ x: town ? moveUnit : 0}}
                        onClick={() => clickTown('쇼핑하개')}
                        style={{top: '64%', left: '46%', cursor: 'pointer'}}>
                        쇼핑하개
                    </NameTag>
                    <NameTag id='knowledge'
                        whileHover={{ scale: 1.2 }}
                        animate={{ x: town ? moveUnit : 0}}
                        onClick={() => clickTown('지식쌓개')}
                        style={{top: '86%', left: '35%', cursor: 'pointer'}}>
                        지식쌓개
                    </NameTag>
                    <NameTag id='adopt'
                        whileHover={{ scale: 1.2 }}
                        animate={{ x: town ? moveUnit : 0}}
                        onClick={() => clickTown('입양하개')}
                        style={{cursor: 'pointer'}}>
                        입양하개
                    </NameTag>
                    <NameTag id='volunteer'
                        whileHover={{ scale: 1.2 }}
                        animate={{ x: town ? moveUnit : 0}}
                        onClick={() => clickTown('봉사하개')}
                        style={{cursor: 'pointer'}}>
                        봉사하개
                    </NameTag>
                </div>
                <Trees>
                    {!town && <Tree1 className='tree1'/>}
                    {!town && <Tree2 className='tree2'/>}
                </Trees>
            </AnimatePresence>
        </PageWrapper>
        </>
    );
};

export default OnlineMap;

const PageWrapper = styled.div`
    background-color: ${Colors.green1};
    height: 110vh;

    .map-parents {
        position: absolute;
        transform: translate(-50%, -50%);
        top: 70%;
        left: 50%;
    }

    #volunteer {
        background-color: ${Colors.white};
        color: ${Colors.black};
        top: 86%;
        right: 22%;
    }

    #adopt {
        background-color: ${Colors.white};
        color: ${Colors.black};
        top: 44%;
        left: 62%;
    }
`

const MapUpper = styled.div`
    display: flex;
    flex-direction: row;
    text-align: left;
    align-items: end;
    padding: 30px 0 30px 50px;
`

const NameTag = styled(motion.div)`
    background-color: ${Colors.black};
    color: #fff;
    width: 90px;
    height: 30px;
    font-weight: bold;
    box-shadow: 15px -6px 0px #444444;

    display: flex;
    align-items: center;
    justify-content: center;
    
    position: absolute;
    transform: translate(-50%, -50%);
    border-radius: 15px;
`

const MapMotion = styled(motion.img)`
    width: 63vw;
`

const Trees = styled.div`
    .tree1 {
        width: 15vw;
        position: absolute;
        bottom: 1%;
        left: 3%;
    }
    .tree2 {
        width: 15vw;
        position: absolute;
        bottom: 1%;
        right: 3%;
    }
`