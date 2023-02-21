import { Directive, HostListener, Output, EventEmitter } from '@angular/core'

const ESCAPE_KEY_CODE = 27

@Directive({
    selector: '[escKey]'
})
export class EscKeyDirective {
    @Output() onEscKey = new EventEmitter()

    @HostListener('keypress', ['$event']) onKeyPress(e: Event) {
        this.handleKey(e)
    }

    @HostListener('keydown', ['$event']) onKeyDown(e: Event) {
        this.handleKey(e)
    }

    private handleKey(e) {
        if (e.which === ESCAPE_KEY_CODE) {
            e.preventDefault()
            this.onEscKey.emit()
        }
    }
}
