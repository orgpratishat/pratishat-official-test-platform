import React from 'react';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import { FolderOpen, Upload, Image as ImageIcon, X } from 'lucide-react';

const ImageUploadField = ({ 
  label, 
  currentImage, 
  field, 
  index = null, 
  stepIndex = null,
  uploading = false,
  onFileSelect,
  onImageUpload,
  onRemoveImage,
  selectedFiles
}) => {
  const fileId = `${field}-${index}-${stepIndex}`;
  const hasSelectedFile = !!selectedFiles[fileId];
  const isLocalImage = currentImage && currentImage.startsWith('blob:');
  const isCloudImage = currentImage && !currentImage.startsWith('blob:');

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700">{label}</label>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <label className={`cursor-pointer px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors ${
          uploading 
            ? 'bg-gray-400 text-white border-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500'
        }`}>
          <FolderOpen className="w-4 h-4" />
          Select Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                onFileSelect(file, field, index, stepIndex);
              }
              e.target.value = '';
            }}
            disabled={uploading}
          />
        </label>

        <Button
          type="button"
          variant="success"
          size="sm"
          onClick={() => onImageUpload(field, index, stepIndex)}
          disabled={uploading || !hasSelectedFile}
          className="flex items-center gap-2 bg-red-400"
        >
          <Upload className="w-4 h-4" />
          {uploading ? 'Uploading...' : 'Upload Image'}
        </Button>

        {currentImage && (
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={() => onRemoveImage(field, index, stepIndex)}
            disabled={uploading}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Remove
          </Button>
        )}
      </div>

      <div className="flex items-center gap-3 mb-3">
        {hasSelectedFile && !isCloudImage && (
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-orange-500" />
            <span className="text-xs text-orange-600 font-medium">
              Image selected - Click "Upload Image" to save to cloud
            </span>
          </div>
        )}
        {isCloudImage && (
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-green-600" />
            <span className="text-xs text-green-600 font-medium">
              Image uploaded to Cloudinary
            </span>
          </div>
        )}
      </div>

      {currentImage && (
        <div className="mt-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700">Preview:</span>
            {isLocalImage && (
              <Badge variant="warning" text="Local (Not uploaded)" />
            )}
            {isCloudImage && (
              <Badge variant="success" text="Cloud Storage" />
            )}
          </div>
          <img 
            src={currentImage} 
            alt="Preview" 
            className="max-w-48 max-h-48 object-contain border-2 border-green-200 rounded-lg bg-gray-50 p-2 shadow-sm"
            onError={(e) => {
              console.error('Image failed to load:', currentImage);
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;