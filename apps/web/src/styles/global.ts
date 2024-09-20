import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		outline: none;
	}

	body {
    background: ${props => props.theme.colors.green100};
    color: ${props => props.theme.colors.gray500};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font: ${props =>
			`400 ${props.theme.fontSizes.regular} 'Work Sans', 'Roboto', sans-serif`}
  }

	button {
		cursor: pointer;
	}

	a {
		color: inherit;
		text-decoration: none;
	}
`;
