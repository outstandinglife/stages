import styled from 'styled-components';

export const LogoutWarp = styled.div `
    width: 50%;
    height: 60px;
    line-height: 60px;
    padding-right: 30px;
    text-align: right;
    box-sizing: border-box;
    div {
        display: flex;
        float: right;
    }
`;

export const ImgWarp = styled.div `
    box-sizing: border-box;
    height: 60px;
    padding-top: 12px;
`;

export const Userpic = styled.img `
    width: 36px;
    height: 36px;
    border-radius: 50%;
`;

export const LogutText = styled.div `
    margin-left: 15px;
    color: #1890ff;
    font-family: '微软雅黑';
    span {
        cursor: pointer;
    }
`;