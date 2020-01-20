import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, ID, Field } from "type-graphql";
import { Timestamps } from "./Timestamps";

@ObjectType()
@Entity()
export class User extends Timestamps {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column("boolean", { default: true })
  isActive: boolean;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Column("boolean", { default: false })
  confirmed: boolean;
}
