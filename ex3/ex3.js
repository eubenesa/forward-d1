var Widget = {
  setDims: function(width = 50, height = 50) {
    this.width = width;
    this.height = height;
    this.$elem = null;
  },

  buildDomElem: function($where) {
    if (this.$elem) {
      this.$elem.css({
        width: this.width + 'px',
        height: this.height + 'px'
      }).appendTo($where);
    }
  }
};

var Button = Object.assign(Object.create(Widget), {
  config: function(width, height, label = 'Default') {
    this.setDims(width, height);
    this.label = label;
    this.$elem = $('<button>').text(this.label);
  },

  render: function($where) {
    this.buildDomElem($where);
    this.$elem.click(this.onClick.bind(this));
  },

  onClick: function(e) {
    console.log(`Button \'${this.label}\' clicked!`);
  }
});

$(document).ready(function() {
  var $body = $(document.body);

  var btn1 = Object.create(Button);
  btn1.config(125, 30, 'Hello');
  var btn2 = Object.create(Button);
  btn2.config(150, 40, 'World');

  btn1.render($body);
  btn2.render($body);
});
