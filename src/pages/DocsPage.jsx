import { useAuth } from '../hooks/AuthContext';
import { Copy, Key } from 'lucide-react';

const DocsPage = () => {
  const { apiKey } = useAuth();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const examples = {
    curl: `curl -X POST https://whole-hermione-lance-ui-0c243c4c.koyeb.app/api/upload-api \\
  -H "x-api-key: YOUR_API_KEY" \\
  -F "file=@/path/to/your/file.txt"`,
    nodejs: `const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const uploadFile = async () => {
  const form = new FormData();
  form.append('file', fs.createReadStream('/path/to/your/file.txt'));

  try {
    const response = await axios.post(
      'https://whole-hermione-lance-ui-0c243c4c.koyeb.app/api/upload-api',
      form,
      {
        headers: {
          'x-api-key': 'YOUR_API_KEY',
          ...form.getHeaders(),
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};`,
    python: `import requests

url = 'https://whole-hermione-lance-ui-0c243c4c.koyeb.app/api/upload-api'
headers = {'x-api-key': 'YOUR_API_KEY'}
files = {'file': open('/path/to/your/file.txt', 'rb')}

response = requests.post(url, headers=headers, files=files)
print(response.json())`
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">API Documentation</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <Key className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Your API Key</h2>
        </div>
          {apiKey ? (
          <div className="flex items-center bg-gray-100 p-3 rounded overflow-x-auto max-w-full">
            <code className="flex-1 text-sm font-mono break-all">{apiKey}</code>
            <button
              onClick={() => copyToClipboard(apiKey)}
              className="ml-2 p-1 hover:bg-gray-200 rounded"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          ) : (
          <p className="text-gray-600">Please log in to view your API key.</p>
          )}
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload Endpoint</h2>
        <p className="text-gray-600 mb-4">
          Upload files using your API key. The endpoint accepts multipart/form-data.
        </p>
        <div className="bg-gray-100 p-3 rounded mb-4">
          <code className="text-sm">POST https://whole-hermione-lance-ui-0c243c4c.koyeb.app/api/upload-api</code>
        </div>
        <div className="mb-4">
          <strong>Headers:</strong>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            <li>x-api-key: Your API key</li>
            <li>Content-Type: multipart/form-data</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Body:</strong>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            <li>file: The file to upload</li>
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Code Examples</h2>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">cURL</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            <code>{examples.curl}</code>
          </pre>
          <button
            onClick={() => copyToClipboard(examples.curl)}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Copy
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Node.js</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            <code>{examples.nodejs}</code>
          </pre>
          <button
            onClick={() => copyToClipboard(examples.nodejs)}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Copy
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Python</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            <code>{examples.python}</code>
          </pre>
          <button
            onClick={() => copyToClipboard(examples.python)}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
