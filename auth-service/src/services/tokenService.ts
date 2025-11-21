import jwt from "jsonwebtoken"
import { RefreshTokenRepository } from "../repositories/refreshTokenRepository"
import { v4 as uuid } from "uuid";

export function generateAccessToken(user: { id: number; email: string; role: string }) {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
    );
}

export function generateRefreshToken(user: { id: number; email: string; role: string }) {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role, jti: uuid() },
    process.env.REFRESH_SECRET as string,
    { expiresIn: "7d" }
    );
}

export function verifyRefreshToken(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET as string) as {
            id: string;
            email: string;
            role: string
            jti: string;
        };

        return {
            id: parseInt(decoded.id, 10),
            email: decoded.email,
            role: decoded.role,
            jti: decoded.jti,
        };
    } catch (err) {
        throw new Error("Invalid or expired refresh token")
    }
}

const refreshTokenRepo = new RefreshTokenRepository();

export function rotateTokens(refreshToken: string) {
    const decoded = verifyRefreshToken(refreshToken);

    const existing = refreshTokenRepo.findByToken(refreshToken);
    if (!existing) {
        throw new Error("Invalid refresh token");
    }

    if (!refreshTokenRepo.isValid(refreshToken)) {
        refreshTokenRepo.delete(refreshToken);
        throw new Error("Expired token");
    }

    const newAccessToken = generateAccessToken({ email: decoded.email, id: decoded.id, role: decoded.role });
    const newRefreshToken = generateRefreshToken({ email: decoded.email, id: decoded.id, role: decoded.role });

    const gracePeriodMs = 30 * 1000;
    refreshTokenRepo.updateGracePeriod(refreshToken, Date.now() + gracePeriodMs);

    refreshTokenRepo.add(decoded.id, newRefreshToken);
    //refreshTokenRepo.cleanupOldTokens();

    return { newAccessToken, newRefreshToken };
}