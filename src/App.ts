import { logger } from 'hono/logger'
import { Context, Hono } from "hono";
import { RouteHandler } from "./types/routing";
import { cors } from 'hono/cors'
import { HTTPException } from 'hono/http-exception';
import { API_VERSION, PORT } from './lib/constants';
import { AuthConfig, authHandler, initAuthConfig, verifyAuth } from '@hono/auth-js';
import GitHub from "@auth/core/providers/github"
class App {
    public app: Hono;
    public port: number;
    constructor(routes: RouteHandler[]) {
        this.app = new Hono();
        this.port = PORT;

        // this.connectToTheDatabase();
        this.initializeMiddleWares();
        this.initializeRoutes(routes)
        this.initializeErrorHandler();
    }
    initializeErrorHandler() {
        this.app.onError((error, c) => {
            const errorInstance = (error as HTTPException).getResponse()
            return errorInstance
        })
    }
    public connectToTheDatabase() {

    }
    private initializeMiddleWares() {
        this.app.use(logger())
        this.app.use(cors({
            origin: [],
            credentials: true,
        }))

    }

    private initializeRoutes(routes: RouteHandler[]) {

        this.app.get("*", initAuthConfig((c: Context): AuthConfig => {
            console.debug("🚀 ~ App ~ getAuthConfig ~ Context:", "Context")
            return {
                secret: process.env.AUTH_SECRET,
                providers: [
                    GitHub({
                        clientId: process.env.GITHUB_ID,
                        clientSecret: process.env.GITHUB_SECRET
                    }),
                ]
            }
        }))
        this.app.use("/api/auth/*", authHandler())

        this.app.use('/api/v1/*', verifyAuth())

        routes.forEach((route: RouteHandler) => {
            this.app.route(`${API_VERSION}/${route.basePath}`, route.routeInstance);
            console.debug("🚀 ~ App ~ routes.forEach ~ `${API_VERSION}${route.basePath}`:", `${API_VERSION}/${route.basePath}`)
        });
    }

}

export default App;