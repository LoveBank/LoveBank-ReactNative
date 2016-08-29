export default class user {
  constructor(fname, lname, email, id, cid) {
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.id = id;
    this.cid = cid;
  }

  getFullName() {
    return `${this.fname} ${this.lname}`;
  }
}
