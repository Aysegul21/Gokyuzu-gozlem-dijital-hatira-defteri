import React, { useState } from 'react';
import { BookOpen, Home, Star } from 'lucide-react';
import Starfield from './components/Starfield';
import WishForm from './components/WishForm';
import WishDisplay from './components/WishDisplay';
import MemoryGallery from './components/MemoryGallery';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Wish } from './types';

type View = 'home' | 'memories';

function App() {
  const [wishes, setWishes] = useLocalStorage<Wish[]>('gozlemevi-wishes', []);
  const [currentView, setCurrentView] = useState<View>('home');

  const handleAddWish = (newWish: Wish) => {
    setWishes(prev => [newWish, ...prev]);
  };

  const todayWishes = wishes.filter(wish => 
    wish.date === new Date().toLocaleDateString('tr-TR')
  );

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Starfield />
      
      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between p-6 bg-slate-900/80 backdrop-blur-sm border-b border-yellow-400/20">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Star className="text-yellow-400 animate-spin" size={32} style={{ animationDuration: '8s' }} />
            <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-yellow-400">Gözlemevi</h1>
            <p className="text-xs text-slate-400">Dijital Hatıra Defteri</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentView('home')}
            className={`flex items-center px-4 py-2 rounded-lg transition-all ${
              currentView === 'home'
                ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                : 'text-slate-400 hover:text-yellow-400 hover:bg-yellow-400/10'
            }`}
          >
            <Home size={18} className="mr-2" />
            Ana Sayfa
          </button>
          <button
            onClick={() => setCurrentView('memories')}
            className={`flex items-center px-4 py-2 rounded-lg transition-all ${
              currentView === 'memories'
                ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                : 'text-slate-400 hover:text-yellow-400 hover:bg-yellow-400/10'
            }`}
          >
            <BookOpen size={18} className="mr-2" />
            Hatıralar
            {wishes.length > 0 && (
              <span className="ml-2 bg-yellow-400/20 text-yellow-400 text-xs px-2 py-1 rounded-full">
                {wishes.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8">
        {currentView === 'home' ? (
          <>
            {/* Hero Section */}
            <div className="text-center py-20">
              <div className="mb-8">
                <h2 className="text-5xl font-bold text-yellow-400 mb-4 animate-fade-in">
                  Gökyüzüne Dokunun
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  Dileklerinizi, hayallerinizi ve güzel anılarınızı yıldızlar arasına yazın. 
                  Her dilek, gökyüzünde ebedi bir ışık olsun.
                </p>
              </div>
            </div>

            {/* Wish Form */}
            <WishForm onSubmit={handleAddWish} />

            {/* Today's Wishes */}
            {todayWishes.length > 0 && (
              <div className="py-20">
                <WishDisplay wishes={todayWishes} />
              </div>
            )}

            {/* Stats */}
            <div className="py-16 text-center">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-yellow-400 mb-8">Toplam İstatistikler</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-slate-900/80 backdrop-blur-sm border border-yellow-400/20 rounded-xl p-6">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">{wishes.length}</div>
                    <div className="text-slate-300">Toplam Dilek</div>
                  </div>
                  <div className="bg-slate-900/80 backdrop-blur-sm border border-yellow-400/20 rounded-xl p-6">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      {wishes.filter(w => w.image).length}
                    </div>
                    <div className="text-slate-300">Paylaşılan Anı</div>
                  </div>
                  <div className="bg-slate-900/80 backdrop-blur-sm border border-yellow-400/20 rounded-xl p-6">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      {new Set(wishes.map(w => w.date)).size}
                    </div>
                    <div className="text-slate-300">Aktif Gün</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <MemoryGallery wishes={wishes} />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 py-8 bg-slate-900/80 backdrop-blur-sm border-t border-yellow-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Star className="text-yellow-400 mr-2 animate-pulse" size={20} />
            <span className="text-yellow-400 font-semibold">Gözlemevi Dijital Hatıra Defteri</span>
            <Star className="text-yellow-400 ml-2 animate-pulse" size={20} />
          </div>
          <p className="text-slate-400 text-sm">
            Her dilek bir yıldız, her anı bir ışık ✨
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;