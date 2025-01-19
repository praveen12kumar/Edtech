# LMS Frontend

### Setup instructions

1. Clone the project

```
    git clone https://github.com/praveen12kumar/Edtech.git
```
2. Move into the directory

```
    cd lms-frontend
```
3. install dependency

```
    npm install
```

4. run the server

``` 
    npm run dev
```

## Add Tailwind

1. Install tailwind

```
    npm install -D tailwindcss
```
2. Create tailwind confit file

```
    npx tailwindcss init
```

3. Add file extension to tailwind config file in the content property

```
    "./src/**/*.{js,ts,jsx,tsx}",
```
4. Add the tailwind directives at the top of the `index.css` 

```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
```

## Added dependencies and plugins

```
    npm install @reduxjs/toolkit react-redux react-router-dom axios reac-icons react-chartjs-2 chart.js react-hot-toast @tailwindcss/line-clamp
```
