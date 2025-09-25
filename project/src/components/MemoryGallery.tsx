import React from 'react';
import { Calendar, Image, MessageCircle } from 'lucide-react';
import { Wish } from '../types';

interface MemoryGalleryProps {
  wishes: Wish[];
}

const MemoryGallery: React.FC<MemoryGalleryProps> = ({ wishes }) => {
  const groupedByDate = wishes.reduce((acc, wish) => {
    const date = wish.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(wish);
    return acc;
  }, {} as Record<string, Wish[]>);

  const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
    const dateA = new Date(a.split('.').reverse().join('-'));
    const dateB = new Date(b.split('.').reverse().join('-'));
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="relative z-10 min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-yellow-400 mb-4 flex items-center justify-center">
            <Calendar className="mr-3" size={36} />
            Hatıralar Arşivi
          </h2>
          <p className="text-slate-300 text-lg mb-8">Tüm güzel anlar ve dilekler burada saklı</p>
        </div>

        {wishes.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⭐</div>
            <p className="text-slate-400 text-lg">Henüz hiç hatıra eklenmemiş...</p>
            <p className="text-slate-500 text-sm">İlk dileği sen ekle!</p>
          </div>
        ) : (
          <div className="space-y-12">
            {sortedDates.map(date => (
              <div key={date} className="mb-16">
                <div className="flex items-center mb-8">
                  <div className="flex-grow h-px bg-gradient-to-r from-transparent to-yellow-400/30" />
                  <div className="px-6 py-2 bg-slate-800 rounded-full border border-yellow-400/30">
                    <span className="text-yellow-400 font-semibold">{date}</span>
                    <span className="text-slate-400 ml-2">({groupedByDate[date].length} dilek)</span>
                  </div>
                  <div className="flex-grow h-px bg-gradient-to-l from-transparent to-yellow-400/30" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {groupedByDate[date].map(wish => (
                    <div
                      key={wish.id}
                      className="group bg-slate-900/80 backdrop-blur-sm border border-yellow-400/20 rounded-xl p-4 hover:border-yellow-400/40 transition-all duration-300 hover:scale-105"
                    >
                      {wish.image && (
                        <div className="mb-3">
                          <img
                            src={wish.image}
                            alt="Anı"
                            className="w-full h-24 object-cover rounded-lg border border-yellow-400/20"
                          />
                        </div>
                      )}
                      
                      <div className="mb-3">
                        <p className="text-white text-xs leading-relaxed line-clamp-4">
                          "{wish.message}"
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-400 text-xs font-medium">{wish.name}</span>
                        <div className="flex items-center space-x-1">
                          {wish.image && <Image size={12} className="text-slate-400" />}
                          <MessageCircle size={12} className="text-slate-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGallery;