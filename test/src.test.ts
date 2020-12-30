import { expect as expectCDK, countResources } from '@aws-cdk/assert';
import { App, Stack } from "@aws-cdk/core";
import { MyConstruct } from '../lib/index';

/*
 * Example test 
 */
test('SNS Topic Not Created', () => {
  const app = new App();
  const stack = new Stack(app, "TestStack");

  new MyConstruct(stack, 'MyTestConstruct');

  expectCDK(stack).to(countResources("AWS::SNS::Topic",0));
});
