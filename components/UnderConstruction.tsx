import Head from "next/head";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  imageContainer: {
    position: "relative",
    width: 140,
    "& img": {
      width: "100%",
    },
  },
});

const UnderConstruction = () => {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>dok.trin - platforma</title>
        <meta name="description" content="Divadlo dok.trin" />
      </Head>
      <main
        style={{
          display: "flex",
          height: "100vh",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className={classes.imageContainer}>
          <img src="/logo-doktrin.gif" alt="logo" />
        </div>
        <div>Na webu se pracuje.</div>
      </main>
    </>
  );
};

export default UnderConstruction;
