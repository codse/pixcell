import { cn } from '@/lib/utils';
import { CircleX, ImageIcon } from 'lucide-react';
import React, { useRef } from 'react';

export const ImageUpload = ({
  image,
  onImageUpload,
}: {
  image: string | ArrayBuffer | null;
  onImageUpload: (image: string | ArrayBuffer | null) => void;
}) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const Icon = image ? CircleX : ImageIcon;

  return (
    <div
      onClick={() => {
        imageRef.current?.click();
      }}
      className="cursor-pointer"
    >
      <input
        ref={imageRef}
        type="file"
        key={image ? 'image' : 'no-image'}
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <div className="relative group w-9 h-9 p-0.5 bg-muted border border-border rounded-md">
        {!!image && (
          <img
            src={image as string}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
        )}
        <Icon
          onClick={(event) => {
            if (image) {
              event.stopPropagation();
              onImageUpload(null);
            }
          }}
          className={cn(
            'w-4 h-4 absolute top-1/2 left-1/2 stroke-muted-foreground -translate-x-1/2 transition-opacity duration-100 ease-in-out opacity-0 group-hover:opacity-100',
            {
              'left-full top-0 hover:stroke-destructive': image,
              '-translate-y-1/2': !image,
            }
          )}
        />
      </div>
    </div>
  );
};
