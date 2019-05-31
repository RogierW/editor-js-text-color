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
        this.defaultColor = '#f50400';
    }

    render() {
        this.button = document.createElement('button');

        this.button.type = 'button';
        this.button.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="palette" class="svg-inline--fa fa-palette fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path></svg>';
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