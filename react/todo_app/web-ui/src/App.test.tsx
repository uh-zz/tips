import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  // render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

test('javascript bag',()=>{
  let a =  10;
  [1,2,3].map(i => i * a).forEach(
    (v)=>{
      console.log(v)
    }
  )
  expect(a).toBe(10)

})