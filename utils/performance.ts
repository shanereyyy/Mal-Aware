import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Memoized debounce function for search inputs
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Memoized search filter with multiple fields
 */
export const useSearchFilter = <T>(
  items: T[],
  searchQuery: string,
  searchFields: (keyof T)[]
) => {
  return useMemo(() => {
    if (!searchQuery.trim()) return items;
    
    const query = searchQuery.toLowerCase();
    return items.filter(item =>
      searchFields.some(field => {
        const value = item[field];
        return value && String(value).toLowerCase().includes(query);
      })
    );
  }, [items, searchQuery, searchFields]);
};

/**
 * Optimized list rendering with windowing for large lists
 */
export const useOptimizedList = <T>(
  items: T[],
  pageSize: number = 20
) => {
  const [visibleItems, setVisibleItems] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const loadMoreItems = useCallback(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const newItems = items.slice(startIndex, endIndex);
    
    setVisibleItems(prev => [...prev, ...newItems]);
    setCurrentPage(prev => prev + 1);
  }, [items, currentPage, pageSize]);

  useEffect(() => {
    setVisibleItems(items.slice(0, pageSize));
    setCurrentPage(1);
  }, [items, pageSize]);

  return {
    visibleItems,
    hasMore: visibleItems.length < items.length,
    loadMore: loadMoreItems,
  };
}; 