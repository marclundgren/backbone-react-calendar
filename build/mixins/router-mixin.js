React.RouterMixin = {
  componentWillMount : function() {
    this.callback = (function() {
      this.forceUpdate();
    }).bind(this);

    this.props.router.on('route', this.callback);
  },

  callback: function() {
    this.forceUpdate();
  },

  componentWillUnmount : function() {
    this.props.router.off('route', this.callback);
  }
};