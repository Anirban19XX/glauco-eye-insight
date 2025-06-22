import React, { useCallback, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileImage, Camera } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  uploadedImage: string | null;
  onAnalyze: () => void;
  showAnalyzeButton: boolean;
}

const ImageUpload = ({ onImageUpload, uploadedImage, onAnalyze, showAnalyzeButton }: ImageUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageUpload(event.target.result as string);
        }
      };
      reader.readAsDataURL(imageFile);
    }
  }, [onImageUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageUpload(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2 border-dashed border-blue-300 hover:border-blue-400 transition-colors">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <FileImage className="w-6 h-6 text-blue-600" />
            <span>Upload Fundus Image</span>
          </CardTitle>
          <CardDescription>
            Upload a fundus (retinal) image for AI-powered glaucoma detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!uploadedImage ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drag and drop your fundus image here
              </p>
              <p className="text-gray-500 mb-4">
                or click to browse files
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <label htmlFor="file-upload" className="cursor-pointer">
                  Select Image
                </label>
              </Button>
              <p className="text-sm text-gray-400 mt-4">
                Supported formats: JPEG, PNG, WebP (Max 10MB)
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded fundus image"
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    ✓ Image Ready
                  </span>
                </div>
              </div>
              
              <Alert className="border-blue-200 bg-blue-50">
                <AlertDescription className="text-blue-700">
                  <strong>Image uploaded successfully!</strong> The AI model will analyze this fundus image 
                  to detect signs of glaucoma including optic nerve damage and cup-to-disc ratio abnormalities.
                </AlertDescription>
              </Alert>

              {showAnalyzeButton && (
                <div className="text-center">
                  <Button 
                    onClick={onAnalyze}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 px-8"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Analyze for Glaucoma
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    Analysis typically takes 30-60 seconds
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageUpload;
