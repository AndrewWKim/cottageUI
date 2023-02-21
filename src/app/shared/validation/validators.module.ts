import { NgModule } from '@angular/core';

import { ltTo, LessThanToValidator } from './less-than-to';
import { gtTo, GreaterThanToValidator } from './greater-than-to';
import { requiredNoWhitespace, RequiredNoWhitespaceValidator } from './required-no-whitespace';
import { withMaskNoUnderscore, WithMaskNoUnderscoreValidator } from './passport';

export const CustomValidators: any = {
    ltTo,
    gtTo,
    requiredNoWhitespace,
    withMaskNoUnderscore,
};

const VALIDATOR_DIRECTIVES = [
    LessThanToValidator,
    GreaterThanToValidator,
    RequiredNoWhitespaceValidator,
    WithMaskNoUnderscoreValidator,
];

@NgModule({
    declarations: [VALIDATOR_DIRECTIVES],
    exports: [VALIDATOR_DIRECTIVES]
})
export class ValidatorsModule {
}
