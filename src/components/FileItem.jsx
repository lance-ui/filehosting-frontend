import { useState } from 'react';
import { Download, Edit, Trash2, Copy, Check } from 'lucide-react';
import { getDownLink } from '../utils/api.js';

const FileItem = ({ file, onRename, onDelete, onEdit, onDownload }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(file.filename);
  const [copied, setCopied] = useState(false);

  const handleRename = () => {
    if (newName !== file.filename) {
      onRename(file.id, newName);
    }
    setIsRenaming(false);
  };

  const copyDownloadLink = () => {
    const link = getDownLink(file.hash);
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <li className="px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          {isRenaming ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleRename()}
                className="flex-1 px-2 py-1 border rounded text-sm"
                autoFocus
              />
              <button
                onClick={handleRename}
                className="px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setIsRenaming(false)}
                className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium text-gray-900 truncate">{file.filename}</p>
              <p className="text-sm text-gray-500">
                {formatFileSize(file.size)} • Uploaded {formatDate(file.uploaded_at)}
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={copyDownloadLink}
            className="p-2 text-gray-400 hover:text-blue-600 rounded"
            title="Copy download link"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onDownload(file.hash)}
            className="p-2 text-gray-400 hover:text-green-600 rounded"
            title="Download file"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(file)}
            className="p-2 text-gray-400 hover:text-purple-600 rounded"
            title="Edit content"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsRenaming(true)}
            className="p-2 text-gray-400 hover:text-blue-600 rounded"
            title="Rename file"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(file.id)}
            className="p-2 text-gray-400 hover:text-red-600 rounded"
            title="Delete file"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default FileItem;
