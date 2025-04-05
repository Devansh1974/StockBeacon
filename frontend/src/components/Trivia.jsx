import React, { useState } from 'react';
import financeQuestions from './TriviaQns';

const Trivia = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('');
  const [scoreHistory, setScoreHistory] = useState([]);
  const [showResult, setShowResult] = useState(false);


  // Start quiz with random questions from selected difficulty
  const handleStartQuiz = (level) => {
    const shuffledQuestions = [...financeQuestions[level]].sort(() => Math.random() - 0.5).slice(0, 5); // Random 5 questions
    setDifficulty(level);
    setQuestions(shuffledQuestions);
    setQuizStarted(true);
  };

  // Handle answer selection
  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
      setCoins(coins + 10); // Award 10 coins for correct answer
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScoreHistory([...scoreHistory, { difficulty: difficulty, score: score + (selectedOption === questions[currentQuestion].answer ? 1 : 0), coinsEarned: (score + (selectedOption === questions[currentQuestion].answer ? 1 : 0)) * 10 }]);
      setShowResult(true);
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setScore(0);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
      {/* Left Section - Coins and Trivia */}
      <div className="w-full md:w-2/3">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Stock Trivia</h2>
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          {!quizStarted && !showResult ? (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-700 text-center">Select Difficulty</h3>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleStartQuiz('easy')}
                  className="px-6 py-3 rounded-full text-white font-semibold transition-colors duration-200 bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Basic
                </button>
                <button
                  onClick={() => handleStartQuiz('medium')}
                  className="px-6 py-3 rounded-full text-white font-semibold transition-colors duration-200 bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Medium
                </button>
                <button
                  onClick={() => handleStartQuiz('hard')}
                  className="px-6 py-3 rounded-full text-white font-semibold transition-colors duration-200 bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Advanced
                </button>
              </div>
            </div>
          ) : showResult ? (
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Quiz Completed!</h3>
              <p className="text-lg text-gray-600">Your Score: {score + (questions[currentQuestion].answer === questions[currentQuestion].options.find(opt => opt === questions[currentQuestion].answer) ? 1 : 0)} / {questions.length}</p>
              <p className="text-lg text-gray-600">Coins Earned: {(score + (questions[currentQuestion].answer === questions[currentQuestion].options.find(opt => opt === questions[currentQuestion].answer) ? 1 : 0)) * 10}</p>
              <button
                onClick={resetQuiz}
                className="px-6 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-200"
              >
                Play Again
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {currentQuestion + 1}. {questions[currentQuestion].question}
              </h3>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="w-full p-4 text-left border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-gray-800 font-medium shadow-sm hover:shadow-md"
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-gray-700">Score: {score} / {questions.length}</p>
                <p className="text-lg font-medium text-yellow-600 flex items-center justify-center">
                  <span className="mr-2">Coins: {coins}</span>
                  <span role="img" aria-label="coin">💰</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Section  */}
      <div className="w-full md:w-1/3">
      {/* New Total Coins Div */}
  <div className="p-4 bg-white rounded-lg shadow-md mb-4 text-center">
    <p className="text-lg font-semibold text-gray-800">Total Coins</p>
    <p className="text-2xl font-bold text-yellow-600 flex items-center justify-center">
      <span>{scoreHistory.reduce((total, entry) => total + entry.coinsEarned, 0)}</span>
      <span role="img" aria-label="coin" className="ml-2">💰</span>
    </p>
  </div>
  {/*  Score History - coins */}
        <div className="p-6 bg-white rounded-lg shadow-lg h-fit sticky top-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Score History</h3>
          {scoreHistory.length === 0 ? (
            <p className="text-gray-500 text-center">No history yet. Start a quiz!</p>
          ) : (
            <ul className="space-y-3">
              {scoreHistory.map((entry, index) => (
                <li key={index} className="p-3 bg-gray-50 rounded-lg shadow-sm">
                  <p className="text-gray-700">Difficulty: {entry.difficulty.charAt(0).toUpperCase() + entry.difficulty.slice(1)}</p>
                  <p className="text-gray-700">Score: {entry.score} / 5</p>
                  <p className="text-yellow-600">Coins Earned: {entry.coinsEarned} 💰</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trivia;