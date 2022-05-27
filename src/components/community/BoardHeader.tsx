import styled from '@emotion/styled';
import { Colors } from '../../styles/ui';
import { NavLink } from "react-router-dom";

const BoardHeader = () => {

    return (
        <Wrapper>
            <div className='title'>우리 동네 커뮤니티</div>
            <NavLink to="/all"
                className={({ isActive }) =>
                    isActive ? 'active' : 'inactive'
                }
            >
                <div className='comp'>전체</div>
            </NavLink>
            <NavLink to="/meet"
                className={({ isActive }) =>
                    isActive ? 'active' : 'inactive'
                } >
                <div className='comp'>모임</div>
            </NavLink>
            <NavLink to="/share"
                className={({ isActive }) =>
                    isActive ? 'active' : 'inactive'
                }>
                <div className='comp'>나눔</div>
            </NavLink>
            <NavLink to="/boast"
                className={({ isActive }) =>
                    isActive ? 'active' : 'inactive'
                }>
                <div className='comp'>자랑</div>
            </NavLink>
        </Wrapper>
    )
}

export default BoardHeader;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 20px 80px 0 80px;

    .title {
        font-size: 24px;
        font-weight: bold;
        margin-right: 10px;
    }

    .comp {
        margin: 0 5px;
        color: ${Colors.black};
        font-size: 18px;
    }

    .location {
        margin: 0 5px;
        margin-left: auto;
    }

    a {
        border-radius: 4px;
        padding: 6px 10px;
        margin-right: 10px;
    }
    
    a.active {
        text-decoration: underline;
        font-weight: bold;
    }
    
    a.inactive {
        text-decoration: none;
    }
    
`

