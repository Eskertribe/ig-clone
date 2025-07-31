export const getImageUrl = (url: string) => {
  if (!url) return '';

  // If it's already a full URL (http/https), return as is
  if (url.startsWith('http')) {
    return url;
  }

  // For uploads, we need to construct the full URL
  if (url.startsWith('/uploads')) {
    const apiUrl = import.meta.env.VITE_API_URL;

    // If VITE_API_URL is relative (like '/api/v1'), we need to use current origin
    if (apiUrl.startsWith('/')) {
      // Use current window location for the base URL
      return `${window.location.origin}${url}`;
    } else {
      // If VITE_API_URL is absolute, remove the /api/v1 part
      const baseUrl = apiUrl.replace('/api/v1', '');
      return `${baseUrl}${url}`;
    }
  }

  return url;
};
