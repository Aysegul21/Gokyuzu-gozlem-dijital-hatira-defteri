import React, { useState } from 'react';
import { Upload, Star, Send } from 'lucide-react';
import { Wish } from '../types';

interface WishFormProps {
  onSubmit: (wish: Wish) => void;
}

const WishForm: React.FC<WishFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const wish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      image: imagePreview || undefined,
      date: new Date().toLocaleDateString('tr-TR'),
      timestamp: Date.now()
    };

    setTimeout(() => {
      onSubmit(wish);
      setName('');
      setMessage('');
      setImageFile(null);
      setImagePreview('');
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="relative z-10 max-w-lg mx-auto">
      <div className="bg-slate-900/80 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <Star className="text-yellow-400 mr-2" size={24} />
            <h2 className="text-2xl font-bold text-yellow-400">Gökyüzü Dileğin</h2>
            <Star className="text-yellow-400 ml-2" size={24} />
          </div>
          <p className="text-slate-300 text-sm">Dileklerini yıldızlar arasına yazdır</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-yellow-400 mb-2">
              İsmin
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-yellow-400/30 rounded-lg text-white placeholder-slate-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
              placeholder="Adını yaz..."
              maxLength={50}
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-yellow-400 mb-2">
              Gökyüzü Dileğin
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-slate-800/50 border border-yellow-400/30 rounded-lg text-white placeholder-slate-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all resize-none"
              placeholder="Dileklerini, hayallerini ya da güzel düşüncelerini yaz..."
              maxLength={300}
              required
            />
            <div className="text-right text-xs text-slate-400 mt-1">
              {message.length}/300
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-400 mb-2">
              Güzel Bir Anı (İsteğe Bağlı)
            </label>
            <div className="border-2 border-dashed border-yellow-400/30 rounded-lg p-6 text-center hover:border-yellow-400/50 transition-colors">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Önizleme"
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('');
                      setImageFile(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="mx-auto text-yellow-400/60 mb-2" size={32} />
                  <p className="text-slate-400 text-sm mb-2">
                    Çiçek, manzara ya da güzel bir anını paylaş
                  </p>
                </div>
              )}
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                id="imageInput"
              />
              <label
                htmlFor="imageInput"
                className="inline-block px-4 py-2 bg-yellow-400/20 text-yellow-400 rounded-lg cursor-pointer hover:bg-yellow-400/30 transition-colors text-sm"
              >
                Görsel Seç
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !name.trim() || !message.trim()}
            className="w-full py-3 px-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 rounded-lg font-semibold hover:from-yellow-500 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-900 border-t-transparent" />
            ) : (
              <>
                <Send className="mr-2" size={18} />
                Yıldızlar Arasına Gönder
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WishForm;