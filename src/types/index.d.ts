import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { role: 'admin' | 'customer'; email: string };
    }
  }
}
declare global {
  namespace Express {
    interface Request {
      vehicle?: JwtPayload & { role: 'admin' | 'customer'; email: string };
    }
  }
}
