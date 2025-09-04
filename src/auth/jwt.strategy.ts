// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

const JWT_SECRET = process.env.JWT_SECRET ?? 'default-secret';

// Ensure this matches the payload structure when you create the token
export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // IMPORTANT: This secret MUST match the secret used to sign the token
            secretOrKey: JWT_SECRET, // Or your config service
        });
    }

    // This method is called after the token is verified.
    // The 'payload' parameter is the decoded JWT payload.
    // Whatever you return from here becomes `req.user`.
    async validate(payload: JwtPayload) {
        console.log('JWT Strategy validate method called with payload:', payload); // <--- ADD THIS LOG

        // We are returning the entire payload, so req.user will be { sub, email, role }
        return { sub: payload.sub, email: payload.email, role: payload.role };
    }
}