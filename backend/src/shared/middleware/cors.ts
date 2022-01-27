import { NextFunction, Request, Response } from 'express';

export const Cors = (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, enctype ,count, Authorization')
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
};