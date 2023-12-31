interface IAbstractEntity {
  id: number;

  created_at: Date;

  updated_at: Date;

  deleted_at: Date;

  setUpdateDateColumn(date: Date): any;
}
