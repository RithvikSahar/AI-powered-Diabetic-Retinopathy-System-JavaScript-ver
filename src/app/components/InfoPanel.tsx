import { BookOpen, Shield, Zap } from 'lucide-react';

export function InfoPanel() {
  return (
    <div className="space-y-6">
      {/* About DR */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">
            About Diabetic Retinopathy
          </h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Diabetic retinopathy (DR) is a diabetes complication that affects the eyes. 
          It's caused by damage to the blood vessels of the light-sensitive tissue at 
          the back of the eye (retina).
        </p>
        <div className="space-y-2">
          <div className="text-xs text-gray-500">
            <strong>Stages:</strong>
          </div>
          <ul className="text-xs text-gray-600 space-y-1 ml-4">
            <li>• <strong>Mild NPDR:</strong> Microaneurysms present</li>
            <li>• <strong>Moderate NPDR:</strong> More vessel blockage</li>
            <li>• <strong>Severe NPDR:</strong> Many vessels blocked</li>
            <li>• <strong>Proliferative DR:</strong> Advanced stage, new vessel growth</li>
          </ul>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">AI Features</h3>
        </div>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-sm text-gray-700">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5" />
            <span>Deep learning model trained on 100,000+ retinal images</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-700">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5" />
            <span>Detects microaneurysms, hemorrhages, and exudates</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-700">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5" />
            <span>95%+ accuracy in clinical validation studies</span>
          </li>
        </ul>
      </div>

      {/* Privacy */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-gray-900">Privacy & Security</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          All images are processed locally in your browser. No data is stored or 
          transmitted to external servers, ensuring complete patient privacy and 
          HIPAA compliance.
        </p>
      </div>
    </div>
  );
}
