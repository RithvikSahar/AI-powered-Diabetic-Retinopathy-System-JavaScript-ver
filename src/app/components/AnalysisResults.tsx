import { AlertCircle, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { motion } from 'motion/react';

export interface AnalysisResult {
  severity: 'none' | 'mild' | 'moderate' | 'severe' | 'proliferative';
  confidence: number;
  findings: string[];
  recommendation: string;
}

interface AnalysisResultsProps {
  result: AnalysisResult;
}

const severityConfig = {
  none: {
    label: 'No DR Detected',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    icon: CheckCircle,
    iconColor: 'text-green-600',
  },
  mild: {
    label: 'Mild NPDR',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    icon: AlertCircle,
    iconColor: 'text-yellow-600',
  },
  moderate: {
    label: 'Moderate NPDR',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    icon: AlertTriangle,
    iconColor: 'text-orange-600',
  },
  severe: {
    label: 'Severe NPDR',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    icon: XCircle,
    iconColor: 'text-red-600',
  },
  proliferative: {
    label: 'Proliferative DR',
    color: 'text-red-900',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-300',
    icon: XCircle,
    iconColor: 'text-red-700',
  },
};

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const config = severityConfig[result.severity];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Main Result Card */}
      <div className={`rounded-xl border-2 ${config.borderColor} ${config.bgColor} p-6`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full ${config.bgColor}`}>
            <Icon className={`w-8 h-8 ${config.iconColor}`} />
          </div>
          <div className="flex-1">
            <h3 className={`text-2xl font-semibold ${config.color} mb-2`}>
              {config.label}
            </h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-600">Confidence:</span>
              <div className="flex-1 bg-white rounded-full h-2 max-w-xs">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.confidence}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className={`h-full rounded-full ${
                    result.confidence >= 80 ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                />
              </div>
              <span className={`text-sm font-semibold ${config.color}`}>
                {result.confidence}%
              </span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {result.recommendation}
            </p>
          </div>
        </div>
      </div>

      {/* Findings */}
      {result.findings.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Clinical Findings</h4>
          <ul className="space-y-3">
            {result.findings.map((finding, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                </div>
                <span className="text-sm text-gray-700">{finding}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
        <p className="text-xs text-gray-600 leading-relaxed">
          <strong>Medical Disclaimer:</strong> This AI analysis is for screening purposes only 
          and should not replace professional medical diagnosis. Please consult with a qualified 
          ophthalmologist for proper evaluation and treatment.
        </p>
      </div>
    </motion.div>
  );
}
