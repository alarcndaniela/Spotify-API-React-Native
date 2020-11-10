import React from 'react';
import { StatusBar, View } from 'react-native';

import Router from "./Router";

import LoadAssets from "./src/utils/loadAssets";

import {fonts} from './src/utils/fonts';

const assets = [];

const App = () => {
  return (
    <LoadAssets fonts={fonts} assets={assets}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={"dark-content"}></StatusBar>
          <Router></Router>
      </View>
    </LoadAssets>
    
  )

};

export default App; 

//2f85241e292414a94e5f5a7dbb21f380