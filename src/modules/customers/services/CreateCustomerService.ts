import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const existsCustomerEmail = await this.customersRepository.findByEmail(
      email,
    );

    if (existsCustomerEmail) {
      throw new AppError('Informed email already in use');
    }

    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}

export default CreateCustomerService;
