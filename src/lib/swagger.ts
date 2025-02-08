import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api', // API folder path
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Image Compressor API',
        version: '1.0.0',
        description: 'API documentation for the Image Compressor service',
      },
      servers: [
        {
          url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
          description: 'API Server',
        },
      ],
    },
  });
  return spec;
}; 