
import React, { useState, ReactNode } from 'react';

type ModalType = 'About' | 'Contact' | 'Guide' | 'Privacy' | 'Terms' | 'DMCA' | null;

interface ThemeLayoutProps {
  children: ReactNode;
}

const Modal: React.FC<{ title: string; onClose: () => void; children: ReactNode }> = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-800 border border-purple-500 rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
        </div>
        <div className="text-gray-300 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};


const ThemeLayout: React.FC<ThemeLayoutProps> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  
  const modalLinks: { name: ModalType; label: string }[] = [
    { name: 'About', label: 'About' },
    { name: 'Contact', label: 'Contact' },
    { name: 'Guide', label: 'Guide' },
    { name: 'Privacy', label: 'Privacy Policy' },
    { name: 'Terms', label: 'Terms of Service' },
    { name: 'DMCA', label: 'DMCA' },
  ];

  const getModalContent = (modal: ModalType) => {
    switch (modal) {
        case 'About': return <p>This Social Media Image Resizer & Cropper is a powerful, client-side tool built with React and Tailwind CSS. It empowers users to perfectly format their images for any social platform without uploading their data to a server, ensuring privacy and speed. All processing is done in your browser using the HTML5 Canvas API.</p>;
        case 'Contact': return <p>For inquiries, please contact us at <a href="mailto:hsini.web@gmail.com" className="text-purple-400 hover:underline">hsini.web@gmail.com</a> or visit our website at <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">doodax.com</a>.</p>;
        case 'Guide': return <p>1. Click the 'Upload Image' button or drag and drop a file.<br/>2. Select your desired social media platform from the dropdown menu.<br/>3. Click 'Resize & Crop' to process the image.<br/>4. A preview of the final image will appear.<br/>5. Click 'Download Image' to save it to your device.</p>;
        case 'Privacy': return <p>We respect your privacy. This application operates entirely within your browser. No images or personal data are ever uploaded, stored, or transferred to any server. All processing is done on your local machine.</p>;
        case 'Terms': return <p>By using this service, you agree to use it for lawful purposes only. You retain all rights to the images you process. The service is provided 'as is' without any warranties. We are not liable for any issues that arise from the use of this tool.</p>;
        case 'DMCA': return <p>This tool processes user-provided content. We respect intellectual property rights. If you believe any content infringes upon your copyright, please note that we do not host or store any user data. All processing is client-side. The responsibility for the uploaded content lies with the user.</p>;
        default: return null;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="cosmic-background"></div>
      </div>
      <style>{`
        .cosmic-background {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e, #53346d, #2c1a4d);
          background-size: 600% 600%;
          animation: cosmic-animation 20s ease infinite;
        }

        @keyframes cosmic-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="bg-black bg-opacity-30 backdrop-blur-sm shadow-lg p-4">
          <nav className="container mx-auto flex justify-between items-center flex-wrap gap-2">
            <h1 className="text-2xl font-bold tracking-wider text-white">Image Resizer Pro</h1>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
              {modalLinks.map(link => (
                 <li key={link.name}>
                    <button onClick={() => setActiveModal(link.name)} className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
                        {link.label}
                    </button>
                 </li>
              ))}
            </ul>
          </nav>
        </header>

        <main className="flex-grow container mx-auto p-4 md:p-8">
            {children}
        </main>

        <footer className="bg-black bg-opacity-30 backdrop-blur-sm shadow-lg p-6 mt-12 text-center text-gray-400">
            <div className="container mx-auto">
                <p className="mb-2">
                    <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="font-bold text-lg" style={{color: '#FFD700'}}>
                        Powered by HSINI MOHAMED
                    </a>
                </p>
                <p>
                    <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-300">doodax.com</a>
                    <span className="mx-2">|</span>
                    <a href="mailto:hsini.web@gmail.com" className="hover:text-purple-400 transition-colors duration-300">hsini.web@gmail.com</a>
                </p>
            </div>
        </footer>
      </div>
      {activeModal && (
        <Modal title={activeModal} onClose={() => setActiveModal(null)}>
            {getModalContent(activeModal)}
        </Modal>
      )}
    </div>
  );
};

export default ThemeLayout;
