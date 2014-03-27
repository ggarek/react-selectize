/** @jsx React.DOM */

/* CitySelect */
var CitySelect = React.createClass({
  __id: '#select-cities',

  rebuildSelectize: function () {
    var $select = $(this.__id).selectize({
      maxItems: null,
      valueField: 'id',
      labelField: 'name',
      searchField: 'name',
      options: this.props.cities,
      create: false
    });
  },

  componentDidMount: function () {
    this.rebuildSelectize();
  },

  componentDidUpdate: function () {
    var $select = $(this.__id)[0].selectize;
    $select.off();
    $select.destroy();

    this.rebuildSelectize();
  },

  render: function () {
    return <div class="control-group">
      <label for="select-cities">City:</label>
      <select id="select-cities" multiple placeholder="Pick a city..."></select>
    </div>
  }
});