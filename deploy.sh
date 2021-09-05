#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# add .nojekyll to bypass GitHub Page's default behavior
touch ./dist/.nojekyll

# if you are deploying to a custom domain
echo 'www.theenglishnook.ch' > CNAME

git add -A
git commit -m 'R.v.1.0.2: CSS Bug Fixes'
git subtree push --prefix dist origin gh-pages

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:dev-fredericfox/theEnglishNook.ch.git main:gh-pages

cd -