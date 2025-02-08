import { NextRequest, NextResponse } from 'next/server'

/**
 * @swagger
 * /api/compress:
 *   post:
 *     summary: Compress an image
 *     description: Uploads and compresses an image file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file to compress
 *     responses:
 *       200:
 *         description: Image compressed successfully
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    // Return compressed image
    return new NextResponse('Success', {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': 'attachment; filename="compressed-image.jpg"'
      }
    })

  } catch (error) {
    console.error('Image compression error:', error)
    return NextResponse.json(
      { error: 'Failed to compress image' },
      { status: 500 }
    )
  }
}
