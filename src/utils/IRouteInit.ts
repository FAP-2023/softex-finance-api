import { Router } from "express";

export interface RouteInit{
    path: string,
    routes: Router
}