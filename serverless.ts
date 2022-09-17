import type { AWS } from '@serverless/typescript';

import { addProduct, getProductById, getProductList } from '@functions/index';

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
      TABLE_NAME: '${self:custom.tableName}'
    },
    iam: {
      role: {
        statements: [{
          Effect: 'Allow',
          Action: [
            'dynamodb:DescribeTable',
            'dynamodb:Query',
            'dynamodb:Scan',
            'dynamodb:GetItem',
            'dynamodb:PutItem',
            'dynamodb:UpdateItem',
            'dynamodb:DeleteItem',
          ],
          Resource: '*',
        }],
        permissionsBoundary: 'arn:aws:iam::398158581759:policy/eo_role_boundary',
      },
    },
  },
  // import the function via paths
  functions: { addProduct, getProductById, getProductList },
  package: { individually: true },
  custom: {
    tableName: 'products-table-viktoryia-yalavaya',
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
  resources: {
    Resources: {
      productsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:custom.tableName}',
          AttributeDefinitions: [{
            AttributeName: 'id',
            AttributeType: 'S',
          }],
          KeySchema: [{
            AttributeName: 'id',
            KeyType: 'HASH',
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          }
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
