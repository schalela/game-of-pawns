import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

const StyledSquare = styled.div`
  float: left;
  width: 36px;
  height: 36px;
  background-color: ${({ color }) => color === 'black' ? '#999' : '#fff'};
  font-size:25px;
  text-align:center;
  display: table-cell;
  vertical-align:middle;
`;

const getCodeForPiece = {
  '.': '',
  'K': '&#9812;',
  'k': '&#9818;',
  'Q': '&#9813;',
  'q': '&#9819;',
  'R': '&#9814;',
  'r': '&#9820;',
  'B': '&#9815;',
  'b': '&#9821;',
  'N': '&#9816;',
  'n': '&#9822;',
  'P': '&#9817;',
  'p': '&#9823;'
};

const Square = ({ color, piece }) => <StyledSquare color={color}>{ReactHtmlParser(getCodeForPiece[piece])}</StyledSquare>;

export default Square;
