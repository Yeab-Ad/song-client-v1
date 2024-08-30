import { useEffect } from "react";
import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  Heading,
  Text,
  useToast,
  Flex,
  Container,
  Divider,
  Spinner,
  VStack,
  Center,
  Icon,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
 import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
} from "chart.js";
import { getRandomColor } from "../util/tweeks";
import { FaMusic, FaUser, FaTags, FaCompactDisc } from "react-icons/fa";
import { generateStatisticsRequest } from "../Redux/action/actions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement
);

const MusicStatistics = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const _createSong = useSelector(
    (state: { createSong: any }) => state.createSong
  );
  const { success: createSucces } = _createSong;

  const _updateSong = useSelector(
    (state: { updateSong: any }) => state.updateSong
  );
  const { success: updateSucces } = _updateSong;

  const _removeSong = useSelector(
    (state: { removeSong: any }) => state.removeSong
  );
  const { success: removeSucces } = _removeSong;

  const _statistics = useSelector(
    (state: { statistics: any }) => state.statistics
  );
  const { statistics: statisticsData, loading: statLoading } = _statistics;

  useEffect(() => {
    dispatch<any>(generateStatisticsRequest("top-right", toast));
  }, [createSucces, updateSucces, removeSucces]);

  if (statLoading) {
    return (
      <Center height={"80vh"}>
        <Container centerContent>
          <Spinner size="xl" />
          <Text mt={4}>Loading statistics...</Text>
        </Container>
      </Center>
    );
  }

  if (!statisticsData) {
    return (
      <Container height={"60vh"} centerContent>
        <Text>No statistics available</Text>
      </Container>
    );
  }

  const getColorArray = (count: number) => {
    return Array.from({ length: count }, () => getRandomColor());
  };

  const genreChartData = {
    labels: statisticsData?.genreCounts.map(
      (genre: { _id: any }) => genre?._id
    ),
    datasets: [
      {
        label: "Songs by Genre",
        data: statisticsData?.genreCounts?.map(
          (genre: { count: any }) => genre?.count
        ),
        backgroundColor: getColorArray(statisticsData?.genreCounts?.length),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const artistChartData = {
    labels: statisticsData?.artistCounts?.map(
      (artist: { _id: any }) => artist?._id
    ),
    datasets: [
      {
        label: "Total Songs per Artist",
        data: statisticsData?.artistCounts?.map(
          (artist: { totalSongs: any }) => artist?.totalSongs
        ),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const albumChartData = {
    labels: statisticsData?.albumCounts?.map(
      (album: { _id: any }) => album?._id
    ),
    datasets: [
      {
        label: "Songs per Album",
        data: statisticsData?.albumCounts?.map(
          (album: { count: any }) => album?.count
        ),
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container maxW="container.xxl" py={"4rem"}>
      <Heading as="h1" mb={8} textAlign="left" fontSize="4xl">
        Statistics Overview
      </Heading>
      <VStack spacing={8} align="stretch">
        <Flex wrap="wrap" justify="center" gap={4}>
          <Stat
            textAlign="start"
            p={4}
            borderWidth={1}
            borderRadius="md"
            borderColor="gray.200"
            shadow="md"
          >
            <Box
              display="flex"
              justifyContent={"space-between"}
              alignItems="center"
            >
              <Box>
                <StatLabel fontSize="lg" fontWeight="bold">
                  Total Songs
                </StatLabel>
                <StatNumber fontSize="2xl" color="teal.500">
                  {statisticsData?.totalSongs}
                </StatNumber>
              </Box>
              <Icon as={FaMusic} w={8} h={8} color="teal.500" />
            </Box>
          </Stat>
          <Stat
            textAlign="start"
            p={4}
            borderWidth={1}
            borderRadius="md"
            borderColor="gray.200"
            shadow="md"
          >
            <Box
              display="flex"
              justifyContent={"space-between"}
              alignItems="center"
            >
              <Box flex="1">
                <StatLabel fontSize="lg" fontWeight="bold">
                  Total Artists
                </StatLabel>
                <StatNumber fontSize="2xl" color="teal.500">
                  {statisticsData?.totalArtists}
                </StatNumber>
              </Box>
              <Icon as={FaUser} w={8} h={8} color="teal.500" />
            </Box>
          </Stat>
          <Stat
            textAlign="start"
            p={4}
            borderWidth={1}
            borderRadius="md"
            borderColor="gray.200"
            shadow="md"
          >
            <Box
              display="flex"
              justifyContent={"space-between"}
              alignItems="center"
            >
              <Box>
                <StatLabel fontSize="lg" fontWeight="bold">
                  Total Albums
                </StatLabel>
                <StatNumber fontSize="2xl" color="teal.500">
                  {statisticsData?.totalAlbums}
                </StatNumber>
              </Box>
              <Icon as={FaCompactDisc} w={8} h={8} color="teal.500" />
            </Box>
          </Stat>
          <Stat
            textAlign="start"
            p={4}
            borderWidth={1}
            borderRadius="md"
            borderColor="gray.200"
            shadow="md"
          >
            <Box
              display="flex"
              justifyContent={"space-between"}
              alignItems="center"
            >
              <Box>
                <StatLabel fontSize="lg" fontWeight="bold">
                  Total Genres
                </StatLabel>
                <StatNumber fontSize="2xl" color="teal.500">
                  {statisticsData?.totalGenres}
                </StatNumber>
              </Box>
              <Icon as={FaTags} w={8} h={8} color="teal.500" />
            </Box>
          </Stat>
        </Flex>

        <Divider orientation="horizontal" my={8} />

        <Flex
          direction={{ base: "column", md: "row" }}
          wrap="wrap"
          justify="space-between"
          gap={6}
        >
          <Box flex="1" minW="300px">
            <Heading size="lg" mb={4} textAlign="center">
              Genre Distribution
            </Heading>
            <Box
              p={4}
              borderWidth={1}
              borderRadius="md"
              borderColor="gray.200"
              shadow="md"
            >
              <Pie data={genreChartData} />
            </Box>
          </Box>

          <Box flex="1" minW="300px">
            <Heading size="lg" mb={4} textAlign="center">
              Artist Statistics
            </Heading>
            <Box
              p={4}
              borderWidth={1}
              borderRadius="md"
              borderColor="gray.200"
              shadow="md"
            >
              <Bar data={artistChartData} />
            </Box>
          </Box>

          <Box flex="1" minW="300px">
            <Heading size="lg" mb={4} textAlign="center">
              Album Statistics
            </Heading>
            <Box
              p={4}
              borderWidth={1}
              borderRadius="md"
              borderColor="gray.200"
              shadow="md"
            >
              <Bar data={albumChartData} />
            </Box>
          </Box>
        </Flex>

        <Box mt={"2rem"}>
          <Heading size="lg" mb={4} textAlign="left">
            Soft Deleted Songs
          </Heading>
          <Text fontSize="xl" textAlign="left" color="red.500">
            {statisticsData?.softDeletedSongsCount} songs
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default MusicStatistics;
