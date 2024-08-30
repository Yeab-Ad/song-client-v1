export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  image_url: string;
  delete_at?: Date | null;
}

export interface SongCardProps {
  song: Song;
  onDelete: () => void;
  onEdit: (updatedSong: Song) => void;
}
export interface SongListProps {}

export interface SongFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (song: Song) => void;
  initialSong?: Song;
  isEditMode?: boolean;
}

export interface StatisticsCardProps {
  title: string;
  value: number | string;
}
