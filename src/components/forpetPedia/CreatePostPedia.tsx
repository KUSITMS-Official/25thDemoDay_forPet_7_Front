import React, { useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { Colors } from '../../styles/ui';


const CreatePostPedia = () => {

    const [myQuestion, setMyQuestion] = useState<string>();
    const [myTitle, setMyTitle] = useState<string>();

    const [file, setFile] = useState<File>();
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.files![0]);
        setFile(e.target.files![0]);
    }

    const fileSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        let contents = {
            title: myTitle,
            content: myQuestion
        }
        const end_url = '/qnaBoard';
        const formData = new FormData();
        formData.append('qnaBoardRequestDto',
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
                    window.location.reload();
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <>
        <CreateQustion>
            <div className='title' style={{color: Colors.green5}}>질문하개</div>
            <hr
                style={{
                    color: `${Colors.gray2}`,
                    height: 1,
                    width: '100%'
                }}
            />
            <input 
                className='title' 
                style={{marginBottom: '10px', color: Colors.gray2, border: 'none'}} 
                placeholder='제목'
                onChange={(
                    e: React.ChangeEvent<HTMLInputElement>,
                ): void => setMyTitle(e.target.value)}
            />
            <hr
                style={{
                    color: `${Colors.gray2}`,
                    height: 1,
                    width: '100%'
                }}
            />
            <textarea
                rows={10}
                placeholder='궁금한 것들을 질문해보세요!&#13;예비 반려인과 반려인이 완벽한 답을 줄거에요'
                onChange={(
                    e: React.ChangeEvent<HTMLTextAreaElement>,
                ): void => setMyQuestion(e.target.value)}
                value={myQuestion}
                style={{ fontSize: '14px', padding: '10px'}}
            >
            </textarea>
            <div className='low-section'>
                <input type="file" multiple onChange={(e) => onFileChange(e)} />
            </div>            
        </CreateQustion>
        <Buttons>
            <button 
                onClick={(e) => fileSubmitHandler(e)}
                style={{backgroundColor: '#B9CDB4', color: '#64805E', fontSize: '20px'}}>등록</button>
        </Buttons>
        </>
    )
}

export default CreatePostPedia;

const CreateQustion = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    padding: 20px;
    background-color: ${Colors.white};
    box-shadow: 0px 4px 33px rgba(0, 0, 0, 0.1);
    border-radius: 15px;

    .title {
        text-align: left;
        font-size: 18px;
        font-weight: bold;
    }

    .low-section {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    textarea {
        resize: none;
        border: none;
    }
`

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: right;
    margin-bottom: 30px;

    button {
        width: 10%;
        height: 50px;
        box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.25);
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
`