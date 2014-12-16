/** @jsx React.DOM */

/* React selectize wrapper */
var ReactSelectize = React.createClass({displayName: 'ReactSelectize',

  getDefaultProps: function () {
    return {
      valueField: "id",
      labelField: "name",
      searchField: "name",
      sortField: "id",
      create: false,
      plugins: [],
      items: []
    };
  },

  isMultiple: function (props) {
    // Selectize becomes 'multiple' when 'maxItems' is passed via settings
    return props.multiple || props.maxItems != undefined;
  },

  buildOptions: function () {
    var o = {};

    o.valueField = this.props.valueField;
    o.labelField = this.props.labelField;
    o.searchField = this.props.searchField;
    o.sortField = this.props.sortField;
    if(this.isMultiple(this.props)){
      o.maxItems = this.props.maxItems || null;
    }
    o.options = this.props.items;
    o.create = this.props.create;
    o.plugins = this.props.plugins;

    return o;
  },

  getSelectizeControl: function () {
    var selectId = "#" + this.props.selectId,
      $select = $(selectId),
      selectControl = $select[0] && $select[0].selectize;

    return selectControl;
  },

  handleChange: function (e) {

    // IF Selectize is not multiple
    if(!this.isMultiple(this.props)){
      // THEN blur it before calling onChange to prevent dropdown reopening
      this.getSelectizeControl().blur();
    }

    if(this.props.onChange){
      this.props.onChange(e);
    }
  },

  rebuildSelectize: function () {
    var $select = null,
      selectControl = this.getSelectizeControl(),
      items = this.props.items;

    if(selectControl) {
      // rebuild
      selectControl.off();
      selectControl.clearOptions();
      selectControl.load(function (cb) { cb(items) });
    } else {
      // build new
      $select = $("#" + this.props.selectId).selectize(this.buildOptions());
      selectControl = $select[0].selectize;
    }

    selectControl.setValue(this.props.value);

    if(this.props.onChange){
      selectControl.on('change', this.handleChange);
    }
  },

  componentDidMount: function () {
    this.rebuildSelectize();
  },

  componentDidUpdate: function () {
    this.rebuildSelectize();
  },

  render: function () {
    var classes = this.props.classes;
    return React.DOM.div( {className:classes && classes.length > 0 ? classes.join(' ') : ''},
      React.DOM.label( {for:this.props.selectId}, this.props.label),
      React.DOM.select( {id:this.props.selectId, placeholder:this.props.placeholder})
    )
  }
});
