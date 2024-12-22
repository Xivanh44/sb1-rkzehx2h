export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          hotel_id: string | null;
          role: 'manager' | 'user';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          hotel_id?: string | null;
          role: 'manager' | 'user';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          hotel_id?: string | null;
          role?: 'manager' | 'user';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}