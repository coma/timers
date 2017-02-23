import React from 'react';
import faker from 'faker';
import { shallow } from 'enzyme';
import Timer from './index';

it('should show the right time', () => {

    jest.useFakeTimers();

    const name  = faker.name.firstName(),
          time  = faker.random.number({min: 5, max: 10}) * 60,
          lapse = faker.random.number({min: 1, max: 4}) * 60,
          timer = shallow(<Timer { ...{name, time} }/>);

    timer.instance().componentDidMount();

    expect(timer.find('p').text()).toBe(Timer.format(time));

    jest.runTimersToTime(lapse * 1000);
    timer.update();

    expect(timer.find('p').text()).toBe(Timer.format(time - lapse));

    jest.clearAllTimers();
});
