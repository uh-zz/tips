import React from 'react';
import { render, screen } from '@testing-library/react';
import {} from './index';

type TestA = {
    value:number
}
function TestFn(a:TestA){
    a.value = 100
}

test('whether functions does copy property',()=>{
    let a = {value:1}
    TestFn(a)
    expect(a.value).toBe(100)
})