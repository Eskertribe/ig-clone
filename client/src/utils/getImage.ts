export const getImageUrl = (url: string) => {
  if (!url) return '';

  if (url.startsWith('http')) {
    return url;
  }

  return url;
};
