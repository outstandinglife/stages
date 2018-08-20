import styled from 'styled-components';

export const QueryBox = styled.div `
    width: 100%;
    height: 210px;
    border-bottom: 1px dashed #797979;
`;

export const QueryInput = styled.div `
    width: 370px;
    height: 100%;
    padding: 20px 0 0 30px;
    box-sizing: border-box;
`;

export const QueryItem = styled.div `
    height: 32px;
    width: 100%;
    line-height: 32px;
    margin-bottom: 25px;
    overflow: hidden;
    .select {
        float: right;
    }
`;

export const QyeryTitle = styled.h3 `
    font-size: 18px;
    font-weight: 700;
    float: left;
`;

export const QueryButton = styled.div `
    width: 100%;
    button {
        width: 250px;
        height: 45px;
        float: right;
        background-color: #1890ff;
        border-color: #1890ff;
        color: #fff;
    }
`;