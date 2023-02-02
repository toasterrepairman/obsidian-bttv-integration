# ghetto makefile
npm i 
npm run build

rm test_vault/.obsidian/plugins/test-plugin/*
cp main.js manifest.json styles.css -t test_vault/.obsidian/plugins/test-plugin