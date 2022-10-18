import type { AWS } from '@serverless/typescript';
import { importProductsFile, importFileParser } from './functions/index';

const serverlessConfiguration: AWS = {
  service: 'import-service-viktoryia-yalavaya',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger', 'serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    stage: 'dev',
    profile: 'JSCC',
    region: 'eu-central-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              's3:ListBucket',
            ],
            Resource: 'arn:aws:s3:::import-service-viktoryia-yalavaya',
          },
          {
            Effect: 'Allow',
            Action: [
              's3:*',
            ],
            Resource: 'arn:aws:s3:::import-service-viktoryia-yalavaya/*',
          },
        ],
        permissionsBoundary: 'arn:aws:iam::${aws:accountId}:policy/eo_role_boundary',
      },
    },
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
  resources: {
    extensions: {
      IamRoleCustomResourcesLambdaExecution: {
        Properties: {
          PermissionsBoundary: 'arn:aws:iam::${aws:accountId}:policy/eo_role_boundary'
        }
      }
    }
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
