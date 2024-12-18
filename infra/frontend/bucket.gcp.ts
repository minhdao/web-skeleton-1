import * as gcp from '@pulumi/gcp';
import * as pulumi from '@pulumi/pulumi';
import { lookup } from 'mime-types';
import { glob } from 'glob';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load variable inside .env
dotenv.config();

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
      name: pulumi.interpolate`${relativePath}`,
      source: new pulumi.asset.FileAsset(file),
      contentType: lookup(relativePath) || undefined,
    },
    {
      protect: false,
    }
  );
});

// Configure access to the bucket
new gcp.storage.BucketIAMBinding('public-access', {
  bucket: bucket.name,
  role: 'roles/storage.objectViewer',
  members: ['allUsers'], // Allows public read access
});

// Create backend-bucket
const backendBucket = new gcp.compute.BackendBucket(
  'nerp-1-react-backend-bucket',
  {
    bucketName: bucket.name,
    enableCdn: false, // Optional: Enable Cloud CDN for caching
  }
);

// -------------------------------
// Configure an HTTPS Load Balancer
// -------------------------------

// URL Map: Routes traffic to the BackendBucket
const urlMap = new gcp.compute.URLMap('nerp-1-url-map', {
  defaultService: backendBucket.selfLink, // Any URL pattern without a matcher will be routed to backendBucket
});

// Managed SSL/TLS Certificate
const sslCert = new gcp.compute.ManagedSslCertificate('nerp-1-ssl-cert', {
  managed: { domains: [pulumi.interpolate`${process.env.APP_DOMAIN}`] }, // Make sure APP_DOMAIN exists in .env
});

// HTTPS Target Proxy
const httpsProxy = new gcp.compute.TargetHttpsProxy('nerp-1-https-proxy', {
  urlMap: urlMap.id,
  sslCertificates: [sslCert.id],
});

// Global Forwarding Rule (HTTPS endpoint)
const forwardingRule = new gcp.compute.GlobalForwardingRule(
  'nerp-1-https-forwarding-rule',
  {
    target: httpsProxy.id,
    portRange: '443',
    ipProtocol: 'TCP',
  }
);

// -------------------------------
// Export the Load Balancer IP
// -------------------------------
export const loadBalancerIP = forwardingRule.ipAddress;
