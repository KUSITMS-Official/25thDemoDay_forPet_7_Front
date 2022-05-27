import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Colors } from '../styles/ui';

import Logo1 from '../assets/onlineMap/Online-logo1.svg';
import Logo2 from '../assets/onlineMap/Online-logo2.svg';
import Logo3 from '../assets/onlineMap/Online-logo3.svg';
import Logo4 from '../assets/onlineMap/Online-logo4.svg';
import Logo5 from '../assets/onlineMap/Online-logo5.svg';
import Logo6 from '../assets/onlineMap/Online-logo6.svg';
import Logo7 from '../assets/onlineMap/Online-logo7.svg';
import Logo8 from '../assets/onlineMap/Online-logo8.svg';
import Logo9 from '../assets/onlineMap/Online-logo9.svg';
import Logo10 from '../assets/onlineMap/Online-logo10.svg';
import Logo11 from '../assets/onlineMap/Online-logo11.svg';
import Logo12 from '../assets/onlineMap/Online-logo12.svg';
import Logo13 from '../assets/onlineMap/Online-logo13.svg';
import Logo14 from '../assets/onlineMap/Online-logo14.svg';
import Logo15 from '../assets/onlineMap/Online-logo15.svg';
import Logo16 from '../assets/onlineMap/Online-logo16.svg';
import Logo17 from '../assets/onlineMap/Online-logo17.svg';
import Logo18 from '../assets/onlineMap/Online-logo18.svg';
import Logo19 from '../assets/onlineMap/Online-logo19.svg';
import Logo20 from '../assets/onlineMap/Online-logo20.svg';
import Logo21 from '../assets/onlineMap/Online-logo21.svg';

// 각 카테고리마다 - 이름, 이미지, 설명, 링크
let serviceList = {
    // 반려인 마을 
    'health': [
        {
            'name': '티티케어',
            'exp': '반려동물 건강 관리 앱',
            'link': 'https://www.ttcareforpet.com/ko-kr',
            'img': Logo1
        },
        {
            'name': '펫트라슈',
            'exp': '위치기반 동물병원 찾기 서비스',
            'link': 'https://www.petraschu.com/',
            'img': Logo2
        },
        {
            'name': '라이펫',
            'exp': '병원에 직접 방문하지 않아도 문진과 질병 진단이 가능한, 비대면 반려동물 맞춤 헬스케어 서비스',
            'link': 'https://www.lifet.co.kr/Survey/Intro',
            'img': Logo3
        },
    ],
    'young': [
        {
            'name': '플라잉퍼피',
            'exp': '우리 반려동물 개별 맞춤 자연식 식단 추천 서비스',
            'link': 'https://www.flyingpuppy.co.kr/',
            'img': Logo4
        },
        {
            'name': '펄PEL',
            'exp': '좋다는 건 알고 있지만 어려웠던 생식과 자연식 이제 P.E.L로 시작하자!',
            'link': 'https://apps.apple.com/kr/app/%ED%8E%A0-p-e-l-pets-eat-love/id1459602564',
            'img': Logo5
        },
        {
            'name': '샐러드펫',
            'exp': '수의사·수의대생이 만든 서비스',
            'link': 'http://www.saladpet.com/',
            'img': Logo6
        },
    ],
    'shop': [
        {
            'name': '콤빌리지',
            'exp': '모든 반려동물과 반려인들의 행복이 시작되는 곳',
            'link': 'https://comvillage.co.kr/',
            'img': Logo7
        },
        {
            'name': '우프바이베럴즈',
            'exp': '반려동물을 위한 더 나은 기준, 우프가 엄선한 브랜드로 안심하고 고르세요',
            'link': 'https://m.wooof.co.kr/',
            'img': Logo8
        },
        {
            'name': '해피팡팡',
            'exp': '18년째 사랑받는 NO.1 국내 최초 반려동물 수제 간식',
            'link': 'https://happypangpang.net/',
            'img': Logo9
        },
    ],
    'special': [
        {
            'name': '21그램',
            'exp': '보호자의 마음을 담은 반려동물 장례 서비스',
            'link': 'https://21gram.co.kr/',
            'img': Logo13
        },
        {
            'name': '펫트너',
            'exp': '전문가 방문 펫시터 예약 서비스',
            'link': 'https://petner.kr/',
            'img': Logo14
        },
        {
            'name': '펫시터',
            'exp': '나와 내 반려동물을 위한 돌봄 서비스',
            'link': 'https://www.dogmate.co.kr/',
            'img': Logo15
        },
        {
            'name': '페보릿',
            'exp': '강아지 건강 케어 앱서비스',
            'link': 'https://pevo.care/',
            'img': Logo16
        },
    ],
    'knowledge': [
        {
            'name': '비마이펫라이프',
            'exp': '반려동물 지식 정보 채널',
            'link': 'https://mypetlife.co.kr/',
            'img': Logo10
        },
        {
            'name': '도그tv',
            'exp': '반려동물의 정서 발단과 분리불안 해소 효과를 입증 받아 수의사가 추천하는 세계적인 tv 채널',
            'link': 'https://thedogtv.com/',
            'img': Logo11
        },
        {
            'name': '도그마스터',
            'exp': '강아지 기초 훈련, 개인기 훈련, 문제 행동 개선까지!',
            'link': 'https://dogmaster.fun/',
            'img': Logo12
        },
    ],
    // 예비 반려인 마을
    'volunteer': [
        {
            'name': '러퍼월드',
            'exp': '즐거운 유기동물 봉사 러피월드와 함께 해요',
            'link': 'https://luppyworld.com/',
            'img': Logo20
        },
        {
            'name': '동물자유연대',
            'exp': '반려동물복지를 위한 정기후원을 함께해요',
            'link': 'https://www.animals.or.kr/',
            'img': Logo21
        },
    ],
    'adopt': [
        {
            'name': '라이프플러스펫',
            'exp': '반려견을 만나는 새로운 방법',
            'link': 'https://www.lifeplus.co.kr/',
            'img': Logo17
        },
        {
            'name': '포인핸드',
            'exp': '유기동물에게 소중한 가족을 찾아주는 서비스',
            'link': 'https://apps.apple.com/kr/app/%ED%8F%AC%EC%9D%B8%ED%95%B8%EB%93%9C-%EC%9C%A0%EA%B8%B0%EB%8F%99%EB%AC%BC-%EC%9E%85%EC%96%91-%EC%8B%A4%EC%A2%85%EB%8F%99%EB%AC%BC-%EC%B0%BE%EA%B8%B0',
            'img': Logo18
        },
        {
            'name': '유기견 보호센터',
            'exp': '인터넷신고 서비스를 제공하며 유기견 후원, 입양 서비스',
            'link': 'https://singlesumer.com/',
            'img': Logo19
        },
    ],
};


