export class UpdateUser {
    constructor(
      public id?: number,
      public name?: string,
      public email?: string,
      public phone?: string,
      public profilePic?: File,
      public userId?: number
    ) {}
  }
  