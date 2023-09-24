import { HappeningDiary } from '@src/database/entities/happening-diary';
import { SelfCareActivitie } from '@src/database/entities/self-care-activitie';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

type HowWasToday = 'VERY_GOOD' | 'GOOD' | 'NORMAL' | 'BAD' | 'VERY_BAD';

@Entity('feeling_journal')
export class FeelingJournal {
  @PrimaryGeneratedColumn('increment', {
    type: 'integer',
    name: 'feeling_journal_id',
    primaryKeyConstraintName: 'PK_feeling_journal_id'
  })
  public id!: number;

  @Column({ type: 'integer' })
  public count!: number;

  @Index('IDX_feeling_journal_date', { unique: false })
  @Column({ type: 'date' })
  public date!: Date;

  @Column({ type: 'boolean', default: false })
  public closed!: boolean;

  @Column({ type: 'text', nullable: true })
  public description!: string;

  @Column({ type: 'varchar', name: 'how_was_today', nullable: true })
  public howWasToday!: HowWasToday;

  @OneToMany(() => SelfCareActivitie, selfCareActivities => selfCareActivities.feelingJournal, {
    cascade: true
  })
  public selfCareActivities!: SelfCareActivitie[];

  @OneToMany(() => HappeningDiary, happeningsDiary => happeningsDiary.feelingJournal, {
    cascade: true
  })
  public happeningsDiary!: HappeningDiary[];
}
