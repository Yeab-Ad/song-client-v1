import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { Song } from "../interface/interfaces";
import { useDispatch } from "react-redux";
import { createSongRequest } from "../Redux/action/actions";

interface SongFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (song: Omit<Song, "_id">) => void;
  initialSong?: Song;
  isEditMode?: boolean;
}

const SongForm: React.FC<SongFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialSong,
  isEditMode = false,
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [songData, setSongData] = useState<Song>({
    _id: "",
    title: "",
    artist: "",
    album: "",
    genre: "",
    image_url: "",
  });

  useEffect(() => {
    if (initialSong) {
      setSongData(initialSong);
    }
  }, [initialSong]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSongData({
      ...songData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { _id, ...songWithoutId } = songData;

    if (isEditMode) {
      onSubmit(songWithoutId); // Call the onSubmit function with the edited song data
    } else {
      dispatch<any>(
        createSongRequest(songWithoutId, "top-right", toast, () => {
          setSongData({
            _id: "",
            title: "",
            artist: "",
            album: "",
            genre: "",
            image_url: "",
          });
          onClose();
        })
      );
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        backdropFilter={"blur(20px)"}
        background={useColorModeValue("whiteAlpha.700", "blackAlpha.500")}
        borderWidth={"1px"}
        borderRadius={"15px"}
      >
        <form onSubmit={handleSubmit}>
          <ModalHeader>{isEditMode ? "Edit Song" : "Create Song"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title:</FormLabel>
              <Input
                type="text"
                name="title"
                value={songData.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Artist:</FormLabel>
              <Input
                type="text"
                name="artist"
                value={songData.artist}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Album:</FormLabel>
              <Input
                type="text"
                name="album"
                value={songData.album}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Genre:</FormLabel>
              <Input
                type="text"
                name="genre"
                value={songData.genre}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image URL:</FormLabel>
              <Input
                type="text"
                name="image_url"
                value={songData.image_url}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={4}
              colorScheme="green"
              variant={"outline"}
              type="submit"
            >
              {isEditMode ? "Save" : "Create"}
            </Button>
            <Button colorScheme="red" variant={"outline"} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default SongForm;
