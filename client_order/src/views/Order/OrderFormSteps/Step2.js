import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from 'components/CustomButtons/Button.js';
import Close from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Danger from 'components/Typography/Danger.js';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Check from '@material-ui/icons/Check';

// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';

import customSelectStyle from 'assets/jss/material-dashboard-pro-react/customSelectStyle.js';
import customCheckboxRadioSwitch from 'assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js';
import checkbox1 from 'assets/img/launderedShirts.svg';
import checkbox2 from 'assets/img/washAndFold.svg';
import checkbox3 from 'assets/img/dryCleaning.svg';

const style = {
  infoText: {
    fontWeight: '300',
    margin: '10px 0 30px',
    textAlign: 'center'
  },
  inputAdornmentIcon: {
    color: '#555'
  },
  choiche: {
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '20px'
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
};
function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const detergents = [
  { value: 'Tide ( + $0.15 / Per Pound )' },
  { value: 'Tide Sport ( + $0.18 / Per Pound )' },
  { value: 'All - Free & Clear ( + $0.17 / Per Pound )' },
  { value: 'Gain ( + $0.15 / Per Pound )' },
  { value: 'Tide w/ Bleach ( + $0.15 / Per Pound )' },
  { value: 'Commercial' }
];
const softeners = [
  { value: 'Suavitel (Field of Flowers) ( + $0.13 / Per Pound )' },
  { value: 'Downy ( + $0.14 / Per Pound )' },
  { value: 'Gain ( + $0.13 / Per Pound )' },
  { value: 'Suavitel (Soothing Lavender) ( + $0.14 / Per Pound )' },
  { value: 'Tide w/ Bleach ( + $0.15 / Per Pound )' }
];

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wash_press: false,
      wash_fold: false,
      dry_clean: false,
      wash_fold_modal: false,
      dry_clean_modal: false,
      wash_press_info_modal: false,
      dry_clean_info_modal: false,
      detergentSelectedValue: null,
      softenersSelectedValue: null,
      checked: []
    };
    this.radioHandleChange = this.radioHandleChange.bind(this);
  }
  sendState() {
    return this.state;
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = (name, modal) => event => {
    this.setState({ [name]: event.target.checked });
    if (modal && !this.state[name]) {
      this.handleClickOpen(modal);
    }
  };
  isValidated() {
    return true;
  }
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  radioHandleChange = (event, state) => {
    this.setState({ [state]: event.target.value });
  };
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12}>
            <i className="material-icons color step-heading-icons">local_laundry_service</i>
            <h3 className="step-heading">Available Services</h3>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridContainer>
              <GridItem xs={12} sm={4}>
                <div className={classes.choiche + ' pos-rel'}>
                  <Checkbox
                    className="cxt-chk-bx"
                    tabIndex={-1}
                    onClick={this.handleChange('wash_press')}
                    checkedIcon={<i className={'fas fa-check ' + classes.iconCheckboxIcon} />}
                    icon={<img className="check-icons" src={checkbox1} />}
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <i
                    className="material-icons color info-sign"
                    onClick={() => this.handleClickOpen('wash_press_info_modal')}
                  >
                    info
                  </i>
                  <h5>Wash & Press Shirts</h5>
                  <p>
                    For button down men's shirts, dress shirts, or nice polos, this is the standard option. Shirts are
                    laundered.
                  </p>
                </div>
              </GridItem>

              <GridItem xs={12} sm={4}>
                <div className={classes.choiche + ' pos-rel'}>
                  <Checkbox
                    className="cxt-chk-bx"
                    tabIndex={-1}
                    onClick={this.handleChange('wash_fold', 'wash_fold_modal')}
                    checkedIcon={<i className={'fas fa-check ' + classes.iconCheckboxIcon} />}
                    icon={<img className="check-icons" src={checkbox2} />}
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h5>Wash & Fold Laundry</h5>
                  <p>
                    Standard laundry service which entails your laundry being picked up, cleaned, and returned to you
                    fresh and folded.
                  </p>
                </div>
              </GridItem>

              <GridItem xs={12} sm={4}>
                <div className={classes.choiche + ' pos-rel'}>
                  <Checkbox
                    className="cxt-chk-bx"
                    tabIndex={-1}
                    onClick={this.handleChange('dry_clean', 'dry_clean_modal')}
                    checkedIcon={<i className={'fas fa-check ' + classes.iconCheckboxIcon} />}
                    icon={<img className="check-icons" src={checkbox3} />}
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <i
                    className="material-icons color info-sign"
                    onClick={() => this.handleClickOpen('dry_clean_info_modal')}
                  >
                    info
                  </i>
                  <h5>Dry Clean</h5>
                  <p>
                    These are garments that require extra care (wools, silks, bright colors, etc) or are marked “dry
                    clean only”
                  </p>
                </div>
              </GridItem>
            </GridContainer>
          </GridItem>

          {/*wash_fold_modal*/}
          <Dialog
            classes={{
              root: classes.center + ' ' + classes.modalRoot,
              paper: classes.modal
            }}
            open={this.state.wash_fold_modal}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => this.handleClose('wash_fold_modal')}
            aria-labelledby="classic-modal-slide-title"
            aria-describedby="classic-modal-slide-description"
          >
            <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
              <Button
                justIcon
                className="close_modal"
                key="close"
                aria-label="Close"
                color="transparent"
                onClick={() => this.handleClose('wash_fold_modal')}
              >
                <Close className={classes.modalClose} />
              </Button>
              <h4 className={classes.modalTitle}>Wash & Fold Laundry</h4>
              <p>
                Add special instructions or notes specific to this service. Multiple notes can be added if needed. All
                of the notes you add here will be sent with your order to the cleaner.
              </p>
            </DialogTitle>
            <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
              <h5>
                Detergents <Danger extraClass="d-inline-block">(Requires: 1)</Danger>
              </h5>
              {detergents.length &&
                detergents.map(d => {
                  return (
                    <div key={d.value} className={classes.checkboxAndRadio + ' ' + classes.checkboxAndRadioHorizontal}>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={this.state.detergentSelectedValue === d.value}
                            onChange={e => this.radioHandleChange(e, 'detergentSelectedValue')}
                            value={d.value}
                            name="radio button demo"
                            aria-label={d.value}
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
                        label={d.value}
                      />
                    </div>
                  );
                })}

              <h5>Softeners</h5>
              {softeners.length &&
                softeners.map(d => {
                  return (
                    <div key={d.value} className={classes.checkboxAndRadio + ' ' + classes.checkboxAndRadioHorizontal}>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={this.state.softenersSelectedValue === d.value}
                            onChange={e => this.radioHandleChange(e, 'softenersSelectedValue')}
                            value={d.value}
                            name="radio button demo"
                            aria-label={d.value}
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
                        label={d.value}
                      />
                    </div>
                  );
                })}

              <h5>Notes</h5>
              <CustomInput
                labelText="Enter note"
                id="note"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: 'text'
                }}
              />
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button color="success" onClick={() => this.handleClose('wash_fold_modal')}>
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/*dry_clean_modal*/}
          <Dialog
            classes={{
              root: classes.center + ' ' + classes.modalRoot,
              paper: classes.modal
            }}
            open={this.state.dry_clean_modal}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => this.handleClose('dry_clean_modal')}
            aria-labelledby="classic-modal-slide-title"
            aria-describedby="classic-modal-slide-description"
          >
            <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
              <Button
                justIcon
                className="close_modal"
                key="close"
                aria-label="Close"
                color="transparent"
                onClick={() => this.handleClose('dry_clean_modal')}
              >
                <Close className={classes.modalClose} />
              </Button>
              <h4 className={classes.modalTitle}>Dry Clean</h4>
              <p>
                Add special instructions or notes specific to this service. Multiple notes can be added if needed. All
                of the notes you add here will be sent with your order to the cleaner.
              </p>
            </DialogTitle>
            <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
              <h5>
                Dry Cleaning Turnaround <Danger extraClass="d-inline-block">(Requires: 1)</Danger>
              </h5>
              <div className={classes.checkboxAndRadio}>
                <FormControlLabel
                  control={
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => this.handleToggle(1)}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                        root: classes.checkRoot
                      }}
                    />
                  }
                  classes={{
                    label: classes.label
                  }}
                  label="Please note, it takes 2 business days to process all dry-cleaning orders. Please select a delivery date at-least 2 business days after your pickup date. To continue, check the box to the left and click “Save” below…"
                />
              </div>
              <h5>Notes</h5>
              <CustomInput
                labelText="Enter note"
                id="note"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: 'text'
                }}
              />
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button color="success" onClick={() => this.handleClose('dry_clean_modal')}>
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/*wash_press_info_modal*/}
          <Dialog
            classes={{
              root: classes.center + ' ' + classes.modalRoot,
              paper: classes.modal
            }}
            open={this.state.wash_press_info_modal}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => this.handleClose('wash_press_info_modal')}
            aria-labelledby="classic-modal-slide-title"
            aria-describedby="classic-modal-slide-description"
          >
            <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
              <Button
                justIcon
                className="close_modal"
                key="close"
                aria-label="Close"
                color="transparent"
                onClick={() => this.handleClose('wash_press_info_modal')}
              >
                <Close className={classes.modalClose} />
              </Button>
              <h4 className={classes.modalTitle}>Wash & Press Shirts</h4>
            </DialogTitle>
            <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
              <h5>Did you know?</h5>
              <p>
                Most men’s, cotton shirts require laundering rather than dry cleaning. This service provides a
                high-quality, water-based cleaning with professional-grade detergent. Shirts first go through a spotting
                process that helps in the removal of stains and the most common enemy of shirts, perspiration and rings
                around the collar. After cleaning, your shirts are nicely pressed before being returned to you.
              </p>
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button color="success" onClick={() => this.handleClose('wash_press_info_modal')}>
                Got it!
              </Button>
            </DialogActions>
          </Dialog>

          {/*dry_clean_info_modal*/}
          <Dialog
            classes={{
              root: classes.center + ' ' + classes.modalRoot,
              paper: classes.modal
            }}
            open={this.state.dry_clean_info_modal}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => this.handleClose('dry_clean_info_modal')}
            aria-labelledby="classic-modal-slide-title"
            aria-describedby="classic-modal-slide-description"
          >
            <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
              <Button
                justIcon
                className="close_modal"
                key="close"
                aria-label="Close"
                color="transparent"
                onClick={() => this.handleClose('dry_clean_info_modal')}
              >
                <Close className={classes.modalClose} />
              </Button>
              <h4 className={classes.modalTitle}>Dry Clean</h4>
            </DialogTitle>
            <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
              <h5>Did you know?</h5>
              <p>
                Natural fibers such as wools and silks tend to shrink, distort, and lose color when washed in water.
                Synthetic fibers like polyester can retain oily stains after washing as well. To avoid this unwanted
                side effects, dry cleaning alternatively uses fluids to remove soils and stains from these fibers. Dry
                cleaning’s advantage is it’s ability to dissolve grease and oils in a way that water cannot. Garments
                are returned to a "like-new" condition using precautions to prevent shrinkage, loss of color, and change
                of texture or finish.
              </p>
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button color="success" onClick={() => this.handleClose('dry_clean_info_modal')}>
                Got it!
              </Button>
            </DialogActions>
          </Dialog>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(style)(Step2);
