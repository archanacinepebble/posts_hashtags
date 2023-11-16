import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'image_hashtags' })
export class ImageHashTags {

@Column()
  image_id: number;

  @Column()
  hashtag_id: number;
}
