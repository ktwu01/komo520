import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Flower, RefreshCw, Heart, Loader2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { flowerDatabase } from '@/database/flowers';

const fetchRandomFlower = async () => {
  const randomFlower = flowerDatabase[Math.floor(Math.random() * flowerDatabase.length)];
  // 使用更精确的花卉名称作为关键词
  const keyword = `${randomFlower.englishName.toLowerCase()} flower`;
  const width = Math.floor(Math.random() * 300) + 400;
  const height = Math.floor(Math.random() * 300) + 400;
  
  // 添加备用关键词
  const fallbackKeyword = randomFlower.keywords[0];
  
  return {
    url: `https://nocode.meituan.com/photo/search?keyword=${encodeURIComponent(keyword)}&width=${width}&height=${height}`,
    fallbackUrl: `https://nocode.meituan.com/photo/search?keyword=${encodeURIComponent(fallbackKeyword)}&width=${width}&height=${height}`,
    data: randomFlower
  };
};

const Index = () => {
  const [favorites, setFavorites] = useState([]);
  const { data: flower, isLoading, error, refetch } = useQuery({
    queryKey: ['flower'],
    queryFn: fetchRandomFlower,
  });

  const addToFavorites = () => {
    if (flower) {
      setFavorites(prev => [...prev, flower]);
    }
  };

  const handleImageError = (e) => {
    if (flower && e.target.src !== flower.fallbackUrl) {
      e.target.src = flower.fallbackUrl;
    } else {
      e.target.src = 'https://nocode.meituan.com/photo/search?keyword=flower&width=400&height=300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <nav className="bg-white/30 backdrop-blur-md p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Flower className="h-6 w-6 text-pink-500" />
            <h1 className="text-xl font-bold text-gray-800">花朵画廊</h1>
          </div>
          <div className="flex space-x-4">
            <span className="text-sm text-gray-600">
              已收藏: {favorites.length}
            </span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <div className="w-full max-w-md">
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/50 transition-all hover:shadow-xl hover:scale-[1.01]">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-12 w-12 animate-spin text-pink-500" />
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Flower className="h-12 w-12 text-pink-500" />
                  <p className="mt-4 text-gray-600">无法加载花朵图片</p>
                </div>
              ) : (
                <>
                  <div className="overflow-hidden rounded-xl relative">
                    <img 
                      src={flower.url} 
                      alt={flower.data.name} 
                      className="w-full h-64 object-cover rounded-xl transition-all hover:scale-105"
                      onError={handleImageError}
                    />
                  </div>
                  
                  {flower.data && (
                    <div className="mt-4 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                      <h3 className="text-xl font-bold text-gray-800">{flower.data.name}</h3>
                      <p className="text-sm text-gray-600 italic">{flower.data.englishName}</p>
                      <div className="mt-2 space-y-1 text-sm text-gray-700">
                        <p><span className="font-medium">学名:</span> {flower.data.scientificName}</p>
                        <p><span className="font-medium">科属:</span> {flower.data.family}</p>
                        <p className="mt-2">{flower.data.description}</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <Button 
                onClick={() => refetch()} 
                className="bg-pink-500 hover:bg-pink-600 text-white"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                随机生成
              </Button>
              <Button 
                onClick={addToFavorites} 
                variant="outline" 
                className="border-pink-500 text-pink-500 hover:bg-pink-50"
              >
                <Heart className="mr-2 h-4 w-4" />
                收藏
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white/30 backdrop-blur-md p-4 mt-8">
        <div className="container mx-auto text-center text-sm text-gray-600">
          © {new Date().getFullYear()} 花朵画廊 - 发现自然之美
        </div>
      </footer>
    </div>
  );
};

export default Index;
