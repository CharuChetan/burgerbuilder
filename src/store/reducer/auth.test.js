import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducre', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            localId: null,
            error: null,
            loading: false,
            redirectURL: '/'
        })
    });

    it('should auth token in state', () => {
        expect(reducer({
            token: null,
            localId: null,
            error: null,
            loading: false,
            redirectURL: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            localId: 'some-id'
        })).toEqual({
            token: 'some-token',
            localId: 'some-id',
            error: null,
            loading: false,
            redirectURL: '/'
        })
    });
});