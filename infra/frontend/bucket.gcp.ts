import * as pulumi from '@pulumi/pulumi';
import * as gcp from '@pulumi/gcp';
import { lookup } from 'mime-types';
import { glob } from 'glob';
import * as path from 'path';

// Create a GCP resource (Storage Bucket)
const bucket = new gcp.storage.Bucket('nerp-1-frontend', {
  location: 'ASIA-SOUTHEAST1',
  uniformBucketLevelAccess: true,
  website: {
    mainPageSuffix: 'index.html',
  },
});

// Use glob to get all files in the `dist` directory
const files = glob.sync('../frontend/dist/**/*', { nodir: true });

// Upload all files
files.forEach((file) => {
  const relativePath = path.relative('../frontend/dist', file); // Relative path within `dist`
  new gcp.storage.BucketObject(
    relativePath,
    {
      bucket: bucket.name,
      name: pulumi.interpolate`${bucket.name}/${relativePath}`,
      source: new pulumi.asset.FileAsset(file),
      contentType: lookup(relativePath) || undefined,
    },
    {
      protect: false,
    }
  );
});

new gcp.storage.BucketIAMBinding('nerp-1-frontend-iam', {
  bucket: bucket.name,
  role: 'roles/storage.objectViewer',
  members: ['allUsers'],
});

// Export the DNS name of the bucket
export const bucketName = bucket.url;
export const bucketEndpoint = pulumi.concat(
  'http://storage.googleapis.com/',
  bucket.name,
  '/',
  'index.html'
);
