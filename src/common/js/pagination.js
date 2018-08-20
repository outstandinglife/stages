const pagination = function(data, callback) {
    return {
        onChange: (current) => {
            callback(current);
        },
        current: data.pageNo,
        pageSize: data.pageSize,
        total: data.totalCount,
        showTotal: () => {
            return `共${data.totalCount}条数据`;
        },
        showQuickJumper: true // 分頁
    }
}

export default pagination;