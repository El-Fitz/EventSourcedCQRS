import { Component } from '@serverless/typescript';

class MyComponent extends Component {
  async deploy(inputs = {}) {
    return {};
  } // The default functionality to run/provision/update your Component
}

module.exports = MyComponent;