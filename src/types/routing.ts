import { Hono } from "hono"
import { Factory } from "hono/factory"


export interface RouteHandler {
    basePath:string
    routeInstance: Hono
}