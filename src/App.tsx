import React, { useState } from 'react';
import { Brain, Upload, AlertCircle, FileImage, Percent, UserCircle, ClipboardCheck, Stethoscope } from 'lucide-react';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    risk: number;
    confidence: number;
  } | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      simulateAnalysis();
    }
  };

  const simulateAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult({
        risk: Math.random() * 100,
        confidence: 85 + Math.random() * 10,
      });
      setAnalyzing(false);
    }, 2000);
  };

  const assessments = [
    {
      type: "Initial Assessment",
      findings: "Abnormal cell patterns detected in region of interest",
      recommendation: "Further diagnostic imaging recommended",
      urgency: "Medium",
      nextSteps: ["Schedule PET scan", "Blood work analysis", "Tissue sampling"]
    },
    {
      type: "Pathology Review",
      findings: "Irregular tissue density variations observed",
      recommendation: "Biopsy required for definitive diagnosis",
      urgency: "High",
      nextSteps: ["Surgical consultation", "Molecular testing", "Treatment planning"]
    },
    {
      type: "Oncology Consultation",
      findings: "Potential malignant characteristics identified",
      recommendation: "Comprehensive treatment plan needed",
      urgency: "High",
      nextSteps: ["Multi-disciplinary review", "Staging assessment", "Treatment options discussion"]
    }
  ];

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed text-white relative">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-900/95"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-black/40 backdrop-blur-sm border-b border-gray-700/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl font-bold">MediScan AI</h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Upload Section */}
            <div className="space-y-6">
              <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700/30 shadow-xl">
                <h2 className="text-xl font-semibold mb-4 text-gray-200">Scan Analysis</h2>
                <div className="space-y-4">
                  <label 
                    className={`
                      relative flex flex-col items-center justify-center w-full h-64 
                      border-2 border-dashed rounded-lg cursor-pointer
                      ${previewUrl ? 'border-blue-500/50' : 'border-gray-600/50 hover:border-gray-500/50'}
                      transition-colors duration-200 bg-gray-800/20
                    `}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {previewUrl ? (
                        <img 
                          src={previewUrl} 
                          alt="Selected scan" 
                          className="max-h-56 rounded-lg object-contain"
                        />
                      ) : (
                        <>
                          <Upload className="w-12 h-12 mb-4 text-gray-400/70" />
                          <p className="mb-2 text-sm text-gray-300/70">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-400/70">
                            Supported formats: DICOM, PNG, JPEG, TIFF
                          </p>
                        </>
                      )}
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileSelect}
                      accept="image/*"
                    />
                  </label>

                  {analyzing && (
                    <div className="flex items-center justify-center space-x-2 text-blue-400/70">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent"></div>
                      <span>Analyzing scan...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Medical Assessment */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <Stethoscope className="w-6 h-6 text-blue-400" />
                  <h3 className="text-lg font-semibold">Professional Assessment</h3>
                </div>

                <div className="space-y-6">
                  {assessments.map((assessment, index) => (
                    <div key={index} className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/30">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium text-blue-400">{assessment.type}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          assessment.urgency === 'High' ? 'bg-red-500/20 text-red-400' :
                          assessment.urgency === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {assessment.urgency} Priority
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-400">Findings</p>
                          <p className="text-sm text-gray-200">{assessment.findings}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400">Recommendation</p>
                          <p className="text-sm text-gray-200">{assessment.recommendation}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400">Next Steps</p>
                          <ul className="list-disc list-inside text-sm text-gray-200">
                            {assessment.nextSteps.map((step, stepIndex) => (
                              <li key={stepIndex}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Results Section */}
            <div className="space-y-6">
              {/* Results Display */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-xl h-full">
                <h2 className="text-xl font-semibold mb-6">Analysis Results</h2>
                
                {result ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/30">
                      <div className="flex items-center space-x-3">
                        <AlertCircle className={`w-6 h-6 ${result.risk > 70 ? 'text-red-400' : result.risk > 30 ? 'text-yellow-400' : 'text-green-400'}`} />
                        <span className="font-medium">Risk Assessment</span>
                      </div>
                      <span className="text-xl font-bold">{result.risk.toFixed(1)}%</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/30">
                      <div className="flex items-center space-x-3">
                        <Percent className="w-6 h-6 text-blue-400" />
                        <span className="font-medium">AI Confidence</span>
                      </div>
                      <span className="text-xl font-bold">{result.confidence.toFixed(1)}%</span>
                    </div>

                    <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/30">
                      <h4 className="font-medium mb-2">Recommendations</h4>
                      <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
                        <li>Schedule follow-up examination within {result.risk > 50 ? '2 weeks' : '3 months'}</li>
                        <li>Consider additional {result.risk > 70 ? 'immediate' : 'routine'} screening tests</li>
                        <li>Consult with specialist for detailed evaluation</li>
                      </ul>
                    </div>

                    {/* Clinical Notes */}
                    <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/30">
                      <div className="flex items-center space-x-2 mb-3">
                        <ClipboardCheck className="w-5 h-5 text-blue-400" />
                        <h4 className="font-medium">Clinical Notes</h4>
                      </div>
                      <div className="space-y-3 text-sm text-gray-300">
                        <p>Scan reveals potential abnormalities in the affected region. Pattern recognition suggests possible malignant characteristics requiring further investigation.</p>
                        <p>Tissue density variations observed in quadrant {Math.floor(Math.random() * 4) + 1}. Contrast uptake patterns indicate need for detailed examination.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <FileImage className="w-16 h-16 mb-4" />
                    <p>Upload a scan to see AI analysis results</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;