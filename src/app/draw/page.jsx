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
const guideDigits = [0, 1, 2, 3, 4, 5,6,7,8,9];

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
        "https://backend-3hms.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: imagedataurl,
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
                   DigitAI
                </span>
                <div className="text-xs text-gray-500">Healthcare Innovation</div>
              </div>
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
              Experience DigitAI in action. Draw any digit
              (0-9) and watch DigitAI  provide instant, accurate results  with
              detailed confidence analysis.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center p-4 bg-white/60 backdrop-blur-sm border-blue-200">
              <div className="text-2xl font-bold text-blue-600">99.1%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </Card>
            <Card className="text-center p-4 bg-white/60 backdrop-blur-sm border-green-200">
              <div className="text-2xl font-bold text-green-600">&lt;10s</div>
              <div className="text-sm text-gray-600">Processing Time</div>
            </Card>
            <Card className="text-center p-4 bg-white/60 backdrop-blur-sm border-purple-200">
              <div className="text-2xl font-bold text-purple-600">70K</div>
              <div className="text-sm text-gray-600">Digits Processed</div>
            </Card>
            <Card className="text-center p-4 bg-white/60 backdrop-blur-sm border-orange-200">
              <div className="text-2xl font-bold text-orange-600">Low</div>
              <div className="text-sm text-gray-600">Error Rate</div>
            </Card>
          </div>
{/* Digit Writing Guide */}
<Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
  <CardHeader className="pb-2">
    <CardTitle className="flex items-center space-x-2">
      <Info className="h-5 w-5 text-blue-600" />
      <span>Digit Writing Guide</span>
      
    </CardTitle>
    
      <p className="text-center text-sm text-gray-500 mb-4">
  Please follow the guide below carefully to complete the process.
</p>
  </CardHeader>
  <CardContent>
    {/* 0–9 thumbnails */}
    <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 place-items-center">
      {guideDigits.map((d) => (
        <div key={d} className="flex flex-col items-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gray-50 border border-gray-200 shadow-inner flex items-center justify-center overflow-hidden">
            <img
             src={`/guide/${d}.png`}

              alt={`Example ${d}`}
              className="w-10 h-10 object-contain"
            />
          </div>
          <span className="mt-1 text-xs text-gray-600">{d}</span>
        </div>
      ))}
    </div>

   
  </CardContent>
</Card>

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
                          {isLoading ? "Analyzing..." : "Run DigitAI"}
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
                        <div className="text-lg text-blue-800">
                          <p className="font-medium mb-1">Drawing Tips:</p>
                          <ul className="space-y-1 text-base">
                            <li>• Draw the digit clearly in the center</li>
                            <li>• Use consistent stroke width</li>
                            <li>• Ensure the digit fills most of the canvas</li>
                            
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
                    <span>DigitAI Results </span>
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
                              Recognized Digit: {prediction}
                            </p>
                            <div className="space-y-2 from-cyan-400 to-teal-500">
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
                              99.1%
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
                              CNN
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
                          DigitAI analyzed your drawing and
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
                          Draw a digit and click "Run DigitAI
" to see AI analysis
                        </p>
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-600">
                            DigitAI is ready to analyze your handwritten digits
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
                      <span>Recent results</span>
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
                      <span className="text-blue-800">Training Data:</span>
                      <span className="font-semibold text-blue-900">
                        70K Samples
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800">
                        Validation Accuracy:
                      </span>
                      <span className="font-semibold text-green-700">
                        99.1%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800">Resilient Infrastructure:</span>
                      <span className="font-semibold text-green-700">
                        ✓ Certified
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          
        </div>
      
      </main>
       {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">DigitAI</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Advancing healthcare through intelligent digit recognition technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/#how-it-works" className="hover:text-white transition-colors">
                    How to Use DigitAI?
                  </a>
                </li>
              </ul>
            </div>
            <div>
<h4 className="font-semibold mb-4">Project Team</h4>
  <ul className="space-y-2 text-gray-400">
    <li>
      <a href="https://www.linkedin.com/in/sarah-aliouat-965722284/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
        Sarah Aliouat
      </a>
    </li>
    <li>
      <a href="https://www.linkedin.com/in/nazsa13/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
        Mhd Nazir Sagherji
      </a>
    </li>
    <li>
      <a href="https://www.linkedin.com/in/maisam-wahbah/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
        Dr. Maisam Wahbah
      </a>
    </li>
  </ul>
</div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="https://www.canva.com/design/DAGl8FmbDfY/OcUN-IPXF7i6thyYSYjiNg/edit?utm_content=DAGl8FmbDfY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Project Brochure
                  </a>
                </li>
                <li>
                  <a href="https://github.com/ALIOUATSarah/front-end.git" className="hover:text-white transition-colors">
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a href="https://github.com/ALIOUATSarah/front-end/blob/main/README.md" className="hover:text-white transition-colors">
                     Documentation
                  </a>
                </li>
                <li>
                  
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DigitAI. All rights reserved. Advancing healthcare through artificial intelligence.</p>
          </div>
        </div>
      </footer>
    </div>
    
  );
}
