import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
    
    if (err.isJoi) {
        return res.status(400).json({
            status: 400,
            message: 'Validation Error',
            details: err.details.map(detail => ({
                message: detail.message,
                path: detail.path,
            })),
        });
    }

    if (err instanceof HttpError) {
        res.status(err.status).json({
            status: err.status,
            message: err.name,
            data: err.data || {
                message: err.message,
                data: err,
            },
        });
        return;
    }

    res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        data: err.message,
    });
    next();
};