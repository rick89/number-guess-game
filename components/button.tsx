import { ReactNode } from 'react';
import {
	TouchableOpacity,
	View,
	Text,
	StyleSheet,
	Pressable,
} from 'react-native';

type ButtonProps = {
	children: ReactNode;
	onPress: () => void;
};

export const Button = ({ children, onPress }: ButtonProps) => {
	return (
		<Pressable
			style={({ pressed }) =>
				pressed
					? [styles.container, styles.containerPressed]
					: styles.container
			}
			onPress={onPress}
		>
			<View style={{ ...styles.container }}>
				<Text
					style={{
						...styles.text,
					}}
				>
					{children}
				</Text>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		backgroundColor: 'blue',
		paddingVertical: 6,
		paddingHorizontal: 20,
		margin: 4,
	},
	containerPressed: {
		opacity: 0.8,
	},
	text: {
		color: 'white',
		fontSize: 18,
	},
});
