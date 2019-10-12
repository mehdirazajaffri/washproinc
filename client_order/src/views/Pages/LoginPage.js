import React from "react";

// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";
import request from "superagent";
import logo from "assets/img/white_logo.png";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      username: "",
      password: "",
      cardAnimaton: "cardHidden"
    };
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  responseFacebook = response => {
    console.log(response);
  };

  responseGoogle = response => {
    console.log(response);
  };

  responseGoogleFailure = response => {
    console.log("Failure", response);
  };

  login = async () => {
    let username = this.state.username;
    let password = this.state.password;
    console.log(username, password);
    if (username && password) {
      let data = {
        username: username,
        password: password
      };
      request
        .post("http://localhost:8000/api-token-auth/")
        .set("Content-Type", "application/json")
        .send(data)
        .then(res => {
          console.log(res);
          window.location = "/admin";
        })
        .catch(() => {});
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <img
                    src={logo}
                    alt="logo"
                    style={{
                      width: "60%",
                      margin: "20px"
                    }}
                  ></img>
                  <h4 className={classes.cardTitle}>Log in</h4>
                  <div className={classes.socialLine}>
                    <FacebookLogin
                      appId="931319960561429"
                      fields="name,email,picture"
                      callback={this.responseFacebook}
                      cssClass="my-facebook-button-class"
                      render={renderProps => (
                        <Button
                          color="transparent"
                          justIcon
                          onClick={renderProps.onClick}
                          className={classes.customButtonClass}
                        >
                          <i
                            className={"fab fa-facebook-square"}
                            style={{
                              fontSize: "30px"
                            }}
                          />
                        </Button>
                      )}
                    />
                    <GoogleLogin
                      clientId="935686304909-0irdp174bs54qjp82h5ako6tc8lka5sq.apps.googleusercontent.com"
                      buttonText="Login"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogleFailure}
                      render={renderProps => (
                        <Button
                          color="transparent"
                          justIcon
                          disabled={renderProps.disabled}
                          key={1}
                          onClick={renderProps.onClick}
                          className={classes.customButtonClass}
                        >
                          <i
                            className={"fab fa-google"}
                            style={{
                              fontSize: "30px"
                            }}
                          />
                        </Button>
                      )}
                      cookiePolicy={"single_host_origin"}
                    />
                  </div>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Username"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      onChange: e => {
                        this.setState({ username: e.target.value });
                      }
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      onChange: e => {
                        this.setState({ password: e.target.value });
                      },
                      type: "password",
                      autoComplete: "off"
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button
                    color="rose"
                    simple
                    size="lg"
                    block
                    onClick={this.login}
                  >
                    Login
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LoginPage);
