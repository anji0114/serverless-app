exports.request = (ctx) => {
    return { operation: 'Scan' };
};

exports.response = (ctx) => {
    return ctx.result.items;
};