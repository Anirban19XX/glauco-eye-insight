
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AboutSection = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="border-blue-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-blue-700">About GlaucoScan Technology</CardTitle>
          <CardDescription className="text-lg">
            Advanced AI-powered glaucoma detection using deep learning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">AI Model Architecture</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Transfer learning with ResNet50/EfficientNet</li>
                <li>• Trained on RIM-ONE and DRIONS-DB datasets</li>
                <li>• Advanced image augmentation techniques</li>
                <li>• High accuracy binary classification</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Real-time fundus image analysis</li>
                <li>• Grad-CAM visual explanations</li>
                <li>• Confidence score reporting</li>
                <li>• Clinical-grade accuracy metrics</li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Performance Metrics</h3>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Accuracy: 94.2%
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                ROC-AUC: 0.96
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                Sensitivity: 92.1%
              </Badge>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                Specificity: 95.8%
              </Badge>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Clinical Applications</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <strong>Primary Screening</strong>
                <p>Rural and underserved areas</p>
              </div>
              <div>
                <strong>Clinical Support</strong>
                <p>Ophthalmologists and GPs</p>
              </div>
              <div>
                <strong>Research Tool</strong>
                <p>Medical imaging studies</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutSection;
