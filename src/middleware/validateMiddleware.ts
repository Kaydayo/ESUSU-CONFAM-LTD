import express, {Request, Response, NextFunction} from 'express'


export default (validator: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const {error} = validator(req.body)
        console.log('error: ', error)
        if (error) {
            return res.status(400).json({
                status: "error",
                message: error.details[0].message.split('"').join('')
            })
        }
        next()
    }
}
