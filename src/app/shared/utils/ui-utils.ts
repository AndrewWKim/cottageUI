export class UIUtils {

    static parseCss(value: any): any {
        if (value instanceof String) {
            return value.split(' ')
                .reduce((css, className) => {
                    css[className] = true
                    return css
                }, {})
        }

        return value
    }
}