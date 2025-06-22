
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Camera, Image, FileImage } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import AnalysisResults from '@/components/AnalysisResults';
import AboutSection from '@/components/AboutSection';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setCurrentStep(2);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setCurrentStep(3);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setCurrentStep(4);
    }, 3000);
  };

  const resetAnalysis = () => {
    setUploadedImage(null);
    setIsAnalyzing(false);
    setAnalysisComplete(false);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">GlaucoScan</h1>
                <p className="text-sm text-blue-600">AI-Powered Glaucoma Detection</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
              v1.0 Beta
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        {currentStep === 1 && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              🔬 AI-Powered Medical Imaging
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Early Detection of <span className="text-blue-600">Glaucoma</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Upload fundus images for instant AI-powered glaucoma screening. 
              Our advanced deep learning model provides accurate detection with visual explanations.
            </p>
            
            {/* Key Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-blue-200 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <Upload className="w-8 h-8 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">Easy Upload</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Simple drag-and-drop interface for fundus images</p>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <Camera className="w-8 h-8 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">AI Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Advanced CNN model with high accuracy detection</p>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <Image className="w-8 h-8 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">Visual Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Grad-CAM heatmaps for interpretable results</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-8 h-0.5 mx-2 transition-colors ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            {currentStep === 1 && "Upload fundus image"}
            {currentStep === 2 && "Review and analyze"}
            {currentStep === 3 && "AI processing"}
            {currentStep === 4 && "View results"}
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Image Upload Section */}
          {(currentStep === 1 || currentStep === 2) && (
            <ImageUpload 
              onImageUpload={handleImageUpload}
              uploadedImage={uploadedImage}
              onAnalyze={handleAnalyze}
              showAnalyzeButton={currentStep === 2}
            />
          )}

          {/* Analysis in Progress */}
          {currentStep === 3 && isAnalyzing && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing Image...</span>
                </CardTitle>
                <CardDescription>
                  Our AI model is processing your fundus image
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={66} className="w-full" />
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Image preprocessing</span>
                    <span className="text-green-600">✓ Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Feature extraction</span>
                    <span className="text-green-600">✓ Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Classification analysis</span>
                    <span className="text-blue-600">⏳ Processing...</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Generating visual insights</span>
                    <span className="text-gray-400">Pending</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analysis Results */}
          {currentStep === 4 && analysisComplete && (
            <AnalysisResults 
              uploadedImage={uploadedImage}
              onReset={resetAnalysis}
            />
          )}

          {/* About Section - Only show on initial step */}
          {currentStep === 1 && <AboutSection />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              GlaucoScan - AI-Powered Glaucoma Detection
            </p>
            <p className="text-sm text-gray-500">
              For research and screening purposes. Not a substitute for professional medical diagnosis.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
