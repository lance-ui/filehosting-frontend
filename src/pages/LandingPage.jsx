import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { FileText, Upload, Shield, Zap } from 'lucide-react';

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Lance UI
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A modern file management platform with secure uploads, easy sharing, and powerful API access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Get Started
              </Link>
            )}
            <Link
              to="/docs"
              className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-semibold border border-gray-300 transition-colors"
            >
              View API Docs
            </Link>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Upload className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Uploads</h3>
            <p className="text-gray-600">
              Drag and drop files or browse to upload. Support for various file types with instant sharing links.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Shield className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600">
              Your files are encrypted and stored securely. Access control with JWT tokens and API keys.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Zap className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Powerful API</h3>
            <p className="text-gray-600">
              Integrate with our REST API using curl, Node.js, or Python. Perfect for developers and automation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
