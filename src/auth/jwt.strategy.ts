import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// You should load this from a .env file, not hardcode it
const JWT_SECRET = process.env.JWT_SECRET ?? 'default-secret';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // Tell the strategy HOW to find the token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // Don't allow expired tokens
            ignoreExpiration: false,
            // The SAME secret key used to sign the token in your AuthModule
            secretOrKey: JWT_SECRET,
        });
    }

    /**
     * This method is called by Passport ONLY AFTER it has successfully
     * verified the token's signature and expiration.
     * @param payload The decoded JSON payload from the JWT.
     * @returns The object you want to attach to the request as `req.user`.
     */
    async validate(payload: { sub: string; email: string; role: string }) {
        // Here you could add more logic, like checking if the user is banned, etc.
        // For now, we'll just return the payload as is.
        return { id: payload.sub, email: payload.email, role: payload.role };
    }
}