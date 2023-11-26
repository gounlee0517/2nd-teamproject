import { createGlobalStyle } from 'styled-components';
import Cabinest from './assets/Cabinest.otf';
import AgeoPersonalUse from './assets/AgeoPersonalUse.otf'
import intrepid from './assets/intrepid.ttf'
import Orbit from './assets/Orbit.ttf'

//reset.css + box-sizing: border-box + index.css
const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
	text-align: center;
	background-color: #659bcf;
	color: #072541;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
*{
    box-sizing: border-box;
}
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

h1 {
	font-family: 'Cabinest';
	font-weight: bold;
}

h4 {
	font-family: 'Ageo Personal Use';
	letter-spacing: 3px;
}

p {
	font-family: 'Orbit';
}

header {
	font-family: 'Intrepid';
	font-weight: bold;
	font-size: 19px;
}
 
@font-face {
	font-family: 'Cabinest';
	src: local('Cabinest'),
	url(${Cabinest}) format('truetype');
	font-weight: bolder;
	unicode-range: U+0041-005A, U+0061-007A;
}
@font-face {
	font-family: 'Ageo Personal Use';
	src: local('AgeoPersonalUse'),
	url(${AgeoPersonalUse}) format('truetype');
	unicode-range: U+0041-005A, U+0061-007A;
}
@font-face {
	font-family: 'Intrepid';
	src: local('intrepid'),
	url(${intrepid}) format('truetype');
	font-weight: bolder;
	unicode-range: U+0041-005A, U+0061-007A;
}
@font-face {
	font-family: 'Orbit';
	src: local('Orbit'),
	url(${Orbit}) format('truetype');
	unicode-range: U+AC00-D7A3;
}

`;

export default GlobalStyle;