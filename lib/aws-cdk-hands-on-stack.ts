import * as cdk from '@aws-cdk/core';
import * as lamda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import { HitCounter } from './hitcounter';
import { TableViewer } from 'cdk-dynamo-table-viewer';

export class AwsCdkHandsOnStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const hello = new lamda.Function(this,'HelloHandler',{
      runtime: lamda.Runtime.NODEJS_10_X,
      code: lamda.Code.fromAsset('./lambda'),
      handler: "hello.handler"
    })
    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      downstream: hello
    });

    new apigw.LambdaRestApi(this,'Endpoint',{
      handler: helloWithCounter.handler
    });

    new TableViewer(this, 'ViewHitCounter', {
      title: 'Hello Hits',
      table: helloWithCounter.table,
      sortBy: 'hits'
    });
  }
}
