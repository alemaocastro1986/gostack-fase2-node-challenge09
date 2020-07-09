import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(product);
    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const ids = products.map(p => p.id);
    const allProducts = await this.ormRepository.find({
      where: {
        id: In(ids),
      },
    });
    return allProducts;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    const ids = products.map(p => p.id);

    const allProducts = await this.ormRepository.findByIds(ids);

    const updatedProducts = allProducts.map(prod => {
      const productIndex = products.findIndex(p => p.id === prod.id);
      // eslint-disable-next-line no-param-reassign
      prod.quantity -= products[productIndex].quantity;
      return prod;
    });

    await this.ormRepository.save(updatedProducts);
    return allProducts;
  }
}

export default ProductsRepository;
