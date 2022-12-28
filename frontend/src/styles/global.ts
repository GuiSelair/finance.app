import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		outline: none;
	}

	body {
    background: ${props => props.theme.green100};
    color: ${props => props.theme.gray500};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font: ${props =>
			`400 ${props.theme.regular} 'Work Sans', 'Roboto', sans-serif`}
  }
`;
