import { Request, Response, NextFunction } from 'express';
import * as core from 'express-serve-static-core';
import prisma from '../lib/prisma.js';

export interface AuthenticatedUser {
  id: string;
  clerkId?: string | null;
  email: string;
  name: string;
  role: 'CLIENT' | 'ADVISOR' | 'ADMIN';
  clientCategory: string;
  isVerifiedStudent: boolean;
}

export interface AuthenticatedRequest<
  P = Record<string, string>,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  user?: AuthenticatedUser;
}

export async function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    const testUserRoleHeader = req.headers['x-user-role'] as string | undefined;
    const testUserIdHeader = req.headers['x-user-id'] as string | undefined;

    // 1. Direct header simulation for dev / testing / role switching
    if (testUserIdHeader) {
      const user = await prisma.user.findUnique({
        where: { id: testUserIdHeader },
      });
      if (user) {
        req.user = {
          id: user.id,
          clerkId: user.clerkId,
          email: user.email,
          name: user.name,
          role: user.role as 'CLIENT' | 'ADVISOR' | 'ADMIN',
          clientCategory: user.clientCategory,
          isVerifiedStudent: user.isVerifiedStudent,
        };
        return next();
      }
    }

    if (testUserRoleHeader) {
      const user = await prisma.user.findFirst({
        where: { role: testUserRoleHeader.toUpperCase() },
      });
      if (user) {
        req.user = {
          id: user.id,
          clerkId: user.clerkId,
          email: user.email,
          name: user.name,
          role: user.role as 'CLIENT' | 'ADVISOR' | 'ADMIN',
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
        const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
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
        const advisor = await prisma.user.findFirst({ where: { role: 'ADVISOR' } });
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
        const client = await prisma.user.findFirst({ where: { role: 'CLIENT' } });
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
      const userByClerk = await prisma.user.findUnique({
        where: { clerkId: token },
      });
      if (userByClerk) {
        req.user = {
          id: userByClerk.id,
          clerkId: userByClerk.clerkId,
          email: userByClerk.email,
          name: userByClerk.name,
          role: userByClerk.role as 'CLIENT' | 'ADVISOR' | 'ADMIN',
          clientCategory: userByClerk.clientCategory,
          isVerifiedStudent: userByClerk.isVerifiedStudent,
        };
        return next();
      }
    }

    // Default: anonymous or unauthenticated
    return next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return next();
  }
}

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required to access this resource.',
    });
    return;
  }
  next();
}

export function requireRole(allowedRoles: Array<'CLIENT' | 'ADVISOR' | 'ADMIN'>) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
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
