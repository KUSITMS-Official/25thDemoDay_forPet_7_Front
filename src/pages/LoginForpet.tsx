import styled from '@emotion/styled';
import { Colors } from '../styles/ui';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getApi, setHeader } from "../api";
import { Header } from "../components";

import Background from '../assets/Login-background.svg';
import ProfileImg from '../assets/Login-profile.svg';
import Picture from '../assets/Login-picture.svg';
import { ReactComponent as CancleBtn } from '../assets/Login-cancle.svg';

const LoginForpet = () => {
    const [signupForm, setSignupForm] = useState<SignupForm>({
        nickname: '',
        phone_number: '',
        address: ''
    });

    interface SignupForm {
        nickname: string,
        phone_number: string,
        address: string
    };

    const [profile, setProfile] = useState<File>();     //프로필 이미지 file
    const [profileSrc, setprofileSrc] = useState<string>('');   //프로필이미지 url
    const [phoneView, setPhoneView] = useState<number>(1);      //휴대폰 인증 순서
    const [userNum, setUserNum] = useState<string>('');         //사용자가 입력하는 휴대폰 인증번호
    const [cerNum, setCerNum] = useState<string>('');           //휴대폰 인증번호
    const [animalCard, setAnimalCard] = useState<File>();       //동물카드 이미지 file
    const [cardView, setCardView] = useState<number>(1);        //동물카드 인증 순서
    const [myTown, setMyTowm] = useState<string>('');           //내 동네 인증
    
    const reader = new FileReader();        //이미지 file -> url 변환
    let navigate = useNavigate();           //화면 이동

    if(localStorage.getItem("token") != ""){
        const ACCESS_TOKEN = localStorage.getItem("token");
        setHeader(ACCESS_TOKEN);
    }

    //프로필 이미지 띄워줌
    const onProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.files![0]);
        setProfile(e.target.files![0]);
        setprofileSrc(URL.createObjectURL(e.target.files![0]));
    }

    //휴대폰 인증번호 발송
    const cerPhoneNum = async () => {
        if(signupForm.phone_number != ''){
            setPhoneView(2);
            await getApi(
                {},
                `/signup/check/sendSMS?phone_number=${signupForm.phone_number}`
            )
            .then(({ status, data }) => {
                if (status === 200) {
                    console.log(data);
                    setCerNum(data);
                }
            })
            .catch((e) => {
                console.log(e);
            });
        } else {
            alert("휴대폰 번호를 입력해주개");
        }
    }

    //휴대폰 인증번호 검사
    const mathingCerNum = () => {
        if(cerNum == userNum) {
            setPhoneView(3);
            alert("휴대폰 인증이 완료되었개");
        } else {
            alert("인증번호가 맞지 않는다개. 다시 입력해주개");
            setUserNum("");
        }
    }

    //동물카드 사진 등록
    const onCardFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.files![0]);
        setAnimalCard(e.target.files![0]);
    }

    //동물카드 인증
    const cerAnimalCard = async () => {
        const end_url = `/signup/check/pet-card`;
        const formData = new FormData();
        formData.append('pet_card_image', animalCard!);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        await axios.post(
            process.env.REACT_APP_BACK_BASE_URL + end_url,
            formData,
            config
        )
        .then(({ status, data }) => {
            // console.log(status, data);
            if (status === 200) {
                alert("동물카드 인증이 완료되었개");
                setCardView(2);
            } else if (status === 403) {
                alert("로그인 후에 인증해주개");
            }else if (status === 404) {
                alert("사진 업로드 후에 인증해주개");
            }
        })
        .catch((e) => {
            console.log(e);
        })
    }

    //내 동네 인증
    const cerTown = (e: any) => {
        setMyTowm(e.target.value);
        setSignupForm({...signupForm, address: e.target.value + '#'});
    }

    //회원가입
    const signUp = async () => {
        const end_url = `/signup`;
        const formData = new FormData();
        formData.append('signup_dto',
            new Blob([JSON.stringify(signupForm)], { type: "application/json" })
        );
        formData.append('pet_card_image', animalCard!);
        formData.append('profile_image', profile!);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        await axios.post(
            process.env.REACT_APP_BACK_BASE_URL + end_url,
            formData,
            config
        )
        .then(({ status, data }) => {
            // console.log(status, data);
            if (status === 200) {
                alert("회원가입이 완료되었개");
                const ACCESS_TOKEN = data.body.token;
                localStorage.setItem("token", ACCESS_TOKEN);    //토큰 저장
                setHeader(ACCESS_TOKEN);
                navigate("/");
            } 
        })
        .catch((e) => {
            console.log(e);
        })
    }

    return (
        <>
        <Header />
        <img src={Background} style={{height:'calc(100vh - 74px)'}} />
        <Box>
            <Title style={{padding: '11px 0px 0px 30px'}}>
                <span className='logo'>forPet</span>
                <span className='title'>&nbsp;&nbsp;회원가입</span>
            </Title>
            <Section>
                {/*프로필 이미지 설정*/}
                <img src={profileSrc ? profileSrc : ProfileImg} width="137" height="137" style={{marginTop: '23px'}}/>
                <label htmlFor='input-profile'>
                    <img src={Picture} width="49" height="49" style={{position: 'absolute', top: '190px', left: '53%', cursor: 'pointer'}}/>
                </label>
                <input type='file' id='input-profile' onChange={(e) => onProfileFileChange(e)} style={{display:'none'}}/>
                
                {/*닉네임 설정*/}
                <InputSection>
                    <span className='sub-title'>닉네임(필수)</span>
                    <input
                    className='nicknameBar'
                    placeholder='닉네임 입력'
                        onChange={(
                            e: React.ChangeEvent<HTMLInputElement>,
                        ): void => setSignupForm({...signupForm, nickname: e.target.value})}
                        value={signupForm.nickname}
                    ></input>
                    <CancleBtn style={{position: 'absolute', top: '267px', left: '62%', cursor: 'pointer'}} onClick={() => setSignupForm({...signupForm, nickname: ""})}/>
                </InputSection>

                <Title style={{paddingTop: '20px'}}>
                    <span className='text-bold'>동물카드, 동네 인증</span>
                    <span className='regular'>으로 퍼펫트 커뮤니티를 즐겨보시개 !</span>
                    <div className='underline' style={{position: 'absolute', top: '330px', left: '31%'}}/>
                </Title>
                
                { phoneView == 1 ?
                    //휴대폰 인증 번호 발송
                    <InputSection style={{paddingTop: '9px'}}>
                        <span className='sub-title'>휴대폰번호 인증(선택)</span>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <input
                            className='certifyBar'
                            placeholder='휴대폰번호 (- 없이)'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ): void => setSignupForm({...signupForm, phone_number: e.target.value})}
                                value={signupForm.phone_number||''}
                            ></input>
                            <div className='btn-certify' onClick={cerPhoneNum} style={{cursor: 'pointer'}}>번호 입력</div>
                        </div>
                    </InputSection>
                :
                    //휴대폰 인증번호 매칭
                    <InputSection style={{paddingTop: '9px'}}>
                    <span className='sub-title'>휴대폰번호 인증(선택)</span>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <input
                            className='certifyBar'
                            placeholder='인증번호'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ): void => setUserNum(e.target.value)}
                                value={userNum}
                            ></input>
                            { phoneView == 3 ?
                                <div className='btn-cerComplete'>인증완료</div>
                            :
                                <div className='btn-certify' onClick={mathingCerNum} style={{cursor: 'pointer'}}>인증하기</div>
                            }  
                        </div>
                    </InputSection>
                }
                
                {/*동물카드 인증*/}
                <InputSection>
                    <span className='sub-title'>동물카드 인증(선택)</span>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <input
                        type='file' multiple
                        className='certifyBar'
                        onChange={(e) => onCardFileChange(e)} />
                        { cardView == 2 ?
                            <div className='btn-cerComplete'>인증완료</div>
                        :
                            <div className='btn-certify' onClick={cerAnimalCard} style={{cursor: 'pointer'}}>인증하기</div>
                        }
                        
                    </div>
                </InputSection>

                {/*내 동네 인증*/}
                <InputSection>
                    <span className='sub-title'>내 동네 인증(선택)</span>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div className='certifyBar'>{myTown}</div>
                        <select className='btn-certify' value='default' onChange={cerTown} style={{cursor: 'pointer'}}>
                            <option value='default'>--근처 동네--</option>
                            <option value='불광1동'>불광1동</option>
                            <option value='불광2동'>불광2동</option>
                            <option value='대조동'>대조동</option>
                            <option value='녹번동'>녹번동</option>
                            <option value=''>선택안함</option>
                        </select>
                    </div>
                </InputSection>
                
                {/*회원가입*/}
                <div className='btn-complete' onClick={signUp} style={{cursor: 'pointer'}}>회원가입 완료</div>
            </Section>
        </Box>
        </>
    );
};

