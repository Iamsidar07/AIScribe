# AIScribe


[AIScribe](https://ai-scribe.vercel.app/) is an Transcriber and Translator for your audio file or using microphone recording.
It uses web workers to run Machine Learning Models in the browser itself.

## Tech Stack used in this app
1. React + Vite
2. tailwindcss for styling
3. Web workers to run ML models
4. it uses @Xenova/transformers package to transcribe and translate audio

### How I can set up this app in my local machine?
1. run this command in your terminal ```git clone https://github.com/Iamsidar07/AIScribe.git```
2. change your directory to the project by using ```cd AIScribe```
3. install dependecies by using ```yarn```
4. start the developement server by running command ```yarn dev``` in your terminal
5. go at web address:  ```http://localhost:5173/``` 

### Some screenshots of the app

[![AIScribe,AIScribe home page](/src/assets/showcase.png)](https://ai-scribe.vercel.app)

### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
