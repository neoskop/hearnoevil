#!/usr/bin/env bash
set -e

function check_command() {
  if ! command -v $1 >/dev/null; then
    echo -e "Install \033[1m$1\033[0m"
    exit 1
  fi
}

check_command jq
check_command npm
check_command docker

if [[ "$#" != "1" ]] || [[ ! "$1" =~ ^(patch|minor|major)$ ]]; then
  echo "Usage: $0 patch|minor|major"
  exit 1
fi

if [[ `git status --porcelain` ]]; then
  echo -e "The repository has changes. Commit first...\033[0;31mAborting!\033[0m"
  exit 1
fi

git pull --rebase
npm version $1
version=`cat package.json | jq -r .version`

docker build -t neoskop/hearnoevil:$version .
docker build -t neoskop/hearnoevil:latest .
docker push neoskop/hearnoevil:$version
docker push neoskop/hearnoevil:latest

git add .
git commit -m "chore: Bump version to ${version}."
git tag ${version}
git push origin $version
git pull --rebase
git push