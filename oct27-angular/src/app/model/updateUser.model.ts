export class UpdateUser {
    constructor(
      public id?: number,
      public name?: string,
      public email?: string,
      public phone?: string,
      public avatarName?: string,
      public password?: string,
      public userId?: number,
      public confirmed?: number
    ) {}
  }
  