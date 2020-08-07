/**
 * Build styles
 */
require('./index.css').toString();

class TextColor {
    static get isInline() {
        return true;
    }

    get state() {
        return this._state;
    }

    set state(state) {
        this._state = state;

        this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
    }

    constructor({api}) {
        this.api = api;

        this.button = null;
        this._state = false;

        this.tag = 'SPAN';
        this.class = 'cdx-text-color';
        this.defaultColor = '#2644FF';
    }

    render() {
        this.button = document.createElement('button');

        this.button.type = 'button';
        this.button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" style=" fill:currentColor;" height="16" width="16">    <path d="M 12 2 C 11.398 2 10.859437 2.3725469 10.648438 2.9355469 L 5.4746094 16.734375 C 5.2456094 17.346375 5.6975625 18 6.3515625 18 C 6.7415625 18 7.0915156 17.758578 7.2285156 17.392578 L 8.875 13 L 15.125 13 L 16.771484 17.392578 C 16.908484 17.757578 17.258437 18 17.648438 18 C 18.302437 18 18.754391 17.346375 18.525391 16.734375 L 13.351562 2.9355469 C 13.140562 2.3725469 12.602 2 12 2 z M 12 4.6679688 L 14.375 11 L 9.625 11 L 12 4.6679688 z M 5.9355469 20 C 5.4185469 20 5 20.4195 5 20.9375 L 5 21.064453 C 5 21.581453 5.4185469 22 5.9355469 22 L 18.064453 22 C 18.581453 22 19 21.5805 19 21.0625 L 19 20.935547 C 19 20.418547 18.5805 20 18.0625 20 L 5.9355469 20 z"></path></svg>';
        this.button.classList.add(this.api.styles.inlineToolButton);

        return this.button;
    }

    surround(range) {
        if (this.state) {
            this.unwrap(range);

            return;
        }

        this.wrap(range);
    }

    wrap(range) {
        const selectedText = range.extractContents();
        const span = document.createElement(this.tag);

        span.classList.add(this.class);
        span.appendChild(selectedText);
        range.insertNode(span);

        this.api.selection.expandToTag(span);
    }

    unwrap(range) {
        const span = this.api.selection.findParentTag(this.tag, this.class);
        const text = range.extractContents();

        span.remove();
        range.insertNode(text);
    }

    renderActions() {
        this.colorPicker = document.createElement('input');

        this.colorPicker.type = 'color';
        this.colorPicker.value = this.defaultColor;
        this.colorPicker.hidden = true;

        return this.colorPicker;
    }

    showActions(span) {
        const {backgroundColor} = span.style;

        this.colorPicker.value = backgroundColor ? this.convertToHex(backgroundColor) : this.defaultColor;

        this.colorPicker.onchange = () => {
            span.style.color = this.colorPicker.value;
        };

        this.colorPicker.hidden = false;
    }

    hideActions() {
        this.colorPicker.onchange = null;
        this.colorPicker.hidden = true;
    }

    convertToHex(color) {
        const rgb = color.match(/(\d+)/g);

        let hexr = parseInt(rgb[0]).toString(16);
        let hexg = parseInt(rgb[1]).toString(16);
        let hexb = parseInt(rgb[2]).toString(16);

        hexr = hexr.length === 1 ? '0' + hexr : hexr;
        hexg = hexg.length === 1 ? '0' + hexg : hexg;
        hexb = hexb.length === 1 ? '0' + hexb : hexb;

        return '#' + hexr + hexg + hexb;
    }

    checkState(selection) {
        const span = this.api.selection.findParentTag(this.tag);

        this.state = !!span;

        if (this.state) {
            this.showActions(span);
        } else {
            this.hideActions();
        }
    }
}

module.exports = TextColor;