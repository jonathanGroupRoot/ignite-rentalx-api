import { inject, injectable } from 'tsyringe';

import { Specification } from '../../infra/typeorm/entities/Specification';
import { SpecificationsRepository } from '../../infra/typeorm/repositories/SpecificationsRepository';

@injectable()
class ListSpecificationUseCase {
    constructor(
        @inject('SpecificationRepository')
        private listSpecificationRepository: SpecificationsRepository,
    ) {}

    async execute(): Promise<Specification[]> {
        const specification = await this.listSpecificationRepository.list();
        return specification;
    }
}
export { ListSpecificationUseCase };
