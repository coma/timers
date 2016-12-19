import React from 'react';
import faker from 'faker';
import { shallow } from 'enzyme';
import Timers from './index';
import Timer from './timer';

it('should render a list of timers', () => {

    const total  = faker.random.number({min: 1, max: 4}),
          remove = jest.fn(),
          list   = [];

    while (list.length < total) {

        list.push({
            id  : list.length,
            name: faker.name.firstName(),
            time:faker.random.number({min: 1, max: 100})
        });
    }

    const timers = shallow(<Timers timers={ list } remove={ remove }/>);

    expect(timers.find(Timer).length).toEqual(total);
    expect(timers.find(Timer).first().props().name).toEqual(list[0].name);
    expect(timers.find(Timer).first().props().time).toEqual(list[0].time);

    timers.find(Timer).last().props().remove();

    expect(remove).toBeCalledWith(list[total - 1].id);
});