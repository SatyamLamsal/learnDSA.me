"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Brain, 
  Eye, 
  Headphones, 
  Hand, 
  Target, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle,
  BarChart3,
  Lightbulb,
  Code,
  Zap,
  BookOpen
} from 'lucide-react';

// Quiz questions and answers
const quizQuestions = [
  {
    id: 1,
    question: "When learning a new concept, what helps you understand it best?",
    answers: [
      { id: 'a', text: 'Reading detailed explanations and documentation', style: 'visual', points: 3 },
      { id: 'b', text: 'Watching video tutorials or demonstrations', style: 'visual', points: 2 },
      { id: 'c', text: 'Listening to explanations from others', style: 'auditory', points: 3 },
      { id: 'd', text: 'Hands-on practice and experimentation', style: 'kinesthetic', points: 3 }
    ]
  },
  {
    id: 2,
    question: "How do you prefer to tackle a complex programming problem?",
    answers: [
      { id: 'a', text: 'Draw diagrams and flowcharts first', style: 'visual', points: 3 },
      { id: 'b', text: 'Discuss it with others or think out loud', style: 'auditory', points: 3 },
      { id: 'c', text: 'Dive in and start coding immediately', style: 'kinesthetic', points: 3 },
      { id: 'd', text: 'Research similar problems and solutions', style: 'visual', points: 2 }
    ]
  },
  {
    id: 3,
    question: "What type of study environment works best for you?",
    answers: [
      { id: 'a', text: 'Quiet space with visual aids and notes', style: 'visual', points: 3 },
      { id: 'b', text: 'Background music or study groups', style: 'auditory', points: 3 },
      { id: 'c', text: 'Standing desk or ability to move around', style: 'kinesthetic', points: 3 },
      { id: 'd', text: 'Organized, clean, and well-lit space', style: 'visual', points: 2 }
    ]
  },
  {
    id: 4,
    question: "When debugging code, you typically:",
    answers: [
      { id: 'a', text: 'Add print statements to see what\'s happening', style: 'visual', points: 3 },
      { id: 'b', text: 'Explain the code to someone else (or rubber duck)', style: 'auditory', points: 3 },
      { id: 'c', text: 'Step through with a debugger', style: 'kinesthetic', points: 3 },
      { id: 'd', text: 'Read through the code carefully', style: 'visual', points: 2 }
    ]
  },
  {
    id: 5,
    question: "Which learning resource appeals to you most?",
    answers: [
      { id: 'a', text: 'Interactive coding tutorials', style: 'kinesthetic', points: 3 },
      { id: 'b', text: 'Video lectures and screencasts', style: 'visual', points: 2 },
      { id: 'c', text: 'Podcasts and audio explanations', style: 'auditory', points: 3 },
      { id: 'd', text: 'Documentation and written guides', style: 'visual', points: 3 }
    ]
  },
  {
    id: 6,
    question: "How do you best remember new algorithms?",
    answers: [
      { id: 'a', text: 'Visualizing the algorithm steps', style: 'visual', points: 3 },
      { id: 'b', text: 'Explaining it to others', style: 'auditory', points: 3 },
      { id: 'c', text: 'Implementing it multiple times', style: 'kinesthetic', points: 3 },
      { id: 'd', text: 'Creating mind maps or diagrams', style: 'visual', points: 2 }
    ]
  },
  {
    id: 7,
    question: "When facing a time crunch, you prefer to:",
    answers: [
      { id: 'a', text: 'Make quick notes and sketches', style: 'visual', points: 3 },
      { id: 'b', text: 'Talk through the problem quickly', style: 'auditory', points: 3 },
      { id: 'c', text: 'Jump straight into action', style: 'kinesthetic', points: 3 },
      { id: 'd', text: 'Scan through examples rapidly', style: 'visual', points: 2 }
    ]
  },
  {
    id: 8,
    question: "Your ideal data structures lesson would include:",
    answers: [
      { id: 'a', text: 'Animated visualizations of operations', style: 'visual', points: 3 },
      { id: 'b', text: 'Narrated explanations of concepts', style: 'auditory', points: 3 },
      { id: 'c', text: 'Interactive coding exercises', style: 'kinesthetic', points: 3 },
      { id: 'd', text: 'Detailed written explanations', style: 'visual', points: 2 }
    ]
  }
];

// Learning style descriptions
const learningStyles = {
  visual: {
    name: 'Visual Learner',
    icon: Eye,
    color: 'bg-gradient-to-br from-blue-500 to-purple-600',
    description: 'You learn best through visual aids, diagrams, and seeing information presented graphically.',
    characteristics: [
      'Prefer charts, diagrams, and visual representations',
      'Learn well from code syntax highlighting',
      'Benefit from flowcharts and algorithm visualizations',
      'Remember information better when it\'s color-coded'
    ],
    recommendations: [
      'Focus on our interactive visualizations',
      'Use the diagram-heavy theory sections',
      'Try the step-by-step algorithm animations',
      'Utilize syntax highlighting in code examples'
    ],
    suggestedPath: '/data-structures'
  },
  auditory: {
    name: 'Auditory Learner', 
    icon: Headphones,
    color: 'bg-gradient-to-br from-green-500 to-teal-600',
    description: 'You learn best through listening, discussion, and verbal explanations of concepts.',
    characteristics: [
      'Learn well from verbal explanations',
      'Benefit from discussing concepts with others',
      'Remember information heard in lectures',
      'Think out loud when problem-solving'
    ],
    recommendations: [
      'Join study groups or discussion forums',
      'Explain concepts to others (rubber duck debugging)',
      'Use text-to-speech for reading materials',
      'Focus on pseudocode explanations'
    ],
    suggestedPath: '/learning-path'
  },
  kinesthetic: {
    name: 'Kinesthetic Learner',
    icon: Hand,
    color: 'bg-gradient-to-br from-orange-500 to-red-600', 
    description: 'You learn best through hands-on practice, experimentation, and physical interaction.',
    characteristics: [
      'Learn by doing and experimenting',
      'Prefer interactive coding exercises',
      'Need to practice concepts immediately',
      'Learn through trial and error'
    ],
    recommendations: [
      'Start with our interactive simulations',
      'Practice coding exercises immediately',
      'Use the hands-on problem-solving sections',
      'Experiment with code examples'
    ],
    suggestedPath: '/algorithms'
  }
};

