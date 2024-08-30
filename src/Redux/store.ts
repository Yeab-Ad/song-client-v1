import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import {
  createSongReducer,
  listSongsReducer,
  removeSongReducer,
  statisticsReducer,
  updateSongReducer,
} from "./reducer/reducer";
import mySaga from "./sagas";

const rootReducer = combineReducers({
  createSong: createSongReducer,
  listSongs: listSongsReducer,
  updateSong: updateSongReducer,
  removeSong: removeSongReducer,
  statistics: statisticsReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
