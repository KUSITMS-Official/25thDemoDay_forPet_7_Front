import React from "react";
import PropTypes from "prop-types";
import styled from '@emotion/styled';
import { Colors } from '../styles/ui';


interface Props {
    currentPage: number;
    totalPages: number;
    handleNextPage: (page: number) => void;
    handlePrevPage: (page: number) => void;
}
const Pagination: React.FC<Props> = ({
    currentPage,
    totalPages,
    handlePrevPage,
    handleNextPage,
}) => {
    return (
        <Wrapper>
            <button
                className="pagination-button"
                onClick={() => handlePrevPage(currentPage)}
                disabled={currentPage === 1}
                style={{cursor: 'pointer'}}
            >
                &lt;
            </button>

            <span className="pagination-page-info">
                {currentPage} 
                {/* of {totalPages} */}
            </span>

            <button
                className="pagination-button"
                onClick={() => handleNextPage(currentPage)}
                disabled={currentPage === totalPages}
                style={{cursor: 'pointer'}}
            >
            &gt;
            </button>
        </Wrapper> 
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    handlePrevPage: PropTypes.func.isRequired,
    handleNextPage: PropTypes.func.isRequired,
};

export default Pagination;

const Wrapper = styled.div`
    margin-bottom: 20px;

    button {
        border: none;
        font-weight: bold;
        background-color: ${Colors.green1};
    }

    .pagination-page-info {
        margin: 0 5px;
        padding: 5px 10px;
        font-weight: bold;
        background-color: ${Colors.green5};
        border-radius: 20px;
        color: ${Colors.white};
        width: 25px;
        height: 25px;
    }
`