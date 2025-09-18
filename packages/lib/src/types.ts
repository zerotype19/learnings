export type Reaction = 'cringe' | 'nailedit' | 'heard1000x' | 'chefskiss';

export interface Term {
  id: string;
  slug: string;
  title: string;
  definition: string;
  translation?: string;
  example_sentence: string;
  status: 'draft' | 'review' | 'published' | 'archived';
  created_at: number;
  updated_at: number;
}
