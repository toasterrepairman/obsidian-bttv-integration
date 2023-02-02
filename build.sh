# ghetto makefile
npm i 
npm run build

rm test_vault/.obsidian/plugins/test-plugin/main.js
rm test_vault/.obsidian/plugins/test-plugin/manifest.json
rm test_vault/.obsidian/plugins/test-plugin/styles.css

cp main.js manifest.json styles.css -t test_vault/.obsidian/plugins/test-plugin