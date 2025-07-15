import { useQuery } from '@tanstack/react-query';
import { flowerDatabase } from '@/database/flowers';

export const useRandomFlower = () => {
  return useQuery({
    queryKey: ['randomFlower'],
    queryFn: async () => {
      const randomFlower = flowerDatabase[Math.floor(Math.random() * flowerDatabase.length)];
      const randomKeyword = randomFlower.keywords[Math.floor(Math.random() * randomFlower.keywords.length)];
      const width = Math.floor(Math.random() * 300) + 400;
      const height = Math.floor(Math.random() * 300) + 400;
      return {
        url: `https://nocode.meituan.com/photo/search?keyword=${randomKeyword}&width=${width}&height=${height}`,
        data: randomFlower
      };
    }
  });
};
