export default (req, res, next) => {
    let start = 0;
    let limit = 10;
    
    if (req.query.start === undefined || req.query.limit === undefined
        || req.query.start === '' || req.query.limit === '') {
        start = 0;
        limit = 10;
    } else {
        start = parseInt(req.query.start, 10);
        limit = parseInt(req.query.limit, 10);
    }

    req.query.start = start;
    req.query.limit = limit;
    next();
};
