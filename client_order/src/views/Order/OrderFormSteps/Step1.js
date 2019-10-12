import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';

// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const style = {
  infoText: {
    fontWeight: '300',
    margin: '10px 0 30px',
    textAlign: 'center'
  },
  inputAdornmentIcon: {
    color: '#555'
  },
  inputAdornment: {
    position: 'relative'
  }
};

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      address: '',
      locationState: '',
      locationFound: false,
      extraDetails: ''
    };

    this.searchOptions = {
      location: new window.google.maps.LatLng(-34, 151),
      radius: 2000,
      types: ['address']
    };
  }

  sendState() {
    return this.state;
  }

  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case 'length':
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + 'State']: 'success' });
        } else {
          this.setState({ [stateName + 'State']: 'error' });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }

  isValidated() {
    if (this.state.locationState === 'success') {
      return true;
    } else {
      if (this.state.locationState !== 'success') {
        this.setState({ locationState: 'error' });
      }
    }
    return false;
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ address, locationFound: true, locationState: 'success' });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <i className="material-icons color step-heading-icons">my_location</i>
          <h3 className={classes.infoText}>Service Address</h3>
        </GridItem>
        <GridItem xs={12} sm={6}>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            searchOptions={this.searchOptions}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <CustomInput
                  success={this.state.locationState === 'success'}
                  error={this.state.locationState === 'error'}
                  labelText={<span>Enter your service address</span>}
                  id="location"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    ...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'location-search-input'
                    }),
                    endAdornment: (
                      <InputAdornment position="end" className={classes.inputAdornment}>
                        <i className="material-icons">add_location</i>
                      </InputAdornment>
                    )
                  }}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>

          {this.state.locationFound && (
            <CustomInput
              labelText={<span>Apt 3, Suite 5</span>}
              id="location"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.setState({ extraDetails: event.target.value }),
                endAdornment: (
                  <InputAdornment position="end" className={classes.inputAdornment}>
                    <i className="material-icons">location_city</i>
                  </InputAdornment>
                )
              }}
            />
          )}
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(style)(Step1);
