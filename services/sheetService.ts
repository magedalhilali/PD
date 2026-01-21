import Papa from 'papaparse';
import { DepartmentData } from '../types';
import { SHEET_URL, CATEGORY_CONFIG } from '../constants';
import { parsePercentage, getCsvUrl } from '../utils/parser';

export const fetchSheetData = async (): Promise<DepartmentData[]> => {
  const csvUrl = getCsvUrl(SHEET_URL);

  try {
    const response = await fetch(csvUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: false, // We use index based mapping as per prompt column definition
        skipEmptyLines: true,
        complete: (results) => {
          try {
            const rows = results.data as string[][];
            
            // Validate we have enough rows
            if (!rows || rows.length < 2) {
              resolve([]);
              return;
            }

            // Assume Row 0 is header, start from Row 1
            const dataRows = rows.slice(1);

            const departments: DepartmentData[] = dataRows.map((row) => {
              // Guard against empty rows that passed skipEmptyLines
              if (row.length < 2 || !row[1]) return null;

              const name = row[1]?.trim(); // Column B, trimmed
              const id = row[0] || Math.random().toString(36).substr(2, 9); // Column A

              const categories = CATEGORY_CONFIG.map((config) => {
                const rawValue = row[config.index];
                const parsedValue = parsePercentage(rawValue);
                
                return {
                  label: config.label,
                  weight: config.weight,
                  raw: rawValue || '0%',
                  value: parsedValue
                };
              });

              // Calculate Simple Average
const totalScore = categories.length > 0 
  ? categories.reduce((sum, cat) => sum + cat.value, 0) / categories.length 
  : 0;

              return {
                id,
                name,
                totalScore,
                categories
              };
            }).filter((dept): dept is DepartmentData => dept !== null);

            resolve(departments);
          } catch (error) {
            reject(error);
          }
        },
        error: (error) => {
          reject(new Error(`CSV Parsing Error: ${error.message}`));
        }
      });
    });
  } catch (error) {
    console.error("Sheet Service Error:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("Unknown error occurred while fetching sheet data");
  }
};
