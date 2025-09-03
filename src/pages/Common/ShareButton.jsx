import React from "react";
import {toast} from "react-hot-toast";
export const ShareButton = (link ) => {
//   const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Swanand Vibes",
          text: "Referral Code!",
          url: link,
        })
        .then(() => toast.success("Shared successfully"))
        .catch((error) => toast.error("Error sharing:", error));
    } else {
      alert("Sharing not supported in your browser. Copy link instead.");
    }
//   };

//   return <button onClick={handleShare}>📤 Share</button>;
};

