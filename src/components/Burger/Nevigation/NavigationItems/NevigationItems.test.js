import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NevigationItems from './NavigationItems';
import NevigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() })

describe("<NevigationItems>", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NevigationItems />);
    });

    it('Should render two <NevigationItems /> elements if not authenticate', () => {
        expect(wrapper.find(NevigationItem)).toHaveLength(2)
    });

    it('Should render three <NevigationItems /> elements if authenticate', () => {
        wrapper.setProps({ isAuthenticated: true })
        expect(wrapper.find(NevigationItem)).toHaveLength(3);
    });

    it('Should render Logout elements if authenticate', () => {
        wrapper.setProps({ isAuthenticated: true })
        expect(wrapper.contains(<NevigationItem link="/logout">Logout</NevigationItem>)).toEqual(true);
    })
});