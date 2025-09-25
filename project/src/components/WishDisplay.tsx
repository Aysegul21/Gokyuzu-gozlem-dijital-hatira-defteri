import React from 'react';
import { Star, User } from 'lucide-react';
import { Wish } from '../types';

interface WishDisplayProps {
  wishes: Wish[];
}

const WishDisplay: React.FC<WishDisplayProps> = ({ wishes }) => {
  if (wishes.length === 0) return null;

  return (
    <div className="relative z-10 mt-16">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-yellow-400 mb-4 flex items-center justify-center">
          <Star className="mr-3 animate-pulse" size={32} />
          Yıldızlar Arasındaki Dilekler
          <Star className="ml-3 animate-pulse" size={32} />
        </h3>
        <p className="text-slate-300">Günün toplanan güzel dilekleri</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {wishes.map((wish, index) => (
          <div
            key={wish.id}
            className="group relative animate-float"
            style={{
              animationDelay: `${index * 0.2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            
            <div className="relative bg-slate-900/90 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-6 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105">
              <div className="absolute top-3 right-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
              </div>
              
              {wish.image && (
                <div className="mb-4">
                  <img
                    src={wish.image}
                    alt="Anı"
                    className="w-full h-32 object-cover rounded-lg border border-yellow-400/20"
                  />
                </div>
              )}
              
              <div className="mb-4">
                <p className="text-white text-sm leading-relaxed">
                  "{wish.message}"
                </p>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center text-yellow-400">
                  <User size={14} className="mr-1" />
                  <span className="font-medium">{wish.name}</span>
                </div>
                <span className="text-slate-400">{wish.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishDisplay;