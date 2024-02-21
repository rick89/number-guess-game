import { StyleSheet, TextInput } from 'react-native';

type NumberInputProps = {
	value: string;
	onChangeText: (value: string) => void;
};

export const NumberInput = ({ value, onChangeText }: NumberInputProps) => {
	return (
		<TextInput
			maxLength={2}
			keyboardType='number-pad'
			style={{ ...styles.textInput }}
			autoCorrect={false}
			value={value?.toString()}
			onChangeText={onChangeText}
		/>
	);
};

const styles = StyleSheet.create({
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
