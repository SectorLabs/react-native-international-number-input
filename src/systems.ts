export interface NumeralSystem {
  numberCharacters: string[];
  decimalCharacters: string[]
}

export const WesternArabic: NumeralSystem = {
  numberCharacters: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  decimalCharacters: ['.', ','],
};

export const EasternArabic: NumeralSystem = {
  numberCharacters: ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'],
  decimalCharacters: ['٫', '.'],
};
