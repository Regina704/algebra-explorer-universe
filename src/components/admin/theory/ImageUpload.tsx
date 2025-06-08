
import { Upload, X } from 'lucide-react';
import { TheoryType } from '@/hooks/useTheory';

interface ImageUploadProps {
  sectionType: TheoryType;
  imagePreview: string | null;
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export function ImageUpload({ sectionType, imagePreview, onImageSelect, onRemoveImage }: ImageUploadProps) {
  const getImageHelpText = () => {
    switch (sectionType) {
      case 'definition':
        return 'Изображение для иллюстрации определения (диаграммы, схемы)';
      case 'notation':
        return 'Изображение с математическими обозначениями';
      case 'example':
        return 'Изображение для наглядного примера (графики, диаграммы)';
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Изображение</label>
      <p className="text-xs text-gray-500 mb-3">{getImageHelpText()}</p>
      
      {imagePreview ? (
        <div className="relative">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="max-w-xs h-auto rounded-lg border"
          />
          <button
            type="button"
            onClick={onRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <input
            type="file"
            accept="image/*"
            onChange={onImageSelect}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer text-indigo-600 hover:text-indigo-800"
          >
            Выберите изображение
          </label>
          <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF до 5MB</p>
        </div>
      )}
    </div>
  );
}
