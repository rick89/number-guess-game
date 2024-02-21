import { SafeAreaView, View } from 'react-native';
import { StartGameScreen } from './screens/StartGameScreen';
import { useState } from 'react';
import { GameScreen } from './screens/GameScreen';
import { GameOverScreen } from './screens/GameOverScreen';

export default function App() {
	const [userNumber, setUserNumber] = useState<number | null>();
	const [gameComplete, setGameComplete] = useState(false);
	const [restartGame, setRestartGame] = useState(false);
	const [amountOfGuesses, setAmountOfGuesses] = useState(1);

	const pickedNumberHandler = (pickedNumber: number) => {
		setUserNumber(pickedNumber);
		setGameComplete(false);
		setRestartGame(false);
	};

	let screen = (
		<StartGameScreen
			onConfirmNumber={(number) => pickedNumberHandler(number)}
		/>
	);

	if (userNumber) {
		screen = (
			<GameScreen
				amountOfGuesses={(amountOfGuesses: number) =>
					setAmountOfGuesses(amountOfGuesses)
				}
				onGameComplete={() => setGameComplete(true)}
				pickedNumber={userNumber}
			/>
		);
	}

	if (gameComplete && userNumber) {
		screen = (
			<GameOverScreen
				userNumber={userNumber}
				amountOfGuesses={amountOfGuesses}
				restartGame={(restartGame) => setRestartGame(restartGame)}
			/>
		);
	}

	if (restartGame) {
		screen = (
			<StartGameScreen
				onConfirmNumber={(number) => pickedNumberHandler(number)}
			/>
		);
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			{screen}
		</SafeAreaView>
	);
}
