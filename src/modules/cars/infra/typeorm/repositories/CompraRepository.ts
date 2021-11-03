import { getRepository, Repository } from 'typeorm';

import {
    ICompraDTO,
    ICompraRepository,
} from '@modules/cars/repositories/ICompraRepository';

import { Compra } from '../entities/Compra';

class CompraRepository implements ICompraRepository {
    private repository: Repository<Compra>;

    constructor() {
        this.repository = getRepository(Compra);
    }

    async create({ name, item, value }: ICompraDTO): Promise<void> {
        const compra = this.repository.create({
            name,
            item,
            value,
        });
        await this.repository.save(compra);
    }

    async findByName(name: string): Promise<Compra> {
        const compra = await this.repository.findOne({ name });
        return compra;
    }

    async list(): Promise<Compra[]> {
        const compra = await this.repository.find();
        return compra;
    }
}

export { CompraRepository };
