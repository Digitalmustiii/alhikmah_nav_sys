// app/map/page.tsx

"use client";

import React from "react";
import BottomSheet from "../components/BottomSheet";
import Inputs from "../components/Inputs";
import LocationCard from "../components/LocationCard";

const MapPage = () => {
  return (
    <div>
      <h1>Navigation System</h1>
      <Inputs />
      <LocationCard />
      <BottomSheet />
    </div>
  );
};

export default MapPage;
