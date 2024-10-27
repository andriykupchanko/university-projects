import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css"; // імпорт Tailwind CSS
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Alert,
  AlertIcon,
  Select,
  Button,
  Input,
  FormControl,
  FormLabel
} from "@chakra-ui/react";
import SensorDataChart from "../specific/SensorDataChart"; // Імпортуйте ваш компонент графіків

interface DashboardProps {
  isAuthenticated: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isAuthenticated }) => {
  const [relayCount, setRelayCount] = useState<number>(1);
  const [relayStatus, setRelayStatus] = useState<boolean[]>([]);

  // Стан для часу та значень
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [minValue, setMinValue] = useState<number | "">("");
  const [maxValue, setMaxValue] = useState<number | "">("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedSetting, setSelectedSetting] = useState<string>("");

  // Оновлюємо relayStatus при зміні relayCount
  useEffect(() => {
    if (relayCount > 0 && Number.isInteger(relayCount)) {
      setRelayStatus(Array(relayCount).fill(false));
    }
  }, [relayCount]);

  const toggleRelay = (index: number) => {
    setRelayStatus((prevStatus) =>
      prevStatus.map((status, i) => (i === index ? !status : status))
    );
  };

  const handleSave = () => {
    if (new Date(startDate) > new Date(endDate)) {
      setErrorMessage("Дата початку не може бути пізніше дати кінця.");
      return;
    }
    if (startTime && endTime && startTime >= endTime) {
      setErrorMessage(
        "Час початку не може бути пізніший або рівний часу кінця."
      );
      return;
    }
    if (minValue && maxValue && minValue >= maxValue) {
      setErrorMessage("Мінімальне значення має бути менше максимального.");
      return;
    }
    setErrorMessage("");
    // Логіка збереження налаштувань
    console.log("Налаштування збережено:", {
      startDate,
      endDate,
      startTime,
      endTime,
      minValue,
      maxValue
    });
  };

  return (
    <Tabs>
      <TabList>
        <Tab>Graphs from sensors</Tab>
        <Tab>Settings</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div className="flex">
            <div className="flex-grow">
              <SensorDataChart />
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          {!isAuthenticated ? (
            <Alert status="warning">
              <AlertIcon />
              <p className="text-black">Please login to access settings.</p>
            </Alert>
          ) : (
            <div>
              <h2 className="text-lg font-semibold mb-4">Settings</h2>

              {/* Реле */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Relay Settings</h3>
                <Select
                  placeholder="Select relay count"
                  value={relayCount}
                  onChange={(e) => {
                    const count = parseInt(e.target.value);
                    setRelayCount(isNaN(count) ? 1 : count);
                  }}
                  className='mb-4 appearance-none pr-6 bg-right bg-[url(&apos;data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M7 10l5 5 5-5z"/></svg>&apos;)] bg-no-repeat'
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                    <option key={count} value={count}>
                      {count} relay{count > 1 ? "s" : ""}
                    </option>
                  ))}
                </Select>

                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: relayCount }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => toggleRelay(i)}
                      className={`px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
                        relayStatus[i]
                          ? "bg-blue-500 text-white border-white"
                          : "bg-white text-black border-gray-400"
                      } ${
                        relayCount % 2 !== 0 && i === relayCount - 1
                          ? "col-span-2"
                          : ""
                      }`}
                    >
                      {relayStatus[i] ? "On" : "Off"}
                    </button>
                  ))}
                </div>

                <hr className="m-5" />
              </div>

              {/* Дропдаун для налаштувань */}
              <FormControl mb="4">
                <FormLabel>Select Settings</FormLabel>
                <Select
                  placeholder="Select a setting"
                  value={selectedSetting}
                  onChange={(e) => setSelectedSetting(e.target.value)}
                >
                  <option value="time">Data and Time</option>
                  <option value="value">Value</option>
                </Select>
              </FormControl>

              {/* Налаштування часу */}
              {selectedSetting === "time" && (
                <div>
                  {errorMessage && (
                    <Alert status="error" mb="4">
                      {errorMessage}
                    </Alert>
                  )}
                  <FormControl mb="4">
                    <FormLabel>Data end</FormLabel>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      max={endDate || undefined}
                    />
                  </FormControl>
                  <FormControl mb="4">
                    <FormLabel>Data begin</FormLabel>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || undefined}
                    />
                  </FormControl>
                  <FormControl mb="4">
                    <FormLabel>Time begin</FormLabel>
                    <Input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      max={endTime || undefined}
                    />
                  </FormControl>
                  <FormControl mb="4">
                    <FormLabel>Time end</FormLabel>
                    <Input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      min={startTime || undefined}
                    />
                  </FormControl>
                </div>
              )}

              {/* Налаштування значень */}
              {selectedSetting === "value" && (
                <div>
                  <FormControl mb="4">
                    <FormLabel>Min value</FormLabel>
                    <Input
                      type="number"
                      value={minValue}
                      onChange={(e) =>
                        setMinValue(
                          e.target.value ? parseInt(e.target.value) : ""
                        )
                      }
                      placeholder="Enter min value"
                    />
                  </FormControl>
                  <FormControl mb="4">
                    <FormLabel>Max value</FormLabel>
                    <Input
                      type="number"
                      value={maxValue}
                      onChange={(e) =>
                        setMaxValue(
                          e.target.value ? parseInt(e.target.value) : ""
                        )
                      }
                      placeholder="Enter max value"
                    />
                  </FormControl>
                </div>
              )}

              {/* Кнопка збереження */}
              <div className="flex justify-end mt-4">
                <Button colorScheme="blue" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Dashboard;
