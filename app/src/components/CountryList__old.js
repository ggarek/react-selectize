/* CountrySelect */
var CountrySelect = React.createClass({
  __id: '#select-countries',

  rebuildSelectize: function () {
    var selectControl = $(this.__id)[0].selectize,
      countries = this.props.countries;

    if(selectControl) {
      // rebuild
      console.log('country list rebuild selectize');
      selectControl.off();
      selectControl.clearOptions();
      selectControl.load(function (cb) { cb(countries) });
    } else {
      // build new
      console.log('country list build new selectize');
      selectControl = $(this.__id).selectize({
//                maxItems: null,
        valueField: 'id',
        labelField: 'name',
        searchField: 'name',
        options: this.props.countries,
        create: false
      });

      selectControl = selectControl[0].selectize;
    }

    selectControl.setValue(this.props.value);
//        $select[0].selectize.on('change', this.handleChange.bind(this));
    selectControl.on('change', this.props.onChange);
  },

  handleChange: function (value) {
    var $select = $(this.__id)[0].selectize;
    $select.off();

    this.props.onChange(value);

    $select.on('change', this.handleChange.bind(this));
  },

  componentDidMount: function () {
    this.rebuildSelectize();
  },

  componentDidUpdate: function () {
    /*
     var $select = $(this.__id)[0].selectize;
     $select.destroy();
     */
    this.rebuildSelectize();
  },

  render: function () {
    return <div class="control-group">
      <label for="select-countries">Country:</label>
      <select id="select-countries" placeholder="Pick a country..."></select>
    </div>
  }
});
