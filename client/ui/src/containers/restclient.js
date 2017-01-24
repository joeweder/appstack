import axios from 'axios';

const url = '/appstack/service/person';

export function getAll(successCallBack, failCallback) {
  console.log('restClient refresh()...');
  axios.get(url).then(
      response => {successCallBack(response.data);}
    ).catch(
      response => {failCallback(response);}
    );
}

export function deleteContact(id, successCallBack, failCallback) {
  console.log('restClient deleteContact id = ' + id);
  axios.delete(url + "/" + id).then(
      successCallBack(id)
    ).catch(
      response => {failCallback(response);}
    );
}

export function insertContact(contact, successCallBack, failCallback) {
  console.log('restClient insertContact ' + JSON.stringify(contact));
  axios.post(url, contact).then(
      response => {successCallBack(response.data);}
    ).catch(
      response => {failCallback(response);}
    );
}

export function updateContact(contact, successCallBack, failCallback) {
  console.log('restClient updateContact ' + JSON.stringify(contact));
  axios.put(url, contact).then(
      response => {successCallBack(response.data);}
    ).catch(
      response => {failCallback(response);}
    );
}
