import React, { useState } from 'react';
import ThemeLayout from './components/ThemeLayout';
import ImageResizerTool from './components/ImageResizerTool';
import SeoArticle from './utils/SeoArticle';

const App: React.FC = () => {
  const [isArticleVisible, setIsArticleVisible] = useState(false);

  return (
    <ThemeLayout>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Social Media Image Resizer
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-400">
            Perfectly crop and resize your images in seconds. No uploads, 100% private.
          </p>
        </div>
        
        <ImageResizerTool />

        <div className="mt-16 bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl shadow-2xl border border-purple-500/30">
            <div
              className={`relative overflow-hidden transition-all duration-700 ease-in-out ${isArticleVisible ? 'max-h-[10000px]' : 'max-h-[20rem]'}`}
            >
                <div className="p-6 sm:p-10">
                    <SeoArticle />
                </div>
                {!isArticleVisible && (
                  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none"></div>
                )}
            </div>
            <div className="text-center p-6 bg-gray-800/50 rounded-b-xl -mt-1 relative z-10 border-t border-purple-500/30">
                <button
                    onClick={() => setIsArticleVisible(!isArticleVisible)}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg shadow-lg"
                >
                    {isArticleVisible ? 'Show Less' : 'Read More About Image Optimization'}
                </button>
            </div>
        </div>

      </div>
    </ThemeLayout>
  );
};

export default App;
