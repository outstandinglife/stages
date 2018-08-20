import styled from 'styled-components';

export const AddChannelWarp = styled.div `
    padding: 20px 0 0 20px;
    table {
        border-collapse: separate;
        border-collapse:collapse;
        border-spacing: 5px;
        table-layout: fixed;
        border:1px solid #797979;
        color: #333333;
        font-family: '微软雅黑';
        thead th {
            padding: 0 20px;
            border-bottom: 1px solid #797979;
            border-right: 1px solid #797979;
            text-align: center;
            height: 40px;
            line-height: 40px;
            background: #e5e5e5;
        }
        tr:nth-of-type(odd) td {
            background: #f9f9f9;
        }
        td {
            padding: 0 20px;
            border-bottom: 1px solid #797979;
            border-right: 1px solid #797979;
            height: 40px;
            line-height: 40px;
            text-align: center;
            a {
                margin: 0 5px;
                button.left {
                    color: #fff;
                    background: #ff8400;
                }
            }
            button.right {
                color: #fff;
                background: #1890ff;
            }
        }
    }
`;

export const AddChannelButton = styled.div `
    width: 250px;
    height: 45px;
    margin-bottom: 25px;
    button {
        display: block;
        width: 100%;
        height: 100%;
    }
`;