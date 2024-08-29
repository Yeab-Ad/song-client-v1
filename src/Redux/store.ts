import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import {
  createSongReducer,
  listSongsReducer,
  removeSongReducer,
  statisticsReducer,
  updateSongReducer,
} from "./reducer/reducer";

const rootReducer = combineReducers({
  createSong: createSongReducer,
  listSongs: listSongsReducer,
  updateSong: updateSongReducer,
  removeSong: removeSongReducer,
  statistics: statisticsReducer,
});

const initialState = {
  //
};

const middleware = [thunk]; // Correct middleware assignment

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export type RootState = ReturnType<typeof rootReducer>;
export type DispatchType = typeof store.dispatch;

export default store;
