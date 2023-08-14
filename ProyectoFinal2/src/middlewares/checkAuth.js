import UserDao from "../daos/mongodb/userDao.js";
const userDao = new UserDao();
import jwt from "jsonwebtoken";

import {PRIVATE_KEY} from "../jwt/auth.js";


export const checkAuth = async(req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
        
    } catch (error) {
        
    }

}