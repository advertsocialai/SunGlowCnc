import { z } from 'zod'

// ── Auth ──────────────────────────────────────────────────────────────────────
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100),
  company: z.string().max(150).optional(),
  phone: z.string().max(20).optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// ── RFQ ───────────────────────────────────────────────────────────────────────
export const rfqCreateSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().max(2000).optional(),
  material: z.string().min(1, 'Material is required').max(100),
  tolerance: z.string().max(50).optional(),
  quantity: z.number().int().min(1, 'Quantity must be at least 1').max(100000),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
  notes: z.string().max(2000).optional(),
  fileUrl: z.string().url().optional(),
  fileName: z.string().max(255).optional(),
})

export const rfqUpdateSchema = z.object({
  status: z.enum([
    'pending', 'quoted', 'approved', 'in_production',
    'quality_check', 'shipped', 'completed', 'rejected',
  ]).optional(),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).optional(),
  notes: z.string().max(2000).optional(),
})

// ── Quote ─────────────────────────────────────────────────────────────────────
export const quoteCreateSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  validDays: z.number().int().min(1).max(90).default(30),
  notes: z.string().max(2000).optional(),
})

// ── Order ─────────────────────────────────────────────────────────────────────
export const orderUpdateSchema = z.object({
  status: z.enum(['in_production', 'quality_check', 'shipped', 'completed']),
  notes: z.string().max(2000).optional(),
})

// ── Contact ───────────────────────────────────────────────────────────────────
export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  company: z.string().max(150).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(3000),
})

// ── Types inferred from schemas ───────────────────────────────────────────────
export type RegisterInput = z.infer<typeof registerSchema>
export type RFQCreateInput = z.infer<typeof rfqCreateSchema>
export type QuoteCreateInput = z.infer<typeof quoteCreateSchema>
export type ContactInput = z.infer<typeof contactSchema>
