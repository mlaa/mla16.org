/* grunt-aws */

'use strict';

module.exports = {
  options: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION
  },
  staging: {
    options: {
      bucket: 'staging.mla15.org',
      headers: {
        CacheControl: 'public, max-age=300, must-revalidate'
      }
    },
    files: [
      {
        cwd: 'app/',
        src: '**/*'
      }
    ]
  },
  live: {
    options: {
      bucket: 'mla15.org',
      headers: {
        CacheControl: 'public, max-age=300, must-revalidate'
      }
    },
    files: [
      {
        cwd: 'app/',
        src: '**/*'
      }
    ]
  }
};
