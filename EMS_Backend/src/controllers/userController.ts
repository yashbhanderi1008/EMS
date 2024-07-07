import { NextFunction, Request, Response } from "express";
import { UserInterface } from "@interface";
import { authService, AuthServices } from "@services";

class UserController {
    private _authService: AuthServices;

    constructor(authService: AuthServices) {
        this._authService = authService;
        this.signUp = this.signUp.bind(this);
        this.login = this.login.bind(this)
    }

    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const newUser: UserInterface = req.body;

            await this._authService.createUser(newUser);

            res.status(201).json({ message: "User registered successfully" })
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const email: string = req.body.email;
            const password: string = req.body.password;

            const token = await this._authService.login(email, password);

            res.status(200).json({ message: "User successfully login", data: token })
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController(authService)