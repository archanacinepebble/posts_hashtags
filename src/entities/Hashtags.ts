import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hashtags' })
export class HashTags {
  @PrimaryGeneratedColumn()
  hashtag_id: number;

  @Column()
  hashtag_name: string;
}
