export class UserAuth {
  login: string;
  password: string;

  constructor(login: string, pass: string) {
    this.login = login;
    this.password = pass;
  }
}
