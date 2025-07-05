# Chefy - AI-Powered Recipe Generator

![Chefy Logo](/public/cooking.svg)

Chefy is an intuitive web application that generates delicious recipes based on ingredients you have on hand. Simply input your available ingredients, and let AI create personalized recipes tailored to your pantry!

## 🌟 Features

- **Ingredient-Based Recipe Generation**: Enter the ingredients you have, and get customized recipes
- **AI-Powered**: Utilizes OpenAI's GPT models to create detailed, creative recipes
- **User-Friendly Interface**: Clean, intuitive design makes recipe generation a breeze
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Secure API Handling**: Server-side API calls protect your API keys

## 🚀 Live Demo

Check out the live application: [Chefy Recipe Generator](https://chefy-siruyy.vercel.app/)

## 💻 Tech Stack

- **Frontend**:
  - React
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components

- **Backend**:
  - Serverless API routes
  - OpenAI API integration

- **Deployment**:
  - Vercel

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```
   git clone https://github.com/Siruyy/chefy.git
   cd chefy
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with:
   ```
   AI_API_KEY=your_openai_api_key
   ```

4. **Run the development server**:
   ```
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:5173` to see the app in action.

## 🔧 Usage

1. Enter ingredients you have available in your kitchen
2. Add at least 4 ingredients to enable recipe generation
3. Click "Get My Recipe!" to generate a customized recipe
4. View your personalized recipe with ingredients, instructions, and cooking time

## 📱 Screenshots

![Chefy App Screenshot](/public/cooking.png)

## 🔒 Security Note

This application uses server-side API calls to protect your OpenAI API key. When deploying to Vercel or another hosting platform, make sure to set the `AI_API_KEY` environment variable in your project settings.

## 📄 License

MIT License

## 👨‍💻 Created By

Siruyy - [GitHub Profile](https://github.com/Siruyy)

---

*Made with React, Tailwind CSS, and AI-powered recipe generation*
