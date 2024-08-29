import axios from "axios";
import {
  CREATE_SONG_REQUEST,
  CREATE_SONG_SUCCESS,
  CREATE_SONG_FAILURE,
  LIST_SONGS_REQUEST,
  LIST_SONGS_SUCCESS,
  LIST_SONGS_FAILURE,
  UPDATE_SONG_REQUEST,
  UPDATE_SONG_SUCCESS,
  UPDATE_SONG_FAILURE,
  REMOVE_SONG_REQUEST,
  REMOVE_SONG_SUCCESS,
  REMOVE_SONG_FAILURE,
  GENERATE_STATISTICS_REQUEST,
  GENERATE_STATISTICS_SUCCESS,
  GENERATE_STATISTICS_FAILURE,
} from "../constant/constants";
import { UseToastOptions } from "@chakra-ui/react";
import { handleErrorMessage } from "./common/ErrorHandler";
import API_BASE_URL from "../../util/config";
import { Song } from "../../interface/interfaces";

export const createSongAction =
  (
    songData: any,
    toastPosition: any,
    toasts: (options: UseToastOptions | undefined) => void,
    onSuccess: () => void
  ) =>
  async (
    dispatch: (arg0: { type: string; payload?: any }) => void,
    getState: () => {}
  ) => {
    try {
      dispatch({ type: CREATE_SONG_REQUEST });

      const { data } = await axios.post(`${API_BASE_URL}/songs`, songData);

      dispatch({
        type: CREATE_SONG_SUCCESS,
        payload: data,
      });

      toasts({
        title: "Song Created.",
        position: toastPosition,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onSuccess();
    } catch (error) {
      handleErrorMessage(
        toasts,
        toastPosition,
        dispatch,
        error,
        CREATE_SONG_FAILURE
      );
    }
  };

// List all songs
export const listSongsAction =
  (
    filters: any,
    toastPosition: any,
    toasts: (options: UseToastOptions | undefined) => void
  ) =>
  async (
    dispatch: (arg0: { type: string; payload?: any }) => void,
    getState: () => {}
  ) => {
    try {
      dispatch({ type: LIST_SONGS_REQUEST });
      const { title, artist, genre } = filters;

      console.log({ filters });

      const { data } = await axios.get(
        `${API_BASE_URL}/songs?title=${title}&artist=${artist}&genre=${genre}`
      );

      dispatch({
        type: LIST_SONGS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      handleErrorMessage(
        toasts,
        toastPosition,
        dispatch,
        error,
        LIST_SONGS_FAILURE
      );
    }
  };

// Update a song by ID
export const updateSongAction =
  (
    id: string,
    updatedData: Song,
    toastPosition: any,
    toasts: (options: UseToastOptions | undefined) => void,
    onSuccess: () => void
  ) =>
  async (
    dispatch: (arg0: { type: string; payload?: any }) => void,
    getState: () => {}
  ) => {
    try {
      dispatch({ type: UPDATE_SONG_REQUEST });

      const { data } = await axios.put(
        `${API_BASE_URL}/songs/${id}`,
        updatedData
      );

      toasts({
        title: "Song Updated.",
        position: toastPosition,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onSuccess();
      dispatch({
        type: UPDATE_SONG_SUCCESS,
        payload: data,
      });
    } catch (error) {
      handleErrorMessage(
        toasts,
        toastPosition,
        dispatch,
        error,
        UPDATE_SONG_FAILURE
      );
    }
  };

// Remove a song by ID
export const removeSongAction =
  (
    id: string,
    toastPosition: any,
    toasts: (options: UseToastOptions | undefined) => void,
    onSuccess: () => void
  ) =>
  async (
    dispatch: (arg0: { type: string; payload?: any }) => void,
    getState: () => {}
  ) => {
    try {
      dispatch({ type: REMOVE_SONG_REQUEST });

      await axios.delete(`${API_BASE_URL}/songs/${id}`);

      dispatch({
        type: REMOVE_SONG_SUCCESS,
        payload: id,
      });

      toasts({
        title: "Song Deleted.",
        position: toastPosition,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onSuccess();
    } catch (error) {
      handleErrorMessage(
        toasts,
        toastPosition,
        dispatch,
        error,
        REMOVE_SONG_FAILURE
      );
    }
  };

export const generateStatisticsAction =
  (
    toastPosition: any,
    toasts: (options: UseToastOptions | undefined) => void
  ) =>
  async (
    dispatch: (arg0: { type: string; payload?: any }) => void,
    getState: () => {}
  ) => {
    try {
      dispatch({ type: GENERATE_STATISTICS_REQUEST });

      const { data } = await axios.get(`${API_BASE_URL}/statistics`);

      dispatch({
        type: GENERATE_STATISTICS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      handleErrorMessage(
        toasts,
        toastPosition,
        dispatch,
        error,
        GENERATE_STATISTICS_FAILURE
      );
    }
  };
