import GlobalException from "@/lib/GlobalException"
import { StatusCodes } from "http-status-codes"

export class UserNotFoundException extends GlobalException{

    constructor(){
        super({status:StatusCodes.NOT_FOUND,message:"User Not Found"})
    }
}