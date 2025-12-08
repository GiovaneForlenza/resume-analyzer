import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: 20 * 1024 * 1024, // 20MB
    });

  const file = acceptedFiles[0] || null;

  const formattedSize = file ? formatSize(file.size) : null;

  function formatSize(bytes: number): string {
    const units = ["B", "KB", "MB", "GB"];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size} ${units[unitIndex]}`;
  }

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <div className="space-y-4 cursor-pointer">
          <div className="mx-auto w-1/6 flex items-center justify-center">
            <img src="/icons/info.svg" alt="upload" className="size-20" />
          </div>

          {file ? (
            <div className="text-center">
              <p className="text-lg text-gray-700 font-medium truncate">
                {file.name}
              </p>
              <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
            </div>
          ) : (
            <div>
              <p className="text-lg text-gray-500">
                <span className="font-semibold">Click to upload </span>
                or drag and drop
              </p>
              <p className="text-lg text-gray-400">
                PDF (max {formatSize(20 * 1024 * 1024)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
