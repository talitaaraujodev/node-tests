import UserYupValidator from '../../src/validators/UserYupValidator';

describe('User Yup Validator', () => {
  let userValidator;

  beforeAll(async () => {
    userValidator = UserYupValidator;
  });
  it('validate_whenToNameEmpty_returnFieldInvalid', async () => {
    const user = {
      name: '',
      username: 'test_username',
      email: 'test@test.com',
    };
    const validateUser = await UserYupValidator.validate(user);

    expect(validateUser?.errors?.name).toBe('Nome é obrigatório');
    expect(validateUser?.errors).toHaveProperty('name');
  });
  it('validate_whenToUsernameEmpty_returnFieldInvalid', async () => {
    const user = {
      name: 'test_name',
      username: '',
      email: 'test@test.com',
    };
    const validateUser = await UserYupValidator.validate(user);

    expect(validateUser?.errors?.username).toBe('Username é obrigatório');
    expect(validateUser?.errors).toHaveProperty('username');
  });
  it('validate_whenToEmailEmpty_returnFieldInvalid', async () => {
    const user = {
      name: 'test_name',
      username: 'test_username',
      email: '',
    };
    const validateUser = await UserYupValidator.validate(user);

    expect(validateUser?.errors?.email).toBe('E-mail é obrigatório');
    expect(validateUser?.errors).toHaveProperty('email');
  });
  it('validate_whenToEmailInvalid_returnFieldInvalid', async () => {
    const user = {
      name: 'teste_name',
      username: 'test_username',
      email: 'testInvalidEmail.com',
    };
    const validateUser = await UserYupValidator.validate(user);

    expect(validateUser?.errors?.email).toBe('Formato de e-mail inválido');
  });
});
