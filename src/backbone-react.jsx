/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

// Backbone Mixin for React
var BackboneMixin = {
  componentDidMount: function() {
    // Whenever there may be a change in the Backbone data, trigger a reconcile.
    this.getBackboneModels().forEach(function(model) {
      model.on('add change remove', this.forceUpdate.bind(this, null), this);
    }, this);
  },

  componentWillUnmount: function() {
    // Ensure that we clean up any dangling references when the component is
    // destroyed.
    this.getBackboneModels().forEach(function(model) {
      model.off(null, null, this);
    }, this);
  }
};

// React Component
// var List = React.createClass({

//     // apply the Backbone mixin
//     mixins: [BackboneMixin],

//     // continue with vanilla React
//     getDefaultProps: function() {
//       return {
//         myCollection: new BC([bm1, bm2])
//       };
//     },

//     getBackboneModels: function() {
//         return [this.props.myCollection];
//     },

//     render: function() {
//         var listItems = this.props.myCollection.map(function(item) {

//             return <li>{item.get("someAttr")}</li>;
//         });
//         return <ul>{listItems}</ul>;
//     }
// });

// console.log('render list!');

// React.renderComponent(
//   <List />,
//   document.getElementById('list')
// );