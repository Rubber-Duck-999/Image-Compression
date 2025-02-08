import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp';
import { ZipInputFile, zipSync } from 'fflate';

/**
 * @swagger
 * /api/compress:
 *   post:
 *     summary: Compress images
 *     description: Uploads and compresses one or multiple image files
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Image files to compress
 *     responses:
 *       200:
 *         description: Images compressed successfully
 *         content:
 *           application/zip:
 *             schema:
 *               type: string
 *               format: binary
 *               description: ZIP file containing compressed images (for multiple files)
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *               description: Compressed PNG image (for single file)
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
    const files = formData.getAll('files');
    
    if (!files || files.length === 0) {
      return new NextResponse('No files provided', { status: 400 });
    }

    const zipEntries: Record<string, Uint8Array> = {};
    console.log(`${files.length} files for compressing`);
    await Promise.all(
      files.map(async (file) => {
        if (!(file instanceof File)) {
          console.error('Ivalid file but carry on');
          return;
        }
        // Valid file so move on
        const buffer = Buffer.from(await file.arrayBuffer());
        const compressedBuffer = await sharp(buffer)
          .webp({ quality: 10, effort: 1 })
          .toBuffer();

        const fileName = file.name.replace(/\.[^/.]+$/, '');
        console.log(`${fileName} file for compressing`);
        // Remove original extension
        zipEntries[`${fileName}.webp`] = compressedBuffer;
      })
    );

    // Create zip with all compressed images
    const zipBuffer = zipSync(zipEntries, {
      mem: 8
    });

    // Return zip successfully
    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="compressed-images.zip"'
      }
    });

  } catch (error) {
    console.error('Compression error: ', error);
    return new NextResponse('Error processing images', { status: 500 });
  }
}
