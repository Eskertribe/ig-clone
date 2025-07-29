export const getImageUrl = (url: string) => {
  if (url.startsWith('http')) {
    return url;
  }
  return `${import.meta.env.VITE_API_URL.replace('/api/v1', '')}${url}`;
};
