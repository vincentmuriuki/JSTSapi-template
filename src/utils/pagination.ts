export const paginate = (page = 1, pageSize: any) => {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    return {
        offset,
        limit
    };
};

export const calculatePages = (objectLength: any, limit: any) => {
    const count = Number(objectLength);
    const pages = Math.ceil(count / limit);

    return {
        count,
        pages
    };
};