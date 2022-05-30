import { Router } from "express";

class HealthRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.get('/', (req, res) => {
            res.send('OK');
        });
    }

}

export default new HealthRouter();