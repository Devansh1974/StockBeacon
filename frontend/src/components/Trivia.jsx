import React, { useState } from 'react';
import financeQuestions from './TriviaQns';
import { FaCoins, FaStar, FaPlayCircle } from 'react-icons/fa';

const Trivia = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('');
  const [scoreHistory, setScoreHistory] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleStartQuiz = (level) => {
    const shuffledQuestions = [...financeQuestions[level]].sort(() => Math.random() - 0.5).slice(0, 5);
    setDifficulty(level);
    setQuestions(shuffledQuestions);
    setQuizStarted(true);
    setScore(0);
    setCoins(0);
    setCurrentQuestion(0);
    setShowResult(false);
  };

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(prev => prev + 1);
      setCoins(prev => prev + 10);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const finalScore = score + (selectedOption === questions[currentQuestion].answer ? 1 : 0);
      const finalCoins = finalScore * 10;
      setScoreHistory([...scoreHistory, { difficulty, score: finalScore, coinsEarned: finalCoins }]);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setCoins(0);
    setDifficulty('');
    setShowResult(false);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
      {/* Left Section */}
      <div className="w-full md:w-2/3">
        <h2 className="text-4xl font-bold text-blue-700 text-center mb-4">🧠 Stock Trivia Challenge</h2>
        <p className="text-center text-gray-600 mb-6 text-lg">
          Test your financial knowledge, earn coins, and become a Stock Champ! 💹
        </p>

        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
          {!quizStarted && !showResult ? (
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Pick Your Challenge</h3>
              <p className="text-gray-500 mb-4">Choose a level to begin and collect coins for every correct answer!</p>
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => handleStartQuiz('easy')}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-md text-lg flex items-center gap-2"
                >
                  <FaPlayCircle /> Basic
                </button>
                <button
                  onClick={() => handleStartQuiz('medium')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-md text-lg flex items-center gap-2"
                >
                  <FaPlayCircle /> Medium
                </button>
                <button
                  onClick={() => handleStartQuiz('hard')}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-md text-lg flex items-center gap-2"
                >
                  <FaPlayCircle /> Advanced
                </button>
              </div>
            </div>
          ) : showResult ? (
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">🎉 Great Job!</h3>
              <p className="text-lg text-gray-600">Your Score: {score} / {questions.length}</p>
              <p className="text-lg text-yellow-600 font-semibold flex justify-center items-center">
                <FaCoins className="mr-2" /> Coins Earned: {coins}
              </p>
              <button
                onClick={resetQuiz}
                className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
              >
                Try Another Quiz
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <h4 className="text-lg font-medium text-gray-800">
                Question {currentQuestion + 1} of {questions.length}
              </h4>
              <h3 className="text-xl font-semibold text-blue-800">
                {questions[currentQuestion].question}
              </h3>
              <div className="grid gap-3">
                {questions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left p-4 border rounded-xl bg-gray-100 hover:bg-blue-100 text-gray-800 shadow-sm hover:shadow-md transition"
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-gray-700 font-medium">
                <p>Score: {score}</p>
                <p className="flex items-center">
                  Coins: {coins} <FaCoins className="ml-2 text-yellow-500" />
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full md:w-1/3 flex flex-col gap-6">
        <div className="p-6 bg-yellow-100 rounded-2xl shadow-md text-center">
          <h4 className="text-xl font-semibold text-gray-800 mb-2">Total Coins Collected</h4>
          <p className="text-3xl font-bold text-yellow-600 flex justify-center items-center">
            {scoreHistory.reduce((total, entry) => total + entry.coinsEarned, 0)}
            <FaCoins className="ml-2" />
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md">
          <h4 className="text-xl font-semibold text-gray-800 text-center mb-4">Score History</h4>
          {scoreHistory.length === 0 ? (
            <p className="text-gray-500 text-center">No attempts yet. Start learning!</p>
          ) : (
            <ul className="space-y-3">
              {scoreHistory.map((entry, i) => (
                <li key={i} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <p>Difficulty: <strong>{entry.difficulty}</strong></p>
                  <p>Score: {entry.score} / 5</p>
                  <p className="text-yellow-600">Coins: {entry.coinsEarned} <FaCoins className="inline ml-1" /></p>
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