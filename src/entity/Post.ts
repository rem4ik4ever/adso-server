import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  ManyToOne
} from "typeorm";
import { Timestamps } from "./Timestamps";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends Timestamps {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  @Generated("uuid")
  uuid: string;

  @Field()
  @Column("text", { nullable: false })
  title: string;

  @Field()
  @Column("text", { nullable: true })
  description: string;

  @Field(() => User)
  @ManyToOne(
    () => User,
    user => user.posts,
    { lazy: true }
  )
  author: User;

  @Field(() => [String])
  @Column("simple-array", { nullable: true })
  tags: string[];

  @Field(() => [String])
  @Column("simple-array", { nullable: true })
  images: string[];

  @Field()
  @Column("text")
  priceInfo: string;

  @Field()
  @Column("decimal", { precision: 5, scale: 2, nullable: true })
  price: number;

  @Field()
  @Column("text")
  address: string;

  @Field()
  @Column("float")
  latitude: string;

  @Field()
  @Column("float")
  longitude: string;

  // @Field()
  // category: string;

  @Field()
  @Column("boolean", { default: true })
  active: boolean;
}

export interface PostInterface {
  title: string;
  description: string;
  tags?: string[];
  images?: string[];
  priceInfo: string;
  price?: number;
  address: string;
  latitude: number;
  longitude: number;
}

export interface PostFilters {
  perPage?: number;
  page?: number;
}
