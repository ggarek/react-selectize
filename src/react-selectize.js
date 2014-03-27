/** @jsx React.DOM */

/* React selectize wrapper */
var ReactSelectize = React.createClass({
  _defaults: {
    valueField: "id",
    labelField: "name",
    searchField: "name",
    create: false
  },

  buildOptions: function () {
    var o = {},
      d = this._defaults;

    o.valueField = this.props.valueField || d.valueField;
    o.labelField = this.props.labelField || d.labelField;
    o.searchField = this.props.searchField || d.searchField;
    if(this.props.multiple || this.props.maxItems != undefined){
      // Selectize becomes 'multiple' when 'maxItems' is passed via settings
      o.maxItems = this.props.maxItems || null;
    }
    o.options = this.props.items || [];
    o.create = this.props.create || d.create;

    return o;
  },

  rebuildSelectize: function () {
    var selectId = "#" + this.props.selectId,
      $select = $(selectId),
      selectControl = $select[0] && $select[0].selectize,
      items = this.props.items;

    if(selectControl) {
      // rebuild
      selectControl.off();
      selectControl.clearOptions();
      selectControl.load(function (cb) { cb(items) });
    } else {
      // build new
      $select = $select.selectize(this.buildOptions());
      selectControl = $select[0].selectize;
    }

    selectControl.setValue(this.props.value);
    if(this.props.onChange){
      selectControl.on('change', this.props.onChange);
    }
  },

  componentDidMount: function () {
    this.rebuildSelectize();
  },

  componentDidUpdate: function () {
    this.rebuildSelectize();
  },

  render: function () {
    return <div class="control-group">
      <label for={this.props.selectId}>{this.props.label}</label>
      <select id={this.props.selectId} placeholder={this.props.placeholder}></select>
    </div>
  }
});