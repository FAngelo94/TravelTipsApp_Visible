import React from "react";
import { Icons } from "../../";
import { UtilsUser } from "../../../utils";

function FooterVote({ average, voted, voteFunction }) {
  const [vote, handleVote] = React.useState(voted);
  const putVote = (v) => {
    if (UtilsUser.checkIfLogged()) {
      if (v !== vote) {
        handleVote(v);
        voteFunction(v);
      } else {
        // User simple remove vote done
        handleVote(-1);
        voteFunction(-1);
      }
    } else window.showRedirectToLoginModal();
  };
  const bigSmile = 1.6;
  const smallSmile = 1.2;
  return (
    <div className="card-footer d-flex flex-row-reverse  bg-primary">
      {vote === 4 ? (
        <button
          className="navbar-toggler p-0 border-0 me-1"
          onClick={() => putVote(4)}
        >
          <Icons.EmojiLaughingFill
            d={average >= 3.5 && average <= 4 ? bigSmile : smallSmile}
          />
        </button>
      ) : (
        <button
          className="navbar-toggler p-0 border-0 me-1"
          onClick={() => putVote(4)}
        >
          <Icons.EmojiLaughing d={average >= 3.5 && average <= 4 ? bigSmile : smallSmile} />
        </button>
      )}
      {vote === 3 ? (
        <button
          className="navbar-toggler p-0 border-0 me-1"
          onClick={() => putVote(3)}
        >
          <Icons.EmojiSmileFill
            d={average >= 2.5 && average < 3.5 ? bigSmile : smallSmile}
          />
        </button>
      ) : (
        <button
          className="navbar-toggler p-0 border-0 me-1"
          onClick={() => putVote(3)}
        >
          <Icons.EmojiSmile d={average >= 2.5 && average < 3.5 ? bigSmile : smallSmile} />
        </button>
      )}
      {vote === 2 ? (
        <button
          className="navbar-toggler p-0 border-0 me-1"
          onClick={() => putVote(2)}
        >
          <Icons.EmojiNeutralFill
            d={average >= 1.5 && average < 2.5 ? bigSmile : smallSmile}
          />
        </button>
      ) : (
        <button
          className="navbar-toggler p-0 border-0 me-1"
          onClick={() => putVote(2)}
        >
          <Icons.EmojiNeutral d={average >= 1.5 && average < 2.5 ? bigSmile : smallSmile} />
        </button>
      )}
      {vote === 1 ? (
        <button
          className="navbar-toggler p-0 border-0 me-1"
          onClick={() => putVote(1)}
        >
          <Icons.EmojiForwnFill
            d={average >= 0.5 && average < 1.5 ? bigSmile : smallSmile}
          />
        </button>
      ) : (
        <button
          className="navbar-toggler p-0 border-0 me-1"
          onClick={() => putVote(1)}
        >
          <Icons.EmojiForwn d={average >= 0.5 && average < 2 ? bigSmile : smallSmile} />
        </button>
      )}
      {vote === 0 ? (
        <button
          className="navbar-toggler p-0 border-0 me-1"
          onClick={() => putVote(0)}
        >
          <Icons.EmojiAngryFill d={average >= 0 && average < 0.5 ? bigSmile : smallSmile} />
        </button>
      ) : (
        <button
          className="navbar-toggler p-0 border-0 me-1"
          onClick={() => putVote(0)}
        >
          <Icons.EmojiAngry d={average >= 0 && average < 0.5 ? bigSmile : smallSmile} />
        </button>
      )}
    </div>
  );
}

export default FooterVote;
