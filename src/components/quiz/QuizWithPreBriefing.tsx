import React, { useState } from 'react';
import QuizStep from '@/components/quiz/QuizStep';
import QuizResult, { QuizResultType } from '@/components/quiz/QuizResult';
import PreBriefingForm, { PreBriefingFormData } from '@/components/quiz/PreBriefingForm';
import { quizQuestions, calculateQuizResult } from '@/data/quizData';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Enum para controlar o fluxo do quiz
enum QuizFlowState {
  QUIZ,
  RESULTS,
  BRIEFING,
  SUBMISSION_SUCCESS
}

const QuizWithPreBriefing = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResultType | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [flowState, setFlowState] = useState<QuizFlowState>(QuizFlowState.QUIZ);
  
  const totalSteps = quizQuestions.length;
  const currentQuestion = quizQuestions.find(q => q.id === currentStep) || quizQuestions[0];
  
  // Lidar com a seleção de opção
  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
    setAnswers(prev => ({
      ...prev,
      [currentStep]: optionId
    }));
  };
  
  // Lidar com o próximo passo
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setSelectedOption(answers[currentStep + 1] || null);
        setIsTransitioning(false);
      }, 400);
    } else {
      // Calcular e mostrar resultados
      setIsTransitioning(true);
      setTimeout(() => {
        // Converter para unknown primeiro para evitar erro de tipo
        const result = (calculateQuizResult(answers) as unknown) as QuizResultType;
        setQuizResult(result);
        setFlowState(QuizFlowState.RESULTS);
        setIsTransitioning(false);
      }, 400);
    }
  };
  
  // Lidar com o passo anterior
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setSelectedOption(answers[currentStep - 1] || null);
        setIsTransitioning(false);
      }, 400);
    }
  };
  
  // Continuar para o pré-briefing
  const handleContinueToBriefing = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFlowState(QuizFlowState.BRIEFING);
      setIsTransitioning(false);
    }, 300);
  };
  
  // Voltar para os resultados
  const handleBackToResults = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFlowState(QuizFlowState.RESULTS);
      setIsTransitioning(false);
    }, 300);
  };
  
  // Lidar com o envio do formulário de pré-briefing
  const handlePreBriefingSubmit = (data: PreBriefingFormData) => {
    // Mostrar tela de sucesso após redirecionamento para WhatsApp
    setFlowState(QuizFlowState.SUBMISSION_SUCCESS);
  };
  
  // Lidar com reinício do quiz
  const handleRestartQuiz = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(1);
      setAnswers({});
      setSelectedOption(null);
      setQuizResult(null);
      setFlowState(QuizFlowState.QUIZ);
      setIsTransitioning(false);
    }, 300);
  };
  
  // Componente para mostrar após o envio bem-sucedido
  const SuccessMessage = () => (
    <motion.div 
      className="bg-black rounded-xl p-5 md:p-8 lg:p-10 relative border border-gray-800 max-w-2xl mx-auto text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500 bg-opacity-20 mb-6">
        <CheckCircle size={40} className="text-green-500" />
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Obrigado pelo seu interesse!
      </h2>
      
      <p className="text-gray-300 mb-8">
        Seus dados foram enviados via WhatsApp. Entraremos em contato em breve 
        para conversarmos sobre seu projeto. Fique atento ao seu telefone.
      </p>
      
      <div className="space-y-4">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setFlowState(QuizFlowState.RESULTS)}
        >
          Voltar para meu resultado
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full text-gray-400"
          onClick={handleRestartQuiz}
        >
          Refazer o Quiz
        </Button>
      </div>
    </motion.div>
  );
  
  return (
    <AnimatePresence mode="wait">
      {flowState === QuizFlowState.QUIZ && (
        <motion.div
          key="quiz"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <QuizStep
            stepNumber={currentStep}
            totalSteps={totalSteps}
            question={currentQuestion.question}
            options={currentQuestion.options}
            selectedOption={selectedOption}
            onSelect={handleSelectOption}
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
          />
        </motion.div>
      )}
      
      {flowState === QuizFlowState.RESULTS && quizResult && (
        <motion.div
          key="results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <QuizResult 
            result={quizResult} 
            onRestart={handleRestartQuiz}
            onContinue={handleContinueToBriefing}
          />
        </motion.div>
      )}
      
      {flowState === QuizFlowState.BRIEFING && quizResult && (
        <motion.div
          key="briefing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <PreBriefingForm
            projectType={quizResult.title}
            onSubmit={handlePreBriefingSubmit}
            onBack={handleBackToResults}
          />
        </motion.div>
      )}
      
      {flowState === QuizFlowState.SUBMISSION_SUCCESS && (
        <motion.div
          key="success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <SuccessMessage />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuizWithPreBriefing; 