import FileItem from './FileItem';

const FileList = ({ files, onRename, onDelete, onEdit, onDownload }) => {
  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No files uploaded yet.</p>
        <p className="text-gray-400">Upload your first file to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {files.map((file) => (
          <FileItem
            key={file.id}
            file={file}
            onRename={onRename}
            onDelete={onDelete}
            onEdit={onEdit}
            onDownload={onDownload}
          />
        ))}
      </ul>
    </div>
  );
};

export default FileList;
