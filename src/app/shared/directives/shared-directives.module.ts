import { NgModule } from '@angular/core'
import { EscKeyDirective } from 'app/shared/directives/esc-key.directive'
import { DisableControlDirective } from 'app/shared/directives/disable-control.directive'
import { MaskDateDirective } from './mask-date.directive';
import { SortingHeaderDirective } from './sorting-header.directive';
import { ThrottleClickDirective } from './throttle-click.directive';
import { NumbersOnlyDirective } from './numbers-only.directive';
import { ShowIfTruncatedDirective } from './tooltip-show-if-truncated.directive';
import { MatSpinner } from '@angular/material/progress-spinner';
import { ButtonSpinnerDirective } from './button-spinner.directive';
import { LimitToMaxDirective } from './limit-to-max.directive';
import { PassportMaskDirective } from './passport-mask.directive';

@NgModule({
    entryComponents: [
        MatSpinner
    ],
    declarations: [
        EscKeyDirective,
        DisableControlDirective,
        MaskDateDirective,
        SortingHeaderDirective,
        ThrottleClickDirective,
        NumbersOnlyDirective,
        ShowIfTruncatedDirective,
        ButtonSpinnerDirective,
        LimitToMaxDirective,
        PassportMaskDirective,
    ],
    exports: [
        EscKeyDirective,
        DisableControlDirective,
        MaskDateDirective,
        SortingHeaderDirective,
        ThrottleClickDirective,
        NumbersOnlyDirective,
        ShowIfTruncatedDirective,
        ButtonSpinnerDirective,
        LimitToMaxDirective,
        PassportMaskDirective,
    ]
})
export class SharedDirectivesModule { }
