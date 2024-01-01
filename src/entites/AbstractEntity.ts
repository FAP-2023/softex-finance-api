import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IAbstractEntity } from "./IAbstractEntity";

export abstract class AbstractEntity implements IAbstractEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  public setUpdateDateColumn(date:Date){
    this.updated_at = date;
  }
}
