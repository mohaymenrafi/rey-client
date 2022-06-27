import React from "react";
import styled from "styled-components";
import Container from "../../styles/Container";
import { theme } from "../../styles/theme";

const ExtendedContainer = styled(Container)`
  display: grid;
  padding: 50px 15px;
  grid-template-columns: repeat(1, 1fr);
  grid-row-gap: 25px;
  @media (min-width: ${theme.sc.md}) {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 0px;
    grid-column-gap: 45px;
  }
`;

const Title = styled.h2`
  font-size: ${theme.fs.lg};
  color: ${theme.col.gray};
  margin-bottom: 20px;
  @media (min-width: ${theme.sc.md}) {
    margin-bottom: 30px;
    font-size: ${theme.fs.xl};
  }
`;

const Text = styled.p`
  font-size: ${theme.fs.base};
  font-weight: 400;
  line-height: 1.7;
`;
const Form = styled.form``;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  label {
    margin-bottom: 10px;
    font-size: ${theme.fs.base};
    font-weight: 400;
  }
  input,
  textarea {
    font-size: ${theme.fs.base};
    padding: 5px 10px;
    border: 1px solid ${theme.col.lightGray};
    border-radius: 3px;
    &:focus {
      border-color: ${theme.col.gray};
    }
  }
`;

const Submit = styled.button`
  background-color: ${theme.col.darkBlue};
  border: 2px solid ${theme.col.darkBlue};
  padding: 11px 32px;
  margin-top: 15px;
  font-weight: 500;
  color: ${theme.col.white};
  &:hover {
    border-color: ${theme.col.darkBlue};
    color: ${theme.col.darkBlue};
    background-color: ${theme.col.white};
    cursor: pointer;
  }
`;

const Contact: React.FC = () => {
  return (
    <ExtendedContainer>
      <div>
        <Title>Can We Help? </Title>
        <Text>
          Our team was handpicked for their understanding of materials, process
          and passion for fashion. Whether you are browsing our site or visiting
          our store, we are always willing to share our deep knowledge and
          understanding of our makers and their craft.
        </Text>
      </div>
      <div>
        <Title>Contact Ray Furnisher</Title>
        <Form>
          <InputContainer>
            <label htmlFor="name">Your Name (required)</label>
            <input type="text" />
          </InputContainer>
          <InputContainer>
            <label htmlFor="name">Your Email (required)</label>
            <input type="email" />
          </InputContainer>
          <InputContainer>
            <label htmlFor="name">Your Message</label>
            <textarea rows={4} />
          </InputContainer>
          <Submit>SEND MESSAGE</Submit>
        </Form>
      </div>
    </ExtendedContainer>
  );
};

export default Contact;
