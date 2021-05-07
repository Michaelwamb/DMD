import styled from 'styled-components';

export const FormInput = styled.input`
  width: ${props => (props.width ? props.width : '100%')};
  height: ${props => (props.height ? props.height : '100%')};
  padding: ${props => (props.padding ? props.padding : '100%')};
  margin: ${props => (props.margin ? props.margin : '100%')};
  border: ${props => (props.border ? props.border : '1px solid #36363629')};
  background-color: ${props =>
    props.background ? props.background : '#f3f7ffba'};
`;
