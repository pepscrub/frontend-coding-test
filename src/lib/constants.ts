import { Abstract } from "@/models/Abstract";

export const ANCHOR_STYLING = 'border-b-2 border-gray-400 border-dotted'
export const LOCALE = new Intl.Locale(navigator.language).language as keyof Abstract;