const OneComp = ({ service }: string | any) => {
    return (
        <OneWrapper
            href={service.link}  // {service.link}
            target='_blank'
            style={{ textDecoration: 'none' }}>
            <img src={service.img} className='img' />
            <div className='contents'>
                <div style={{fontWeight: 'bold', fontSize: '18px'}}>{service.name}</div>
                <div>{service.exp}</div>
            </div>
        </OneWrapper>
    )
}

const OnlineMapList = ({ pick }: any | string) => {
    // health, young, shop, special, knowledge, volunteer, adopt
    const [category, setCategory] = useState<string>();
    const [pickService, setPickService] = useState<Service[]>();

    interface Service {
        name: string,
        exp: string,
        link: string
    }

    useEffect(() => {
        setCategory(pick);
        switch (pick) {
            case '건강하개':
                setPickService(serviceList['health']);
                break;
            case '영양있개':
                setPickService(serviceList['young']);
                break;
            case '쇼핑하개':
                setPickService(serviceList['shop']);
                break;
            case '특별하개':
                setPickService(serviceList['special']);
                break;
            case '지식쌓개':
                setPickService(serviceList['knowledge']);
                break;
            case '봉사하개':
                setPickService(serviceList['volunteer']);
                break;
            case '입양하개':
                setPickService(serviceList['adopt']);
                break;
            default:
                setPickService(serviceList['health']);
                break;
        }
    }, [pick])


    return (
        <BoxWrapper>
            <div className={
                (pick === '봉사하개' || pick === '입양하개') ?
                    'right-box' : 'left-box'
            }>
                <div className={
                    (pick === '봉사하개' || pick === '입양하개') ?
                        'category-right' : 'category-left'
                }
                    style={{ fontWeight: 'bold' }}
                >{category}</div>
                {
                    pickService &&
                    pickService.map((s: any, i: number) => (
                        <OneComp
                            key={i}
                            service={s}
                        />
                    ))
                }
            </div>
        </BoxWrapper >
    )

}

export default OnlineMapList;

const BoxWrapper = styled.div`
    .right-box {
        background-color: ${Colors.white};
        width: 400px;
        margin-left: 50px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
        border-radius: 15px;

        position: absolute;
        right: 10%;
        z-index: 100;
    }

    .left-box {
        background-color: ${Colors.white};
        width: 400px;
        margin-left: 50px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
        border-radius: 15px;

        position: absolute;
        z-index: 100;
    }

    .category-left {
        width: 100px;
        border-radius: 27px;
        padding: 8px 0;
        background-color: ${Colors.black};
        color: ${Colors.yellow1};
        
        position: relative;
        top: -10px;
    }
    .category-right {
        width: 100px;
        border-radius: 27px;
        padding: 8px 0;
        background-color: ${Colors.black};
        color: ${Colors.green4};
        
        position: relative;
        top: -10px;
    }
`

const OneWrapper = styled.a`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;

    width: 300px;
    margin: 10px 0;
    color: ${Colors.black};

    .img {
        width: 80px;
        height: 80px;
        background-color: ${Colors.green2};
        margin-right: 20px;
        filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
        border-radius: 13px;
    }

    .contents {
        display: flex;
        flex-direction: column;
        text-align: left;
    }
`

