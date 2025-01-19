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

### Configure auto import sort eslint

1. Install simple import sort

```
    npm i -D eslint-plugin-simple-import-sort
```

2. Add rule in `.eslint.cjs`
```
    'simple-import-sort/imports' : 'error'
```

3. add simple-import sort plugin in `.eslint.cjs`
```
    plugins: [..., 'simple-import-sort']
```

4. To enable auto import sort on file save in vscode

    - Open `settings.json`
    - add the following config
```
    "editor.codeActionsOnSave":{
            "source.fixAll.eslint":true
    }
```

