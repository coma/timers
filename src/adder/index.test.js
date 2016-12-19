import React from 'react';
import faker from 'faker';
import { shallow } from 'enzyme';
import Adder from './index';

it('should call add on submit and prevent it from being actually submitted', () => {

    const add            = jest.fn(),
          preventDefault = jest.fn(),
          name           = faker.name.firstName(),
          time           = faker.random.number({min: 1, max: 100}),
          adder          = shallow(<Adder add={ add }/>);

    adder.setState({name, time});

    expect(add.mock.calls.length).toEqual(0);

    adder.simulate('submit', {preventDefault});

    expect(add).toBeCalledWith(name, 60 * time);
    expect(preventDefault.mock.calls.length).toEqual(1);
});

it('should change the name on the state on input change', () => {

    const before = faker.name.firstName(),
          after  = faker.name.firstName(),
          adder  = shallow(<Adder add={ () => {} }/>);

    adder.setState({name: before});

    adder.find('input[name="name"]').simulate('change', {
        target: {
            name : 'name',
            value: after
        }
    });

    expect(adder.state().name).toEqual(after);
});

it('should change the time on the state on input change', () => {

    const before = faker.random.number({min:0, max: 1000}),
          after  = faker.random.number({min:0, max: 1000}),
          adder  = shallow(<Adder add={ () => {} }/>);

    adder.setState({time: before});

    adder.find('input[name="time"]').simulate('change', {
        target: {
            name : 'time',
            value: after
        }
    });

    expect(adder.state().time).toEqual(after);
});