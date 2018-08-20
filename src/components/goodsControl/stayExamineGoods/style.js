import styled from 'styled-components';

export const QueryBox = styled.div `
    width: 100%;
    border-bottom: 1px dashed #797979;
`;

export const QueryInput = styled.div `
    width: 370px;
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

export const Keyword = styled.div `
    width: 100%;
    height: 32px;
    margin-bottom: 25px;
    h3 {
        font-size: 18px;
        font-weight: 700;
        float: left;
    }
    .input {
        width: 250px;
        float: right;
    }
`;

export const QueryButton = styled.div `
    width: 100%;
    height: 45px;
    margin-bottom: 25px;
    button {
        width: 250px;
        height: 45px;
        float: right;
        background-color: #1890ff;
        border-color: #1890ff;
        color: #fff;
    }
`;

export const  OperationWarp = styled.div `
    margin-top: 40px;
    margin-left: 30px;
    margin-bottom: 30px;
    button {
        margin-right: 20px;
        width: 150px;
        height: 40px;
    }
`;