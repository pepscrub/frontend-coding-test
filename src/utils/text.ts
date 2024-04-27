export const toTitleCase = (text: string) => { 
  return text.replace('_', ' ').toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}