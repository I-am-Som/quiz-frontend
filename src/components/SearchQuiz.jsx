import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";  // Import Quiz Context

function SearchQuiz() {
  const [quizCardDetails, setQuizCardDetails] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;  // Use environment variable
  const { setQuizID } = useQuiz();  // Get setQuizID from context

  useEffect(() => {
    fetch(`${API_URL}/quiz-cards/all`)  // Use dynamic API URL
      .then((response) => response.json())
      .then((data) => setQuizCardDetails(data))
      .catch((error) => console.error("Error fetching quizzes:", error));
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col pt-[60px] bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto">
      <div className="flex flex-wrap justify-center items-center gap-6 p-6">
        {quizCardDetails.length > 0 ? (
          quizCardDetails.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              setQuizID={setQuizID}  // Pass setQuizID to the child
            />
          ))
        ) : (
          <p className="text-gray-700 text-lg font-semibold">No quizzes available</p>
        )}
      </div>
    </div>
  );
}

function QuizCard({ quiz, setQuizID }) {
  return (
    <div className="w-[250px] h-[340px] bg-white rounded-lg flex flex-col justify-between items-center p-5 shadow-lg hover:shadow-xl transition-shadow duration-200">
      <div className="text-center space-y-2">
        <p className="text-xl font-bold text-gray-800">{quiz.title}</p>
        <p className="text-md text-gray-700">Category: {quiz.category}</p>
        <p className="text-md text-gray-700">{quiz.numberOfQuestions} Questions</p>
        <p className="text-md text-gray-700">Difficulty: {quiz.difficulty}</p>
      </div>
      <Link
        to="/quiz"
        className="px-5 py-2 bg-yellow-500 text-black font-semibold rounded-md 
                   hover:bg-black hover:text-white transition-all duration-200 shadow-md"
        onClick={() => setQuizID(quiz.id)}  // Set the quiz ID when clicked
      >
        Take Quiz
      </Link>
    </div>
  );
}

export default SearchQuiz;
