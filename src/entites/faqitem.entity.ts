import {
  Column,
  Entity,
} from "typeorm";
import { AbstractEntity } from "./AbstractEntity";

@Entity("faqitems")
export class FaqItem extends AbstractEntity {
  @Column()
  user_id: number;

  @Column()
  question: string;

  @Column()
  answer: string;
}
