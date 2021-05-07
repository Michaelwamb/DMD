import styled from 'styled-components';

export const TextArea = styled.textarea`
  width: ${props => (props.width ? props.width : '100%')};
  height: ${props => (props.height ? props.height : '100%')};
  padding: ${props => (props.padding ? props.padding : '100%')};
  margin: ${props => (props.margin ? props.margin : '100%')};
  border: ${props => (props.border ? props.border : '1px solid #36363629')};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '5px')};
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : '#f3f7ffba'};
`;
