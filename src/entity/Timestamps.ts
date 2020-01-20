import { BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class Timestamps extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
