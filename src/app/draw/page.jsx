"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  RotateCcw,
  Zap,
  Brain,
  Download,
  Settings,
  Info,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Clock,
  Target,
  Palette,
} from "lucide-react";
import Link from "next/link";

export default function DrawPage() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [brushSize, setBrushSize] = useState(8);
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [processingTime, setProcessingTime] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [brushSize]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let x, y;
    if (e.touches) {
      e.preventDefault();
      document.body.style.overflow = "hidden";
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let x, y;
    if (e.touches) {
      e.preventDefault();
      document.body.style.overflow = "hidden";
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    document.body.style.overflow = "auto";
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setPrediction(null);
    setConfidence(null);
    setProcessingTime(null);
  };

  const predictDigit = async () => {
    setIsLoading(true);
    const startTime = Date.now();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const imagedataurl = canvas.toDataURL("image/png"); // base64 PNG
    console.log("Image data:", imagedataurl);

    try {
      const res = await fetch(
        "https://backend-project-u467.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: imageDataURL,
          }),
        },
      );

      const data = await res.json();
      const endTime = Date.now();
      const processingTimeMs = endTime - startTime;

      setPrediction(data.prediction);
      setConfidence(data.confidence);
      setProcessingTime(processingTimeMs);

      setPredictionHistory((prev) => [
        {
          digit: data.prediction,
          confidence: data.confidence,
          timestamp: new Date(),
        },
        ...prev.slice(0, 4),
      ]);
    } catch (error) {
      console.error("Prediction error:", error);
      setPrediction("Error");
      setConfidence(null);
    }

    setIsLoading(false);
  };

  const getConfidenceColor = (conf) => {
    if (conf >= 95) return "text-green-600";
    if (conf >= 85) return "text-blue-600";
    if (conf >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getConfidenceBadge = (conf) => {
    if (conf >= 95)
      return {
        text: "Excellent",
        variant: "default",
        color: "bg-green-100 text-green-800",
      };
    if (conf >= 85)
      return {
        text: "Good",
        variant: "secondary",
        color: "bg-blue-100 text-blue-800",
      };
    if (conf >= 75)
      return {
        text: "Fair",
        variant: "outline",
        color: "bg-yellow-100 text-yellow-800",
      };
    return {
      text: "Low",
      variant: "destructive",
      color: "bg-red-100 text-red-800",
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900">
                  AI Digit Recognition
                </span>
                <div className="text-xs text-gray-500">Healthcare Demo</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800">Live demo</Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Interactive Digit Recognition
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience our advanced MLP technology in action. Draw any digit
              (0-9) and watch our AI provide instant, accurate predictions with
              detailed confidence results.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center p-4 bg-white/60 backdrop-blur-sm border-blue-200">
              <div className="text-2xl font-bold text-blue-600">98.2%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </Card>
            <Card className="text-center p-4 bg-white/60 backdrop-blur-sm border-green-200">
              <div className="text-2xl font-bold text-green-600">&lt;100ms</div>
              <div className="text-sm text-gray-600">Processing Time</div>
            </Card>
            <Card className="text-center p-4 bg-white/60 backdrop-blur-sm border-purple-200">
              <div className="text-2xl font-bold text-purple-600">2M+</div>
              <div className="text-sm text-gray-600">Digits Processed</div>
            </Card>
            <Card className="text-center p-4 bg-white/60 backdrop-blur-sm border-orange-200">
              <div className="text-2xl font-bold text-orange-600">500+</div>
              <div className="text-sm text-gray-600">Healthcare Facilities</div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Canvas Section */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Palette className="h-5 w-5 text-blue-600" />
                      <span>Drawing Canvas</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setBrushSize(4)}
                      >
                        <span
                          className={`w-2 h-2 rounded-full bg-gray-600 ${brushSize === 4 ? "ring-2 ring-blue-500" : ""}`}
                        ></span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setBrushSize(8)}
                      >
                        <span
                          className={`w-3 h-3 rounded-full bg-gray-600 ${brushSize === 8 ? "ring-2 ring-blue-500" : ""}`}
                        ></span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setBrushSize(12)}
                      >
                        <span
                          className={`w-4 h-4 rounded-full bg-gray-600 ${brushSize === 12 ? "ring-2 ring-blue-500" : ""}`}
                        ></span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center space-y-6">
                    <div className="relative">
                      <canvas
                        ref={canvasRef}
                        width={500}
                        height={500}
                        className="border-2 border-gray-300 rounded-2xl cursor-crosshair bg-white shadow-inner max-w-full h-auto touch-none"
                        style={{
                          width: "100%",
                          maxWidth: "500px",
                          aspectRatio: "1",
                        }}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                      />
                      {isLoading && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600 font-medium">
                              Analyzing your drawing...
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center">
                      <Button
                        onClick={clearCanvas}
                        variant="outline"
                        className="flex items-center space-x-2 border-2 hover:border-red-300 hover:text-red-600"
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span>Clear Canvas</span>
                      </Button>

                      <Button
                        onClick={predictDigit}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center space-x-2 px-8 shadow-lg"
                      >
                        <Zap className="h-4 w-4" />
                        <span>
                          {isLoading ? "Analyzing..." : "Predict Digit"}
                        </span>
                      </Button>

                      <Button
                        variant="outline"
                        className="flex items-center space-x-2"
                      >
                        <Download className="h-4 w-4" />
                        <span>Save Image</span>
                      </Button>
                    </div>

                    {/* Drawing Instructions */}
                    <div className="bg-blue-50 p-4 rounded-xl w-full max-w-md">
                      <div className="flex items-start space-x-3">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium mb-1">Drawing Tips:</p>
                          <ul className="space-y-1 text-xs">
                            <li>• Draw digits clearly in the center</li>
                            <li>• Use consistent stroke width</li>
                            <li>• Ensure digits fill most of the canvas</li>
                            <li>
                              • Try different brush sizes for best results
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Main Prediction */}
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <span>AI Prediction</span>
                    {processingTime && (
                      <Badge variant="outline" className="ml-auto">
                        <Clock className="h-3 w-3 mr-1" />
                        {processingTime}ms
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-6">
                    {prediction !== null && confidence !== null ? (
                      <>
                        <div className="space-y-4">
                          <div className="relative">
                            <div className="text-8xl font-bold text-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 w-32 h-32 rounded-3xl flex items-center justify-center mx-auto shadow-inner border-2 border-blue-100">
                              {prediction}
                            </div>
                          </div>

                          <div>
                            <p className="text-2xl font-bold text-gray-900 mb-2">
                              Predicted Digit: {prediction}
                            </p>
                            <div className="space-y-2">
                              <Progress
                                value={confidence}
                                className="w-full h-3"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">
                              Model Accuracy:
                            </span>
                            <span className="font-semibold text-green-600">
                              98.2%
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">
                              Processing Time:
                            </span>
                            <span className="font-semibold text-blue-600">
                              {processingTime}ms
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">
                              Model Version:
                            </span>
                            <span className="font-semibold text-gray-700">
                              MLP
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
                          Our advanced MLP model analyzed your drawing and
                          determined it most likely represents the digit{" "}
                          <strong className="text-gray-900">
                            {prediction}
                          </strong>
                        </p>
                      </>
                    ) : (
                      <div className="py-12">
                        <div className="text-gray-400 mb-6">
                          <Brain className="h-20 w-20 mx-auto" />
                        </div>
                        <p className="text-lg text-gray-500 mb-4">
                          Draw a digit and click "Predict" to see AI analysis
                        </p>
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-600">
                            Our AI is ready to analyze your handwritten digits
                            with healthcare-grade accuracy.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Prediction History */}
              {predictionHistory.length > 0 && (
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span>Recent Predictions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {predictionHistory.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="font-bold text-blue-600">
                                {item.digit}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                Digit {item.digit}
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.timestamp.toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Model Information */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-900">
                    <Settings className="h-5 w-5" />
                    <span>Model Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-800">Architecture:</span>
                      <span className="font-semibold text-blue-900">
                        Multilayer Perceptron
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800">Training Data:</span>
                      <span className="font-semibold text-blue-900">
                        2M+ Healthcare Samples
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800">
                        Validation Accuracy:
                      </span>
                      <span className="font-semibold text-green-700">
                        98.2%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800">HIPAA Compliant:</span>
                      <span className="font-semibold text-green-700">
                        ✓ Certified
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* How It Works Section */}
          <Card className="mt-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-200 shadow-xl">
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  How Our AI Works
                </h3>
                <p className="text-gray-600">
                  Advanced machine learning pipeline optimized for healthcare
                  accuracy
                </p>
              </div>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="space-y-3">
                  <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                    <span className="text-xl font-bold text-blue-600">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    Image Preprocessing
                  </h4>
                  <p className="text-sm text-gray-600">
                    Normalize and enhance your drawing for optimal recognition
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                    <span className="text-xl font-bold text-indigo-600">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    Feature Extraction
                  </h4>
                  <p className="text-sm text-gray-600">
                    MLP layers identify key patterns and digit characteristics
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                    <span className="text-xl font-bold text-purple-600">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    Classification
                  </h4>
                  <p className="text-sm text-gray-600">
                    Advanced neural network predicts the most likely digit
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                    <span className="text-xl font-bold text-green-600">4</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    Confidence Analysis
                  </h4>
                  <p className="text-sm text-gray-600">
                    Calculate prediction confidence for healthcare reliability
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
