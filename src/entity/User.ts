import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, ID, Field, Root } from "type-graphql";
import { Timestamps } from "./Timestamps";
import { Post } from "./Post";

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
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  @Column("boolean", { default: true })
  isActive: boolean;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Column()
  password: string;

  @Column("boolean", { default: false })
  confirmed: boolean;

  @Field(() => [Post])
  @OneToMany(
    () => Post,
    post => post.author,
    { lazy: true }
  )
  posts: [Post];
}
