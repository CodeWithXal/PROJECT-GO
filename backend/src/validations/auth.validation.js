import {z} from "zod";
const validCharacters = /^[a-zA-Z0-9_-]+$/;

const signupSchema = z.object({
    username: z
    .string({required_error: "Username is required"})
    .trim()
    .min(3, "username must be atleast 3 characters")
    .max(25, "username can be atmost 25 characters")
    .regex(validCharacters, "Username can only contain letters, numbers, underscores, and hyphens"),

    email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(1, "Email cannot be empty")
    .email("Invalid email format"),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password cannot exceed 64 characters")
    // Chain multiple regex checks for password complexity
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
});

const loginSchema =z.object({
    email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(1, "Email cannot be empty")
    .email("Invalid email format"),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password cannot exceed 64 characters")
    // Chain multiple regex checks for password complexity
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
});

export {signupSchema, loginSchema};
