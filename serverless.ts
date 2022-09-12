import type { AWS } from '@serverless/typescript';

import { getProductById, getProductList } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger', 'serverless-esbuild', 'serverless-webpack', 'serverless-offline'],
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
      role: 'arn:aws:iam::398158581759:role/BasicLambdaExecutionRole'
    }
  },
  // import the function via paths
  functions: { getProductById, getProductList },
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
    autoswagger: {
      typefiles: ['./src/types/product.ts']
    },
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
};

module.exports = serverlessConfiguration;
