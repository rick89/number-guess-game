import { Alert, FlatList, Text, TextInput, View } from 'react-native';
import { Button } from '../components/button';
import { useCallback, useEffect, useState } from 'react';
import { NumberInput } from '../components/number-input';
import { getRandomNumber } from '../utils';

type GameScreenProps = {
	pickedNumber: number;
	onGameComplete: (gameComplete: boolean) => void;
	amountOfGuesses: (amountOfGuesses: number) => void;
};

export const GameScreen = ({
	pickedNumber,
	onGameComplete,
	amountOfGuesses,
}: GameScreenProps) => {
	const [min, setMin] = useState<number>(1);
	const [max, setMax] = useState<number>(99);
	const [computerGuess, setComputerGuess] = useState<number>();
	const [computerGuesses, setComputerGuesses] = useState<number[]>([]);

	const higherOrLowerGuessPress = (IToldComputer: string) => {
		if (!computerGuess) {
			return;
		}

		if (computerGuess === pickedNumber) {
			onGameComplete(true);
		}

		let lieDetected =
			(IToldComputer === 'higher' && pickedNumber < computerGuess) ||
			(IToldComputer === 'lower' && pickedNumber > computerGuess);

		if (
			(IToldComputer === 'lower' && !lieDetected) ||
			(IToldComputer === 'higher' && lieDetected)
		) {
			console.log('set new max to: ', computerGuess - 1);
			setMax(computerGuess - 1);
		}

		if (
			(IToldComputer === 'lower' && lieDetected) ||
			(IToldComputer === 'higher' && !lieDetected)
		) {
			console.log('set new max to: ', computerGuess - 1);
			setMin(computerGuess + 1);
		}

		if (lieDetected) {
			return Alert.alert(
				'LIAR!',
				`You Liar!!! Naughty naughty! :( I will guess again anyway!`,
				[
					{
						text: 'Ok',
						style: 'destructive',
						onPress: () => console.log('navigate home'),
					},
				]
			);
		}
	};

	useEffect(() => {
		runComputerGuess();
	}, [min, max]);

	const retrieveComputerGuess = () => {
		const computerGuess = getRandomNumber(min, max);
		if (computerGuesses?.includes(computerGuess)) {
			retrieveComputerGuess();
		}
		return computerGuess;
	};

	const runComputerGuess = () => {
		console.log('computer guessing again .......');
		const computerGuess = retrieveComputerGuess();
		setComputerGuess(computerGuess);
		setComputerGuesses((prevState) => [...prevState, computerGuess]);
	};

	const runGuessedCorrectlyAlert = () => {
		return Alert.alert(
			'Correct!',
			`The computer guessed the correct number was ${computerGuess}`,
			[
				{
					text: 'Ok',
					style: 'destructive',
					onPress: () => {
						onGameComplete(true);
						amountOfGuesses(computerGuesses.length);
					},
				},
			]
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<Text style={{ textAlign: 'center', fontSize: 24 }}>
				Is your number: {computerGuess}
			</Text>
			<Text
				style={{
					fontSize: 17,
					marginTop: 20,
					marginBottom: 10,
					textAlign: 'center',
				}}
			>
				Higher or lower?
			</Text>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
				}}
			>
				<Button onPress={() => higherOrLowerGuessPress('lower')}>
					Lower
				</Button>
				<Button onPress={() => higherOrLowerGuessPress('higher')}>
					Higher
				</Button>
			</View>
			<View
				style={{
					paddingHorizontal: 20,
					flex: 1,
				}}
			>
				<Text
					style={{
						fontSize: 17,
						marginTop: 20,
						marginBottom: 10,
						textAlign: 'center',
					}}
				>
					Phone guesses:
				</Text>
				<View
					style={{
						flex: 1,
					}}
				>
					<FlatList
						data={computerGuesses}
						renderItem={({ item, index }) => (
							<Text>
								#{index + 1} Guessed: {item}
							</Text>
						)}
						keyExtractor={(item) => item.toString()}
					/>
				</View>
			</View>
		</View>
	);
};
