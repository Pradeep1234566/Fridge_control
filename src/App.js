import React, { useState, useEffect } from "react";
import { Button, Slider, Box, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { WbSunny, Lightbulb, Air, Lock, Kitchen, RestartAlt } from "@mui/icons-material";
import { updateFridgeStatus } from './firebase'; // Import the Firebase update function
import './App.css';

function App() {
  const [temperature, setTemperature] = useState(22);
  const [light, setLight] = useState(false);
  const [fanSpeed, setFanSpeed] = useState(0);
  const [lock, setLock] = useState(false);
  const [defrost, setDefrost] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync state changes with Firebase
  const updateFirebase = (field, value) => {
    updateFridgeStatus(field, value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature((prevTemp) => prevTemp + (Math.random() > 0.5 ? 1 : -1));
    }, 2000);

    // Sync temperature with Firebase
    updateFirebase('temperature', temperature);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [temperature]);

  const toggleLight = () => {
    setLight(!light);
    updateFirebase('light', !light);
  };

  const adjustTemperature = (e, newValue) => {
    setTemperature(newValue);
    updateFirebase('temperature', newValue);
  };

  const adjustFanSpeed = (e, newValue) => {
    setFanSpeed(newValue);
    updateFirebase('fanSpeed', newValue);
  };

  const toggleLock = () => {
    setLock(!lock);
    updateFirebase('lock', !lock);
  };

  const toggleDefrost = () => {
    setDefrost(!defrost);
    updateFirebase('defrost', !defrost);
  };

  const resetValues = () => {
    setLoading(true);
    setTimeout(() => {
      setTemperature(22);
      setFanSpeed(0);
      setLight(false);
      setLock(false);
      setDefrost(false);

      // Reset in Firebase as well
      updateFirebase('temperature', 22);
      updateFirebase('fanSpeed', 0);
      updateFirebase('light', false);
      updateFirebase('lock', false);
      updateFirebase('defrost', false);

      setLoading(false);
    }, 1000); // Simulate reset delay
  };

  return (
    <div className="App">
      <h3>Fridge Control Panel</h3>
      <div className="control-panel">
        <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={3}>
          <motion.div
            className="control"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <WbSunny fontSize="large" style={{ marginBottom: "10px", color: "#ff9800" }} />
              <Typography variant="h6" style={{ color: "#b0bec5" }}>
                {temperature}°C
              </Typography>
              <Slider
                value={temperature}
                min={16}
                max={30}
                step={1}
                onChange={adjustTemperature}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}°C`}
                sx={{
                  width: "150px",
                  "& .MuiSlider-valueLabel": {
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: "5px",
                  },
                }}
              />
            </Box>
          </motion.div>

          <motion.div
            className="control"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <Lightbulb fontSize="large" style={{ marginBottom: "10px", color: "#fbc02d" }} />
              <Button variant="contained" color={light ? "error" : "primary"} onClick={toggleLight}>
                {light ? "Turn Off" : "Turn On"}
              </Button>
            </Box>
          </motion.div>

          <motion.div
            className="control"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <Air fontSize="large" style={{ marginBottom: "10px", color: "#f9800" }} />
              <Typography variant="h6" style={{ color: "#000" }}>
                {fanSpeed}
              </Typography>
              <Slider
                value={fanSpeed}
                min={0}
                max={5}
                step={1}
                onChange={adjustFanSpeed}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `Speed: ${value}`}
                sx={{
                  width: "150px",
                  "& .MuiSlider-valueLabel": {
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: "5px",
                  },
                }}
              />
            </Box>
          </motion.div>
        </Box>

        <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={3} marginTop="20px">
          <motion.div
            className="control"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <Lock fontSize="large" style={{ marginBottom: "10px", color: "#607d8b" }} />
              <Button variant="contained" color={lock ? "error" : "primary"} onClick={toggleLock}>
                {lock ? "Unlock" : "Lock"}
              </Button>
            </Box>
          </motion.div>

          <motion.div
            className="control"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <Kitchen fontSize="large" style={{ marginBottom: "10px", color: "#00bcd4" }} />
              <Button variant="contained" color={defrost ? "error" : "primary"} onClick={toggleDefrost}>
                {defrost ? "Stop Defrost" : "Start Defrost"}
              </Button>
            </Box>
          </motion.div>
        </Box>

        <Box display="flex" justifyContent="center" marginTop="20px">
          <Button
            variant="outlined"
            color="secondary"
            startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <RestartAlt />}
            onClick={resetValues}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset All"}
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default App;
