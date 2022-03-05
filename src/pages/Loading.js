import React from "react";
import loadingIcon from "asset/loadingIndicator.svg";
export default function Loading({ loading = false }) {
  return (
    <div className="bg-white opacity-70">
      <p>Loading</p>
      <img src={loadingIcon} alt="loading-indicator" />

      {/* <LoadingIcon /> */}
    </div>
  );
}
