import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Stethoscope,
  Zap,
  Shield,
  Clock,
  Target,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  BarChart3,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  DigitAI
                </span>
                <div className="text-xs text-gray-500 font-medium">Healthcare Innovation</div>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                 How to Use Digit AI?
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                 How Our AI Works?
              </a>
              <a href="#stats" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Results
              </a>
              <a href="#use-cases" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Use Cases
              </a>
              <Link href="/draw">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Try Demo
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-blue-200 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
              <Award className="h-4 w-4" />
              <span>98.2% Accuracy Rate</span>
              
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Revolutionary
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI-based Digit recognition
              </span>
              <span className="block text-4xl md:text-5xl text-gray-700 mt-2">for healthcare innovation</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto">
              Transform healthcare documentation with our advanced MLP technology. Reduce medical form errors 
              <span className="font-semibold text-blue-600"></span> and improve patient safety through intelligent
              handwritten digit recognition.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/draw">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Drawing Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-300 px-8 py-4 text-lg font-semibold rounded-xl"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                View Demo Video
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex justify-center gap-8 text-center">
              
              <div>
                <div className="text-3xl font-bold text-green-600">98.2%</div>
                <div className="text-sm text-gray-600 font-medium">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">70k</div>
                <div className="text-sm text-gray-600 font-medium">Digits Processed</div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </section>

      {/* How It Works Section */}
<section id="how-it-works" className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"> How to Use Digit AI?</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Our advanced AI system processes handwritten digits through a special algorithm trained
        specifically for healthcare applications.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-3 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl font-bold text-white">Step 1</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Draw or Upload</h3>
          <p className="text-gray-600 leading-relaxed">
            Simply draw a digit on our interactive canvas or upload an image of handwritten numbers from medical forms.
          </p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="bg-gradient-to-r from-purple-500 to-purple-700 px-6 py-3 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl font-bold text-white">Step 2</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Processing</h3>
          <p className="text-gray-600 leading-relaxed">
            Our MLP model analyzes the image, extracting features and patterns to identify the digit with exceptional accuracy.
          </p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="bg-gradient-to-r from-green-500 to-green-700 px-6 py-3 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl font-bold text-white">Step 3</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Results</h3>
          <p className="text-gray-600 leading-relaxed">
            Get immediate predictions with confidence bar, helping healthcare professionals make informed decisions.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</section>
{/* How Our AI Works – Stages timeline */}
<Card className="mt-8 border-0 shadow-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
  <CardContent className="pt-10 pb-10">
    <div className="text-center mb-8">
      <h3 className="text-3xl font-bold text-gray-900">How Our AI Works?</h3>
      <p className="text-gray-600 mt-2">Advanced pipeline, same smooth experience</p>
    </div>

    {/* Timeline */}
    <div className="relative max-w-5xl mx-auto">
      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {/* Stage 1 */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center px-4 h-10 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-semibold shadow">
            Stage 1
          </div>
          <h4 className="font-semibold text-gray-900">Image Preprocessing</h4>
          <p className="text-sm text-gray-600">
            Normalize and enhance the drawing for clean, high-contrast input.
          </p>
        </div>

        {/* Stage 2 */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center px-4 h-10 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-700 text-white text-sm font-semibold shadow">
            Stage 2
          </div>
          <h4 className="font-semibold text-gray-900">Feature Extraction</h4>
          <p className="text-sm text-gray-600">
            MLP learns stroke shapes and digit patterns from the image.
          </p>
        </div>

        {/* Stage 3 */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center px-4 h-10 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-700 text-white text-sm font-semibold shadow">
            Stage 3
          </div>
          <h4 className="font-semibold text-gray-900">Classification</h4>
          <p className="text-sm text-gray-600">
            Predicts the most likely digit (0–9) using the learned features.
          </p>
        </div>

        {/* Stage 4 */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center px-4 h-10 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold shadow">
            Stage 4
          </div>
          <h4 className="font-semibold text-gray-900">Confidence Analysis</h4>
          <p className="text-sm text-gray-600">
            Displays a confidence bar so results are transparent and clear.
          </p>
        </div>
      </div>
    </div>
  </CardContent>
</Card>



      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for healthcare environments with econsidering a residential infrastructure and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced MLP Architecture</h3>
                <p className="text-gray-600 leading-relaxed">
                  State-of-the-art multilayer perceptron trained on thousands of handwritten samples.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Processing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Lightning-fast predictions in under 10s, enabling seamless integration into existing workflows.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Resilient Infrastructure</h3>
                <p className="text-gray-600 leading-relaxed">
                  Deployed with advanced, top-notch security protocols and built on a resilient, scalable architecture that ensures continuous uptime, fast performance, and secure data handling under any conditions.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">98.2% Accuracy</h3>
                <p className="text-gray-600 leading-relaxed">
                 comparative  accuracy rates validated through k-fold cross-validation and standard test set evaluation.

                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">User-Friendly Design</h3>
                <p className="text-gray-600 leading-relaxed">
                  Thoughtfully designed and tested for a smooth, intuitive experience, making it easy for anyone to use with minimal learning curve.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Continuous Learning</h3>
                <p className="text-gray-600 leading-relaxed">
                  Self-improving AI that learns from new data while maintaining privacy and security standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Practical Results</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Demonstrated effective performance in testing, showing consistent accuracy and reliability in recognizing handwritten digits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-4">98.2%</div>
              <div className="text-xl font-semibold text-blue-100 mb-2">Model Accuracy</div>
              <div className="text-blue-200">Based on k-fold validation</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-4">70K</div>
              <div className="text-xl font-semibold text-blue-100 mb-2">Digits Processed</div>
              <div className="text-blue-200">During evaluation</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-4">Low</div>
              <div className="text-xl font-semibold text-blue-100 mb-2">Error Rate</div>
              <div className="text-blue-200">Observed in test predictions</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-4">$5K</div>
              <div className="text-xl font-semibold text-blue-100 mb-2">Estimated Cost Savings</div>
              <div className="text-blue-200">If applied in small-scale operations</div>
            </div>
          </div>
        </div>
      </section>
      

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Healthcare Applications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforming critical healthcare processes with intelligent digit recognition
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Stethoscope className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Patient Records</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Digitize handwritten patient IDs, room numbers, and vital signs from paper forms with 98%+
                      accuracy.
                    </p>
                    <div className="flex items-center space-x-2 text-green-600">
                      
                      
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Prescription Processing</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Accurately read dosage values and prescription numbers to prevent medication errors and improve
                      patient safety.
                    </p>
                    <div className="flex items-center space-x-2 text-green-600">
                      
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Lab Results</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Process handwritten lab values and test results for faster reporting and reduced transcription
                      errors.
                    </p>
                    <div className="flex items-center space-x-2 text-green-600">
                      
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Insurance Claims</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Automate claim number and value recognition to accelerate insurance processing and reduce manual
                      review time.
                    </p>
                    <div className="flex items-center space-x-2 text-green-600">
                      
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Healthcare Operations?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Join 500+ healthcare facilities already using DigitAI to improve accuracy, reduce costs, and enhance patient
            care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/draw">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Zap className="mr-2 h-5 w-5" />
                Try Free Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
           
          </div>
        </div>
      </section>

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
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">
                    How to Use Digit AI?
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
                  <a href="https://www.canva.com/design/DAGl8FmbDfY/OcUN-IPXF7i6thyYSYjiNg/edit?utm_content=DAGl8FmbDfY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" target="_blank" rel="noopener noreferrer">
                    Project Overview
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
  )
}
