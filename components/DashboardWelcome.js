import React, {Component} from 'react';
import * as Font from 'expo-font';
import {ActivityIndicator} from 'react-native';
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';



const ProvoImage = require ('../assets/provoHouseTitle.png');
const StGImage = require ('../assets/StGeorgeHouseTitle.png');
const SLCImage = require ('../assets/SaltLakeHouseTitle.png');
let background;
export const getLocationImage = (location) => {
	if (location == 'Provo') {
		background = ProvoImage;
	} else if (location == 'Salt Lake City') {
		background = SLCImage;
	} else {
		background = ProvoImage;
	}
};

class DashboardWelcome extends Component {
	constructor(props) {
		super(props);
		this.state = {loading: true};
	}

	async componentWillMount() {
		await Font.loadAsync({
			'Clarendon': require('../assets/fonts/clarendon.otf'),
			'Garamond-Bold': require('../assets/fonts/garamond-bold.otf'),
			'Din-Bold': require('../assets/fonts/din-bold.otf'),
		});
    this.setState({loading: false});
    getLocationImage()
    
	}

	render() {
		if (this.state.loading) {
			return <ActivityIndicator />;
		}
		return (
			<View style={styles.titleContainer}>
				<ImageBackground
					//need to change background image to new logo
					source={background}
					style={styles.backgroundImage}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	titleContainer: {
		width: '100%',
		top: 0,
		// height: '100%',
	},
	backgroundImage: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		width: '100%',
		height: 167,
	},
});

export default DashboardWelcome;
