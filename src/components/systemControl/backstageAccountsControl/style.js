import styled from 'styled-components';

export const Warp = styled.div `
    padding: 15px 20px;
`;

export const QueryListWarp = styled.div `
    margin: 20px 0;
    padding: 15px 0;
    border: 1px solid #CCCCCC;
`;

export const CreateTime = styled.div `
`;

export const CreateTimeItem = styled.div `
    margin: 0 25px;
    height: 50px;
    line-height: 50px;
    span {
        color: skyblue;
        margin-right: 5px;
    }
    
`;

export const Search = styled.div `
    width: 300px;
    margin: 0 55px;
    button {
        width: 100%;
        height: 35px;
    }
`;

export const Operation = styled.div `
    display: flex;
`;

export const Item = styled.span `
    flex: 1;
    i {
        font-size: 20px;
    }
    &.edit {
        color: #009900;
        cursor: pointer;
    }
    &.elete {
        color: #FF0000;
        cursor: pointer;
    }
`;

export const UpdateWarp = styled.div `

`;

export const UpdateItem = styled.div `
    height: 50px;
    line-height: 50px;
    display: flex;
    font-size: 18px;
    .name {
        width: 120px;
        margin-right: 5px;
        text-align: right;
        font-weight: bold;
    }
    .input {
        flex: 1;
    }
`;