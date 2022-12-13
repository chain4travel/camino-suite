import React, { FC, useEffect, useState, Fragment } from 'react';
import {
  Grid,
  Paper,
  Box,
  TableContainer,
  TableCellProps,
  useTheme,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { selectAllValidators } from 'store/validatorsSlice';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { loadValidators } from 'store/validatorsSlice/utils';
import { TableViewRow } from './TableViewRow';
import { GridViewItem } from './GridViewItem';
import { To } from 'react-router-dom';
import SubPageTitle from 'app/components/SubPageTitle';
import PageContainer from 'app/components/PageContainer';
import BackButton from 'app/components/BackButton';
import TableView from 'app/components/Table/TableView';
import useWidth from 'app/hooks/useWidth';
import LocationNode from 'types/locationNode';
import NodesPerCountry from 'types/nodesPerCountry';
import Utils from 'app/components/NodesMap/Utils';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import features from 'app/components/NodesMap/features.json';
import CircleMarker from 'app/components/NodesMap/CircleMarker';
import Stadistics from 'app/components/NodesMap/Stadistics';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import '../../components/NodesMap/NotoFont.css';
import StadisticsV2 from 'app/components/NodesMap/StadisticsV2';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Validators: FC = () => {
  const theme = useTheme();
  const { isDesktop, isWidescreen } = useWidth();
  const validators = useAppSelector(selectAllValidators);

  const dispatch = useAppDispatch();

  //Map And Stadistics
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState<LocationNode[]>([]);
  const [nodesPerCountry, setNodesPerCountry] = useState<NodesPerCountry[]>([]);
  //const [maxValue, setMaxValue] = useState(0);
  const [zoomValue, setZoomValue] = useState(1.5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sizeCircle, setSizeCircle] = useState(10);
  const [sizeStroke, setSizeStroke] = useState(7);

  useEffectOnce(() => {
    dispatch(loadValidators());
  });

  useEffect(() => {
    setLoading(true);
    Utils.getNodeData()
      .then((dataNodes: LocationNode[]) => {
        setData(dataNodes);
        let sumNodesPerCountry = Utils.sumNodesPerCountry(dataNodes);
        setNodesPerCountry(sumNodesPerCountry);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <PageContainer pageTitle="Validators" metaContent="validators">
      <Paper
        variant="outlined"
        square
        sx={{
          minHeight: '544px',
          width: 1,
          backgroundColor: 'primary.dark',
          borderRadius: '12px',
          borderWidth: '1px',
          borderColor: 'primary.light',
          borderStyle: 'solid',
          p: '1rem 1.5rem 1rem 1.5rem',
        }}
      >
        <SubPageTitle
          title="Validators"
          backToLink={-1 as To}
          style={{ marginBottom: '20px' }}
        />

        <Fragment>
          <div style={{ position: 'relative' }}>
            {loading == false ? (
              <>
                {error == true ? (
                  <>
                    <Typography
                      style={{ textAlign: 'center' }}
                      component="div"
                      variant="body1"
                    >
                      <Box sx={{ color: 'error.main' }}>
                        {/*<h4>Could not connect to the geolocation API</h4>*/}
                      </Box>
                    </Typography>
                  </>
                ) : null}

                {data.length > 0 ? (
                  <>
                    <div>
                      <Tabs
                        variant="fullWidth"
                        value={activeTab}
                        onChange={handleChangeTab}
                        textColor="secondary"
                        indicatorColor="secondary"
                      >
                        <Tab
                          className="tab"
                          disableRipple
                          label="Map Statistics"
                          {...a11yProps(0)}
                        />
                        <Tab
                          className="tab"
                          disableRipple
                          label="Node Statistics"
                          {...a11yProps(1)}
                        />
                        <Tab
                          className="tab"
                          disableRipple
                          label="Country Statistics"
                          {...a11yProps(2)}
                        />
                      </Tabs>
                    </div>

                    {activeTab == 0 ? (
                      <>
                        <ComposableMap
                          style={{
                            height: isWidescreen || isDesktop ? 700 : 'auto',
                            width: '100%',
                          }}
                          projection={'geoMercator'}
                        >
                          <ZoomableGroup center={[0, 40]} zoom={zoomValue} onMove={(e: any) => {
                            console.log("eValue", e);
                            if(e.zoom <= 3)
                            {
                              setSizeCircle(10);
                              setSizeStroke(7);
                            }

                            if(e.zoom > 3 && e.zoom < 6)
                            {
                              setSizeCircle(6);
                              setSizeStroke(4);
                            }

                            if(e.zoom > 6)
                            {
                              setSizeCircle(3);
                              setSizeStroke(1.5);
                            }
                          }} >
                            <Geographies
                              geography={features}
                              pointerEvents={'none'}
                            >
                              {({ geographies }) =>
                                geographies.map(geo => (
                                  <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#41547C"
                                  />
                                ))
                              }
                            </Geographies>
                            {data.map(
                              (
                                { lng, lat, nodeIdentity, country, city },
                                index,
                              ) => {
                                return (
                                  <CircleMarker
                                    key={index}
                                    country={country}
                                    city={city}
                                    lng={lng}
                                    lat={lat}
                                    rValue={sizeCircle}
                                    sValue={sizeStroke}
                                    nodeIdentity={nodeIdentity}
                                  />
                                );
                              },
                            )}
                          </ZoomableGroup>
                        </ComposableMap>
                      </>
                    ) : null}

                    {activeTab == 1 ? (
                      <>
                        <TableContainer sx={{ minHeight: '400px' }}>
                          {isWidescreen || isDesktop ? (
                            <TableView columns={columns}>
                              {validators?.map(validator => (
                                <TableViewRow
                                  key={validator.nodeID}
                                  validator={validator}
                                />
                              ))}
                            </TableView>
                          ) : (
                            <Grid item container alignItems="center">
                              {validators.map(validator => (
                                <GridViewItem
                                  key={validator.nodeID}
                                  validator={validator}
                                />
                              ))}
                            </Grid>
                          )}
                        </TableContainer>
                      </>
                    ) : null}

                    {activeTab == 2 ? (
                      <div className="noto-flags">
                        {theme.palette.mode == 'light' ? (
                          <StadisticsV2
                            nodesPerCountry={nodesPerCountry}
                            darkMode={false}
                          />
                        ) : (
                          <StadisticsV2
                            nodesPerCountry={nodesPerCountry}
                            darkMode={true}
                          />
                        )}
                      </div>
                    ) : null}
                  </>
                ) : null}
              </>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CircularProgress color="secondary" />
              </Box>
            )}
          </div>
        </Fragment>

        <Box sx={{ display: 'flex', width: '100%', paddingTop: '1rem' }}>
          <BackButton backToLink={-1 as To} />
        </Box>
      </Paper>
    </PageContainer>
  );
};

export default Validators;

export interface ColumnType {
  name: string;
  label: string;
  field: string;
  align: TableCellProps['align'];
}

const columns: ColumnType[] = [
  {
    name: 'Status',
    label: 'Status',
    field: 'Status',
    align: 'center',
  },
  {
    name: 'NodeID',
    label: 'NodeID',
    field: 'NodeID',
    align: 'center',
  },
  {
    name: 'StartTime',
    label: 'StartTime',
    field: 'StartTime',
    align: 'center',
  },
  {
    name: 'EndTime',
    label: 'EndTime',
    field: 'EndTime',
    align: 'center',
  },
  {
    name: 'UpTime',
    label: 'UpTime',
    field: 'UpTime',
    align: 'center',
  },
  {
    name: 'txID',
    label: 'txID',
    field: 'txID',
    align: 'center',
  },
];
