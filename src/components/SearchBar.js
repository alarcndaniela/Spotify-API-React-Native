import React, { Component } from 'react'
import { Searchbar} from 'react-native-paper';
import {StyleSheet} from "react-native";
import constants from '../utils/constants';


export default class MyComponent extends Component {
    constructor({text}) {
        super();

        this.state = {
            text: text || '',
        };
    }

    handleChangeText(newText) {
        const { onChange } = this.props;

        this.setState({
            text: newText,
        }, () => {
            onChange && onChange(newText);
        })
    }

    render() {
        const { text } = this.state;
        return (
            <Searchbar style={styles.bar}
                placeholder="Search for some music"
                onChangeText={newText => this.handleChangeText(newText)}
                value={text}
            />
        );
    }
}
const styles = StyleSheet.create({
    bar:{
        margin:20,
        borderRadius: 30,
        backgroundColor: constants.COLORS.LIGHT,
    },
});
