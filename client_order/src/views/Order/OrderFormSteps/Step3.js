import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons
import Home from '@material-ui/icons/Home';
import Business from '@material-ui/icons/Business';

// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import NavPills from 'components/NavPills/NavPills.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { cardTitle } from 'assets/jss/material-dashboard-pro-react.js';
import extendedFormsStyle from 'assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import CustomInput from 'components/CustomInput/CustomInput.js';

const styles = {
  cardTitle,
  pageSubcategoriesTitle: {
    color: '#3C4858',
    textDecoration: 'none',
    textAlign: 'center'
  },
  cardCategory: {
    margin: '0',
    color: '#999999'
  },
  ...extendedFormsStyle
};
class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      md_chooseDate: '',
      md_deliveryDate: '',
      md_dates: [
        { date: 'Mon, Feb 11th' },
        { date: 'Tue, Feb 12th' },
        { date: 'Wed, Feb 13th' },
        { date: 'Thu, Feb 14th' },
        { date: 'Fri, Feb 15th' }
      ],
      md_selectedRadio: '',
      mb_chooseDate: '',
      mb_deliveryDate: '',
      mb_dates: [
        { date: 'Mon, Feb 11th' },
        { date: 'Tue, Feb 12th' },
        { date: 'Wed, Feb 13th' },
        { date: 'Thu, Feb 14th' },
        { date: 'Fri, Feb 15th' }
      ],
      mb_selectedRadio: ''
    };
  }
  handleChange(state, event) {
    this.setState({ [state]: event.target.value });
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes } = this.props;
    const { md_dates, mb_dates } = this.state;
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <i className="material-icons color step-heading-icons">tag_faces</i>
            <h3 className="step-heading">Handoffs</h3>
            <br />
            <NavPills
              color="warning"
              alignCenter
              tabs={[
                {
                  tabButton: 'My front door',
                  tabIcon: Home,
                  tabContent: (
                    <Card>
                      <CardHeader className="pbn">
                        <h4 className={classes.cardTitle} />
                      </CardHeader>
                      <CardBody className="ptn">
                        <GridContainer className="ptn">
                          <GridItem xs={12} sm={6} md={6} lg={6}>
                            <h4 className={classes.cardTitle}>Pickup</h4>
                            <FormControl fullWidth className={classes.selectFormControl}>
                              <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
                                Choose Date
                              </InputLabel>
                              <Select
                                MenuProps={{
                                  className: classes.selectMenu
                                }}
                                classes={{
                                  select: classes.select
                                }}
                                value={this.state.md_chooseDate}
                                onChange={this.handleSimple}
                                inputProps={{
                                  name: 'md_chooseDate',
                                  id: 'simple-select'
                                }}
                              >
                                <MenuItem
                                  disabled
                                  classes={{
                                    root: classes.selectMenuItem
                                  }}
                                >
                                  Choose Date
                                </MenuItem>
                                {md_dates.length &&
                                  md_dates.map(d => {
                                    return (
                                      <MenuItem
                                        key={d.date}
                                        classes={{
                                          root: classes.selectMenuItem,
                                          selected: classes.selectMenuItemSelected
                                        }}
                                        value={d.date}
                                      >
                                        {d.date}
                                      </MenuItem>
                                    );
                                  })}
                              </Select>
                            </FormControl>

                            {this.state.md_chooseDate && (
                              <div
                                className={
                                  classes.checkboxAndRadio +
                                  ' ' +
                                  classes.checkboxAndRadioHorizontal +
                                  ' pickup-radio mt10'
                                }
                              >
                                <FormControlLabel
                                  control={
                                    <Radio
                                      checked={this.state.md_selectedRadio === 'a'}
                                      onChange={e => this.handleChange('md_selectedRadio', e)}
                                      value="a"
                                      name="radio button demo"
                                      aria-label="A"
                                      icon={<FiberManualRecord className={classes.radioUnchecked} />}
                                      checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                                      classes={{
                                        checked: classes.radio,
                                        root: classes.radioRoot
                                      }}
                                    />
                                  }
                                  classes={{
                                    label: classes.label
                                  }}
                                  label="Leave with door staff by 10:00 AM"
                                />
                              </div>
                            )}

                            {this.state.md_selectedRadio && (
                              <React.Fragment>
                                <h4 className={classes.cardTitle + ' mt30'}>Pickup Instructions</h4>
                                <p>Add any instructions that will help make your hand off go as smooth as possible</p>
                                <CustomInput
                                  labelText="Enter note"
                                  id="note"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    type: 'text'
                                  }}
                                  className="ptn"
                                />
                              </React.Fragment>
                            )}
                          </GridItem>
                          <GridItem xs={12} sm={6} md={6} lg={6}>
                            <h4 className={classes.cardTitle}>Delivery</h4>
                            {!this.state.md_selectedRadio ? (
                              <p>You must choose your pickup before selecting your delivery</p>
                            ) : (
                              <FormControl fullWidth className={classes.selectFormControl}>
                                <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
                                  Choose Date
                                </InputLabel>
                                <Select
                                  MenuProps={{
                                    className: classes.selectMenu
                                  }}
                                  classes={{
                                    select: classes.select
                                  }}
                                  value={this.state.md_deliveryDate}
                                  onChange={this.handleSimple}
                                  inputProps={{
                                    name: 'md_deliveryDate',
                                    id: 'simple-select'
                                  }}
                                >
                                  <MenuItem
                                    disabled
                                    classes={{
                                      root: classes.selectMenuItem
                                    }}
                                  >
                                    Choose Date
                                  </MenuItem>
                                  {md_dates.length &&
                                    md_dates.map(d => {
                                      return (
                                        <MenuItem
                                          key={d.date}
                                          classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                          }}
                                          value={d.date}
                                        >
                                          {d.date}
                                        </MenuItem>
                                      );
                                    })}
                                </Select>
                              </FormControl>
                            )}
                          </GridItem>
                        </GridContainer>
                      </CardBody>
                    </Card>
                  )
                },
                {
                  tabButton: "My building's front desk",
                  tabIcon: Business,
                  tabContent: (
                    <Card>
                      <CardHeader className="pbn">
                        <h4 className={classes.cardTitle} />
                      </CardHeader>
                      <CardBody className="ptn">
                        <GridContainer className="ptn">
                          <GridItem xs={12} sm={6} md={6} lg={6}>
                            <h4 className={classes.cardTitle}>Pickup</h4>
                            <FormControl fullWidth className={classes.selectFormControl}>
                              <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
                                Choose Date
                              </InputLabel>
                              <Select
                                MenuProps={{
                                  className: classes.selectMenu
                                }}
                                classes={{
                                  select: classes.select
                                }}
                                value={this.state.mb_chooseDate}
                                onChange={this.handleSimple}
                                inputProps={{
                                  name: 'mb_chooseDate',
                                  id: 'simple-select'
                                }}
                              >
                                <MenuItem
                                  disabled
                                  classes={{
                                    root: classes.selectMenuItem
                                  }}
                                >
                                  Choose Date
                                </MenuItem>
                                {mb_dates.length &&
                                  mb_dates.map(d => {
                                    return (
                                      <MenuItem
                                        key={d.date}
                                        classes={{
                                          root: classes.selectMenuItem,
                                          selected: classes.selectMenuItemSelected
                                        }}
                                        value={d.date}
                                      >
                                        {d.date}
                                      </MenuItem>
                                    );
                                  })}
                              </Select>
                            </FormControl>

                            {this.state.mb_chooseDate && (
                              <div
                                className={
                                  classes.checkboxAndRadio +
                                  ' ' +
                                  classes.checkboxAndRadioHorizontal +
                                  ' pickup-radio mt10'
                                }
                              >
                                <FormControlLabel
                                  control={
                                    <Radio
                                      checked={this.state.mb_selectedRadio === 'b'}
                                      onChange={e => this.handleChange('mb_selectedRadio', e)}
                                      value="b"
                                      name="radio button demo"
                                      aria-label="B"
                                      icon={<FiberManualRecord className={classes.radioUnchecked} />}
                                      checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                                      classes={{
                                        checked: classes.radio,
                                        root: classes.radioRoot
                                      }}
                                    />
                                  }
                                  classes={{
                                    label: classes.label
                                  }}
                                  label="Leave with door staff by 10:00 AM"
                                />
                              </div>
                            )}

                            {this.state.mb_selectedRadio && (
                              <React.Fragment>
                                <h4 className={classes.cardTitle + ' mt30'}>Pickup Instructions</h4>
                                <p>Add any instructions that will help make your hand off go as smooth as possible</p>
                                <CustomInput
                                  labelText="Enter note"
                                  id="note"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    type: 'text'
                                  }}
                                  className="ptn"
                                />
                              </React.Fragment>
                            )}
                          </GridItem>
                          <GridItem xs={12} sm={6} md={6} lg={6}>
                            <h4 className={classes.cardTitle}>Delivery</h4>
                            {!this.state.mb_selectedRadio ? (
                              <p>You must choose your pickup before selecting your delivery</p>
                            ) : (
                              <FormControl fullWidth className={classes.selectFormControl}>
                                <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
                                  Choose Date
                                </InputLabel>
                                <Select
                                  MenuProps={{
                                    className: classes.selectMenu
                                  }}
                                  classes={{
                                    select: classes.select
                                  }}
                                  value={this.state.mb_deliveryDate}
                                  onChange={this.handleSimple}
                                  inputProps={{
                                    name: 'mb_deliveryDate',
                                    id: 'simple-select'
                                  }}
                                >
                                  <MenuItem
                                    disabled
                                    classes={{
                                      root: classes.selectMenuItem
                                    }}
                                  >
                                    Choose Date
                                  </MenuItem>
                                  {mb_dates.length &&
                                    mb_dates.map(d => {
                                      return (
                                        <MenuItem
                                          key={d.date}
                                          classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                          }}
                                          value={d.date}
                                        >
                                          {d.date}
                                        </MenuItem>
                                      );
                                    })}
                                </Select>
                              </FormControl>
                            )}
                          </GridItem>
                        </GridContainer>
                      </CardBody>
                    </Card>
                  )
                }
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Step3);
