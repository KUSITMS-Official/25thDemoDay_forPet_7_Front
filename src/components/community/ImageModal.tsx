import { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { Colors } from '../../styles/ui';


interface ModalDefaultType {
    onClickImageModal: () => void;
    imgSrc: string;
}

function ImageModal({ onClickImageModal, imgSrc }: PropsWithChildren<ModalDefaultType>) {
    return (
        <Modal>
            <img src={imgSrc} style={{width: '600px', height: '600px'}} />
            {/* <div onClick={(e: React.MouseEvent) => { 
                e.preventDefault();
                if (onClickImageModal) { onClickImageModal(); }
            }}>닫기</div> */}
        </Modal>
    );
  }


export default ImageModal;

const Modal = styled.div`
    position: absolute;
    top: 5vh;
    left: 30vw;
    z-index: 2;
    background-color: ${Colors.gray1}

    img { 
        width: 600px;
        height: 600px;
    }
    
`
