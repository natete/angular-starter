import { FormGroup } from '@angular/forms';

export class GenericValidator {

  constructor(private validationMessages: { [key: string]: { [key: string]: string } }) { }

  processMessages(container: FormGroup): { [key: string]: string } {

    const messages = {};

    for (const controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        const control = container.controls[controlKey];
        // If it is a FormGroup, process its child controls.
        if (control instanceof FormGroup) {
          const childMessages = this.processMessages(control);
          Object.assign(messages, childMessages);
        } else {
          // Only validate if there are validation messages for the control
          if (this.validationMessages[controlKey]) {
            messages[controlKey] = '';
            if ((control.dirty || control.touched) && control.errors) {
              Object.keys(control.errors).map(messageKey => {
                if (this.validationMessages[controlKey][messageKey]) {
                  messages[controlKey] += this.validationMessages[controlKey][messageKey] + ' ';
                }
              });
            }
          }
        }
      }
    }
    return messages;
  }
}
