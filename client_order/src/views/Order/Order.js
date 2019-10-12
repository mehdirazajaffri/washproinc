import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
// core components
import Wizard from 'components/Wizard/Wizard.js';
import React from 'react';
import Step1 from './OrderFormSteps/Step1.js';
import Step2 from './OrderFormSteps/Step2.js';
import Step3 from './OrderFormSteps/Step3.js';
import Step4 from './OrderFormSteps/Step4.js';
import Service from 'services/login.js';

class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.service = new Service();

    let token = this.service.api('orders/api/orders-detail', 'GET').then(res => {
      console.log(res);
    });
  }
  render() {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <Wizard
            finishButtonClick={state => console.log(state)}
            validate
            steps={[
              {
                stepName: 'Address',
                stepComponent: Step1,
                stepId: 'address'
              },
              {
                stepName: 'Available Services',
                stepComponent: Step2,
                stepId: 'services'
              },
              {
                stepName: 'Handoffs',
                stepComponent: Step3,
                stepId: 'handoffs'
              },
              { stepName: 'Summary', stepComponent: Step4, stepId: 'summary' }
            ]}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default OrderForm;
