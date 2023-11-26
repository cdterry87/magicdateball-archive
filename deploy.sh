#!/bin/sh

set -e

(git push) || true

git checkout prod

git merge master -m "Production Deployment"

git push origin prod

git checkout master
