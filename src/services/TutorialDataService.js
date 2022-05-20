import firebase from "../firebaseInit";

const db = firebase.ref("/users");

class TutorialDataService {
  getAll() {
    return db.limitToLast(20);
  }

  create(user) {
    return db.push(user);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new TutorialDataService();
