import { HTTPException } from "hono/http-exception"
import { StatusCode } from "hono/utils/http-status"
import { getReasonPhrase } from "http-status-codes"


type BodyOptions = {
    status: StatusCode | number, message: string,data?:any
}
class GlobalException extends HTTPException {
    constructor(body: BodyOptions, options?: ResponseInit) {
        
        const errorResponse = Response.json(body, {
            status:body.status,
            statusText: getReasonPhrase(body.status),
            ...options
        })
        super(body.status as StatusCode, { res: errorResponse })
    }
}

export default GlobalException