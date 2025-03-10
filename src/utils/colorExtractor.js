// This is a simplified version of color extraction
// In a real application, I might use a library like vibrant.js or color-thief

export const extractDominantColor = (track) => {
  // In a real app, this would analyze the image and extract the dominant color
  // For this demo, I am using the pre-assigned color from our dummy data
  return track.dominantColor || '#1E1E1E';
};

export const getGradientStyle = (color) => {
  return {
    background: `linear-gradient(to bottom, ${color}, #121212)`,
    transition: 'background 0.5s ease'
  };
};