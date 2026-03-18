import { motion } from 'motion/react';
import { Brain, Eye, Scan, CheckCircle } from 'lucide-react';

interface AnalyzingStateProps {
  progress: number;
}

const steps = [
  { icon: Scan, label: 'Preprocessing image', progress: 25 },
  { icon: Eye, label: 'Detecting features', progress: 50 },
  { icon: Brain, label: 'AI analysis', progress: 75 },
  { icon: CheckCircle, label: 'Generating report', progress: 100 },
];

export function AnalyzingState({ progress }: AnalyzingStateProps) {
  const currentStep = steps.findIndex((step) => progress <= step.progress);
  const activeStepIndex = currentStep === -1 ? steps.length - 1 : currentStep;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Analyzing Retinal Image
        </h3>
        <p className="text-sm text-gray-500">
          Please wait while our AI processes your image
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-600 mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="bg-blue-600 h-2 rounded-full"
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeStepIndex;
          const isCompleted = progress > step.progress;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 border border-blue-200'
                  : isCompleted
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div
                className={`p-2 rounded-full ${
                  isActive
                    ? 'bg-blue-100'
                    : isCompleted
                    ? 'bg-green-100'
                    : 'bg-gray-200'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive
                      ? 'text-blue-600'
                      : isCompleted
                      ? 'text-green-600'
                      : 'text-gray-400'
                  }`}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  isActive
                    ? 'text-blue-900'
                    : isCompleted
                    ? 'text-green-900'
                    : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
              {isActive && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-auto w-2 h-2 bg-blue-600 rounded-full"
                />
              )}
              {isCompleted && (
                <CheckCircle className="ml-auto w-5 h-5 text-green-600" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
