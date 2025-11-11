
export const processImage = (
  file: File,
  targetWidth: number,
  targetHeight: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (typeof event.target?.result !== 'string') {
        return reject(new Error('Failed to read file.'));
      }

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return reject(new Error('Could not get canvas context.'));
        }

        const targetAspectRatio = targetWidth / targetHeight;
        const imgAspectRatio = img.width / img.height;

        let sourceX = 0,
          sourceY = 0,
          sourceWidth = img.width,
          sourceHeight = img.height;

        // Calculate the dimensions for center-cropping
        if (imgAspectRatio > targetAspectRatio) {
          // Image is wider than target aspect ratio, crop the sides
          sourceWidth = img.height * targetAspectRatio;
          sourceX = (img.width - sourceWidth) / 2;
        } else if (imgAspectRatio < targetAspectRatio) {
          // Image is taller than target aspect ratio, crop the top and bottom
          sourceHeight = img.width / targetAspectRatio;
          sourceY = (img.height - sourceHeight) / 2;
        }
        
        ctx.drawImage(
          img,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          0,
          0,
          targetWidth,
          targetHeight
        );

        resolve(canvas.toDataURL('image/jpeg', 0.95));
      };

      img.onerror = () => {
        reject(new Error('Failed to load image.'));
      };

      img.src = event.target.result;
    };

    reader.onerror = () => {
      reject(new Error('Error reading file.'));
    };

    reader.readAsDataURL(file);
  });
};