export default LoginForpet;

const Box = styled.div`
    position: absolute;
    top: calc(5vh + 74px);
    left: 17%;

    width: 66%;
    height: 600px;

    background: ${Colors.white};
    box-shadow: 0px 4px 33px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
`;

const Title = styled. div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: flex-start;

    font-family: 'NotoSans';
    color: ${Colors.black};

    .logo{
        font-family: 'Baloo';
        font-weight: 400;
        font-size: 34px;
    }

    .title{
        font-weight: 500;
        font-size: 25px;
    }

    .text-bold{
        font-weight: 700;
        font-size: 14px;
        z-index: 1;
    }

    .regular{
        font-weight: 500;
        font-size: 14px;
        z-index: 1;
    }

    .underline{
        width: 387px;
        height: 9px;

        background: ${Colors.yellow2};
        opacity: 0.5;
        border-radius: 25px;
    }
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .btn-complete{
        display: flex;
        align-items: center;
        justify-content: center;
        
        width: 128px;
        height: 32px;
        margin-top: 20px;

        background: ${Colors.green3};
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
        border-radius: 20px;

        font-family: 'NotoSans';
        font-weight: 700;
        font-size: 14px;
        color: ${Colors.white};
    }
`;

const InputSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: flex-start;

    margin-top: 9px;

    .sub-title{
        font-family: 'NotoSans';
        font-weight: 500;
        font-size: 8px;
        color: ${Colors.gray2};

        margin-bottom: 4px;
    }
    .nicknameBar{
        width: 293px;
        height: 43px;
        padding-left: 12px;
        background: ${Colors.gray3};
        border-radius: 6px;
        border: none;
    }

    .certifyBar{
        width: 187px;
        height: 26px;

        border: none;
        border-bottom: 1px solid ${Colors.gray2};

        font-family: 'NotoSans';
        font-weight: 500;
        font-size: 12px;
        color: ${Colors.black};
    }

    .btn-certify{
        display: flex;
        align-items: center;
        justify-content: center;

        width: 89px;
        height: 26px;

        margin-left: 14px;

        box-sizing: border-box;
        border: 1px solid ${Colors.black};
        border-radius: 5px;

        font-family: 'NotoSans';
        font-weight: 500;
        font-size: 10px;
        color: ${Colors.black};
    }

    .btn-cerComplete{
        display: flex;
        align-items: center;
        justify-content: center;

        width: 89px;
        height: 26px;
        margin-left: 14px;

        box-sizing: border-box;
        background: ${Colors.green3};
        border-radius: 5px;

        font-family: 'NotoSans';
        font-weight: 500;
        font-size: 10px;
        color: ${Colors.white};
    }

`;