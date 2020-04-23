import React, {Component} from 'react';
import Splash from './splash';
import Login from './login';
export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setTimePassed();
    }, 2000);
  }
  setTimePassed() {
    this.setState({timePassed: true});
  }

  render() {
    const navigation = this.props.navigation;
    if (!this.state.timePassed) {
      return <Splash />;
    } else {
      return <Login props={navigation} />;
    }
  }
}
