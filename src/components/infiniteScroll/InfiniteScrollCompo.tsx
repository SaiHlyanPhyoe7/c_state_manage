import { logout } from "@/redux/feature/auth/loginSlice";
import { RootState } from "@/redux/store";
import { Player, ScrollDataT } from "@/types/types";
import {
  ActionIcon,
  Affix,
  Box,
  Button,
  Container,
  Loader,
  Text,
  Title,
  Transition,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowUp, IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

function InfiniteScrollCompo({ players, loading }: ScrollDataT) {
  const forDesktop = useMediaQuery("(min-width: 56.25em)");
  const username = useSelector((state: RootState) => state.auth.username);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Box>
      {username && (
        <Container size='md'>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <ActionIcon>
              <IconChevronLeft onClick={() => router.back()} />
            </ActionIcon>
            <Title
              order={1}
              sx={{ textDecoration: "underline", padding: "20px" }}
            >
              Players
            </Title>
            <Button
              onClick={() => {
                dispatch(logout());
                router.push("/login");
              }}
              variant='gradient'
              gradient={{ from: "orange", to: "red" }}
            >
              Logout
            </Button>
          </Box>
          {players.map((player: Player, index: number) => (
            <div key={index}>
              <Text fz={forDesktop ? "80px" : "60px"}>
                {index}. {player.first_name} {player.last_name}
              </Text>
            </div>
          ))}
          <Affix position={{ bottom: "20rem", right: "20rem" }}>
            <Transition transition='slide-up' mounted={window.scrollY > 0}>
              {(transitionStyles) => (
                <Button
                  leftIcon={<IconArrowUp size='1rem' />}
                  style={transitionStyles}
                  onClick={() => window.scrollTo({ top: 0 })}
                >
                  Scroll to top
                </Button>
              )}
            </Transition>
          </Affix>
          {loading && (
            <Box>
              <Loader />;
            </Box>
          )}
        </Container>
      )}
    </Box>
  );
}

export default InfiniteScrollCompo;
