#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# add .nojekyll to bypass GitHub Page's default behavior
touch ./dist/.nojekyll

# if you are deploying to a custom domain
echo 'www.theenglishnook.ch' > CNAME

cd ./dist
git add --all
git commit -m "Deploy to gh-pages"
git push origin gh-pages -f

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:dev-fredericfox/theEnglishNook.ch.git main:gh-pages

cd -
rm -rf dist