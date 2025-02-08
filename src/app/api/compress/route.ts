import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp';

/**
 * @swagger
 * /api/compress:
 *   post:
 *     summary: Compress image
 *     description: Uploads and compresses one image files
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
 *           image/webp:
 *             schema:
 *               type: string
 *               format: binary
 *               description: Compressed webp image (for single file)
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
    console.log(`POST Function for compressing images`);
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file || !(file instanceof File)) {
      console.error('Invalid file');
      return new NextResponse('No file provided', { status: 400 });
    }

    // Valid file so move on
    const buffer = Buffer.from(await file.arrayBuffer());
    const compressedBuffer = await sharp(buffer)
      .webp({ quality: 50, effort: 1 })
      .toBuffer();
    // I want to handle quality parameter if I had more time
    // Effort is max for CPU usage

    const safeFileName = encodeURIComponent(file.name.replace(/\.[^/.]+$/, '.webp'));
    // Return image
    return new NextResponse(compressedBuffer, {
      headers: {
        'Content-Type': 'image/webp',
        'Content-Disposition': `attachment; filename="${safeFileName}"; filename*=UTF-8''${safeFileName}`
      }
    });

  } catch (error) {
    console.error('Compression error: ', error);
    return new NextResponse('Error processing images', { status: 500 });
  }
}
