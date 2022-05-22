release:
	tsc && \
	typedoc && \
	cp -R ./.vercel ./docs/.vercel && \
	cd docs && \
	vercel --prod && \
	git add --all && \
	git commit -m "Update docs" && \
	git push origin master