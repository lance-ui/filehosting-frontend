import axios from 'axios';

const API_BASE = 'https://whole-hermione-lance-ui-0c243c4c.koyeb.app/api';

export const uploadFile = async (file, token) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API_BASE}/upload`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const uploadFileApiKey = async (file, apiKey) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API_BASE}/upload-api`, formData, {
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getFiles = async (token) => {
  const response = await axios.get(`${API_BASE}/files`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.data;
};

export const renameFile = async (id, newName, token) => {
  const response = await axios.put(`${API_BASE}/files/${id}`, { newName }, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.data;
};

export const deleteFile = async (id, token) => {
  const response = await axios.delete(`${API_BASE}/files/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.data;
};

export const editFileContent = async (id, content, token) => {
  const response = await axios.put(`${API_BASE}/files/${id}/content`, { content }, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.data;
};

export const downloadFile = (hash) => {
  window.open(`${API_BASE.replace('/api', '')}/download/${hash}`, '_blank');
};

export const getDownlink = (hash) => { 
  return `${API_BASE.replace('/api')}/download/${hash}`;
}
