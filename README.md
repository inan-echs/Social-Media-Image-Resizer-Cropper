# 🖼️ Social Media Image Resizer & Cropper

**The ultimate free tool to resize and crop images for any social media platform instantly. Perfect dimensions for Instagram, Twitter, Facebook, and more. 100% private and client-side.**

---

## ✨ Why Our Tool?

In a digital world dominated by visuals, presenting your images perfectly is non-negotiable. Our Social Media Image Resizer is engineered to be the quickest, most secure, and user-friendly tool for all your social media needs.

- **🔒 100% Private & Secure:** All image processing happens directly in your browser. Your files are never uploaded to a server, guaranteeing your privacy and data security.
- **⚡ Blazing Fast:** By leveraging the native Canvas API, resizing and cropping are instantaneous. No waiting for uploads or server processing.
- **🎯 Pixel-Perfect Accuracy:** Use our presets for exact, up-to-date dimensions for every major social media platform, eliminating guesswork and ensuring your images are never awkwardly cropped again.
- **😎 Incredibly Easy to Use:** A clean, intuitive, dual-panel interface makes the entire process seamless, from upload to download.

## 🚀 Key Features

- **Multi-Platform Presets:** Instantly select from a curated list of dimensions for Instagram Posts & Stories, Twitter Headers, Facebook Feeds, YouTube Thumbnails, and many more.
- **Real-Time Preview:** See both your original image and the final, cropped version side-by-side before you download.
- **High-Quality Output:** Our processing algorithm focuses on center-cropping to maintain the subject of your photo while resizing to the highest possible quality.
- **Download with a Click:** Get your perfectly sized image in JPEG format, optimized for the web.
- **Fully Responsive Design:** Works flawlessly on any device, be it your desktop, tablet, or smartphone.
- **SEO-Optimized Content:** Includes a comprehensive guide on social media visual strategy to help you level up your marketing game.

## ⚙️ How It Works

This tool is a testament to the power of modern web technologies. Instead of relying on a backend server to handle image manipulation, it uses two core browser APIs:

1.  **FileReader API:** When you select an image, the `FileReader` API reads the file from your local disk and converts it into a Data URL, which is a base64-encoded string representation of the image.
2.  **Canvas API:** This Data URL is then used as a source for an HTML `<canvas>` element. We draw your image onto this hidden canvas and use its powerful methods (`drawImage`) to perform the resizing and center-cropping calculations. The final, processed image from the canvas is then converted back into a Data URL, which you can preview and download.

This client-side approach is not only faster and more secure but also works offline once the page has been loaded.

## 🛠️ Technology Stack

- **Frontend:** React 18+ (Functional Components & Hooks)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Image Processing:** HTML5 Canvas API & FileReader API (Pure JavaScript)
- **Module System:** ES Modules (ESM)

## 🚀 Getting Started

This project is designed to be run in any modern web browser and can be set up for local development.

### Prerequisites

- Node.js (v16 or higher)
- A package manager like `npm` or `yarn`

### Installation & Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/hsinidev/social-media-image-resizer.git
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd social-media-image-resizer
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the development server:**
    ```bash
    npm start
    ```
The application will be available at `http://localhost:3000`.

---

Powered by **HSINI MOHAMED** | [GitHub](https://github.com/hsinidev)