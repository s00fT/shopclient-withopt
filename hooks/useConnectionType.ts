import { useEffect, useState } from 'react'

export const useConnectionType = () => {
  const [connectionType, setConnectionType] = useState<'4g' | '3g' | '2g' | 'slow-2g' | 'unknown'>('4g');

  useEffect(() => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;			
    if (connection && connection.effectiveType) {
      setConnectionType(connection.effectiveType);
    }
  }, []);

  return connectionType;
};