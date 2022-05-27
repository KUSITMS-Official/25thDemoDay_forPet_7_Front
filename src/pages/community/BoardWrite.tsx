import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { Colors } from '../../styles/ui';
import { BoardHeader } from '../../components/community';
import { useNavigate } from 'react-router-dom';
import { setHeader } from "../../api";
import { Header } from "../../components";



const BoardWrite = () => {
    const [radio, setRadio] = useState<string>();
    const [contents, setContents] = useState<Contents>({
        title: '',
        content: '',
        category: '',
    });
    const navigate = useNavigate();

    interface Contents {
        title: string,
        content: string,
        category: string,
    }

    if(localStorage.getItem("token") != ""){
        const ACCESS_TOKEN = localStorage.getItem("token");
        setHeader(ACCESS_TOKEN);
    }

    const handleRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setRadio(e.target.value);
        setContents({...contents, category: e.target.value});
    }

    const [file, setFile] = useState<File>();

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.files![0]);
        setFile(e.target.files![0]);
    }

    const fileSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const end_url = '/community';
        const formData = new FormData();
        formData.append('community_request',
            new Blob([JSON.stringify(contents)], { type: "application/json" })
        );
        formData.append('imageList', file!);
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
                if (status === 200 || status === 201) {
                    navigate('/all');
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }


    return (
        <>
        <Header />
        <BoardHeader />
        <Wrapper>
            <Upper>
            <Radios>
                <label>
                    <input
                        type='radio'
                        value='meeting'
                        checked={radio === 'meeting'}
                        onChange={(e) => handleRadioButton(e)}
                    />모임
                </label>
                <label>
                    <input
                        type='radio'
                        value='sharing'
                        checked={radio === 'sharing'}
                        onChange={(e) => handleRadioButton(e)}
                    />나눔
                </label>
                <label>
                    <input
                        type='radio'
                        value='boasting'
                        checked={radio === 'boasting'}
                        onChange={(e) => handleRadioButton(e)}
                    />자랑
                </label>
            </Radios>
            </Upper>
            <hr
                style={{
                    color: `${Colors.gray1}`,
                    height: 1,
                    width: '100%'
                }}
            />
            <textarea
                rows={1}
                placeholder='제목'
                onChange={(
                    e: React.ChangeEvent<HTMLTextAreaElement>,
                ): void => setContents({ ...contents, title: e.target.value })}
                value={contents.title}
            ></textarea>
            <hr
                style={{
                    color: `${Colors.gray1}`,
                    height: '1px',
                    width: '100%'
                }}
            />
            <textarea
                rows={20}
                placeholder='모두가 즐거운 커뮤니티를 위해 커뮤니티 규칙을 지켜주시개 &#13;&#13;
                다음과 같은 행위를 금지합니다.
                - 홍보 및 사업성 판매 행위
                - 타인의 권리를 침해하거나 불쾌감을 주는 행위
                - 범죄, 불법 행위 등 법령을 위반하는 행위
                - 욕설, 비하, 혐오, 차별, 폭력 관련 내용을 포함한 게시물 작성 행위'
                onChange={(
                    e: React.ChangeEvent<HTMLTextAreaElement>,
                ): void => setContents({ ...contents, content: e.target.value })}
                value={contents.content}
            >
            </textarea>
            <div className='low-section'>
                <input type="file" multiple onChange={(e) => onFileChange(e)} />
            </div>
            
        </Wrapper>
        <Buttons>
            <button onClick={ () => {
                navigate(-1);
            }}
            style={{backgroundColor: '#CBD2CA', color: '#676767', fontSize: '20px'}}>취소</button>
            <button 
            onClick={(e) => fileSubmitHandler(e)}
            style={{backgroundColor: '#B9CDB4', color: '#64805E', fontSize: '20px'}}>등록</button>
        </Buttons>
        </>
    )
}

export default BoardWrite;

const Upper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Wrapper = styled.div`
    background-color: ${Colors.white};
    margin: 20px 80px;
    padding: 10px;
    box-shadow: 0px 4px 33px rgba(0, 0, 0, 0.1);
    border-radius: 15px;

    textarea {
        width: 100%;
        resize: none;
        border: none;
        font-size: 16px;
    }

    .low-section {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`

const Radios = styled.div`
    display: flex;
    flex-direction: row;
    margin-right: auto;
`

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 80px 30px 80px;

    button {
        width: 49%;
        height: 50px;
        box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.25);
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
`