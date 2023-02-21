export class ValidatorPatterns {
  public static phone = '^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$';
  public static phoneMask =  ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public static username = '^([a-zA-Z0-9_!@#$%^&*\\(\\)]{1,50})$';
  public static passportMask = [/[a-zA-Z]/, /[a-zA-Z]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];

  /* Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character*/
  public static password = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{8,}';
  public static email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
}
