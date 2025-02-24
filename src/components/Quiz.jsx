import React, { useEffect, useState } from "react";
import { useQuiz } from "../context/QuizContext";

function QuizPage() {
    const { quizID } = useQuiz();
    const [questions, setQuestions] = useState([]);
    const [count, setCount] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (!quizID) return;

        let API_URL = `http://localhost:8080/quiz/${quizID}`;

        fetch(API_URL)
            .then(response => response.json())
            .then((data) => {
                setQuestions(data.questions);
                setSelectedAnswers(new Array(data.questions.length).fill(null));
                setTimeLeft(data.timePerQuestion); // Set time from backend
            })
            .catch((error) => console.error("Error fetching questions:", error));
    }, [quizID]);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (count < questions.length - 1) {
                setCount(count + 1);
                setTimeLeft(questions[count + 1]?.timePerQuestion || 30);
            } else {
                submitQuiz(selectedAnswers);
            }
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, count, questions, selectedAnswers]);

    if (!quizID) {
        return <div className="h-screen w-screen flex justify-center items-center text-gray-700 text-2xl">No quiz selected. Please go back and select a quiz.</div>;
    }

    if (questions.length === 0) {
        return <div className="h-screen w-screen flex justify-center items-center text-gray-700 text-2xl">Loading questions...</div>;
    }

    const currentQuestion = questions[count];

    const handleOptionSelect = (answerText) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[count] = { questionId: currentQuestion.id, selectedAnswer: answerText };
        setSelectedAnswers(newAnswers);

        if (count < questions.length - 1) {
            setCount(count + 1);
            setTimeLeft(questions[count + 1]?.timePerQuestion || 30);
        } else {
            submitQuiz(newAnswers);
        }
    };

    const submitQuiz = (answers) => {
        fetch(`http://localhost:8080/quiz/submit/${quizID}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(answers),
        })
        .then(response => response.json())
        .then((score) => alert(`Quiz completed! Your score: ${score}`))
        .catch((error) => console.error("Error submitting quiz:", error));
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gray-300">
            <div className="h-[85%] w-[70%] bg-gray-200 rounded-lg flex flex-col justify-center items-center space-y-3 p-5">
                <div className="w-full flex justify-between p-3">
                    <h3 className="text-gray-700 font-semibold">Question {count + 1} / {questions.length}</h3>
                    <div className="text-gray-700 font-semibold">Time Left: {timeLeft}s</div>
                </div>

                <div className="w-full h-[45%] bg-gray-100 p-3 rounded-md flex flex-col items-center">
                    <p className="text-gray-700 font-semibold">{currentQuestion.questionTitle}</p>
                </div>

                <div className="w-full h-auto flex flex-col justify-center items-center space-y-3">
                    {[currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4].map((option, index) => (
                        <button
                            key={index}
                            className={`h-[15%] w-[90%] rounded-md text-gray-700 bg-gray-400 hover:bg-gray-500 transition-all ${selectedAnswers[count]?.selectedAnswer === option ? "bg-yellow-400" : ""}`}
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default QuizPage;