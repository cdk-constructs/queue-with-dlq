import { Construct, Duration } from '@aws-cdk/core';
import { Queue } from "@aws-cdk/aws-sqs";

export interface QueueWithDLQProps {
  name: string;
  retentionPeriod?: Duration;
  visibilityTimeout?: Duration;
  receiveMessageWaitTime?: Duration;
  deliveryDelay?: Duration;
}

export class QueueWithDLQ extends Construct {

  public queue: Queue;
  public dlq: Queue;

  constructor(scope: Construct, id: string, props: QueueWithDLQProps) {
    super(scope, id);

    this.dlq = new Queue(this, props.name + '-dlq', {
      queueName: props.name + '-dlq',
      deliveryDelay: props.deliveryDelay || undefined,
      receiveMessageWaitTime: props.receiveMessageWaitTime || undefined,
      retentionPeriod: props.retentionPeriod || undefined,
      visibilityTimeout: props.visibilityTimeout || undefined
    });

    this.queue = new Queue(this, props.name + '-queue', {
      queueName: props.name,
      deliveryDelay: props.deliveryDelay || undefined,
      receiveMessageWaitTime: props.receiveMessageWaitTime || undefined,
      retentionPeriod: props.retentionPeriod || undefined,
      visibilityTimeout: props.visibilityTimeout || undefined,
      deadLetterQueue: {
        queue: this.dlq,
        maxReceiveCount: 5
      }
    });
  }

}
