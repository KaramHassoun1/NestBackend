import { BadRequestException, NestMiddleware } from "@nestjs/common";


export class ApiTokenCheckMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        if (req.headers['api-token'] == "my-token") {
            throw new BadRequestException("Invalid Token");
        }
        next();
    }
}