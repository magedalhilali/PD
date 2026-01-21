/**
 * Parses a cell value into a number between 0 and 1.
 * Handles "100%", "50%", "1", "0.5", "", etc.
 */
export const parsePercentage = (value: string | undefined): number => {
  if (!value) return 0;
  
  const cleanVal = value.toString().trim().replace(/['"]+/g, '');
  
  if (cleanVal === '') return 0;

  if (cleanVal.endsWith('%')) {
    const num = parseFloat(cleanVal.replace('%', ''));
    return isNaN(num) ? 0 : num / 100;
  }

  const num = parseFloat(cleanVal);
  if (isNaN(num)) return 0;
  
  // If the number is > 1 (e.g. 50 meaning 50%), normalize it? 
  // The requirement says "1" treat as 1.0 (100%). "0.5" as 50%.
  // Typically spreadsheets export percentages as decimals (0.5) or strings ("50%").
  // If we receive "50" without percent sign, strictly speaking based on prompt "1" is 100%, 
  // so "50" would be 5000%. We will assume standard decimal notation if no % sign.
  return num;
};

/**
 * Converts a Google Sheet Edit/Share URL to a CSV Export URL
 */
export const getCsvUrl = (url: string): string => {
  try {
    // Regex to extract the Spreadsheet ID
    const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1]) {
      return `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv`;
    }
    return url;
  } catch (e) {
    console.error('Error parsing sheet URL', e);
    return url;
  }
};