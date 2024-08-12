import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';
import Navbar from '../components/Navbar';
const Drawer = createDrawerNavigator();

const Navigation: React.FC<DrawerContentComponentProps> = props => {
  return <Navbar {...props} />;
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        swipeEdgeWidth: 0,
      }}
      drawerContent={Navigation}>
      <Drawer.Screen name="DrawerHome" component={StackNavigation} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
