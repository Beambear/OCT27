//contains eveything in User but profilePic.
//used to pack into form, easiler for back-end to recive class data
export class UserRequest {
    constructor(
      public id?: number,
      public name?: string,
      public email?: string,
      public phone?: string,
    ) {}
  }
  