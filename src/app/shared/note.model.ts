export class Note {
  constructor(public user_id = 0, public text = '') {}
  clone() {
    return new Note(this.user_id, this.text)
  }
}
