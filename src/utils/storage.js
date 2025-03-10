export const getFavorites = () => {
    try {
      const favorites = localStorage.getItem('favorites');
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  };
  
  export const saveToFavorites = (favorites) => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };
  
  export const getRecentlyPlayed = () => {
    try {
      const recentlyPlayed = sessionStorage.getItem('recentlyPlayed');
      return recentlyPlayed ? JSON.parse(recentlyPlayed) : [];
    } catch (error) {
      console.error('Error getting recently played:', error);
      return [];
    }
  };
  
  export const saveToRecentlyPlayed = (recentlyPlayed) => {
    try {
      sessionStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
    } catch (error) {
      console.error('Error saving recently played:', error);
    }
  };