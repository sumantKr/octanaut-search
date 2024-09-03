import { RouteHandler } from "@/types/routing";
import { Context, Hono } from "hono";
import { UserNotFoundException } from "./exception";

class UserHandler implements RouteHandler {
    basePath = 'user'
    routeInstance = new Hono()
    constructor() {
        this.getHandler()
    }

    getHandler() {
        this.routeInstance.get(`/`, function (c:Context) {
            c.req.param("id")
            throw new UserNotFoundException()
        })
    }
}

export default UserHandler
