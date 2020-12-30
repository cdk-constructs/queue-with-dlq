import { expect as expectCDK, countResources, haveResource } from '@aws-cdk/assert';
import { App, Stack, Duration } from "@aws-cdk/core";
import { QueueWithDLQ } from '../lib';

test('Both queues are created', () => {
  const app = new App();
  const stack = new Stack(app, "TestStack");

  new QueueWithDLQ(stack, 'TestQueueWithDLQ', {
    name: 'test-queue'
  });

  expectCDK(stack).to(countResources("AWS::SQS::Queue",2));
});

test('DLQ is correctly named', () => {
  const app = new App();
  const stack = new Stack(app, "TestStack");

  new QueueWithDLQ(stack, 'TestQueueWithDLQ', {
    name: 'test-queue'
  });

  expectCDK(stack).to(haveResource('AWS::SQS::Queue', {
    QueueName: 'test-queue-dlq'
  }));
});

test('Main queue is correctly named', () => {
  const app = new App();
  const stack = new Stack(app, "TestStack");

  new QueueWithDLQ(stack, 'TestQueueWithDLQ', {
    name: 'test-queue'
  });

  expectCDK(stack).to(haveResource('AWS::SQS::Queue', {
    QueueName: 'test-queue'
  }));
});

test('DLQ is set as main queue DLQ', () => {
  const app = new App();
  const stack = new Stack(app, "TestStack");

  new QueueWithDLQ(stack, 'TestQueueWithDLQ', {
    name: 'test-queue'
  });

  expectCDK(stack).to(haveResource('AWS::SQS::Queue', {
    RedrivePolicy: {
      deadLetterTargetArn: {
        'Fn::GetAtt': [
          'TestQueueWithDLQtestqueuedlq6304425D',
          'Arn'
        ]
      },
      maxReceiveCount: 5
    }
  }));
});

test('Duration overrides are set correctly', () => {
  const app = new App();
  const stack = new Stack(app, "TestStack");

  new QueueWithDLQ(stack, 'TestQueueWithDLQ', {
    name: 'test-queue',
    deliveryDelay: Duration.seconds(30),
    receiveMessageWaitTime: Duration.seconds(10),
    retentionPeriod: Duration.days(7),
    visibilityTimeout: Duration.minutes(1)
  });

  // DLQ
  expectCDK(stack).to(haveResource('AWS::SQS::Queue', {
    DelaySeconds: 30,
    MessageRetentionPeriod: 604800,
    QueueName: "test-queue-dlq",
    ReceiveMessageWaitTimeSeconds: 10,
    VisibilityTimeout: 60
  }));

  // Main Queue
  expectCDK(stack).to(haveResource('AWS::SQS::Queue', {
    DelaySeconds: 30,
    MessageRetentionPeriod: 604800,
    QueueName: "test-queue",
    ReceiveMessageWaitTimeSeconds: 10,
    VisibilityTimeout: 60,
    RedrivePolicy: {
      deadLetterTargetArn: {
        'Fn::GetAtt': [
          'TestQueueWithDLQtestqueuedlq6304425D',
          'Arn'
        ]
      },
      maxReceiveCount: 5
    }
  }));
});
