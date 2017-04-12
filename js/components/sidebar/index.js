
import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem, Icon, Container, Left, Right, Badge, Button, View, StyleProvider, getTheme, variables } from 'native-base';
import { Actions } from 'react-native-router-flux';

import material from '../../../native-base-theme/variables/material';
import { changePlatform, changeMaterial, closeDrawer } from '../../actions/drawer';
import navigateTo from '../../actions/sideBarNav';
import styles from './style';

const drawerCover = require('../../../img/coverflow.png');

const drawerImage = require('../../../img/logo-kitchen-sink.png');

const datas = [
  {
    name: 'Settings',
    route: '3',
    icon: 'phone-portrait',
    bg: '#DA4437',
  },
  {
    name: 'Prayers',
    route: '0',
    icon: 'moon',
    bg: '#DA4437',
  },
  {
    name: 'News',
    route: '1',
    icon: 'megaphone',
    bg: '#DA4437',
  },
  {
    name: 'Business',
    route: '2',
    icon: 'cash',
    bg: '#DA4437',
  },
  {
    name: 'Clinic',
    route: '3',
    icon: 'medkit',
    bg: '#DA4437',
  },
  {
    name: 'Contact',
    route: '4',
    icon: 'contact',
    bg: '#DA4437',
  },

];
class SideBar extends Component {

  static propTypes = {
    navigateTo: React.PropTypes.func,
    themeState: React.PropTypes.string,
    changePlatform: React.PropTypes.func,
    changeMaterial: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    };
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: '#fff', top: -1 }}
        >
          <Image source={drawerCover} style={styles.drawerCover}>
            <Image
              square
              style={styles.drawerImage}
              source={drawerImage}
            />
          </Image>
          <List
            dataArray={datas} renderRow={data =>
              <ListItem button noBorder onPress={() => { Actions[data.route](); this.props.closeDrawer() }} >
                <Left>
                  <Icon active name={data.icon} style={{ color: '#777', fontSize: 26, width: 30 }} />
                  <Text style={styles.text}>{data.name}</Text>
                </Left>
                {(data.types) &&
                <Right style={{ flex: 1 }}>
                  <Badge
                    style={{ borderRadius: 3, height: 25, width: 72, backgroundColor: data.bg }}
                  >
                    <Text style={styles.badgeText}>{`${data.types} Types`}</Text>
                  </Badge>
                </Right>
                }
              </ListItem>}
          />

        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    closeDrawer: () => dispatch(closeDrawer()),
    changePlatform: () => dispatch(changePlatform()),
    changeMaterial: () => dispatch(changeMaterial()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(SideBar);