import { UseToastOptions } from "@chakra-ui/react";
import { Song } from "../../interface/interfaces";
import {
  CREATE_SONG_REQUEST,
  LIST_SONGS_REQUEST,
  UPDATE_SONG_REQUEST,
  REMOVE_SONG_REQUEST,
  GENERATE_STATISTICS_REQUEST,
} from "../constant/constants";

// Action Types
interface CreateSongRequestAction {
  type: typeof CREATE_SONG_REQUEST;
  payload: {
    songData: Song;
    toastPosition: any;
    toasts: (options: UseToastOptions | undefined) => void;
    onSuccess: () => void;
  };
}

interface ListSongsRequestAction {
  type: typeof LIST_SONGS_REQUEST;
  payload: {
    filters: any;
    toastPosition: any;
    toasts: (options: UseToastOptions | undefined) => void;
  };
}

interface UpdateSongRequestAction {
  type: typeof UPDATE_SONG_REQUEST;
  payload: {
    id: string;
    updatedData: Song;
    toastPosition: any;
    toasts: (options: UseToastOptions | undefined) => void;
    onSuccess: () => void;
  };
}

interface RemoveSongRequestAction {
  type: typeof REMOVE_SONG_REQUEST;
  payload: {
    id: string;
    toastPosition: any;
    toasts: (options: UseToastOptions | undefined) => void;
    onSuccess: () => void;
  };
}

interface GenerateStatisticsRequestAction {
  type: typeof GENERATE_STATISTICS_REQUEST;
  payload: {
    toastPosition: any;
    toasts: (options: UseToastOptions | undefined) => void;
  };
}

// Action Creators
export const createSongRequest = (
  songData: any,
  toastPosition: any,
  toasts: (options: UseToastOptions | undefined) => void,
  onSuccess: () => void
): CreateSongRequestAction => ({
  type: CREATE_SONG_REQUEST,
  payload: { songData, toastPosition, toasts, onSuccess },
});

export const listSongsRequest = (
  filters: any,
  toastPosition: any,
  toasts: (options: UseToastOptions | undefined) => void
): ListSongsRequestAction => ({
  type: LIST_SONGS_REQUEST,
  payload: { filters, toastPosition, toasts },
});

export const updateSongRequest = (
  id: string,
  updatedData: Song,
  toastPosition: any,
  toasts: (options: UseToastOptions | undefined) => void,
  onSuccess: () => void
): UpdateSongRequestAction => ({
  type: UPDATE_SONG_REQUEST,
  payload: { id, updatedData, toastPosition, toasts, onSuccess },
});

export const removeSongRequest = (
  id: string,
  toastPosition: any,
  toasts: (options: UseToastOptions | undefined) => void,
  onSuccess: () => void
): RemoveSongRequestAction => ({
  type: REMOVE_SONG_REQUEST,
  payload: { id, toastPosition, toasts, onSuccess },
});

export const generateStatisticsRequest = (
  toastPosition: any,
  toasts: (options: UseToastOptions | undefined) => void
): GenerateStatisticsRequestAction => ({
  type: GENERATE_STATISTICS_REQUEST,
  payload: { toastPosition, toasts },
});
