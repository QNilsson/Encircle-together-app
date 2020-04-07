import React, {Component} from "react";
import {Button, Text, StyleSheet, View, TouchableOpacity} from "react-native";
// @ts-ignore
import Modal from "react-native-modal";
// import ModalBaseScene from "../assets/utils/ModalBaseScene";
// import DefaultModalContent from "../assets/utils/DefaultModalContent";
import {Ionicons} from "@expo/vector-icons";

class MoreScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalVisible: false,
		};
	}

	componentDidMount() {
		this.toggleModal();
	}

	toggleModal = () => {
		this.setState({isModalVisible: !this.state.isModalVisible});
	};

	render() {
		return (
			<View style={styles.view}>
				{/* <DefaultModalContent onPress={this.close} /> */}
				<Button title="Menu" onPress={this.toggleModal} />
				<Modal isVisible={this.state.isModalVisible}>
					<View style={styles.innerModal}>
						<TouchableOpacity
							onPress={() => {
								this.toggleModal();
								this.props.navigation.navigate("Location");
							}}
						>
							<View style={styles.viewModal}>
								<Text style={styles.textModal}>Location</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								this.toggleModal();
								this.props.navigation.navigate("Shop");
							}}
						>
							<View style={styles.viewModal}>
								<Text style={styles.textModal}>Shop</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								this.toggleModal();
								this.props.navigation.navigate("Donate");
							}}
						>
							<View style={styles.viewModal}>
								<Text style={styles.textModal}>Donate</Text>
							</View>
						</TouchableOpacity>
						<Button title="Close" onPress={this.toggleModal} />
					</View>
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	view: {
		height: "25%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end",
		margin: 0,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
	},
	innerModal: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	textModal: {
		fontSize: 45,
		fontWeight: "bold",
		color: "white",
	},
	viewModal: {
		borderColor: "rgba(255, 255, 255, 0.1)",
		borderStyle: "solid",
		borderBottomColor: "#eee",
		borderBottomWidth: 5,
		width: "100%",
		marginVertical: 20,
	},
});

export default MoreScreen;

// import React from "react";
// import { StyleSheet, Text, Button, View } from "react-native";

// const MoreScreen = props => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.buttonContainer}>
//         <Button
//           title="Locations"
//           onPress={() => props.navigation.navigate("Location")}
//         />
//       </View>
//       <View style={styles.buttonContainer}>
//         <Button
//           title="Donate"
//           onPress={() => props.navigation.navigate("Donate")}
//         />
//       </View>
//       <View style={styles.buttonContainer}>
//         <Button
//           title="Shop"
//           onPress={() => props.navigation.navigate("Shop")}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   buttonContainer: {
//     flex: 1
//   }
// });

// export default MoreScreen;
