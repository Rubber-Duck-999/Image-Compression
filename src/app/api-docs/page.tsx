'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import SwaggerUI with no SSR
const SwaggerUI = dynamic(
  () => import('swagger-ui-react').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading API documentation...</div>
      </div>
    )
  }
);

export default function ApiDocs() {
  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <SwaggerUI url="/api/docs" />
      </Suspense>
    </div>
  );
}