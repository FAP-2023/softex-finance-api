import {
  Column,
  Entity,
} from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { PrimaryGeneratedColumn } from "typeorm";

// Modelo para a tabela 'faq_items'
@Entity("faq_items")
export class FaqItem extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  question: string;

  @Column({ type: "text" })
  answer: string;
}
