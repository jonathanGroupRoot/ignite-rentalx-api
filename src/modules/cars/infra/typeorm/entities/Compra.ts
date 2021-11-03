import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('compras')
class Compra {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    item: string;

    @Column()
    value: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Compra };
