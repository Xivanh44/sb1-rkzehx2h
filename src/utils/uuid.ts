import { v4 as uuidv4 } from 'uuid';

// Convertit un ID mock en UUID valide
export const mockIdToUuid = (mockId: string): string => {
  // Utiliser un mapping déterministe pour maintenir la cohérence
  const mockUuidMap = new Map<string, string>();
  
  if (!mockUuidMap.has(mockId)) {
    mockUuidMap.set(mockId, uuidv4());
  }
  
  return mockUuidMap.get(mockId) || uuidv4();
};

// Vérifie si une chaîne est un UUID valide
export const isValidUuid = (str: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};