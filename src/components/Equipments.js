import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getEquipments } from "../actions/equipment.actions";

export default function Equipments({ filter }) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const elementsPerPage = 12;
  const indexLastElement = currentPage * elementsPerPage;
  const indexFirstElement = indexLastElement - elementsPerPage;
  let { loading, success, equipments } = useSelector(
    (state) => state.getEquipmentsReducer
  );
  if (success) {
    equipments = equipments.sort((a, b) => a.name.localeCompare(b.name));
  }

  const filterEquipments =
    filter !== "" && success
      ? equipments.filter(
          (eqp) =>
            eqp.name.toLowerCase().includes(filter.toLowerCase()) ||
            eqp.domain.toLowerCase().includes(filter.toLowerCase())
        )
      : equipments;
  const currentEquipments =
    filter !== ""
      ? filterEquipments.slice(indexFirstElement, indexLastElement)
      : equipments.slice(indexFirstElement, indexLastElement);

  useEffect(() => {
    dispatch(getEquipments());
    setCurrentPage(1);
  }, [dispatch, filter]);

  return (
    <div>
      <Container maxWidth="lg">
        {loading ? (
          <CircularProgress color="primary" />
        ) : (
          <div>
            <Grid container spacing={4} justifyContent="center">
              {success && currentEquipments.length !== 0 ? (
                currentEquipments.map((eqp) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={eqp.id}>
                    <Card className="card">
                      <Link to={`/equipment/${eqp.id}`}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={eqp.photo}
                        />

                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {eqp.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Domaine : {eqp.domain}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Nombre de defauts : {eqp.nbFaults}
                          </Typography>
                        </CardContent>
                      </Link>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography variant="h4" className="no-result-title">
                  Aucun élément ne correspond à votre recherche
                </Typography>
              )}
            </Grid>
            {currentEquipments.length !== 0 && (
              <div className="pagination">
                <Pagination
                  color="primary"
                  onChange={(e, value) => setCurrentPage(value)}
                  page={currentPage}
                  count={
                    filter !== ""
                      ? Math.ceil(filterEquipments.length / elementsPerPage)
                      : Math.ceil(equipments.length / elementsPerPage)
                  }
                />
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
