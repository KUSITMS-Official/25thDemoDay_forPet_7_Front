import React, { useEffect, useState } from "react";
import styled from '@emotion/styled';
import { Colors } from '../../styles/ui';
import { getApi } from '../../api';
import  OfflineMapListItem from './OfflineMapListItem';
import OfflineMapCategory from "./OfflineMapCategory";
import BtnSearch from "../../assets/offlineMap/btn_search.svg";

const OfflineMapList = () => {
    const [mapList, setMapList] = useState([]);
    const [mapAllList, setMapAllList] = useState([])
    const [searchPlace, setsearchPlace] = useState<string>();  
    const [activeCat, setActiveCat] = useState('전체보기');

    // map 좌표 불러오기
    useEffect(() => {
        const getMapList =  () => {
             getApi(
                {}, `/offline-map`)
                .then(({ status, data }) => {
                    // console.log(`GET 글 내용`, status, data);
                    if (status === 200) {
                        setMapList(data.body.data.placeInfo);
                        setMapAllList(data.body.data.placeInfo);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        getMapList();
      }, []);

    //주변 반려견 장소 검색
    const enterSearchPlace = async (e: any) => {
            await getApi(
                {},
                `/offline-map/search?keyword=${searchPlace}`
            )
                .then(({ status, data }) => {
                    // console.log("search 결과", status, data);
                    if (data) {
                        setMapList(data.body.data);
                    } else {
                        setMapList([]);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
    }

    useEffect(() => {
        activeCat === '전체보기'
          ? setMapList(mapAllList)
          : 
            getApi(
                {},
                `/offline-map/category?category=${activeCat}`
            )
                .then(({ status, data }) => {
                    // console.log("search 결과", status, data);
                    if (data) {
                        setMapList(data.body.data);
                    } else {
                        setMapList([]);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });

      }, [activeCat]);

    return(
        <ListBox>
            {/*제목*/}
            <Title>
                <span className='main-title'>forPet map</span>
                <span className='sub-titile'>&nbsp;|오프라인</span>
            </Title>

            {/*검색*/}
            <Section>
                <span className='title'>검색</span>
                <input
                    className='searchbar'
                    placeholder='내 주변 반려견 장소'
                        onChange={(
                            e: React.ChangeEvent<HTMLInputElement>,
                        ): void => setsearchPlace(e.target.value)}
                        value={searchPlace}
                ></input>
                <img className='btn_search' src={BtnSearch} onClick={enterSearchPlace} />   
            </Section>

            {/*주변*/}
            <Section>
                <span className='title'>주변</span>
                {mapList.map((item, index) => (
                    <OfflineMapListItem key={index} item={item} />
                ))}
            </Section>

            <Category>
                <OfflineMapCategory name='전체보기' url='전체보기' activeCat={activeCat === '전체보기' ? true : false} handleSetCat={setActiveCat}/>
                <OfflineMapCategory name='식당카페' url='식당%26카페' activeCat={activeCat === '식당%26카페' ? true : false} handleSetCat={setActiveCat}/>
                <OfflineMapCategory name='공원' url='공원' activeCat={activeCat === '공원' ? true : false} handleSetCat={setActiveCat}/>
                <OfflineMapCategory name='병원약국' url='병원%26약국' activeCat={activeCat === '병원%26약국' ? true : false} handleSetCat={setActiveCat}/>
                <OfflineMapCategory name='미용' url='미용' activeCat={activeCat === '미용' ? true : false} handleSetCat={setActiveCat}/>
                <OfflineMapCategory name='보호소' url='보호소' activeCat={activeCat === '보호소' ? true : false} handleSetCat={setActiveCat}/>
                <OfflineMapCategory name='유치원' url='유치원' activeCat={activeCat === '유치원' ? true : false} handleSetCat={setActiveCat}/>
            </Category>
        </ListBox>
    );

};

export default OfflineMapList;

const ListBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;

    width: 27%;
    height: calc(100vh - 89px);
    padding: 17px 3.5% 0px 3.5%;
    background-color: ${Colors.green1};

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

const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: flex-start;

    .main-title {
        font-family: 'Baloo';
        font-weight: 400;
        font-size: 28px;
        color: ${Colors.black};
    }

    .sub-titile {
        font-family: 'NotoSans';
        font-weight: 400;
        font-size: 17px;
        color: ${Colors.gray2};
    }

`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;

    margin-top: 19px;

    .title{
        font-family: 'NotoSans';
        font-weight: 700;
        font-size: 17px;
        color: ${Colors.black};
    }

    .searchbar{
        margin-top: 16px;
        padding: 7px 19px;
        box-sizing: border-box;
        border: 3px solid #4F6D47;
        box-sizing: border-box;
        border-radius: 25.5px;

        background: #FFFFFF;

        font-family: 'NotoSans';
        font-weight: 400;
        font-size: 17px;
    }

    .btn_search{
        position: relative;
        top: -33px;
        left: 342px;
        width: 21px;
        height: 21px;

        cursor:pointer; 
    }
`;

const Category = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 68%;

    position: absolute;
    top: 89px;
    left: 32%;
    z-index: 1;

    cursor:pointer; 
`;