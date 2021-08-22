import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from './components/QuestionCard';
// Types
import { QuestionState, Difficulty, TotalAmount, Caterogies } from './API';
// Styles
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [options, setOptions] = useState({
    totalAmount: TotalAmount.FIVE,
    difficulty: Difficulty.EASY,
    categories: Caterogies.BOOKS,
  })

  console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuetions = await fetchQuizQuestions(
      options.categories,
      options.totalAmount,
      options.difficulty,
    );

    setQuestions(newQuetions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // Users answer
      const answer = e.currentTarget.value;
      // Check answer  against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore(prev => prev + 1);
      // Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestion = number + 1;

    if (nextQuestion === options.totalAmount) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswers.length === options.totalAmount ? (
          <>
        <label>Select Category: </label>
        <select name="caterogies" onChange={(event) => setOptions(prev => { return { ...prev, categories: Caterogies[event.target.value as keyof typeof Caterogies] } })}>
          {Object.keys(Caterogies).map((item, index) => {
            return isNaN(Number(item)) && <option value={item} key={index}>{item}</option>
          })}
        </select>
        <label>Difficulty:</label>
        <select name="difficulty" onChange={(event) => setOptions(prev => { return { ...prev, difficulty: Difficulty[event.target.value as keyof typeof Difficulty] } })}>
          {Object.keys(Difficulty).map((item, index) => <option value={item} key={index}>{item}</option>)}
        </select>
        <label>Amount of questions:</label>
        <select name="amount" onChange={(event) => setOptions(prev => { return { ...prev, totalAmount: TotalAmount[event.target.value as keyof typeof TotalAmount] } })}>
          {Object.keys(TotalAmount).map((item, index) => {
            return isNaN(Number(item)) && <option value={item} key={index}>{item}</option>
          })}
        </select>
          <button className="start" onClick={startTrivia}>
            Start
          </button>
          </>
        ) : null}
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading && <p>Loading Questions ...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={options.totalAmount}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnser={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== options.totalAmount - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
