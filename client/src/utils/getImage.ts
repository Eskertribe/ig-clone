export const getImageUrl = (url: string) => {
  if (!url) return '';

  if (url.startsWith('http')) {
    return url;
  }

  if (url.startsWith('/uploads')) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const baseUrl = apiUrl.replace('/api/v1', '');
    return `${baseUrl}${url}`;
  }

  return url;
};
