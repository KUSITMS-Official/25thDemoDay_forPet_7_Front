import React from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { Colors } from '../styles/ui';
import { setHeader } from "../api";
import { Header } from "../components";

import LoginBackground from '../assets/Login-background.svg';
import { ReactComponent as LoginLogo } from '../assets/Login-logo.svg';


const Login = () => {

    if(localStorage.getItem("token") != ""){
        const ACCESS_TOKEN = localStorage.getItem("token");
        setHeader(ACCESS_TOKEN);
    }
    
    //카카오 로그인
    const loginHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            }
        }
        const redirectURL = 'http://localhost:3000/oauth2/redirect'
        await axios.get(
            process.env.REACT_APP_BACK_BASE_URL + `/oauth2/authorize/kakao?redirect_uri=`+ redirectURL,
            config
        )
            .then(({ status, data }) => {
                // console.log(status, data);
                if (status === 200 || status === 201) {
                    setHeader(data.body.data.token);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const loginUrl: string = process.env.REACT_APP_BACK_BASE_URL + '/oauth2/authorize/kakao?redirect_uri=http://localhost:3000/oauth2/redirect';

    return (
        <>
        <Header />
        <img src={LoginBackground} style={{height:'calc(100vh - 74px)'}} />
        {/* 로그인 */}
        <Section>
            <LoginLogo />
            <span className="notice">로그인하고 퍼펫트를 이용해보세요! <br />필요한 시간은 단, 3초!</span>
            <a className="btn-login" style={{ marginTop:'45px', textDecoration:'none' }} href={loginUrl}>카카오 로그인</a>
        </Section>
        </>
    );
};

export default Login;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: calc(19vh + 74px);
    left: 26%;

    .notice{
        font-family: 'NotoSans';
        font-weight: 500;
        font-size: 25px;

        color: ${Colors.black};
    }

    .btn-login{
        display: flex;
        align-items: center;
        justify-content: center;

        width: 47vw;
        height: 81px;
        background: ${Colors.green3};
        box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.25);
        border-radius: 51px;
        border: none;

        font-family: 'NotoSans';
        font-weight: 700;
        font-size: 25px;
        color: ${Colors.white};
    }

`;