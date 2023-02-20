import { NextResponse, NextRequest } from "next/server";
import { middlewareSignUp } from "@/server/User/infrastructure/middleware/user.middleware.signUp";
import { EntitySignUpClient } from "@/server/User/domain/entity.user";
export default async function middleware(req: NextRequest) {}
