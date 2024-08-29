import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Song, SongCardProps } from "../interface/interfaces";
import { FaCompactDisc, FaList, FaUser } from "react-icons/fa";
import { truncateWords } from "../util/tweeks";
import SongForm from "./SongForm";

const SongCard: React.FC<SongCardProps> = ({ song, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSong, setEditedSong] = useState<Song>({ ...song });

  const handleSave = () => {
    onEdit(editedSong);

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSong(song);
    setIsEditing(false);
  };

  return (
    <>
      <Box
        className="product product-card-updated"
        minW="270px"
        maxW="350px"
        lineHeight="1.5"
        overflow="hidden"
        position="relative"
        borderRadius="14px"
        borderWidth={"1px"}
        _hover={{ transform: "scale(1.005)" }}
        mb={2}
        display={"flex"}
        flexDirection={"column"}
        fontFamily="Inter, sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
      >
        <Box
          className="product-card-image"
           role="img"
          bg={`url(${
            song?.image_url ||
            "https://t4.ftcdn.net/jpg/05/71/06/03/360_F_571060336_lRFo9ZoUUYDzcKb6dHKMs8unl2TM98rr.jpg"
          }) center center no-repeat`}
          bgSize="cover"
          bgPos="center center"
          height="170px"
          padding="14px"
          width={"100%"}
        ></Box>
         
        <Box
          className="product-card-details"
          position="relative"
           margin="12px"
          mx={"22px"}
          borderRadius="15px"
          display="grid"
        >
          <Box>
            <Heading
              as="h6"
              fontSize="22px"
              textDecoration={"underline"}
              mb="2"
              textAlign={"start"}
            >
              {truncateWords(song.title, 15)}
            </Heading>

            <Flex fontSize={"14px"} align="center">
              <FaUser />
              <Text ml="2">{song.artist}</Text>
            </Flex>

            <Flex fontSize={"14px"} align="center">
              <FaCompactDisc />
              <Text ml="2">{song.album}</Text>
            </Flex>

            <Flex fontSize={"14px"} align="center">
              <FaList />
              <Text ml="2">{song.genre} </Text>
            </Flex>
          </Box>

          <Flex mt={"10px"} gap={"10px"}>
            {isEditing ? (
              <>
                <Button
                  colorScheme="green"
                  variant={"outline"}
                  borderRadius="6px"
                  alignItems="center"
                  w={"full"}
                  onClick={handleSave}
                >
                  <CheckIcon />
                </Button>
                <Button
                  colorScheme="red"
                  variant={"outline"}
                  borderRadius="6px"
                  alignItems="center"
                  w={"full"}
                  onClick={handleCancel}
                >
                  <CloseIcon />
                </Button>
              </>
            ) : (
              <>
                <Button
                  colorScheme="green"
                  variant={"outline"}
                  borderRadius="6px"
                  alignItems="center"
                  w={"full"}
                  onClick={() => {
                    setEditedSong(song);
                    setIsEditing(true);
                  }}
                >
                  <EditIcon />
                </Button>
                <Button
                  colorScheme="red"
                  variant={"outline"}
                  borderRadius="6px"
                  alignItems="center"
                  w={"full"}
                  onClick={onDelete}
                >
                  <DeleteIcon />
                </Button>
              </>
            )}
          </Flex>
        </Box>
      </Box>

      <SongForm
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSubmit={(song: any) => onEdit(song)}
        initialSong={song}
        isEditMode={true}
      />
    </>
  );
};

export default SongCard;
