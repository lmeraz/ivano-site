.PHONY: dist deploy

dist:
	npm install
	npm run build

deploy: dist
	netlify deploy --dir=dist --prod
