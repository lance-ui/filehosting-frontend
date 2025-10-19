import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { getFiles, uploadFile, renameFile, deleteFile, editFileContent, downloadFile } from '../utils/api';
import FileList from '../components/FileList';
import UploadModal from '../components/UploadModal';
import EditModal from '../components/EditModal';
import { Upload, Plus } from 'lucide-react';

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [editingFile, setEditingFile] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    loadFiles();
  }, [user, navigate]);

  const loadFiles = async () => {
    try {
      const data = await getFiles(token);
      setFiles(data);
    } catch (error) {
      console.error('Failed to load files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file) => {
    try {
      await uploadFile(file, token);
      loadFiles();
      setShowUpload(false);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleRename = async (id, newName) => {
    try {
      await renameFile(id, newName, token);
      loadFiles();
    } catch (error) {
      console.error('Rename failed:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await deleteFile(id, token);
        loadFiles();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const handleEdit = async (id, content) => {
    try {
      await editFileContent(id, content, token);
      loadFiles();
      setEditingFile(null);
    } catch (error) {
      console.error('Edit failed:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowUpload(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm sm:text-base"
          >
            <Plus className="w-4 h-4" />
            Upload File
          </button>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading files...</div>
      ) : (
        <FileList
          files={files}
          onRename={handleRename}
          onDelete={handleDelete}
          onEdit={setEditingFile}
          onDownload={downloadFile}
        />
      )}

      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onUpload={handleUpload}
        />
      )}

      {editingFile && (
        <EditModal
          file={editingFile}
          onClose={() => setEditingFile(null)}
          onSave={handleEdit}
        />
      )}
    </div>
  );
};

export default Dashboard;
