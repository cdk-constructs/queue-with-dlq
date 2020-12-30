# @simple-cdk-constructs/queue-with-dlq

![CI Tests](https://github.com/cdk-constructs/queue-with-dlq/workflows/CI%20Tests/badge.svg?branch=main)
![Package Audit](https://github.com/cdk-constructs/queue-with-dlq/workflows/Package%20Audit/badge.svg?branch=main)


It's rare I've ever created an SQS Queue without a DLQ. This construct will create both the queue and DLQ.

The DLQ will be suffixed with `-dlq`.

## Use Case

To create a resilient system using SQS it is recommended to have a DLQ so that you can catch and replay messages which fail to be consumed.

## Installation

```shell script
npm i @simple-cdk-constructs/queue-with-dlq
```

## Usage

```typescript
import { Stack, StackProps, Construct } from '@aws-cdk/core';
import { QueueWithDLQ } from '@simple-cdk-constructs/queue-with-dlq';

export class ExampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new QueueWithDLQ(this, 'queue-with-dlq', {
      name: 'webhook-notifications-queue'
    });
  }
}
```