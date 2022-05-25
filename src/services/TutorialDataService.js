import firebase from "../firebaseInit";

export default class TutorialDataService {

  constructor(id) {
    this.db = firebase.ref(`room-${id}`);
  }

  getAll() {
    return this.db;
  }

  create(user) {
    return this.db.push(user);
  }

  update(key, value) {
    return this.db.child(key).update(value);
  }

  delete(key) {
    return this.db.child(key).remove();
  }

  deleteAll() {
    return this.db.remove();
  }
}
