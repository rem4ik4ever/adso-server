import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, ID, Field } from "type-graphql";
import { Timestamps } from "./Timestamps";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class Category extends Timestamps {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Post])
  @OneToMany(
    () => Post,
    post => post.category,
    { lazy: true }
  )
  posts: [Post];
}
