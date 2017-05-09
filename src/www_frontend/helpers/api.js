/**
 * Created by Tester-Ali on 30-11-2016.
 */
import {call, select, put as sagaPut} from 'redux-saga/effects'
import {callApi} from 'helpers'
import {push} from 'react-router-redux'
//import {getToken} from './helpers'
import {parseErrors, Localize} from 'helpers'
import url from 'url'
import qs from 'qs'

export function* fetch(endpoint, config, schema, authenticate) {
    const token = '';//typeof authenticate === 'string' ? authenticate : yield select(customer.selectors.tokenSelector);
    config.headers = Object.assign({}, {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
    }, config.headers);
    config.body = typeof config.body === 'object' ? JSON.stringify(config.body) : config.body;
    const {method = 'GET', headers, body} = config;
    let response, httpError;
    try {
        response = yield call(callApi, endpoint, {
            method, headers, body
        }, schema);
        return response;
    } catch (error) {
        httpError = error;
        error.message = Localize.t(error.message || 'oops');
        error.code = error.code || error.statusCode;
        error.payload = parseErrors(error);
        throw error;
    }
}

export function* get(endpoint, query, schema, authenticate) {
    if (query) {
        let parts = url.parse(endpoint, true);
        parts.query = {...parts.query, ...query};
        parts.search = qs.stringify(parts.query);
        endpoint = url.format(parts);
    }
    return yield call(fetch, endpoint, {method: 'GET'}, schema, authenticate)
}

export function* post(endpoint, body, schema, authenticate) {
    return yield call(fetch, endpoint, {method: 'POST', body}, schema, authenticate)
}

export function* put(endpoint, body, schema, authenticate) {
    return yield call(fetch, endpoint, {method: 'PUT', body}, schema, authenticate)
}

export function* patch(endpoint, body, schema, authenticate) {
    return yield call(fetch, endpoint, {method: 'PATCH', body}, schema, authenticate)
}

export function* del(endpoint, body, schema, authenticate) {
    return yield call(fetch, endpoint, {method: 'DELETE', body}, schema, authenticate)
}