const checkIsSupport = () => Boolean(document.startViewTransition)

const fetchPage = async (url) => {
	// load next page via fetch
	const response = await fetch(url) // 'top-gun'
	const text = await response.text()

	// get html inside body
	const [, data] = text.match(/<body[^>]*>(['\s\S']*)<\/body>/i)
	return data
}

export const startViewTransition = () => {
	if (!checkIsSupport) return

	window.navigation.addEventListener('navigate', (event) => {
		const toUrl = new URL(event.destination.url)
		// is an external page?
		if (location.origin !== toUrl.origin) return

		// same domain intercept
		event.intercept({
			// eslint-disable-next-line space-before-function-paren
			async handler() {
				const data = await fetchPage(toUrl.pathname)

				// use view transiton api
				document.startViewTransition(() => {
					// how to update the view
					document.body.innerHTML = data
					// scroll to top
					document.documentElement.scrollTop = 0
				})
			}
		})
	})
}
