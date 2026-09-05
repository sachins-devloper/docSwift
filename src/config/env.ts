export const ENV = {
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/api/v1',
  S3_BUCKET: process.env.S3_BUCKET || 'docflow-storage',
  MAX_FILE_SIZE_MB: 50,
  SUPPORTED_INPUT_FORMATS: ['pdf', 'docx', 'doc', 'png', 'jpg', 'jpeg'],
  IS_DEV: __DEV__,
};
