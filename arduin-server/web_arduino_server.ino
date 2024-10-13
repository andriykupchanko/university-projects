#include <SPI.h>
#include <Ethernet.h>

byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFA, 0xCE};
IPAddress ip(192, 168, 1, 120); // Статична IP-адреса
EthernetServer server(80);      // HTTP сервер на порту 80

int temperatureDataOne = 25;
int humidityDateOne = 60;

void setup()
{
    Serial.begin(9600);

    Ethernet.begin(mac, ip);
    server.begin();

    Serial.print("Using static IP address: ");
    Serial.println(Ethernet.localIP());
    Serial.println("Server is ready and waiting for requests...");
}

void loop()
{
    EthernetClient client = server.available();

    if (client)
    {
        Serial.println("Client connected");
        String request = "";

        // Зчитуємо дані від клієнта
        while (client.connected())
        {
            if (client.available())
            {
                char c = client.read();
                request += c;
                Serial.print(c);

                if (c == '\n')
                {
                    if (request.indexOf("GET") >= 0)
                    {
                        Serial.println("GET request received");

                        client.println("HTTP/1.1 200 OK");
                        client.println("Content-Type: application/json");
                        client.println("Connection: close");
                        client.println();
                        client.println("{ \"temperature\": " + String(temperatureDataOne) + ",\n\t\"humidity\": " + String(humidityDateOne) + "}");
                    }
                    break;
                }
            }
        }

        client.stop();
        Serial.println("Client disconnected");
    }
}
