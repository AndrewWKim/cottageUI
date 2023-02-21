export class TimeSpan {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;

    get isEmpty() {
        return this.hours === 0 && this.minutes === 0 && this.seconds === 0;
    }

    toString() {
        if (this.isEmpty) {
            return '0';
        }
        let result = '';
        if (this.days > 0) {
            result += this.days + 'd ';
        }
        if (this.hours > 0) {
            result += this.hours + 'h ';
        }
        if (this.minutes > 0) {
            result += this.minutes + 'm ';
        }
        if (this.seconds > 0) {
            result += this.seconds + 's';
        }
        return result;
    }

    parseFromString(timeStr: string): TimeSpan {
        const result = new TimeSpan();
        if (!timeStr) {
            return result;
        }

        const timeParts = timeStr.split(':');

        const parts = timeParts[0].split('.');

        if (parts.length === 2) {
            result.days = this.timeSpanPartToNumber(parts[0]);
        }

        result.hours = this.timeSpanPartToNumber(timeParts[0]);
        result.minutes = this.timeSpanPartToNumber(timeParts[1]);
        if (timeParts[2].indexOf('.') === -1) {
            result.seconds = this.timeSpanPartToNumber(timeParts[2]);
            result.milliseconds = 0;
            return result;
        }

        const secondsParts = timeParts[2].split('.');
        result.seconds = this.timeSpanPartToNumber(secondsParts[0]);
        result.milliseconds = this.timeSpanPartToNumber(secondsParts[1]);
        return result;
    }

    private timeSpanPartToNumber(part: string) {
        if (part === '00') {
            return 0;
        }
        if (part[0] !== '0') {
            return parseInt(part);
        }
        return parseInt(part[1]);
    }
}