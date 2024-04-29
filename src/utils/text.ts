export const toTitleCase = (text: string): string => { 
  return text.replace('_', ' ').toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}

export const convertToHumanDate = (originalDate: string | Date): string => {
  const date = new Date(originalDate);
  return date.toLocaleDateString(navigator.language, { year: 'numeric', month: 'short', day: 'numeric' })
}