export class ContentSetter {
  selectorPrefix = ''

  setPrefix(prefix) {
    this.selectorPrefix = prefix;
  }

  resetPrefix() {
    this.selectorPrefix = '';
  }

  // Takes contentNum's .contents() of selector and sets it to text.
  set(text, contentNum, selector) {
    var el = $(this.selectorPrefix + (selector || '')).contents()[contentNum];
    if (el) el.textContent = text;
  }

  // Each argument must be an array of 2 or 3 elements that become set arguments in order.
  setSeveral() {
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i].length === 2) this.set(arguments[i][0], arguments[i][1]);
      if (arguments[i].length === 3) this.set(arguments[i][0], arguments[i][1], arguments[i][2]);
    }
  }

  setArray(textArray, selector, start, step) {
    for (var j = 0; j < textArray.length; j++) {
      var contentNum = (start || 0) + j * (step || 1);
      this.set(textArray[j], contentNum, selector);
    }
  }
}
