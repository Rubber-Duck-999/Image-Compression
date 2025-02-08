import { NextResponse } from 'next/server'

/**
 * @swagger
 * /api:
 *   get:
 *     summary: API Health Check
 *     description: Returns API status and timestamp
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Welcome to the API
 */
export async function GET() {
  return NextResponse.json({ message: 'Welcome to the API' })
} 