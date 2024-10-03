import { z } from 'zod';

export const createUserValidationSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'Name must be at least 5 characters long!' }),
  email: z
    .string()
    .email({ message: 'Invalid email address!' })
    .min(8, { message: 'Email must be at least 8 characters long!' }),
  role: z.enum(['user', 'admin']).optional().default('user'),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long!' })
    .max(20, { message: 'Password cannot exceed 20 characters' }),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 characters long' })
    .max(15, { message: 'Phone number cannot exceed 15 characters' }),
  profilePhoto: z.string().nullable().optional(),
  status: z.enum(['active', 'blocked']).optional().default('active'),
  isPremium: z.boolean().optional().default(false),
  followers: z.array(z.string()).optional(),
  following: z.array(z.string()).optional(),
  followerCount: z.number().optional().default(0),
  followingCount: z.number().optional().default(0),
});

export type CreateUserInput = z.infer<typeof createUserValidationSchema>;
