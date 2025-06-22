
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Camera, Upload } from 'lucide-react';

interface AnalysisResultsProps {
  uploadedImage: string | null;
  onReset: () => void;
}

const AnalysisResults = ({ uploadedImage, onReset }: AnalysisResultsProps) => {
  // Mock analysis results
  const results = {
    diagnosis: "Normal",
    confidence: 94.2,
    riskLevel: "Low",
    details: {
      cupToDiscRatio: 0.35,
      opticNerveHealth: "Normal",
      retinalNerveLayer: "Intact",
      vascularPatterns: "Normal"
    }
  };

  const isGlaucoma = results.diagnosis === "Glaucoma";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Results Header */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className={`w-4 h-4 rounded-full ${isGlaucoma ? 'bg-red-500' : 'bg-green-500'}`} />
            <CardTitle className="text-2xl">
              Analysis Complete
            </CardTitle>
          </div>
          <CardDescription>
            AI model has processed your fundus image
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Original & Heatmap Images */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Original Image</CardTitle>
            </CardHeader>
            <CardContent>
              <img 
                src={uploadedImage || ''} 
                alt="Original fundus image"
                className="w-full rounded-lg shadow-md"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Grad-CAM Heatmap</CardTitle>
              <CardDescription>
                AI attention areas highlighted in red
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <img 
                  src={uploadedImage || ''} 
                  alt="Grad-CAM visualization"
                  className="w-full rounded-lg shadow-md opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-200 to-transparent opacity-30 rounded-lg" />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-red-100 text-red-700">
                    Heatmap Overlay
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results */}
        <div className="space-y-4">
          <Card className={`border-2 ${isGlaucoma ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Diagnosis</span>
                <Badge 
                  variant={isGlaucoma ? "destructive" : "secondary"} 
                  className={isGlaucoma ? "bg-red-500" : "bg-green-500 text-white"}
                >
                  {results.diagnosis}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Confidence Score</span>
                  <span className="text-sm font-bold">{results.confidence}%</span>
                </div>
                <Progress value={results.confidence} className="h-2" />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Risk Level</span>
                <Badge variant="outline" className={`${
                  results.riskLevel === 'Low' ? 'border-green-500 text-green-700' :
                  results.riskLevel === 'Medium' ? 'border-yellow-500 text-yellow-700' :
                  'border-red-500 text-red-700'
                }`}>
                  {results.riskLevel}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detailed Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Cup-to-Disc Ratio</span>
                <span className="text-sm">{results.details.cupToDiscRatio}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Optic Nerve Health</span>
                <span className="text-sm">{results.details.opticNerveHealth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Retinal Nerve Layer</span>
                <span className="text-sm">{results.details.retinalNerveLayer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Vascular Patterns</span>
                <span className="text-sm">{results.details.vascularPatterns}</span>
              </div>
            </CardContent>
          </Card>

          <Alert className="border-blue-200 bg-blue-50">
            <AlertDescription className="text-blue-700">
              <strong>Important:</strong> This analysis is for screening purposes only. 
              Please consult with an ophthalmologist for professional medical diagnosis and treatment recommendations.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Button 
              onClick={onReset}
              variant="outline" 
              className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              Analyze Another Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
