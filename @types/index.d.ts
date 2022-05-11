import {sign} from "../../src/utils/interfaces";

declare global {
    namespace Express {
        interface Request {
            user?: sign;
        }
    }
}
