module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'plugin:@typescript-eslint/recommended',
		'react-app',
		// "airbnb-base", // Unfortunately this seems to be crashing
		'plugin:prettier/recommended'
	],
	plugins: ['@typescript-eslint', 'react', 'import'],
	rules: {
		indent: 'off',
		'import/extensions': [
			'error',
			'always',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never'
			}
		],
		'class-methods-use-this': 'off',
		'@typescript-eslint/indent': ['error', 'tab'],
		'no-tabs': 'off',
		'react/jsx-uses-react': 'error',
		'@typescript-eslint/explicit-member-accessibility': 0
	},
	settings: {
		'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx']
		},
		'import/resolver': {
			'node': {
				'extensions': ['.js', '.jsx', '.ts', '.tsx']
			}
		}
	}
};