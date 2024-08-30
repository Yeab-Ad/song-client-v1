import { call, put, takeEvery } from "redux-saga/effects";
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
} from "./constant/constants";
import { Action } from "redux";
import { UseToastOptions } from "@chakra-ui/react";
import { Song } from "../interface/interfaces";
import API_BASE_URL from "../util/config";
import { handleSagaErrorMessage } from "./action/common/ErrorHandler";

// Action Interfaces
interface CreateSongRequestAction extends Action<typeof CREATE_SONG_REQUEST> {
  payload: {
    songData: Song;
    toastPosition: any;
    toasts: (options: UseToastOptions | undefined) => void;
    onSuccess: () => void;
  };
}

interface ListSongsRequestAction extends Action<typeof LIST_SONGS_REQUEST> {
  payload: {
    filters: any;
    toastPosition: any;
    toasts: (options: UseToastOptions | undefined) => void;
  };
}

interface UpdateSongRequestAction extends Action<typeof UPDATE_SONG_REQUEST> {
  payload: {
    id: string;
    updatedData: Song;
    toastPosition: any;
    toasts: (options: UseToastOptions | undefined) => void;
    onSuccess: () => void;
  };
}

interface RemoveSongRequestAction extends Action<typeof REMOVE_SONG_REQUEST> {
  payload: {
    id: string;
    toastPosition: any;
    toasts: (options: UseToastOptions | undefined) => void;
    onSuccess: () => void;
  };
}

interface GenerateStatisticsRequestAction
  extends Action<typeof GENERATE_STATISTICS_REQUEST> {
  payload: {
    toastPosition: any;
    toasts: (options: UseToastOptions | undefined) => void;
  };
}

// Type for Saga Effects
type SagaGenerator<T = unknown> = Generator<any, T, any>;

// Create Song Saga
function* handleCreateSong(
  action: CreateSongRequestAction
): SagaGenerator<void> {
  const { songData, toastPosition, toasts, onSuccess } = action.payload;
  try {
    const response = yield call(axios.post, `${API_BASE_URL}/songs`, songData);
    yield put({ type: CREATE_SONG_SUCCESS, payload: response.data });
    toasts({
      title: "Song Created.",
      position: toastPosition,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onSuccess();
  } catch (error: any) {
    yield put({ type: CREATE_SONG_FAILURE, payload: error });
    handleSagaErrorMessage(toasts, toastPosition, error, CREATE_SONG_FAILURE);
  }
}

// List Songs Saga
function* handleListSongs(action: ListSongsRequestAction): SagaGenerator<void> {
  const { filters, toastPosition, toasts } = action.payload;
  try {
    const { title, artist, genre } = filters;
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/songs?title=${title}&artist=${artist}&genre=${genre}`
    );
    yield put({ type: LIST_SONGS_SUCCESS, payload: response.data });
  } catch (error: any) {
    yield put({ type: LIST_SONGS_FAILURE, payload: error });
    handleSagaErrorMessage(toasts, toastPosition, error, LIST_SONGS_FAILURE);
  }
}

// Update Song Saga
function* handleUpdateSong(
  action: UpdateSongRequestAction
): SagaGenerator<void> {
  const { id, updatedData, toastPosition, toasts, onSuccess } = action.payload;
  try {
    const response = yield call(
      axios.put,
      `${API_BASE_URL}/songs/${id}`,
      updatedData
    );
    yield put({ type: UPDATE_SONG_SUCCESS, payload: response.data });
    toasts({
      title: "Song Updated.",
      position: toastPosition,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onSuccess();
  } catch (error: any) {
    yield put({ type: UPDATE_SONG_FAILURE, payload: error });
    handleSagaErrorMessage(toasts, toastPosition, error, UPDATE_SONG_FAILURE);
  }
}

// Remove Song Saga
function* handleRemoveSong(
  action: RemoveSongRequestAction
): SagaGenerator<void> {
  const { id, toastPosition, toasts, onSuccess } = action.payload;
  try {
    yield call(axios.delete, `${API_BASE_URL}/songs/${id}`);
    yield put({ type: REMOVE_SONG_SUCCESS, payload: id });
    toasts({
      title: "Song Deleted.",
      position: toastPosition,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onSuccess();
  } catch (error: any) {
    yield put({ type: REMOVE_SONG_FAILURE, payload: error });
    handleSagaErrorMessage(toasts, toastPosition, error, REMOVE_SONG_FAILURE);
  }
}

// Generate Statistics Saga
function* handleGenerateStatistics(
  action: GenerateStatisticsRequestAction
): SagaGenerator<void> {
  const { toastPosition, toasts } = action.payload;
  try {
    const response = yield call(axios.get, `${API_BASE_URL}/statistics`);
    yield put({ type: GENERATE_STATISTICS_SUCCESS, payload: response.data });
  } catch (error: any) {
    yield put({ type: GENERATE_STATISTICS_FAILURE, payload: error });
    handleSagaErrorMessage(
      toasts,
      toastPosition,
      error,
      GENERATE_STATISTICS_FAILURE
    );
  }
}

// Root Saga
function* mySaga(): SagaGenerator<void> {
  yield takeEvery(CREATE_SONG_REQUEST, handleCreateSong);
  yield takeEvery(LIST_SONGS_REQUEST, handleListSongs);
  yield takeEvery(UPDATE_SONG_REQUEST, handleUpdateSong);
  yield takeEvery(REMOVE_SONG_REQUEST, handleRemoveSong);
  yield takeEvery(GENERATE_STATISTICS_REQUEST, handleGenerateStatistics);
}

export default mySaga;
