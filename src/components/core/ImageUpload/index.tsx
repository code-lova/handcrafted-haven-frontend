"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera, Plus, X } from "lucide-react";

interface CloudImage {
  secure_url: string;
  public_id: string;
}

interface ImageUploadProps {
  files: CloudImage[]; // uploaded cloudinary URLs (preloaded)
  previews: string[]; // base64 previews for new images
  maxImages?: number;
  onAdd: (file: File, preview: string) => void;
  onRemove: (index: number) => void;
  onReplace: (index: number, file: File, preview: string) => void;
}

const ImageUpload = ({
  files,
  previews,
  onAdd,
  onRemove,
  onReplace,
  maxImages = 3,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Total images count = preloaded + new previews
  const totalImages = files.length + previews.length;

  return (
    <div>
      <label className="block font-medium mb-2">Images</label>
      <div className="flex flex-wrap gap-3">
        {/* Render preloaded Cloudinary images */}
        {files.map((img, idx) => (
          <div
            key={`preloaded-${idx}`}
            className="relative w-20 h-20 group rounded overflow-hidden"
          >
            <Image
              src={img.secure_url}
              alt={`Uploaded ${idx}`}
              fill
              className="object-cover"
            />
            <label className="absolute inset-0 bg-black/40 rounded opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition">
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const preview = URL.createObjectURL(file);
                    onReplace(idx, file, preview);
                  }
                }}
              />
            </label>
            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ))}

        {/* Render previews for new images */}
        {previews.map((src, idx) => (
          <div
            key={`preview-${idx}`}
            className="relative w-20 h-20 rounded overflow-hidden"
          >
            <Image
              src={src}
              alt={`Preview ${idx}`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => onRemove(files.length + idx)}
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ))}

        {/* Add new image button if max not reached */}
        {totalImages < maxImages && (
          <label className="w-20 h-20 border-2 border-dashed rounded flex items-center justify-center cursor-pointer hover:border-gray-400">
            <Plus className="w-6 h-6 text-gray-500" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={inputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const preview = URL.createObjectURL(file);
                  onAdd(file, preview);
                }
              }}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
