import {Response, Request, NextFunction} from 'express'

import {DatabaseConnectionError} from '../errors/database-connection-error'
import {RequestValidationError} from '../errors/request-validation-error'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    
    if(err instanceof RequestValidationError){
        const formattedErors = err.errors.map(error => (
            {
                message: error.msg,
                field: error.param
            }
        ))
        return res.status(400).send({
            errors: formattedErors
        })
    }

    if(err instanceof DatabaseConnectionError){
        return res.status(500).send({
            errors: [
                {
                    message: err.reason
                }
            ]
        })
    }
    
    res.status(400).send({
        errors: [
            {
                message: 'Something went wrong'
            }
        ]
    })
}