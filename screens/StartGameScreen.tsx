import { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Alert } from 'react-native';
import { Button } from '../components/button';

type StartGameScreenProps = {
	onConfirmNumber: (number: number) => void;
};

export const StartGameScreen = ({ onConfirmNumber }: StartGameScreenProps) => {
	const [textInputValue, setTextInputValue] = useState<string>('');

	const onChangeText = (value: string) => {
		setTextInputValue(value);
	};

	const resetTextInputValue = () => {
		console.log('reset');
		setTextInputValue('');
	};

	const onConfirm = () => {
		const inputNumber = parseInt(textInputValue);
		console.log('inputNumber', inputNumber);
		if (isNaN(inputNumber) || inputNumber <= 0 || inputNumber > 99) {
			Alert.alert('Invalid number!', 'Number has to be between 1 - 99', [
				{
					text: 'Ok',
					style: 'destructive',
					onPress: () => resetTextInputValue(),
				},
			]);
			return;
		}

		onConfirmNumber(inputNumber);
	};

	return (
		<View style={{ ...styles.inputContainer }}>
			<Text style={{ fontSize: 24, marginVertical: 20 }}>
				Enter a number for you computer to guess.
			</Text>
			<View>
				<TextInput
					maxLength={2}
					keyboardType='number-pad'
					style={{ ...styles.textInput }}
					autoCorrect={false}
					value={textInputValue?.toString()}
					onChangeText={onChangeText}
				/>
			</View>
			<View style={{ ...styles.buttonContainer }}>
				<Button onPress={resetTextInputValue}>Reset</Button>
				<Button onPress={onConfirm}>Confirm</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	textInput: {
		marginVertical: 10,
		width: 100,
		borderWidth: 1,
		borderColor: '#999',
		borderRadius: 10,
		paddingHorizontal: 20,
		textAlign: 'center',
		height: 40,
		color: 'black',
	},
});
