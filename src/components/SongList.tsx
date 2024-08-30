import React, { useState, useEffect } from "react";
import { Song, SongListProps } from "../interface/interfaces";
import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Icon,
  Skeleton,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import SongCard from "./SongCard";
import { useDispatch, useSelector } from "react-redux";
// import {
//   listSongsRequest,
//   removeSongAction,
//   updateSongAction,
// } from "../Redux/action/actions";
import { SongFilters } from "./SongFilters";
import { FaMusic } from "react-icons/fa";
import { listSongsRequest, removeSongRequest, updateSongRequest } from "../Redux/action/actions";

const SongList: React.FC<SongListProps> = () => {
  const [filters, setFilters] = useState({ title: "", artist: "", genre: "" });
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState<Song | null>(null);
  const cancelRef = React.useRef<any>();
  const [songsPerPage] = useState(8);
  const dispatch = useDispatch();
  const toast = useToast();

  const _createSong = useSelector(
    (state: { createSong: any }) => state.createSong
  );
  const { success, loading: createLoading } = _createSong;

  const _listSongs = useSelector(
    (state: { listSongs: any }) => state.listSongs
  );
  const { songs: getSongs, loading: listLoading, error } = _listSongs;

  const _updateSong = useSelector(
    (state: { updateSong: any }) => state.updateSong
  );
  const { loading: updateLoading } = _updateSong;

  const _removeSong = useSelector(
    (state: { removeSong: any }) => state.removeSong
  );
  const { loading: removeLoading } = _removeSong;

  useEffect(() => {
    dispatch<any>(listSongsRequest(filters, "top-right", toast));
  }, [success, filters]);

  useEffect(() => {
    setSongs(getSongs);
  }, [getSongs, songs]);

  const totalPages = Math.ceil(songs.length / songsPerPage);
  const currentPageSongs = songs.slice(
    (currentPage - 1) * songsPerPage,
    currentPage * songsPerPage
  );

  const handleEdit = (id: string, updatedSong: Song) => {
    dispatch<any>(
      updateSongRequest(id, updatedSong, "top-right", toast, () => {
        dispatch<any>(listSongsRequest(filters, "top-right", toast));
      })
    );
  };

  const handleDelete = () => {
    if (songToDelete) {
      dispatch<any>(
        removeSongRequest(songToDelete._id, "top-right", toast, () => {
          dispatch<any>(listSongsRequest(filters, "top-right", toast));
        })
      );
      setIsModalOpen(false);
      setSongToDelete(null);
    }
  };

  const isLoading =
    createLoading || listLoading || updateLoading || removeLoading;

  return (
    <Box>
      <Box pb={"2rem"} display={"flex"} justifyContent={"space-between"}>
        <Text textAlign={"left"} fontSize="3xl" fontWeight="bold" mb="4">
          Song List
        </Text>
        <SongFilters filters={filters} onChange={setFilters} />
      </Box>

      {/* Loading State */}
      {isLoading && (
        <Grid
          templateColumns={{
            base: "repeat(auto-fill, minmax(270px, 1fr))",
            md: "repeat(auto-fill, minmax(270px, 1fr))",
          }}
          gap="15px"
          justifyItems={"center"}
          paddingX={"4rem"}
        >
          {[0, 1, 2, 3].map((_, index) => (
            <Skeleton
              key={index}
              p={6}
              boxShadow="lg"
              borderRadius="md"
              borderWidth={"1px"}
              width={"270px"}
              height={"350px"}
              mb={4}
            />
          ))}
        </Grid>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <Center height={"60vh"}>
          <Box maxWidth={"300px"}>
            <Alert status="error" mb={4} borderRadius="md" padding={4}>
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>Failed to load songs</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Box>
            </Alert>
          </Box>
        </Center>
      )}

      {/* Empty State */}
      {!isLoading && !error && songs.length === 0 && (
        <Center flexDir={"column"} height={"60vh"}>
          <Icon mb={"5px"} as={FaMusic} w={8} h={8} color="teal.500" />
          <Text textAlign="center" fontSize="lg" color="gray.500">
            No songs found by this{" "}
            {filters.genre && <strong>Genre: {filters.genre} </strong>}
            {filters.artist && <strong>Artist: {filters.artist} </strong>}
            {filters.title && <strong>Title: {filters.title} </strong>}.
          </Text>
        </Center>
      )}

      {!isLoading && !error && songs.length > 0 && (
        <>
          <Grid
            templateColumns={{
              base: "repeat(auto-fill, minmax(270px, 1fr))",
              md: "repeat(auto-fill, minmax(270px, 1fr))",
            }}
            gap="15px"
            justifyItems={"center"}
            paddingX={"4rem"}
          >
            {currentPageSongs?.map((song) => (
              <SongCard
                onEdit={(updatedSong) => handleEdit(song?._id, updatedSong)}
                key={song?._id}
                song={song}
                onDelete={() => {
                  setSongToDelete(song);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </Grid>

          <Flex mb={6} alignItems={"center"} justify="space-between" mt={10}>
            <Text fontSize={"15px"} mr={"10px"} color={"gray.500"}>
              Showing {(currentPage - 1) * songsPerPage + 1} -{" "}
              {Math.min(currentPage * songsPerPage, songs.length)} of{" "}
              {songs.length} songs
            </Text>

            <Flex>
              <Button
                isDisabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                variant={"outline"}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  mx={1}
                  onClick={() => setCurrentPage(i + 1)}
                  variant={"outline"}
                  colorScheme={currentPage === i + 1 ? "teal" : "gray"}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant={"outline"}
                isDisabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </Flex>
            <div />
          </Flex>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <AlertDialog
        isOpen={isModalOpen}
        isCentered
        leastDestructiveRef={cancelRef}
        onClose={() => setIsModalOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            backdropFilter={"blur(20px)"}
            background={useColorModeValue("whiteAlpha.600", "blackAlpha.600")}
            borderWidth={"1px"}
            borderRadius={"15px"}
          >
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Song
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete the song {songToDelete?.title} by{" "}
              {songToDelete?.artist}? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                variant={"outline"}
                ref={cancelRef}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant={"outline"}
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default SongList;
