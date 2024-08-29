import {
  CREATE_SONG_FAILURE,
  CREATE_SONG_REQUEST,
  CREATE_SONG_SUCCESS,
  GENERATE_STATISTICS_FAILURE,
  GENERATE_STATISTICS_REQUEST,
  GENERATE_STATISTICS_SUCCESS,
  LIST_SONGS_FAILURE,
  LIST_SONGS_REQUEST,
  LIST_SONGS_SUCCESS,
  REMOVE_SONG_FAILURE,
  REMOVE_SONG_REQUEST,
  REMOVE_SONG_SUCCESS,
  UPDATE_SONG_FAILURE,
  UPDATE_SONG_REQUEST,
  UPDATE_SONG_SUCCESS,
} from "../constant/constants";

interface InitailSongState {
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: InitailSongState = {
  loading: false,
  error: null,
  success: null,
};

export const createSongReducer = (
  state = initialState,
  action: any
): InitailSongState => {
  switch (action.type) {
    case CREATE_SONG_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_SONG_SUCCESS:
      return { ...state, success: action.payload, loading: false, error: null };
    case CREATE_SONG_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

interface ListSongsState {
  songs: any[];
  loading: boolean;
  error: string | null;
}

const initialListState: ListSongsState = {
  songs: [],
  loading: false,
  error: null,
};

export const listSongsReducer = (
  state = initialListState,
  action: any
): ListSongsState => {
  switch (action.type) {
    case LIST_SONGS_REQUEST:
      return { ...state, loading: true, error: null };
    case LIST_SONGS_SUCCESS:
      return { ...state, loading: false, error: null, songs: action.payload };
    case LIST_SONGS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateSongReducer = (
  state = initialState,
  action: any
): InitailSongState => {
  switch (action.type) {
    case UPDATE_SONG_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_SONG_SUCCESS:
      return { ...state, success: action.payload, loading: false, error: null };
    // return { ...state, loading: false, error: null };
    case UPDATE_SONG_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const removeSongReducer = (
  state = initialState,
  action: any
): InitailSongState => {
  switch (action.type) {
    case REMOVE_SONG_REQUEST:
      return { ...state, loading: true, error: null };
    case REMOVE_SONG_SUCCESS:
      return { ...state, success: action.payload, loading: false, error: null };
    // return { ...state, loading: false, error: null };
    case REMOVE_SONG_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

interface StatisticsState {
  loading: boolean;
  error: string | null;
  statistics: any; // Update the type according to your response structure
}

const initialStatisticsState: StatisticsState = {
  loading: false,
  error: null,
  statistics: null,
};

export const statisticsReducer = (
  state = initialStatisticsState,
  action: any
): StatisticsState => {
  switch (action.type) {
    case GENERATE_STATISTICS_REQUEST:
      return { ...state, loading: true, error: null };
    case GENERATE_STATISTICS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        statistics: action.payload,
      };
    case GENERATE_STATISTICS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        statistics: null,
      };
    default:
      return state;
  }
};
