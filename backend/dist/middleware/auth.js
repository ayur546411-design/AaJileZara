"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.requireAuth = requireAuth;
exports.requireRole = requireRole;
const prisma_js_1 = __importDefault(require("../lib/prisma.js"));
async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const testUserRoleHeader = req.headers['x-user-role'];
        const testUserIdHeader = req.headers['x-user-id'];
        // 1. Direct header simulation for dev / testing / role switching
        if (testUserIdHeader) {
            const user = await prisma_js_1.default.user.findUnique({
                where: { id: testUserIdHeader },
            });
            if (user) {
                req.user = {
                    id: user.id,
                    clerkId: user.clerkId,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    clientCategory: user.clientCategory,
                    isVerifiedStudent: user.isVerifiedStudent,
                };
                return next();
            }
        }
        if (testUserRoleHeader) {
            const user = await prisma_js_1.default.user.findFirst({
                where: { role: testUserRoleHeader.toUpperCase() },
            });
            if (user) {
                req.user = {
                    id: user.id,
                    clerkId: user.clerkId,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    clientCategory: user.clientCategory,
                    isVerifiedStudent: user.isVerifiedStudent,
                };
                return next();
            }
        }
        // 2. Bearer token extraction
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            // Handle mock dev tokens
            if (token.startsWith('mock_admin')) {
                const admin = await prisma_js_1.default.user.findFirst({ where: { role: 'ADMIN' } });
                if (admin) {
                    req.user = {
                        id: admin.id,
                        clerkId: admin.clerkId,
                        email: admin.email,
                        name: admin.name,
                        role: 'ADMIN',
                        clientCategory: admin.clientCategory,
                        isVerifiedStudent: admin.isVerifiedStudent,
                    };
                    return next();
                }
            }
            if (token.startsWith('mock_advisor')) {
                const advisor = await prisma_js_1.default.user.findFirst({ where: { role: 'ADVISOR' } });
                if (advisor) {
                    req.user = {
                        id: advisor.id,
                        clerkId: advisor.clerkId,
                        email: advisor.email,
                        name: advisor.name,
                        role: 'ADVISOR',
                        clientCategory: advisor.clientCategory,
                        isVerifiedStudent: advisor.isVerifiedStudent,
                    };
                    return next();
                }
            }
            if (token.startsWith('mock_client')) {
                const client = await prisma_js_1.default.user.findFirst({ where: { role: 'CLIENT' } });
                if (client) {
                    req.user = {
                        id: client.id,
                        clerkId: client.clerkId,
                        email: client.email,
                        name: client.name,
                        role: 'CLIENT',
                        clientCategory: client.clientCategory,
                        isVerifiedStudent: client.isVerifiedStudent,
                    };
                    return next();
                }
            }
            // Check if token matches a clerkId directly
            const userByClerk = await prisma_js_1.default.user.findUnique({
                where: { clerkId: token },
            });
            if (userByClerk) {
                req.user = {
                    id: userByClerk.id,
                    clerkId: userByClerk.clerkId,
                    email: userByClerk.email,
                    name: userByClerk.name,
                    role: userByClerk.role,
                    clientCategory: userByClerk.clientCategory,
                    isVerifiedStudent: userByClerk.isVerifiedStudent,
                };
                return next();
            }
        }
        // Default: anonymous or unauthenticated
        return next();
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        return next();
    }
}
function requireAuth(req, res, next) {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: 'Authentication required to access this resource.',
        });
        return;
    }
    next();
}
function requireRole(allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Authentication required.',
            });
            return;
        }
        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: `Forbidden: Access requires one of [${allowedRoles.join(', ')}] permissions.`,
            });
            return;
        }
        next();
    };
}
