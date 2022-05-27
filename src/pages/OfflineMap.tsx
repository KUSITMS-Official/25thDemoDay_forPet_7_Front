import { useEffect, useState } from "react";
import styled from '@emotion/styled';
import OfflineList from '../components/offlineMap/OfflineMapList';
import { getApi, setHeader } from "../api";
import { Header } from "../components";

import Marker from "../assets/offlineMap/marker.png";

  const OfflineMap = () => {

    var markers: any [] = [];  // 마커 객체 배열
    var infowindows: any [] = [];  // 정보창 객체 배열

    const [mapList, setMapList] = useState([]);
    const [myLocation, setMyLocation] = useState< { latitude: number; longitude: number } | string >("");

    if(localStorage.getItem("token") != ""){
        const ACCESS_TOKEN = localStorage.getItem("token");
        setHeader(ACCESS_TOKEN);
    }

    // 현재 사용자 위치 추척, map 좌표 불러오기
    useEffect(() => {
      const getMyLocation = async () => {
         if (navigator.geolocation) {
          await navigator.geolocation.getCurrentPosition((position) => {
            setMyLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          });
        } else {
          window.alert("현재 위치를 알수 없습니다.");
        }
      }
      const getMapList = async () => {
        await getApi(
           {}, `/offline-map`)
           .then(({ status, data }) => {
              //  console.log(`GET 글 내용`, status, data);
               if (status === 200) {
                   setMapList(data.body.data.placeInfo);
               }
           })
           .catch((e) => {
               console.log(e);
           });
          }
          getMyLocation();
          getMapList();
      }, []);

      //지도 위 마커 표시
      useEffect(() => {
        if (typeof myLocation !== "string") {
          const currentPosition = [myLocation.latitude, myLocation.longitude];
    
          //지도 옵션 지정
          const map = new naver.maps.Map("map", {
            center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
            logoControl: true,
            logoControlOptions: {
                position: naver.maps.Position.LEFT_BOTTOM
            },
            scaleControl: true,
            scaleControlOptions: {
                position: naver.maps.Position.RIGHT_BOTTOM
            },
            zoomControl: true,
            zoomControlOptions: {
                style: naver.maps.ZoomControlStyle.SMALL,
                position: naver.maps.Position.RIGHT_BOTTOM
            },
            mapDataControl: false,
            mapTypeControl: false
          });
    
          //현재 사용자 위치 마크
          new naver.maps.Marker({
            position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
            map: map,
            icon: {
              url: Marker
            },
          });
    
          new naver.maps.Marker({
            position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
            map: map,
            icon: {
              content: [`<span>현재 나의 위치</span>`].join(""),
              anchor: new naver.maps.Point(50, 60)
            },
          });

          mapList.map(function(place: any) {
            new naver.maps.Marker({
              position: new naver.maps.LatLng(Number(place.latitude), Number(place.longitude)),
              map: map,
              icon: {
                url: Marker
              },
            });
              
            new naver.maps.Marker({
              position: new naver.maps.LatLng(Number(place.latitude), Number(place.longitude)),
              map: map,
              icon: {
                content: [`<span></span>`].join(""),
                anchor: new naver.maps.Point(50, 60)
              },
            });
        });
        }
    }, [mapList]);

    //지도 크기 설정
    const mapStyle = {
        width: "73%",
        height: "calc(100vh - 70px)",
    };

    return (
      <>
        <Header />
        <Offline>
            <OfflineList  />
            <div id="map" style={mapStyle}></div>
        </Offline>
        </>
    );
};

export default OfflineMap;

const Offline = styled.div`
    display: flex;
    flex-direction: row;
    text-align: left;
    justify-content: center;
`;