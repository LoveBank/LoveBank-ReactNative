import RxJs from 'rxjs';

const endpoint = 'https://frank.treasury.love';
const defaultHeaders = { 'Content-type': 'application/vnd.api+json' };

export default class api {
  static wrapPromise(promise) {
    return RxJs.Observable.fromPromise(promise.then((response) => response.json()));
  }

  static createProfile(user) {
    return this.wrapPromise(fetch(`${endpoint}/profiles.json`, {
      method: 'post',
      headers: defaultHeaders,
      body: JSON.stringify(user),
    }));
  }

  static getProfile(id) {
    return this.wrapPromise(fetch(`${endpoint}/profiles/${id}.json`))
      .map((x) => x.data[0].attributes);
  }

  static getProfileByEmail(email) {
    return this.wrapPromise(fetch(`${endpoint}/profiles?filter[email]=${email}`))
      .map(x => {
        if (x.data.length > 0) {
          return Object.assign({}, x.data[0].attributes, { id: x.data[0].id });
        }
        return {};
      });
  }

  static getEntriesForUser(id) {
    return this.wrapPromise(fetch(`${endpoint}/profiles/${id}/entries?sort=-occurred-on`))
      .map(x => x.data.map(entry => Object.assign({}, entry.attributes, { id })));
  }

  static createEntry(entry, rating, senderId, recipientId) {
    return this.wrapPromise(fetch(`${endpoint}/entries`, {
      method: 'post',
      headers: defaultHeaders,
      body: JSON.stringify({
        data: {
          type: 'entries',
          relationships: {
            profile: {
              data: {
                type: 'profiles',
                id: senderId,
              },
            },
          },
          attributes: {
            received: 'true',
            private: 'false',
            note: entry,
            rating,
            'linked-profile-id': recipientId,
          },
        },
      }),
    }));
  }
}
