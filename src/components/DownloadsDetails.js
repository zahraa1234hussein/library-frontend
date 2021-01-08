import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) =>
  createStyles({
    panel: {
      padding: theme.spacing(2, 5),
      minHeight: "100px",
    },
  })
);

const Record = ({ name, value }) => {
  return (
    <div>
      <Typography variant="body1" style={{ fontWeight: "bold" }}>
        {name}:{" "}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </div>
  );
};

const DownloadsDetails = ({ downloadsDetails }) => {
  const classes = useStyles();

  return (
    <div className={classes.panel}>
      {downloadsDetails && (
        <Grid container spacing={4}>
          {downloadsDetails.map((downloadDetail) => (
                <Grid item>
                    {Object.entries(downloadDetail).map(([key, value]) => (
                    <Grid key={key} item xs={12} md={6}>
                    <Record name={key} value={JSON.stringify(value)} />
                    </Grid>
                    ))}
                </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default DownloadsDetails;