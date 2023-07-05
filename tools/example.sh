yarn build
node packages/validator/dist/src/bin.js -t $1 -f ./specifications/$1/`basename $1`.example.json