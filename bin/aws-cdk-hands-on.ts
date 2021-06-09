#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { AwsCdkHandsOnStack } from '../lib/aws-cdk-hands-on-stack';

const app = new cdk.App();
new AwsCdkHandsOnStack(app, 'AwsCdkHandsOnStack');
