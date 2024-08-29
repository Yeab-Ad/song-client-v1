import React from "react";
 import { Box, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { FaPlus } from "react-icons/fa";
import SongForm from "./components/SongForm";
import SongList from "./components/SongList";
import MusicStatistics from "./components/MusicStatistics";

const Main = () => {
  const [isSongFormOpen, setIsSongFormOpen] = React.useState(false);

  const handleOpenSongForm = () => {
    setIsSongFormOpen(true);
  };

  const handleCloseSongForm = () => {
    setIsSongFormOpen(false);
  };

  return (
    <>
      <Flex
        position={"sticky"}
        top={"0px"}
        background={useColorModeValue("whiteAlpha.600", "#1a202cb5")}
        backdropFilter={"blur(20px)"}
        zIndex={111}
        p={"25px"}
        justifyContent={"space-between"}
      >
        <ColorModeSwitcher justifySelf="flex-end" />
        <Button
          colorScheme="green"
          variant={"outline"}
          onClick={handleOpenSongForm}
        >
          <FaPlus /> Add New Song
        </Button>
        <SongForm
          isOpen={isSongFormOpen}
          onClose={handleCloseSongForm}
          onSubmit={(song: any) => {}}
        />
      </Flex>
      <Box paddingX={"4rem"}>
        <SongList />
        <MusicStatistics />
      </Box>
    </>
  );
};

export default Main;
