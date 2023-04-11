"use client"
import { Box, Modal, Typography } from "@mui/material";
import styles from "../../styles/Home.module.css"
import { useQuery, gql } from '@apollo/client';

const GET_POKEMON_DETAIL = gql`
query pokemon($id: String){
    pokemon(id: $id){
      id
      number
      name
      weight{
        minimum
        maximum
      }
      height{
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
const CardModal = (props) => {
    const { open, handleClose, id } = props
    const { loading, data } = useQuery(GET_POKEMON_DETAIL, {
        variables: { id: id },
        ssr: false,
    });
    if (loading) return <p>Loading...</p>;
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className={styles.headRoot}>
                    <Box className={styles.imageCard}>
                        <img
                            src={data.pokemon.image}
                            alt=""
                            className={styles.imageCard}
                        />
                    </Box >
                    <hr />
                    <Box className={styles.cardData}>
                        <Typography variant="h5" sx={{ fontSize: "20px", fontWeight: 400 }}>Name:</Typography>
                        <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 400 }}>{data.pokemon?.name}</Typography>
                    </Box>
                    <hr />
                    <Box className={styles.cardData}>
                        <Typography variant="h5" sx={{ fontSize: "20px", fontWeight: 400 }}>Id:</Typography>
                        <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 400 }}>{data.pokemon?.id}</Typography>
                    </Box>
                    <hr />
                    <Box className={styles.cardData}>
                        <Typography variant="h5" sx={{ fontSize: "20px", fontWeight: 400 }}>Min Height:</Typography>
                        <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 400 }}>{data.pokemon?.height.minimum}</Typography>
                    </Box>
                    <hr />
                    <Box className={styles.cardData}>
                        <Typography variant="h5" sx={{ fontSize: "20px", fontWeight: 400 }}>Max Height:</Typography>
                        <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 400 }}>{data.pokemon?.height.maximum}</Typography>
                    </Box>
                    <hr />
                    <Box className={styles.cardData}>
                        <Typography variant="h5" sx={{ fontSize: "20px", fontWeight: 400 }}>Min Weight:</Typography>
                        <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 400 }}>{data.pokemon?.weight.minimum}</Typography>
                    </Box>
                    <hr />
                    <Box className={styles.cardData}>
                        <Typography variant="h5" sx={{ fontSize: "20px", fontWeight: 400 }}>Max Weight:</Typography>
                        <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 400 }}>{data.pokemon?.weight.maximum}</Typography>
                    </Box>
                    <hr />
                    <Box className={styles.cardData}>
                        <Typography variant="h5" sx={{ fontSize: "20px", fontWeight: 400 }}>Max CP:</Typography>
                        <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 400 }}>{data.pokemon?.maxCP}</Typography>
                    </Box>
                    <hr />
                    <Box className={styles.cardData}>
                        <Typography variant="h5" sx={{ fontSize: "20px", fontWeight: 400 }}>Max HP:</Typography>
                        <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 400 }}>{data.pokemon?.maxHP}</Typography>
                    </Box>
                    <hr />
                    <Box className={styles.cardData}>
                        <Typography variant="h5" sx={{ fontSize: "20px", fontWeight: 400 }}>Classification:</Typography>
                        <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 400 }}>{data.pokemon?.classification}</Typography>
                    </Box>
                    <Box className={styles.cardData}>
                        <Typography variant="h5" sx={{ fontSize: "20px", fontWeight: 400 }}>fleeRate:</Typography>
                        <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 400 }}>{data.pokemon?.fleeRate}</Typography>
                    </Box>
                    <hr />
                    <Box className={styles.cardData}>
                        <Typography variant="h5">Resistant:</Typography>
                        <Typography variant="h6">
                            {data.pokemon?.resistant.slice(0, 2).map((data, index) => {
                                return (
                                    <Typography key={index} variant="h6">
                                        {data}
                                    </Typography>
                                );
                            })}
                        </Typography>
                    </Box>
                    <hr />
                    <Box className={styles.cardData}>
                        <Typography variant="h5">Weakness:</Typography>
                        <Typography variant="h6">
                            {data.pokemon?.weaknesses.slice(0, 2).map((data, index) => {
                                return (
                                    <Typography key={index} variant="h6">
                                        {data}
                                    </Typography>
                                );
                            })}
                        </Typography>
                    </Box>
                    <hr />
                    <Box className={styles.cardData}>
                        <Typography variant="h5">Types:</Typography>
                        <Typography>
                            {data.pokemon?.types.slice(0, 2).map((data, index) => {
                                return (
                                    <Box key={index} className={styles.cardData}>
                                        {/* <Typography variant="h5">{data.stat.name} :</Typography> */}
                                        <Typography variant="h6">{data}</Typography>
                                    </Box>
                                );
                            })}
                        </Typography>
                    </Box>
                </Box >
            </Modal >
        </div >
    )
}

export default CardModal
