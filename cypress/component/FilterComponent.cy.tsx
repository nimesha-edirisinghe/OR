import React from 'react';

declare global {
  namespace Cypress {
    interface Chainable {
      state(state: any): any;
    }
  }
}
