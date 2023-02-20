export class ValidationUser {
  static readonly isNotString = (param: any) => typeof param !== "string";

  static readonly containsNumbers = (param: string) =>
    Boolean(param.split("").find((elem) => !isNaN(Number(elem))));

  static readonly isNotName = (name: any) => {
    if (this.isNotString(name)) return true;

    if (this.containsNumbers(name)) return true;

    if (name.length < 3) return true;

    return false;
  };

  static readonly isNotPhoto = (photo: any) => {
    if (this.isNotString(photo)) return true;

    if (photo.length < 3) return true;

    return false;
  };

  static readonly isNotEmail = (email: any) => {
    if (this.isNotString(email)) return true;

    if (!email.includes("@")) return true;

    const lastArroba = email.split("@")[1].split("").length > 3;
    if (!lastArroba) return true;

    return false;
  };

  static readonly isNotPassword = (password: any) => {
    if (this.isNotString(password)) return true;

    if (password.length < 7) return true;
    const numberReg = /[0-9]/gm;
    if (!numberReg.test(password)) return true;
    const UpperCase = /[A-Z]/gm;
    if (!UpperCase.test(password)) return true;

    return false;
  };
  static readonly IsNotClient = (client: any) => {
    return this.isNotName(client.name)
      ? true
      : this.isNotEmail(client.email)
      ? true
      : this.isNotPassword(client.password)
      ? true
      : false;
  };
  static readonly IsNotDataUpdate = (client: any) => {
    return this.isNotPassword(client.password)
      ? true
      : this.isNotPhoto(client.photo)
      ? true
      : this.isNotName(client.name)
      ? true
      : false;
  };
}
