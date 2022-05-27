import styled from "@emotion/styled";
import { Colors } from '../../styles/ui';

interface Props {
    name: string;
    url: string;
    activeCat: boolean;
    handleSetCat:any;
  }

const OfflineMapCategory = ({name, url, activeCat, handleSetCat}:Props) => {
    return(

        <Category>
            <div className={activeCat ? "active" : "deactive"} onClick={() => handleSetCat(url)}>
                {name}
            </div>
        </Category>
        
    );
};
export default OfflineMapCategory;

const Category = styled.div`
    display: inline-block;
    text-align:center;

    width: 122px;
    
    font-family: 'NotoSans';
    font-weight: 700;
    font-size: 17px;
    line-height: 35px;


    .deactive{
        height: 40px;

        box-sizing: border-box;
        border: 3px solid ${Colors.green5};
        border-radius: 25.5px;
        background: ${Colors.white};
        color: ${Colors.black};
    }

    .active{
        height: 43px;
        line-height: 43px;
        
        background: ${Colors.green5};
        border-radius: 25.5px;
        color: ${Colors.white};
    }
`;
