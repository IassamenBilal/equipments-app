import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getEquipmentDetails } from "../actions/equipment.actions";

export default function Equipment(props) {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const { loading, success, equipment, checkpoints } = useSelector(
    (state) => state.getEquipmentDetailsReducer
  );

  const [currentPage, setCurrentPage] = useState(1);
  const elementsPerPage = 12;
  const indexLastElement = currentPage * elementsPerPage;
  const indexFirstElement = indexLastElement - elementsPerPage;
  const currentCheckpoints =
    success && checkpoints.slice(indexFirstElement, indexLastElement);

  useEffect(() => {
    dispatch(getEquipmentDetails(id));
  }, [dispatch, id]);
  return (
    <div>
      <Container maxWidth="lg">
        {loading ? (
          <CircularProgress color="primary" />
        ) : (
          success && (
            <>
              <Card>
                <CardContent>
                  <Typography variant="h4" align="center">
                    {equipment.name}
                  </Typography>
                  <div className="equipment-infos">
                    <div>
                      <Typography>
                        <strong> Marque </strong>: {equipment.brand}
                      </Typography>
                      <Typography>
                        <strong> Domaine </strong>: {equipment.domain}
                      </Typography>
                      <Typography>
                        <strong> Local </strong>: {equipment.local}
                      </Typography>
                      <Typography>
                        <strong> Nombre de defauts </strong>:{" "}
                        {equipment.nbFaults}
                      </Typography>
                      {equipment.notes && (
                        <Typography>
                          <strong> Notes </strong>: {equipment.notes}
                        </Typography>
                      )}
                    </div>
                    <img
                      src={equipment.photo}
                      alt="equipment"
                      className="equipment-img"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="checkpoints-title">
                <CardContent>
                  <Typography variant="h4" align="center">
                    Les points de contrôles
                  </Typography>
                </CardContent>
              </Card>
              <Grid container spacing={2}>
                {currentCheckpoints.map((checkpoint, index) => (
                  <Grid item xs={12} md={3} key={index}>
                    <Card style={{ height: "100%" }}>
                      <CardContent>
                        <Typography gutterBottom={4}>
                          <strong>Nom : </strong>
                          {checkpoint.name}
                        </Typography>
                        {checkpoint.photo && (
                          <img
                            className="checkpoints-img"
                            src={checkpoint.photo}
                            alt="checkpoint"
                          />
                        )}
                        {checkpoint.fault && (
                          <Typography variant="body2">
                            <strong>Défaut : </strong> {checkpoint.fault}
                          </Typography>
                        )}
                        {checkpoint.recommandation && (
                          <Typography variant="body2">
                            <strong>Recommandation : </strong>
                            {checkpoint.recommandation}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <div className="pagination">
                <Pagination
                  color="primary"
                  onChange={(e, value) => setCurrentPage(value)}
                  page={currentPage}
                  count={Math.ceil(checkpoints.length / elementsPerPage)}
                />
              </div>
            </>
          )
        )}
      </Container>
    </div>
  );
}
