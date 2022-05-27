import styled from '@emotion/styled';
import { Colors } from '../../styles/ui';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getApi, setHeader } from "../../api";
import { Header } from "../../components";

import { ReactComponent as Logo } from '../../assets/Logo.svg';

const PreBoard = () => {  // 인증 확인
    // 2가지 모두 인증되었을 경우 커뮤니티로 이동
    // 인증 안되었을 경우 인증창
    const navigate = useNavigate();
    const [address, setAddress] = useState<Boolean>();
    const [petcard, setPetcard] = useState<Boolean>();

    if(localStorage.getItem("token") != ""){
        const ACCESS_TOKEN = localStorage.getItem("token");
        setHeader(ACCESS_TOKEN);
    }

    useEffect(() => {
        const checkAuths = async () => {
            await getApi(
                {},
                `/certify`
            )
                .then(({ status, data }) => {
                    // console.log(status, data);
                    // console.log(data.body.result.certifiedAddress);
                    if (status === 200) {
                        setAddress(data.body.data.certifiedAddress);
                        setPetcard(data.body.data.certifiedPetCard);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        checkAuths();
    }, []);

    useEffect(() => {
        if (address && petcard) {
            navigate('/all');  // 둘다 인증되면 커뮤니티로 이동
        }
    }, [address, petcard])

    const authClickHandler = () => {
        navigate('/mypage');
    }

    return(
        <>
        <Header />
        <Wrapper>
            <div className='upper'>
                <div style={{fontSize: '28px', fontWeight: 'bold'}}>인증이 필요합니다</div>
                <Logo />
            </div>
            <div className='btn' onClick={authClickHandler}>동물 카드 인증</div>
            <div className='btn' onClick={authClickHandler}>동네 인증</div>
        </Wrapper>
        </>
    )
}

export default PreBoard;

const Wrapper = styled.div`
    background-color: ${Colors.white};
    box-shadow: 0px 4px 53px rgba(0, 0, 0, 0.25);
    border-radius: 38px;
    width: 500px;
    height: 400px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;

    display: flex;
    flex-direction: column;
    align-items: center;

    .upper {
        display: flex;
        flex-direction: row;
        margin: 40px;
        justify-content: center;
    }

    .btn {
        width: 338px;
        height: 80px;
        background-color: ${Colors.green5};
        border-radius: 40px;
        margin: 20px 0;
        font-weight: bold;
        font-size: 28px;
        color: ${Colors.white};
        display: flex;
        align-items: center;
        justify-content: center;
    }
`