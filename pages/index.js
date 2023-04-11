import { useQuery, gql } from "@apollo/client";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import CardModal from "./components/CardModal";
const GET_POKEMON_LIST = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export default function Home() {
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);
  const [id, setid] = useState()
  const handleOpen = (id) => {
    setid(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { loading, data } = useQuery(GET_POKEMON_LIST, {
    variables: {
      first: 20,
      offset: count,
    },
  });

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1>Pokemon List</h1>
      <ul>
        <Box>
          <Container maxWidth="xl">
            <Box SX={{ paddingBottom: "70px" }}>
              <Box SX={{ paddingTop: "30px" }}>
                <Grid container spacing={3}>
                  {data &&
                    data.pokemons.map((pokemon) => {
                      return (
                        <Grid
                          item
                          lg={3}
                          md={3}
                          sm={6}
                          xs={12}
                          key={pokemon.id}
                        >
                          <Box
                            sx={{
                              padding: "10px",
                              backgroundColor: "#fff",
                              borderRadius: "40px",
                              "& h6": {
                                color: " #3B0D60",
                                fontWeight: "bold",
                                fontSize: "15px",
                                paddingTop: "7px",
                              },
                            }}
                            onClick={() => handleOpen(pokemon.id)}
                          >
                            <Box
                              sx={{
                                width: "100%",
                                height: "210px",
                                overflow: "hidden",
                                backgroundPosition: "center !important",
                                backgroundSize: "cover !important",
                                backgroundRepeat: " no-repeat !important",
                                borderRadius: "40px 40px 10px 10px",
                                backgroundColor: "#ccc !important",
                              }}
                            >
                              <img
                                src={pokemon.image}
                                alt=""
                                className={styles.imageCard}
                              />
                            </Box>
                            <Box>
                              <Typography variant="h6">
                                Name : {pokemon.name}
                              </Typography>
                              <Typography
                                variant="h6"
                              >
                                Number : {pokemon.id}
                              </Typography>
                              <p>Types: {pokemon.types.join(", ")}</p>
                            </Box>
                          </Box>
                        </Grid>
                      );
                    })}
                </Grid>
              </Box>
            </Box>
            <Box>
              <CardModal
                count={count} setCount={setCount} open={open} setOpen={setOpen}
                handleClose={handleClose}
                handleOpen={handleOpen}
                id={id}
              />
            </Box>
          </Container>
        </Box>
      </ul>
    </div>
  );
}