export default function LearningStyleQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState({ visual: 0, auditory: 0, kinesthetic: 0 });

  const handleAnswer = (questionId: number, answerId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    const newScores = { visual: 0, auditory: 0, kinesthetic: 0 };
    
    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = quizQuestions.find(q => q.id === parseInt(questionId));
      const answer = question?.answers.find(a => a.id === answerId);
      
      if (answer) {
        newScores[answer.style as keyof typeof newScores] += answer.points;
      }
    });
    
    setScores(newScores);
    setShowResults(true);
  };

  const getTopLearningStyle = () => {
    const maxScore = Math.max(...Object.values(scores));
    return Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] as keyof typeof learningStyles;
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScores({ visual: 0, auditory: 0, kinesthetic: 0 });
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const currentQ = quizQuestions[currentQuestion];
  const topStyle = getTopLearningStyle();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-20">
        {!showResults ? (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-lg font-medium mb-6">
                <Brain className="w-5 h-5 mr-2" />
                Learning Style Assessment
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                Discover Your Learning Style
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Not sure which path to choose? Take our quick assessment to find the perfect learning approach for you.
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-slate-600">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <span className="text-sm font-medium text-slate-600">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>

            {/* Question Card */}
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-8">
                  {currentQ.question}
                </h2>
                
                <div className="space-y-4 mb-8">
                  {currentQ.answers.map((answer, index) => (
                    <motion.button
                      key={answer.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAnswer(currentQ.id, answer.id)}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                        answers[currentQ.id] === answer.id
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                          answers[currentQ.id] === answer.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-slate-300'
                        }`}>
                          {answers[currentQ.id] === answer.id && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="text-slate-700">{answer.text}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
                      currentQuestion === 0
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Previous
                  </button>

                  <button
                    onClick={nextQuestion}
                    disabled={!answers[currentQ.id]}
                    className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
                      !answers[currentQ.id]
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {currentQuestion === quizQuestions.length - 1 ? 'Get Results' : 'Next'}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          /* Results Section */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            {/* Results Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-lg font-medium mb-6"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Assessment Complete!
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                Your Learning Style Results
              </h1>
              <p className="text-xl text-slate-600">
                Based on your responses, here&apos;s your personalized learning profile.
              </p>
            </div>

            {/* Primary Learning Style */}
            {topStyle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                {(() => {
                  const IconComponent = learningStyles[topStyle].icon;
                  return (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                      <div className={`${learningStyles[topStyle].color} p-8 text-white text-center`}>
                        <IconComponent className="w-16 h-16 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold mb-2">You&apos;re a {learningStyles[topStyle].name}!</h2>
                        <p className="text-xl opacity-90">{learningStyles[topStyle].description}</p>
                      </div>
                      
                      <div className="p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                              <Target className="w-5 h-5 mr-2 text-blue-600" />
                              Your Characteristics
                            </h3>
                            <ul className="space-y-2">
                              {learningStyles[topStyle].characteristics.map((char, index) => (
                                <li key={index} className="flex items-start">
                                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-slate-600">{char}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                              <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                              Recommendations for You
                            </h3>
                            <ul className="space-y-2">
                              {learningStyles[topStyle].recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start">
                                  <Zap className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-slate-600">{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}

            {/* Score Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-12"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
                Your Score Breakdown
              </h3>
              
              <div className="space-y-6">
                {Object.entries(scores).map(([style, score]) => {
                  const percentage = (score / Math.max(...Object.values(scores))) * 100;
                  const StyleIcon = learningStyles[style as keyof typeof learningStyles].icon;
                  
                  return (
                    <div key={style}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <StyleIcon className="w-5 h-5 mr-2 text-slate-600" />
                          <span className="font-medium text-slate-800">
                            {learningStyles[style as keyof typeof learningStyles].name}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-slate-600">{score} points</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <motion.div
                          className={`h-3 rounded-full ${
                            style === 'visual' ? 'bg-blue-500' :
                            style === 'auditory' ? 'bg-green-500' :
                            'bg-orange-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Recommended Starting Point */}
            {topStyle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center mb-8"
              >
                <h3 className="text-2xl font-bold mb-4">Ready to Start Learning?</h3>
                <p className="text-xl mb-6 opacity-90">
                  Based on your learning style, we recommend starting here:
                </p>
                <Link
                  href={learningStyles[topStyle].suggestedPath}
                  className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  {learningStyles[topStyle].suggestedPath === '/data-structures' && <Eye className="w-5 h-5 mr-2" />}
                  {learningStyles[topStyle].suggestedPath === '/learning-path' && <BookOpen className="w-5 h-5 mr-2" />}
                  {learningStyles[topStyle].suggestedPath === '/algorithms' && <Code className="w-5 h-5 mr-2" />}
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button
                onClick={restartQuiz}
                className="flex items-center px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
              >
                <Brain className="w-5 h-5 mr-2" />
                Retake Quiz
              </button>
              
              <Link
                href="/"
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Explore All Topics
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}