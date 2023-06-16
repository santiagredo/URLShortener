import { Request, Response } from "express";
import { urlShortenerModel } from "../models/urlShortener.model";
import { databaseStoredUrlsModel } from "../models/urlChecker.model";

export const response = {
    redirect: {
        success: (request: Request, response: Response, payload: string, status: number | 302) => {
            response.status(status).redirect(payload);
        },
        error: (request: Request, response: Response, payload: string, status: number | 500) => {
            response.status(status).redirect(payload);
        }
    },
    shorten: {
        success: (request: Request, response: Response, payload: urlShortenerModel, status: number | 201) => {
            response.status(status).send({
                shortened: true,
                data: payload
            })
        },
        error: (request: Request, response: Response, payload: string, status: number | 500) => {
            response.status(status).send({
                shortened: false,
                data: payload
            })
        }
    },
    check: {
        success: (request: Request, response: Response, payload: databaseStoredUrlsModel[], status: number | 201) => {
            response.status(status).send({
                data: payload
            })
        },
        error: (request: Request, response: Response, payload: string, status: number | 500) => {
            response.status(status).send({
                data: payload
            })
        }
    },
    delete: {
        success: (request: Request, response: Response, payload: any, status: number | 201) => {
            response.status(status).send({
                data: payload
            })
        },
        error: (request: Request, response: Response, payload: string, status: number | 500) => {
            response.status(status).send({
                data: payload
            })
        }
    }
};