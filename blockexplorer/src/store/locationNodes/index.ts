import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/configureStore";
import { Status } from "types";
import { initialLocationNodes } from "types/store";
import { loadLocationNodes } from "./utils";
import Utils from "../../app/components/NodesMap/Utils";

let initialState: initialLocationNodes = {
  locationsNodeLoading: Status.IDLE,
  locationNodes: [],
  sumNodesPerCountry: [],
  sumNodesPerCity: []
};

const locationsNodeSlice = createSlice({
  name: "locationNodes",
  initialState,
  reducers: {
    locationsNodeReducer: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(loadLocationNodes.pending, (state) => {
      state.locationsNodeLoading = Status.LOADING;
    });
    builder.addCase(loadLocationNodes.fulfilled, (state, { payload }) => {
      state.locationNodes = payload;
      state.sumNodesPerCountry = Utils.sumNodesPerCountry(payload)
      state.sumNodesPerCity = Utils.sumNodesPerCity(payload)
      state.locationsNodeLoading = Status.SUCCEEDED;
    });
    builder.addCase(loadLocationNodes.rejected, (state) => {
      state.locationsNodeLoading = Status.FAILED;
    });
  },
});



// Select all Locations Node
export const getLocationsNodes = (state: RootState) => state.locationNodes.locationNodes;

export const getSumNodesPerCountry = (state: RootState) => state.locationNodes.sumNodesPerCountry;

export const getSumNodesPerCity = (state: RootState) => state.locationNodes.sumNodesPerCity;

export const getLoadingStatus = (state: RootState) => state.locationNodes.locationsNodeLoading;

export const { locationsNodeReducer } = locationsNodeSlice.actions;

export default locationsNodeSlice.reducer;
