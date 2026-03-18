import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { AnalyzingState } from './components/AnalyzingState';
import { AnalysisResults, AnalysisResult } from './components/AnalysisResults';
import { InfoPanel } from './components/InfoPanel';
import { StatisticsPanel } from './components/StatisticsPanel';
import { RotateCcw } from 'lucide-react';

// Mock AI analysis function
const performAnalysis = async (
  onProgress: (progress: number) => void
): Promise<AnalysisResult> => {
  // Simulate processing stages
  const stages = [0, 25, 50, 75, 100];
  for (const stage of stages) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    onProgress(stage);
  }

  // Random result for demonstration
  const severities: AnalysisResult['severity'][] = [
    'none',
    'mild',
    'moderate',
    'severe',
    'proliferative',
  ];
  const randomSeverity = severities[Math.floor(Math.random() * severities.length)];

  const results: Record<AnalysisResult['severity'], AnalysisResult> = {
    none: {
      severity: 'none',
      confidence: 92 + Math.floor(Math.random() * 8),
      findings: [
        'No microaneurysms detected',
        'No hemorrhages observed',
        'Retinal vessels appear normal',
        'Optic disc shows normal characteristics',
      ],
      recommendation:
        'No signs of diabetic retinopathy detected. Continue regular annual screenings and maintain good glycemic control.',
    },
    mild: {
      severity: 'mild',
      confidence: 88 + Math.floor(Math.random() * 10),
      findings: [
        'Microaneurysms present in the temporal region',
        'Small dot hemorrhages observed',
        'No hard exudates detected',
        'Retinal thickness within normal limits',
      ],
      recommendation:
        'Mild non-proliferative diabetic retinopathy detected. Recommend follow-up examination in 6-12 months and optimization of blood glucose levels.',
    },
    moderate: {
      severity: 'moderate',
      confidence: 85 + Math.floor(Math.random() * 12),
      findings: [
        'Multiple microaneurysms in more than one quadrant',
        'Moderate dot and blot hemorrhages',
        'Possible cotton wool spots detected',
        'Some venous beading noted',
      ],
      recommendation:
        'Moderate non-proliferative diabetic retinopathy detected. Recommend ophthalmologist consultation within 3-6 months. Close monitoring and glucose control essential.',
    },
    severe: {
      severity: 'severe',
      confidence: 83 + Math.floor(Math.random() * 10),
      findings: [
        'Extensive microaneurysms and hemorrhages',
        'Significant venous beading in multiple quadrants',
        'Intraretinal microvascular abnormalities (IRMA) present',
        'Multiple cotton wool spots observed',
      ],
      recommendation:
        'Severe non-proliferative diabetic retinopathy detected. Urgent ophthalmologist referral recommended within 2-4 weeks. High risk of progression to PDR.',
    },
    proliferative: {
      severity: 'proliferative',
      confidence: 87 + Math.floor(Math.random() * 8),
      findings: [
        'Neovascularization of the disc (NVD) detected',
        'Neovascularization elsewhere (NVE) observed',
        'Vitreous hemorrhage may be present',
        'Risk of retinal detachment',
      ],
      recommendation:
        'Proliferative diabetic retinopathy detected. URGENT ophthalmologist consultation required within 1 week. Laser photocoagulation or anti-VEGF therapy may be needed.',
    },
  };

  return results[randomSeverity];
};

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleImageSelect = (file: File, preview: string) => {
    setSelectedImage(preview);
    setResult(null);
  };

  const handleClear = () => {
    setSelectedImage(null);
    setResult(null);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setResult(null);

    const analysisResult = await performAnalysis((progress) => {
      setAnalysisProgress(progress);
    });

    setResult(analysisResult);
    setIsAnalyzing(false);
  };

  const handleNewScan = () => {
    handleClear();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Upload/Display */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <ImageUploader
                onImageSelect={handleImageSelect}
                selectedImage={selectedImage}
                onClear={handleClear}
              />

              {selectedImage && !isAnalyzing && !result && (
                <div className="mt-6">
                  <button
                    onClick={handleAnalyze}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Analyze Image
                  </button>
                </div>
              )}
            </div>

            {/* Analysis State */}
            {isAnalyzing && <AnalyzingState progress={analysisProgress} />}

            {/* Results */}
            {result && !isAnalyzing && (
              <div className="space-y-4">
                <AnalysisResults result={result} />
                <button
                  onClick={handleNewScan}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  New Scan
                </button>
              </div>
            )}

            {/* Statistics */}
            {!selectedImage && <StatisticsPanel />}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <InfoPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
