import spinner from "../../images/spinner.gif";

const Loading = () => {
  return (
    <div className="loadingScreen">
      <p>Loading payment</p>
      <img src={spinner} alt="spinner" />
    </div>
  );
};

export default Loading;
