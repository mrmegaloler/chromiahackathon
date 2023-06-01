import beyonce from "../images/Beyonce.jpeg";
import "./event.css";
import { ReactComponent as BackArrowIcon } from "../icons/ArrowBack.svg";
import { Link } from "react-router-dom";

const Event = () => {
  return (
    <div>
      <Link className="backButton" to="/">
        <BackArrowIcon />
      </Link>
      <div
        className="eventImg"
        style={{ backgroundImage: `url(${beyonce})` }}
      />
      <div className="eventDetails">
        <h1>
          Beyoncé <br />
          Renaissance World Tour
        </h1>
        <h2>Avicii Arena, May 9th</h2>
        <p className="introText">
          Known for being fierce and pushing boundaries, Queen Bey reigns with
          the power of pure female dominance
        </p>
        <p>
          A star since she was a child, Beyoncé was destined for greatness,
          travelling steadily on a path toward mega stardom. From a talented
          singer and dancer, she evolved into a multifaceted powerhouse
          performer, global music phenomenon and social provocateur with a solo
          discography that celebrates independent women.
          <br />
          <br />A star since she was a child, Beyoncé was destined for
          greatness, travelling steadily on a path toward mega stardom. From a
          talented singer and dancer, she evolved into a multifaceted powerhouse
          performer, global music phenomenon and social provocateur with a solo
          discography that celebrates independent women. A star since she was a
          child, Beyoncé was destined for greatness, travelling steadily on a
          path toward mega stardom. From a talented singer and dancer, she
          evolved into a multifaceted powerhouse performer, global music
          phenomenon and social provocateur with a solo discography that
          celebrates independent women.
          <br />
          <br />A star since she was a child, Beyoncé was destined for
          greatness, travelling steadily on a path toward mega stardom. From a
          talented singer and dancer, she evolved into a multifaceted powerhouse
          performer, global music phenomenon and social provocateur with a solo
          discography that celebrates independent women. A star since she was a
          child, Beyoncé was destined for greatness, travelling steadily on a
          path toward mega stardom. From a talented singer and dancer, she
          evolved into a multifaceted powerhouse performer, global music
          phenomenon and social provocateur with a solo discography that
          celebrates independent women.
        </p>
      </div>
      <div className="bottomOverlay">
        <Link className="buyButton" to="/buy">
          Buy tickets from 790 SEK
        </Link>
      </div>
    </div>
  );
};

export default Event;
