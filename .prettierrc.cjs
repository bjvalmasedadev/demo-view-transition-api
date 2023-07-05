module.exports = {
	plugins: [require.resolve('prettier-plugin-astro')],
	printWidth: 100,
	semi: false,
	singleQuote: true,
	jsxSingleQuote: true,
	tabWidth: 2,
	trailingComma: 'none',
	useTabs: true,
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro'
			}
		}
	],
	endOfLine: 'lf'
}
