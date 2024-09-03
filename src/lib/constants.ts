import { cleanEnv, port, str } from "envalid";

const env =cleanEnv(Bun.env,{
    API_VERSION:str(),
    PORT:port(),
    // DB_PATH:str(),
    // JWT_SECRET:str(),
    // JWT_REFRESH_SECRET:str(),
})



export const  {API_VERSION,PORT
} = env