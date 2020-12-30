import { Construct } from '@aws-cdk/core';

export interface MyConstructProps {
  // Define construct properties here
}

export class MyConstruct extends Construct {

  constructor(scope: Construct, id: string, props: MyConstructProps = {}) {
    super(scope, id);

    // Define construct contents here
  }

}
