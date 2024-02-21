import { Text, View } from 'react-native';
import { Button } from '../components/button';

type GameOverScreenProps = {
	restartGame: (restartGame: boolean) => void;
	amountOfGuesses: number;
	userNumber: number;
};

export const GameOverScreen = ({
	restartGame,
	amountOfGuesses,
	userNumber,
}: GameOverScreenProps) => {
	return (
		<View
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			<Text style={{ fontSize: 24, marginBottom: 20 }}>Game over!</Text>
			<Text style={{ marginBottom: 20, textAlign: 'center' }}>
				It ONLY took{' '}
				<Text style={{ fontWeight: 'bold', fontSize: 18 }}>
					{amountOfGuesses}
				</Text>{' '}
				attempt
				{userNumber === 1 ? '' : 's'} to guess your number is{' '}
				<Text style={{ fontWeight: 'bold', fontSize: 18 }}>
					{userNumber}{' '}
				</Text>
				Muhahahaha! :)
			</Text>
			<Button onPress={() => restartGame(true)}>Play again</Button>
		</View>
	);
};
