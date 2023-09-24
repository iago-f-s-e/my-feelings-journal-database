import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('feeling_journal_helper')
export class FeelingJournalHelper {
  @PrimaryGeneratedColumn('increment', {
    type: 'integer',
    name: 'feeling_journal_helper_id',
    primaryKeyConstraintName: 'PK_feeling_journal_helper_id'
  })
  public id!: number;

  @Column({ type: 'integer', name: 'last_feeling_journal_id', default: 0, nullable: true })
  public lastFeelingJournalId!: number;

  @Column({ type: 'integer', name: 'last_feeling_journal_count', default: 0, nullable: true })
  public lastFeelingJournalCount!: number;
}
